// Change to NestJS framework for better scalability and maintainability in the future.
// [!!!ABORT, ABORT!!!] NestJS is not for the weak. I will stick to my express.js

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import catalogRoutes from "../src/routes/catalog.routes";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/v1", catalogRoutes);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "COMMERCE backend",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`E-COMMERCE SERVICE is running on http://localhost:${PORT}`);
});
