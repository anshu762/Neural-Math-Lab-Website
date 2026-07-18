// app.js
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Neural Math Lab API",
    version: "0.0.1",
  });
});

app.use("/api", healthRoutes);
app.use("/api", chatRoutes); // <-- new

export default app;