# 🤖 ByteBazar AI Shopping Assistant

ByteBazar es una aplicación Full-Stack de E-commerce impulsada por Inteligencia Artificial. Funciona como un asistente virtual inteligente capaz de consultar inventario en tiempo real, recordar conversaciones pasadas y asistir al usuario de forma segura y personalizada.

## 🚀 Arquitectura y Tecnologías (Tech Stack)

Este proyecto fue construido utilizando los estándares más modernos de la industria:

- **Framework Core:** Next.js (App Router) & React.
- **Inteligencia Artificial:** Vercel AI SDK (Core & UI) + Google Gemini (`gemini-2.5-flash`).
- **Agentic AI:** Implementación de **Tool Calling** (Server-Side Multi-Step) para consultas precisas de inventario, eliminando alucinaciones del LLM.
- **Autenticación:** Auth.js / NextAuth v5 (Google OAuth Provider).
- **Base de Datos & ORM:** SQLite + Prisma ORM (Persistencia total de usuarios, sesiones y mensajes).
- **Styling:** Tailwind CSS + UI moderna (Glassmorphism, Tailwind Typography para parseo seguro de Markdown).

## ✨ Features Principales

1.  **Protección de Rutas & Auth:** El chat está protegido mediante Server Components. Solo usuarios validados pueden interactuar con el endpoint de IA, optimizando costos de API.
2.  **Memoria a Largo Plazo:** Los historiales de chat persisten en la base de datos relacional y se cargan automáticamente al iniciar sesión.
3.  **Llamadas a Herramientas (Tool Calling):** La IA tiene la autonomía de detener su generación de texto, consultar un catálogo de productos estructurado y responder con información verídica de precios y stock.

## 🛠️ Cómo correr el proyecto localmente

1. Clonar el repositorio: `git clone https://github.com/tu-usuario/ecommerce-ai-assistant.git`
2. Instalar dependencias: `npm install`
3. Configurar las variables de entorno en un archivo `.env.local`:
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
4. Generar y migrar la base de datos: `npx prisma db push`
5. Levantar el servidor: `npm run dev`
