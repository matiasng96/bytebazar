"use client";
import { motion } from "framer-motion";
import { Send, Bot, Sparkles, Code, Terminal } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-full flex-col">
      {/* Área de Mensajes */}
      <div className="w-full flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-20 flex flex-col items-center justify-center px-4 text-center"
            >
              {/* Ícono Principal con destello */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-indigo-500/20 blur-xl"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/30">
                  <Bot size={40} />
                </div>
              </div>

              <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-800">
                ¿Qué vamos a codear hoy?
              </h2>
              <p className="mb-8 max-w-sm text-slate-500">
                Soy tu tutor experto en React, Next.js y TypeScript. Elegí una
                sugerencia o haceme cualquier pregunta.
              </p>

              {/* Botones de sugerencias rápidas */}
              <div className="grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  {
                    icon: <Code size={18} />,
                    text: "Explicame qué son los React Hooks",
                  },
                  {
                    icon: <Terminal size={18} />,
                    text: "¿Cómo funciona el App Router en Next.js?",
                  },
                  {
                    icon: <Sparkles size={18} />,
                    text: "Hacé una analogía para entender TypeScript",
                  },
                  {
                    icon: <Bot size={18} />,
                    text: "Revisá y optimizá mi código",
                  },
                ].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sendMessage({ text: sug.text });
                      setInput("");
                    }}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md"
                  >
                    <div className="text-indigo-500">{sug.icon}</div>
                    <span className="font-medium">{sug.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((m, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 text-base shadow-sm sm:max-w-[75%] ${m.role === "user"
                  ? `rounded-3xl rounded-tr-sm bg-linear-to-tr from-indigo-600 to-violet-500 text-white shadow-indigo-500/20 ${error && index === messages.length - 1 ? "opacity-50" : ""}`
                  : "rounded-3xl rounded-tl-sm border border-slate-200 bg-slate-100 text-slate-800"
                  }`}
              >
                {m.parts.map((part, partIndex) =>
                  part.type === "text" ? (
                    m.role === "user" ? (
                      <p
                        key={partIndex}
                        className="leading-relaxed whitespace-pre-wrap"
                      >
                        {part.text}
                      </p>
                    ) : (
                      <div
                        key={partIndex}
                        className="prose prose-slate max-w-none text-slate-800"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    )
                  ) : null,
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="animate-pulse rounded-3xl rounded-tl-sm border border-slate-200 bg-slate-100 px-5 py-3 text-slate-500">
                Escribiendo...
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input de texto (Estilo píldora flotante moderna) */}
      <div className="pointer-events-none sticky bottom-0 bg-linear-to-t from-slate-100 via-slate-100/90 to-transparent p-4 pb-8">
        <form
          onSubmit={handleSubmit}
          className="pointer-events-auto relative mx-auto flex max-w-3xl items-center rounded-full border border-white bg-white/70 shadow-lg backdrop-blur-xl transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-300"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntame..."
            className="w-full rounded-full bg-transparent py-4 pr-16 pl-6 text-slate-700 outline-none"
            disabled={status !== "ready" && status !== "error"}
          />
          <button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="absolute right-2.5 flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white shadow-sm transition-all hover:scale-105 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-indigo-600"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
