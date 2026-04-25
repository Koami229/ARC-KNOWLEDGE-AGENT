import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import askRoute from "./server/routes/ask.ts";
import transactionsRoute from "./server/routes/transactions.ts";
import { sendPayment } from "./server/services/circleSimulator.ts";

const questions = [
  "Quel temps fait-il à Abidjan ?",
  "Météo pour Paris",
  "Temps actuel à Tokyo",
  "Taux USD/EUR",
  "Change EUR/GBP",
  "Dernières nouvelles tech",
  "Actualités IA",
  "Quel temps fait-il à Berlin ?",
  "Taux EUR/USD",
  "Dernières infos fintech",
  "Météo Singapour",
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api", askRoute);
  app.use("/api", transactionsRoute);

  app.post("/api/generate-demo", async (req, res) => {
    try {
      for (const q of questions) {
        const cost = 0.001 + Math.random() * 0.002;
        await sendPayment(cost, "DemoAPI", `Auto-generated for "${q}"`);
        await new Promise(r => setTimeout(r, 100)); // Small pause
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Health check
  app.get("/api/health", (_, res) => res.json({ status: "ok" }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

startServer();
