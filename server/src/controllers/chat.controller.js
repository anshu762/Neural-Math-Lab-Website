// controllers/chat.controller.js
import { env } from "../config/env.js";

const PRIMARY_MODEL = "openai/gpt-oss-20b:free";
const FALLBACK_MODEL = "meta-llama/llama-3.3-70b-instruct:free";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!env.openrouterApiKey) {
  console.warn(
    "[chat.controller] OPENROUTER_API_KEY is not set. /api/chat will return 500."
  );
}

function isMathOrEducationQuestion(text = "") {
  const t = text.toLowerCase();
  const mathKeywords = [
    "math",
    "algebra",
    "geometry",
    "fraction",
    "ratio",
    "equation",
    "function",
    "graph",
    "probability",
    "statistics",
  ];
  const eduKeywords = [
    "homework",
    "assignment",
    "lesson",
    "curriculum",
    "exam",
    "test",
    "practice",
    "exercise",
  ];

  return (
    mathKeywords.some((k) => t.includes(k)) ||
    eduKeywords.some((k) => t.includes(k)) ||
    /[0-9]/.test(t)
  );
}

function buildMessages(systemInstruction, history, userMessage) {
  return [
    { role: "system", content: systemInstruction },
    ...history,
    { role: "user", content: userMessage },
  ];
}

function safeParseModelJson(rawText) {
  if (!rawText || typeof rawText !== "string") return null;

  const text = rawText.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) return null;

  const jsonText = text.slice(start, end + 1);

  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

// async function callOpenRouter(modelName, systemInstruction, history, userMessage) {
//   const body = {
//     model: modelName,
//     messages: buildMessages(systemInstruction, history, userMessage),
//     temperature: 0.35,
//     max_tokens: 900,
//     response_format: { type: "json_object" },
//   };

//   const res = await fetch(OPENROUTER_API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${env.openrouterApiKey}`,
//       "HTTP-Referer": env.openrouterAppUrl || "http://localhost:8080",
//       "X-Title": env.openrouterAppName || "Neural Math Lab",
//     },
//     body: JSON.stringify(body),
//   });

//   if (res.status === 429) {
//     const errorBody = await res.text().catch(() => "");
//     const err = new Error(`[OpenRouter HTTP Error] 429 Too Many Requests – ${errorBody}`);
//     err.code = 429;
//     throw err;
//   }

//   if (!res.ok) {
//     const errorBody = await res.text().catch(() => "");
//     throw new Error(
//       `[OpenRouter HTTP Error] ${res.status} ${res.statusText} – ${errorBody}`
//     );
//   }

//   const data = await res.json();
//   const rawText = data?.choices?.[0]?.message?.content || "";
//   const parsed = safeParseModelJson(rawText);

//   if (!parsed) {
//     console.error("Failed to parse OpenRouter JSON:", rawText);
//     const err = new Error("Invalid JSON from OpenRouter API");
//     err.code = "BAD_JSON";
//     throw err;
//   }

//   return {
//     steps: Array.isArray(parsed.steps) ? parsed.steps : [],
//     finalAnswer: typeof parsed.finalAnswer === "string" ? parsed.finalAnswer : "",
//     concept: typeof parsed.concept === "string" ? parsed.concept : "",
//   };
// }

