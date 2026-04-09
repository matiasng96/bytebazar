"use client";

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
      {/* Área Header del Chat (Opcional, pero queda prolijo) */}
      <header className="sticky top-0 z-10 flex justify-center border-b border-slate-200 bg-white/80 p-4 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-700">
          Conversación Activa
        </h2>
      </header>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="mt-20 text-center text-lg text-slate-500">
              ¡Hola! Soy tu tutor de programación. Escribí tu pregunta abajo
              para empezar.
            </div>
          )}

          {messages.map((m) => (
            <div
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
            </div>
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

      {/* Input de texto (Estilo cajón flotante moderno) */}
      <div className="bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto flex max-w-3xl items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntame sobre React, Node.js..."
            className="w-full rounded-full border border-slate-300 py-4 pr-24 pl-6 text-slate-700 shadow-md transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            disabled={status !== "ready" && status !== "error"}
          />
          <button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="absolute right-2 rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
