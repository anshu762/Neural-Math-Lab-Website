import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

const allowedOrigins = new Set([
  (env.clientUrl || "").replace(/\/$/, ""),
  "http://localhost:5173",
  "https://neural-math-lab-website-production.up.railway.app",
]);

console.log("[CORS] allowed origins:", [...allowedOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = (origin || "").replace(/\/$/, "");
      if (!origin || allowedOrigins.has(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Neural Math Lab API",
    version: "0.0.1",
  });
});

app.use("/api", healthRoutes);
app.use("/api", chatRoutes);

export default app;




















// // app.js
// import cors from "cors";
// import express from "express";
// import { env } from "./config/env.js";
// import healthRoutes from "./routes/health.routes.js";
// import chatRoutes from "./routes/chat.routes.js";

// const app = express();

// app.use(
//   cors({
//     origin: env.clientUrl,
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.get("/", (_req, res) => {
//   res.json({
//     name: "Neural Math Lab API",
//     version: "0.0.1",
//   });
// });

// app.use("/api", healthRoutes);
// app.use("/api", chatRoutes); // <-- new

// export default app;