import { prisma } from "@/lib/prisma";
import { convertToModelMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@/auth";
import { tool, stepCountIs } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    const userDb = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!userDb) {
      return new Response("User not found in DB", { status: 404 });
    }

    let chat = await prisma.chat.findFirst({
      where: { userId: userDb.id as string },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId: userDb.id as string },
      });
    }

    // Asegurarnos de que el texto del mensaje se guarde (puede venir como 'content' o como 'parts')
    if (lastMessage.role === "user") {
      const messageText =
        lastMessage.content ||
        (lastMessage.parts && lastMessage.parts[0]?.text) ||
        "";

      await prisma.message.create({
        data: {
          chatId: chat.id,
          role: "user",
          content: messageText,
        },
      });
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: await convertToModelMessages(messages),
      system: `
      Sos el asistente virtual experto en ventas y soporte de una tienda de tecnología líder en LATAM.
      Tu objetivo principal es ayudar al usuario a encontrar productos, resolver dudas y guiarlo hacia la compra.
      
      Detalles de la tienda:
      - Nombre: Bytebazar
      - Email de soporte: atencion@bytebazar.com
      - Envíos: A toda LATAM, gratis en compras mayores a $50 USD.

      REGLAS ESTRICTAS:
      1. Tono y Personalidad: Amable, resolutivo, proactivo y conciso (no te excedas con respuestas muy largas).
      2. Límite de conocimiento: Si el usuario pregunta cosas que NO tienen que ver con tecnología, compras o la tienda (ej: política, recetas de cocina, otros), pedí disculpas elegantemente y explicale que solo podés ayudar con temas de la tienda.
      3. Inventario: NUNCA inventes precios, promociones o stock. Si no estás seguro, pedile al usuario que consulte en la web.
      4. Formato: Usá emojis estratégicamente para hacer el chat dinámico. Usá Markdown (negritas, viñetas) para destacar nombres de productos.
      `,
      stopWhen: stepCountIs(5),
      tools: {
        consultar_inventario: tool({
          description:
            "Busca productos en el catálogo de Bytebazar basándose en una categoría.",
          parameters: z.object({
            categoria: z
              .string()
              .describe(
                "El tipo de producto que busca el usuario (ej: 'notebook', 'celular')",
              ),
          }),
          // @ts-expect-error: Vercel AI SDK Zod inference mismatch
          execute: async ({ categoria }) => {
            try {
              console.log("TOOL EJECUTANDOSE CON CATEGORIA:", categoria);
              // Acá simulamos una búsqueda rápida en una base de datos real
              const catalogo = [
                { nombre: "MacBook Pro M3", categoria: "notebook", precio: 1500, stock: true },
                { nombre: "Lenovo ThinkPad T14", categoria: "notebook", precio: 1200, stock: true },
                { nombre: "iPhone 15", categoria: "celular", precio: 900, stock: false },
              ];

              // Filtramos por coincidencia parcial en nombre o categoría
              const query = (categoria || "").toLowerCase();
              const result = catalogo.filter(
                (p) =>
                  p.categoria.toLowerCase().includes(query) ||
                  p.nombre.toLowerCase().includes(query),
              );
              console.log("RESULTADO TOOL:", result);
              return result;
            } catch (err) {
              console.error("ERROR EN TOOL:", err);
              return { error: "Hubo un error en la base de datos" };
            }
          },
        }),
      },
      onFinish: async ({ text }) => {
        await prisma.message.create({
          data: {
            chatId: chat.id,
            role: "assistant",
            content: text,
          },
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("DEBUG ERROR:", error);
    return new Response(error.message || "Error desconocido", { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const userDb = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!userDb) return new Response("User not found", { status: 404 });

  const chat = await prisma.chat.findFirst({
    where: { userId: userDb.id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  // Si tiene chat, le devolvemos el array de mensajes en formato JSON. Si no, un array vacío.
  return Response.json(chat?.messages || []);
}
