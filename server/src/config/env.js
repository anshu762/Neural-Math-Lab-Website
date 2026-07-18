import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL || "",
  openrouterApiKey: (process.env.OPENROUTER_API_KEY || "").trim(),
  openrouterAppUrl: (process.env.OPENROUTER_APP_URL || "http://localhost:8080").trim(),
  openrouterAppName: (process.env.OPENROUTER_APP_NAME || "Neural Math Lab").trim(),
};












// import dotenv from 'dotenv';

// dotenv.config();

// export const env = {
//   port: Number(process.env.PORT || 8080),
//   nodeEnv: process.env.NODE_ENV || 'development',
//   clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
//   databaseUrl: process.env.DATABASE_URL || '',
// //   openAiApiKey: process.env.OPENAI_API_KEY || ''
//  geminiApiKey: process.env.GOOGLE_AI_API_KEY,
//  openrouterApiKey: process.env.OPENROUTER_API_KEY,
// openrouterAppUrl: process.env.OPENROUTER_APP_URL,
// openrouterAppName: process.env.OPENROUTER_APP_NAME,
// };