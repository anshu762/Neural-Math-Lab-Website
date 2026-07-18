// src/components/chat/AiChatWidget.jsx
import { useState } from "react";
import { BotMessageSquare, Send, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I’m your Neural Math Lab tutor. Ask me about math problems, concepts, or how to study math. I only answer math and learning questions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setError("");

    const newUserMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const historyForApi = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errMsg =
          data?.error ||
          "The math tutor could not answer right now. Please try again.";
        setError(errMsg);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-error-${Date.now()}`,
            role: "assistant",
            content:
              "I’m having trouble answering right now. Please check your question is about math or learning, then try again.",
          },
        ]);
      } else {
        const r = data.reply || {};
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: r.finalAnswer || "",
            steps: Array.isArray(r.steps) ? r.steps : [],
            finalAnswer: r.finalAnswer || "",
            concept: r.concept || "",
          },
        ]);
      }
    } catch (err) {
      console.error("chat error", err);
      setError("Network error while talking to the math tutor.");
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            "I couldn’t reach the math tutor service. Please check your connection and try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Open math tutor chat"
      >
        <BotMessageSquare className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-[320px] max-w-[90vw] sm:w-[360px]">
          <Card className="border-border/80 bg-background/95 shadow-2xl shadow-teal-500/20 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="space-y-1 pr-4">
                <CardTitle className="text-sm font-semibold">
                  Neural Math Lab tutor
                </CardTitle>
                <CardDescription className="text-[11px]">
                  Ask for help with math problems, concepts, or how to learn
                  math more effectively.
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:bg-muted"
                aria-label="Close chat"
              >
                <X className="h-3 w-3" />
              </button>
            </CardHeader>

            <CardContent className="space-y-2 pb-3">
              <ScrollArea className="h-60 w-full rounded-md border border-border/60 bg-muted/30 p-2">
                <div className="flex flex-col gap-2 text-[13px]">
                  {messages.map((m) => (
                    <ChatBubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      steps={m.steps}
                      finalAnswer={m.finalAnswer}
                      concept={m.concept}
                    />
                  ))}
                  {sending && (
                    <div className="self-start rounded-2xl bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
                      Thinking…
                    </div>
                  )}
                </div>
              </ScrollArea>

              {error && <p className="text-[11px] text-destructive">{error}</p>}

              <div className="flex items-end gap-2 pt-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a math or learning question…"
                  className="min-h-[44px] max-h-[96px] resize-none text-[13px]"
                />
                <Button
                  size="icon"
                  className="mb-1 h-9 w-9 rounded-full"
                  onClick={handleSend}
                  disabled={sending || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground">
                The tutor only answers math and education questions. It may make
                mistakes, so double‑check important work.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

function ChatBubble({ role, content, steps, finalAnswer, concept }) {
  const isUser = role === "user";

  const base =
    "max-w-[85%] rounded-2xl px-3 py-1.5 text-[13px] leading-relaxed";
  const bubbleClass = isUser
    ? `${base} bg-gradient-to-r from-teal-500 to-blue-500 text-white`
    : `${base} bg-background text-foreground border border-border/70 prose prose-sm`;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={bubbleClass}>
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : steps && steps.length ? (
          <>
            {concept && (
              <p className="font-semibold mb-1">
                Topic:{" "}
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {concept}
                </ReactMarkdown>
              </p>
            )}

            <ol className="list-decimal list-inside space-y-1 mb-2">
              {steps.map((s, idx) => (
                <li key={idx}>
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {s}
                  </ReactMarkdown>
                </li>
              ))}
            </ol>

            {finalAnswer && (
              <div className="mt-1 border-t border-border/40 pt-1">
                <span className="font-semibold">Final answer: </span>
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {finalAnswer}
                </ReactMarkdown>
              </div>
            )}
          </>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}






















// // src/components/chat/AiChatWidget.jsx
// import { useState } from "react";
// import { BotMessageSquare, Globe2, Send, X } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import ReactMarkdown from "react-markdown";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
// import "katex/dist/katex.min.css";



// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


// export function AiChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: "welcome",
//       role: "assistant",
//       content:
//         "Hi! I’m your Neural Math Lab tutor. Ask me about math problems, concepts, or how to study math. I only answer math and learning questions.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState("");


//   const handleSend = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || sending) return;


//     setError("");
//     const newUserMsg = {
//       id: `user-${Date.now()}`,
//       role: "user",
//       content: trimmed,
//     };


//     const historyForApi = messages
//       .filter((m) => m.role === "user" || m.role === "assistant")
//       .map((m) => ({ role: m.role, content: m.content }));


//     setMessages((prev) => [...prev, newUserMsg]);
//     setInput("");
//     setSending(true);


//     try {
//       const res = await fetch(`${apiBaseUrl}/api/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: trimmed,
//           history: historyForApi,
//         }),
//       });


//       const data = await res.json();


//       if (!res.ok || !data.success) {
//         const errMsg =
//           data?.error ||
//           "The math tutor could not answer right now. Please try again.";
//         setError(errMsg);
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `assistant-error-${Date.now()}`,
//             role: "assistant",
//             content:
//               "I’m having trouble answering right now. Please check your question is about math or learning, then try again.",
//           },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `assistant-${Date.now()}`,
//             role: "assistant",
//             content: data.reply,
//           },
//         ]);
//       }
//     } catch (err) {
//       console.error("chat error", err);
//       setError("Network error while talking to the math tutor.");
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `assistant-error-${Date.now()}`,
//           role: "assistant",
//           content:
//             "I couldn’t reach the math tutor service. Please check your connection and try again.",
//         },
//       ]);
//     } finally {
//       setSending(false);
//     }
//   };


//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };


//   return (
//     <>
//       {/* Floating globe button */}
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-background"
//         aria-label="Open math tutor chat"
//       >
//         <BotMessageSquare className="h-5 w-5" />
//       </button>


//       {/* Chat panel */}
//       {open && (
//         <div className="fixed bottom-20 right-5 z-40 w-[320px] max-w-[90vw] sm:w-[360px]">
//           <Card className="border-border/80 bg-background/95 shadow-2xl shadow-teal-500/20 backdrop-blur-xl">
//             <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
//               <div className="space-y-1 pr-4">
//                 <CardTitle className="text-sm font-semibold">
//                   Neural Math Lab tutor
//                 </CardTitle>
//                 <CardDescription className="text-[11px]">
//                   Ask for help with math problems, concepts, or how to learn math
//                   more effectively.
//                 </CardDescription>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="flex h-6 w-6 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:bg-muted"
//                 aria-label="Close chat"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </CardHeader>


//             <CardContent className="space-y-2 pb-3">
//               <ScrollArea className="h-60 w-full rounded-md border border-border/60 bg-muted/30 p-2">
//                 <div className="flex flex-col gap-2 text-[13px]">
//                   {messages.map((m) => (
//                     <ChatBubble key={m.id} role={m.role} content={m.content} />
//                   ))}
//                   {sending && (
//                     <div className="self-start rounded-2xl bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
//                       Thinking…
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>


//               {error && (
//                 <p className="text-[11px] text-destructive">{error}</p>
//               )}


//               <div className="flex items-end gap-2 pt-1">
//                 <Textarea
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Ask a math or learning question…"
//                   className="min-h-[44px] max-h-[96px] resize-none text-[13px]"
//                 />
//                 <Button
//                   size="icon"
//                   className="mb-1 h-9 w-9 rounded-full"
//                   onClick={handleSend}
//                   disabled={sending || !input.trim()}
//                   aria-label="Send message"
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//               <p className="text-[10px] text-muted-foreground">
//                 The tutor only answers math and education questions. It may make
//                 mistakes, so double‑check important work.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }


// function ChatBubble({ role, content }) {
//   const isUser = role === "user";
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-[13px] leading-relaxed prose prose-sm ${
//         isUser ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white" : "bg-background text-foreground border border-border/70"
//       }`}>
//         {isUser ? content : (
//           <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
//             {content}
//           </ReactMarkdown>
//         )}
//       </div>
//     </div>
//   );
// }