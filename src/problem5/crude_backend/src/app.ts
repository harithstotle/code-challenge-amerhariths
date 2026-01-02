import express from "express";
import clientRoutes from "./routes/client.routes";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/clients", clientRoutes);

export default app;