async function callOpenRouter(modelName, systemInstruction, history, userMessage) {
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      steps: {
        type: "array",
        items: { type: "string" },
      },
      finalAnswer: {
        type: "string",
      },
      concept: {
        type: "string",
      },
    },
    required: ["steps", "finalAnswer", "concept"],
  };

  const body = {
    model: modelName,
    messages: buildMessages(systemInstruction, history, userMessage),
    temperature: 0.2,
    max_tokens: 700,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "math_tutor_response",
        strict: true,
        schema,
      },
    },
  };

  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openrouterApiKey}`,
      "HTTP-Referer": env.openrouterAppUrl || "http://localhost:8080",
      "X-Title": env.openrouterAppName || "Neural Math Lab",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const errorBody = await res.text().catch(() => "");
    const err = new Error(`[OpenRouter HTTP Error] 429 Too Many Requests – ${errorBody}`);
    err.code = 429;
    throw err;
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(
      `[OpenRouter HTTP Error] ${res.status} ${res.statusText} – ${errorBody}`
    );
  }

  const data = await res.json();
  const rawText = data?.choices?.[0]?.message?.content || "";
  const parsed = safeParseModelJson(rawText);

  if (!parsed) {
    console.error("Failed to parse OpenRouter JSON:", rawText);
    const err = new Error("Invalid JSON from OpenRouter API");
    err.code = "BAD_JSON";
    throw err;
  }

  return {
    steps: Array.isArray(parsed.steps) ? parsed.steps : [],
    finalAnswer: typeof parsed.finalAnswer === "string" ? parsed.finalAnswer : "",
    concept: typeof parsed.concept === "string" ? parsed.concept : "",
  };
}

export async function postChat(req, res) {
  try {
    if (!env.openrouterApiKey) {
      return res.status(500).json({
        success: false,
        error: "OpenRouter API is not configured on the server.",
      });
    }

    const { message, history } = req.body || {};
    const trimmed = (message || "").trim();

    if (!trimmed) {
      return res.status(400).json({
        success: false,
        error: "Missing 'message' in request body.",
      });
    }

    if (!isMathOrEducationQuestion(trimmed)) {
      return res.status(400).json({
        success: false,
        error:
          "This assistant only answers questions about mathematics and learning. Try asking a math or education question.",
      });
    }

    const openRouterHistory = Array.isArray(history)
      ? history
          .filter(
            (m) =>
              m &&
              typeof m.role === "string" &&
              typeof m.content === "string" &&
              m.content.trim().length > 0
          )
          .map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          }))
      : [];

    const systemInstruction =
      "You are Neural Math Lab, an AI math and learning tutor for students in roughly grades 6–10. " +
      "You ONLY answer questions about mathematics, math problem solving, math concepts, and how to study or learn math. " +
      "If a question is not about math or learning, politely refuse and redirect the student back to math. " +
      'Return valid JSON only in this exact shape: {"steps":["..."],"finalAnswer":"...","concept":"..."}. ' +
      "Do not wrap the output in markdown fences. Keep the answer complete, well-structured, and concise.";

    // let reply;
    // try {
    //   reply = await callOpenRouter(
    //     PRIMARY_MODEL,
    //     systemInstruction,
    //     openRouterHistory,
    //     trimmed
    //   );
    // } 
    // catch (primaryErr) {
    //   console.error(
    //     "[postChat] primary model error:",
    //     primaryErr?.message || primaryErr
    //   );

    //   if (primaryErr.code === 429) {
    //     return res.status(429).json({
    //       success: false,
    //       error:
    //         "The chat service is temporarily rate-limited. Please try again in a moment.",
    //     });
    //   }

    //   try {
    //     reply = await callOpenRouter(
    //       FALLBACK_MODEL,
    //       systemInstruction,
    //       openRouterHistory,
    //       trimmed
    //     );
    //   } catch (fallbackErr) {
    //     console.error(
    //       "[postChat] fallback model error:",
    //       fallbackErr?.message || fallbackErr
    //     );

    //     if (fallbackErr.code === 429) {
    //       return res.status(429).json({
    //         success: false,
    //         error:
    //           "The chat service is temporarily rate-limited. Please try again in a moment.",
    //       });
    //     }

    //     return res.status(500).json({
    //       success: false,
    //       error: "Failed to generate a response from the math tutor.",
    //     });
    //   }
    // }

    let reply;
try {
  reply = await callOpenRouter(
    PRIMARY_MODEL,
    systemInstruction,
    openRouterHistory,
    trimmed
  );
} catch (primaryErr) {
  console.error("[postChat] primary model error:", primaryErr?.message || primaryErr);

  if (primaryErr.code === 429) {
    return res.status(429).json({
      success: false,
      error:
        "The chat service is temporarily rate-limited. Please try again in a moment.",
    });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to generate a response from the math tutor.",
  });
}

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error("[postChat] error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to generate a response from the math tutor.",
    });
  }
}



























// // controllers/chat.controller.js
// import { env } from "../config/env.js";


// // Confirmed working via curl test: gemini-flash-latest on v1beta generateContent.
// const PRIMARY_MODEL = "gemini-flash-latest";
// const FALLBACK_MODEL = "gemini-pro-latest";


// if (!env.geminiApiKey) {
//   console.warn(
//     "[chat.controller] GOOGLE_AI_API_KEY is not set. /api/chat will return 500."
//   );
// }


// // quick topic guard before paying for tokens
// function isMathOrEducationQuestion(text = "") {
//   const t = text.toLowerCase();
//   const mathKeywords = [
//     "math",
//     "algebra",
//     "geometry",
//     "fraction",
//     "ratio",
//     "equation",
//     "function",
//     "graph",
//     "probability",
//     "statistics",
//   ];
//   const eduKeywords = [
//     "homework",
//     "assignment",
//     "lesson",
//     "curriculum",
//     "exam",
//     "test",
//     "practice",
//     "exercise",
//   ];


//   return (
//     mathKeywords.some((k) => t.includes(k)) ||
//     eduKeywords.some((k) => t.includes(k)) ||
//     /[0-9]/.test(t)
//   );
// }


// // Call Gemini generateContent via v1beta REST API, using header auth
// async function callGemini(modelName, systemInstruction, history, userMessage) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;


//   const contents = [
//     {
//       role: "user",
//       parts: [{ text: systemInstruction }],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text:
//             "Understood. I will only act as a math and learning tutor, and I will redirect any non‑math questions back to mathematics.",
//         },
//       ],
//     },
//     ...history,
//     {
//       role: "user",
//       parts: [{ text: userMessage }],
//     },
//   ];


//   const body = {
//     contents,
//     generationConfig: {
//         maxOutputTokens: 900,
//         temperature: 0.35,
//         topP: 0.8,
//         responseMimeType: "application/json",
//         responseSchema: {
//         type: "object",
//         properties: {
//             steps: { type: "array", items: { type: "string" } },
//             finalAnswer: { type: "string" },
//             concept: { type: "string" }
//         },
//         required: ["steps", "finalAnswer"]
//         }
//     },
//     };


//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-goog-api-key": env.geminiApiKey,
//     },
//     body: JSON.stringify(body),
//   });


//   if (!res.ok) {
//     const errorBody = await res.text().catch(() => "");
//     const msg = `[Gemini HTTP Error] ${res.status} ${res.statusText} – ${errorBody}`;
//     throw new Error(msg);
//   }


//   const data = await res.json();


//   const rawText =
//     data?.candidates?.[0]?.content?.parts
//       ?.map((p) => p.text || "")
//       .join("") || "";


//   const text = normalizeTutorText(rawText);


//   if (!text) {
//     throw new Error("Empty response from Gemini API");
//   }


//   return text;
// }


// function normalizeTutorText(raw) {
//   if (!raw) return "";


//   let text = raw;
//   text = text.replace(/\$/g, "");
//   text = text.replace(/^#{1,6}\s*/gm, "");
//   text = text.replace(/\*\*/g, "");
//   text = text.replace(/__|_/g, "");
//   text = text.replace(/\n{3,}/g, "\n\n");
//   return text.trim();
// }


// export async function postChat(req, res) {
//   try {
//     if (!env.geminiApiKey) {
//       return res.status(500).json({
//         success: false,
//         error: "Gemini API is not configured on the server.",
//       });
//     }


//     const { message, history } = req.body || {};
//     const trimmed = (message || "").trim();


//     if (!trimmed) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing 'message' in request body.",
//       });
//     }


//     if (!isMathOrEducationQuestion(trimmed)) {
//       return res.status(400).json({
//         success: false,
//         error:
//           "This assistant only answers questions about mathematics and learning. Try asking a math or education question.",
//       });
//     }


//     // history: [{ role: 'user'|'assistant', content: '...' }]
//     const geminiHistory = Array.isArray(history)
//       ? history
//           .filter(
//             (m) =>
//               m &&
//               typeof m.role === "string" &&
//               typeof m.content === "string" &&
//               m.content.trim().length > 0
//           )
//           .map((m) => ({
//             role: m.role === "assistant" ? "model" : "user",
//             parts: [{ text: m.content }],
//           }))
//       : [];


//     const systemInstruction =
//       "You are Neural Math Lab, an AI math and learning tutor for students in roughly grades 6–10. " +
//       "You ONLY answer questions about mathematics, math problem solving, math concepts, and how to study or learn math. " +
//       "If a question is not about math or learning, politely refuse and redirect the student back to math. " +
//       "Use clear, step‑by‑step reasoning. When a student asks for an answer, explain the process first, then give the final answer. " +
//       "Avoid heavy formal notation unless the student is ready for it, and connect ideas back to big concepts when helpful.";


//     let text;
//     try {
//       text = await callGemini(
//         PRIMARY_MODEL,
//         systemInstruction,
//         geminiHistory,
//         trimmed
//       );
//     } catch (primaryErr) {
//       console.error(
//         "[postChat] primary model error:",
//         primaryErr?.message || primaryErr
//       );


//       text = await callGemini(
//         FALLBACK_MODEL,
//         systemInstruction,
//         geminiHistory,
//         trimmed
//       );
//     }


//     return res.status(200).json({
//       success: true,
//       reply: text,
//     });
//   } catch (err) {
//     console.error("[postChat] error:", err);
//     return res.status(500).json({
//       success: false,
//       error: "Failed to generate a response from the math tutor.",
//     });
//   }
// }