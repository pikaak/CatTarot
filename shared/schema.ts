import { z } from "zod";

export const tarotReadingRequestSchema = z.object({
  question: z.string().min(1, "Question is required"),
  cards: z.array(
    z.object({
      name: z.string(),
      keywords: z.array(z.string()),
    })
  ).length(3, "Exactly 3 cards must be selected"),
});

export type TarotReadingRequest = z.infer<typeof tarotReadingRequestSchema>;

export const tarotReadingResponseSchema = z.object({
  reading: z.string(),
});

export type TarotReadingResponse = z.infer<typeof tarotReadingResponseSchema>;
