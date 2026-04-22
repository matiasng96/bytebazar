import { convertToModelMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";

// Configuración recomendada para Next.js App Router (evita timeouts en producción)
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: "Eres un tutor educativo interactivo y paciente. Tu objetivo es ayudar al usuario a entender los conceptos de programación guiándolo paso a paso. No le des la respuesta final ni el código completo de forma directa; en su lugar, hazle preguntas para que deduzca la solución por sí mismo.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
