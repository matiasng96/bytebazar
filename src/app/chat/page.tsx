"use client";
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
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}
