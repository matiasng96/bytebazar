"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
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
            <div className="mt-20 text-center text-lg text-slate-500">
              ¡Hola! Soy tu tutor de programación. Escribí tu pregunta abajo
              para empezar.
            </div>
          )}

          {messages.map((m) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 text-base shadow-sm sm:max-w-[75%] ${
                  m.role === "user"
                    ? "rounded-3xl rounded-tr-sm bg-indigo-600 text-white"
                    : "rounded-3xl rounded-tl-sm border border-slate-200 bg-slate-100 text-slate-800"
                }`}
              >
                {m.parts.map((part, partIndex) =>
                  part.type === "text" ? (
                    <p
                      key={partIndex}
                      className="leading-relaxed whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
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
            placeholder="Preguntame sobre React, Node.js..."
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
