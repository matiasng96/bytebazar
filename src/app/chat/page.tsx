"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
export default function ChatPage() {
  const { messages, status, error, sendMessage } = useChat();
  const [input, setInput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    console.log(input, messages);
    setInput("");
  };

  return (
    <article className="mx-auto flex h-full w-full max-w-3xl flex-col bg-transparent">
      {/* Área de mensajes con scroll */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                message.role === "user"
                  ? "bg-chat-user text-chat-user-text rounded-br-sm"
                  : "bg-chat-bot text-chat-bot-text rounded-bl-sm shadow-md"
              }`}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <div
                    className="prose prose-sm max-w-none text-current"
                    key={index}
                  >
                    <ReactMarkdown>{part.text}</ReactMarkdown>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        ))}

        {/* Indicadores de carga (pegados a la izquierda como el bot) */}
        {(status === "submitted" || status === "streaming") && (
          <div className="flex justify-start">
            <div className="bg-chat-bot/10 flex h-8 w-fit items-center space-x-1 rounded-2xl rounded-bl-sm px-4">
              <div className="bg-brand-500 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
              <div className="bg-brand-500 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
              <div className="bg-brand-500 h-2 w-2 animate-bounce rounded-full"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <p className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-500">
              Error: {error.message}
            </p>
          </div>
        )}
      </div>

      {/* Formulario Flotante */}
      <div className="bg-transparent p-4 pb-6">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 bg-white p-2 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100">
          <TextareaAutosize
            minRows={1}
            maxRows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu mensaje..."
            className="w-full resize-none bg-transparent px-4 py-3 text-foreground focus:outline-none"
            onKeyDown={(e) => {
              // Enviar con Enter (sin Shift)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-brand-600 hover:bg-brand-500 rounded-2xl px-5 py-3 font-medium text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </article>
  );
}
