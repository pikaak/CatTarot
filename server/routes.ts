import type { Express } from "express";
import { createServer, type Server } from "http";
import { tarotReadingRequestSchema } from "@shared/schema";
import { generateTarotReading } from "./lib/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/tarot/reading", async (req, res) => {
    try {
      const validatedData = tarotReadingRequestSchema.parse(req.body);
      
      const reading = await generateTarotReading(
        validatedData.question,
        validatedData.cards
      );

      res.json({ reading });
    } catch (error) {
      console.error("Error in /api/tarot/reading:", error);
      
      if (error instanceof Error && error.message.includes("parse")) {
        res.status(400).json({ error: "Invalid request data" });
      } else {
        res.status(500).json({ error: "Failed to generate reading" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
