"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function ChatPage() {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    console.log(input, messages);
    setInput("");
  };

  return (
    <article className="bg-brand-500 flex flex-col justify-center gap-4 rounded-2xl">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <p key={message.id}>
            <strong>{message.role}:</strong>
            {message.parts.map((part, index) =>
              part.type === "text" ? <span key={index}></span> : null,
            )}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
          minRows={1}
          maxRows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu mensaje..."
          className="border-surface-border bg-surface text-foreground focus:ring-brand-500 w-full resize-none rounded-xl border p-3 focus:ring-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </article>
  );
}
