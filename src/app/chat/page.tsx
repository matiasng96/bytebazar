"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@ai-sdk/react";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ReactMarkdown from "react-markdown";
import { Bot, Search, Smartphone, Laptop, Trash2 } from "lucide-react";
export default function ChatPage() {
  const { t, language } = useLanguage();

  const { messages, status, error, sendMessage, setMessages } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  const [input, setInput] = useState<string>("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input }, { body: { language } });
    setInput("");
  };

  const confirmClearChat = async () => {
    try {
      await fetch("/api/chat", { method: "DELETE" });
      setMessages([]);
      setShowClearConfirm(false);
    } catch (err) {
      console.error("Error clearing chat:", err);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat");
        const data = await res.json();

        const history = data.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          parts: [{ type: "text", text: m.content }],
        }));

        setMessages(history);
      } catch (err) {
        console.error("Error cargando historial:", err);
      }
    };
    fetchHistory();
  }, [setMessages]);

  return (
    <article className="mx-auto flex h-full w-full max-w-3xl flex-col bg-transparent">
      {/* Área de mensajes con scroll */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg">
              <Bot size={32} />
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-800">
              {t("chat.welcome")}
            </h2>
            <p className="mb-8 max-w-md text-slate-500">
              {t("chat.description")}
            </p>
            <div className="grid w-full max-w-xl grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { icon: <Laptop size={18} />, text: t("chat.sug1") },
                { icon: <Smartphone size={18} />, text: t("chat.sug2") },
                { icon: <Search size={18} />, text: t("chat.sug3") },
                { icon: <Bot size={18} />, text: t("chat.sug4") },
              ].map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage({ text: sug.text }, { body: { language } })}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 hover:shadow-md"
                >
                  <div className="text-brand-500">{sug.icon}</div>
                  <span className="font-medium">{sug.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
                    className={`prose prose-sm max-w-none ${
                      message.role === "assistant"
                        ? "prose-invert text-white marker:text-white"
                        : "text-current"
                    }`}
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
              {t("chat.error")} {error.message}
            </p>
          </div>
        )}
      </div>

      {/* Formulario Flotante */}
      <div className="bg-transparent p-4 pb-6">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 rounded-3xl border border-slate-100 bg-white p-2 shadow-lg shadow-slate-200/50"
        >
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              title={t("chat.button.clear")}
              className="mb-1 ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm transition-all hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          )}
          <TextareaAutosize
            minRows={1}
            maxRows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="text-foreground w-full resize-none bg-transparent px-4 py-3 focus:outline-none"
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
            className="bg-brand-600 hover:bg-brand-500 rounded-2xl px-5 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50"
          >
            {t("chat.button.send")}
          </button>
        </form>
      </div>

      {/* Modal de Confirmación Customizado */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-slate-800">
              {t("chat.confirm.title")}
            </h3>
            <p className="mb-6 text-sm text-slate-500">
              {t("chat.confirm.clear")}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                {t("chat.confirm.cancel")}
              </button>
              <button
                type="button"
                onClick={confirmClearChat}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {t("chat.confirm.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
