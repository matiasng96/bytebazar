"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageSquare, Bot } from "lucide-react";

const conversations = [
  { id: "1", title: "What is React?" },
  { id: "2", title: "Next.js App Router" },
  { id: "3", title: "TypeScript basics" },
];

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-transparent">
      {/* Sidebar con animación de entrada/salida y paleta de colores premium */}
      <nav
        className={`${
          isSidebarOpen ? "w-full md:w-72 translate-x-0" : "w-full md:w-0 -translate-x-full"
        } absolute md:relative inset-y-0 left-0 z-50 md:z-20 shrink-0 transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl overflow-hidden`}
      >
        <div className="flex items-center justify-between p-5 bg-slate-950/50 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-semibold text-slate-100 truncate tracking-tight">AI Tutor</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 w-full md:w-72 overflow-y-auto py-6">
          <p className="px-5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Conversaciones
          </p>
          <div className="space-y-1 px-3">
            {conversations.map((c) => (
              <Link
                key={c.id}
                href={`/chat/${c.id}`}
                className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-indigo-300 transition-all group"
              >
                <MessageSquare size={18} className="mr-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span className="truncate text-sm font-medium">{c.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full h-full min-w-0 bg-transparent">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 p-2.5 text-slate-600 hover:bg-white/80 rounded-xl transition-all shadow-sm bg-white/50 backdrop-blur-md border border-slate-200/50"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
