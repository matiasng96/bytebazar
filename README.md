# ByteBazar 🛒🤖

*(Scroll down for Spanish version / Bajá para la versión en español)*

ByteBazar is a modern, bilingual, and responsive Full-Stack web application built as a conceptual e-commerce portfolio piece. It features a fully functional AI-powered Virtual Assistant capable of querying a simulated product database, all wrapped in a sleek, premium UI.

## 🚀 Live Demo
[https://bytebazar-ten.vercel.app/](https://bytebazar-ten.vercel.app/)

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Glassmorphism design principles
- **Authentication:** NextAuth.js (Google OAuth Provider)
- **Database:** PostgreSQL (Neon DB) via Prisma ORM
- **Artificial Intelligence:** Vercel AI SDK 6.x & Google Gemini 2.5 Flash
- **Icons & Components:** Lucide-React, React-Markdown

## ✨ Key Features
- **Bilingual System (i18n):** Global language context (English/Spanish) stored in `localStorage` for persistent preferences.
- **AI Virtual Assistant:** An interactive chat powered by Google Gemini that intelligently uses backend "tools" to search the store's inventory.
- **Chat Persistence:** Chat history is saved to PostgreSQL and automatically reloads upon user return.
- **Secure Authentication:** Google Single Sign-On (SSO) with protected chat routes.
- **Custom UI Components:** From animated language toggles to a custom Tailwind-powered chat-clearing confirmation modal.

## 💻 Running Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```env
   AUTH_SECRET="your-next-auth-secret"
   AUTH_GOOGLE_ID="your-google-oauth-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-secret"
   DATABASE_URL="your-neon-postgres-url"
   GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"
   ```
4. Run database migrations: `npx prisma db push`
5. Start the development server: `npm run dev`

---

# ByteBazar 🛒🤖 (Español)

ByteBazar es una aplicación web Full-Stack moderna, bilingüe y responsive, construida como pieza de portfolio e-commerce conceptual. Incluye un Asistente Virtual impulsado por IA completamente funcional, capaz de consultar una base de datos simulada de productos, envuelto en una interfaz gráfica (UI) de aspecto premium.

## 🚀 Demo en Vivo
[https://bytebazar-ten.vercel.app/](https://bytebazar-ten.vercel.app/)

## 🛠️ Tecnologías
- **Framework:** Next.js (App Router, Componentes de Servidor y Cliente)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS, principios de diseño Glassmorphism
- **Autenticación:** NextAuth.js (Google OAuth)
- **Base de Datos:** PostgreSQL (Neon DB) mediante Prisma ORM
- **Inteligencia Artificial:** Vercel AI SDK 6.x y Google Gemini 2.5 Flash
- **Iconos y Componentes:** Lucide-React, React-Markdown

## ✨ Características Principales
- **Sistema Bilingüe (i18n):** Contexto de idioma global (Inglés/Español) guardado en `localStorage` para recordar la preferencia del usuario.
- **Asistente Virtual IA:** Un chat interactivo potenciado por Google Gemini que usa "herramientas" en el backend para buscar en el inventario de la tienda.
- **Persistencia de Chat:** El historial del chat se guarda en PostgreSQL y se recarga automáticamente cuando el usuario regresa.
- **Autenticación Segura:** Inicio de sesión único (SSO) con Google y rutas protegidas.
- **Componentes de UI Personalizados:** Desde selectores de idioma animados hasta un modal de confirmación hecho con Tailwind para borrar el historial.

## 💻 Instalación Local

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` con las siguientes variables:
   ```env
   AUTH_SECRET="tu-secreto-de-next-auth"
   AUTH_GOOGLE_ID="tu-id-de-google-oauth"
   AUTH_GOOGLE_SECRET="tu-secreto-de-google-oauth"
   DATABASE_URL="tu-url-de-neon-postgres"
   GOOGLE_GENERATIVE_AI_API_KEY="tu-api-key-de-gemini"
   ```
4. Sincronizar la base de datos: `npx prisma db push`
5. Iniciar el servidor local: `npm run dev`
