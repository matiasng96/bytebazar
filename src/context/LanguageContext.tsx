"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    "home.welcome": "¡Bienvenido a",
    "home.subtitle": "Tu asesor virtual experto en tecnología, listo para ayudarte con tus compras las 24 horas del día.",
    "home.button.chat": "Hablar con un asesor",
    "home.button.google": "Continuar con Google",
    "home.button.logout": "Cerrar sesión",
    "home.greeting": "¡Hola,",
    "chat.welcome": "¡Bienvenido a Bytebazar!",
    "chat.description": "Soy tu asesor virtual. Puedo ayudarte a buscar productos, consultar el stock o resolver cualquier duda sobre tus compras.",
    "chat.sug1": "Mostrame las notebooks disponibles",
    "chat.sug2": "¿Tienen el iPhone 15 en stock?",
    "chat.sug3": "Estoy buscando auriculares",
    "chat.sug4": "¿Cuáles son los métodos de envío?",
    "chat.placeholder": "Escribí tu mensaje...",
    "chat.button.send": "Enviar",
    "chat.button.clear": "Limpiar chat",
    "chat.confirm.title": "Limpiar historial",
    "chat.confirm.clear": "¿Estás seguro que querés borrar toda la conversación? Esta acción no se puede deshacer.",
    "chat.confirm.cancel": "Cancelar",
    "chat.confirm.accept": "Sí, borrar",
    "chat.error": "Error:"
  },
  en: {
    "home.welcome": "Welcome to",
    "home.subtitle": "Your expert virtual tech assistant, ready to help you with your purchases 24/7.",
    "home.button.chat": "Talk to an assistant",
    "home.button.google": "Continue with Google",
    "home.button.logout": "Log out",
    "home.greeting": "Hello,",
    "chat.welcome": "Welcome to Bytebazar!",
    "chat.description": "I am your virtual assistant. I can help you find products, check stock, or answer any questions about your purchases.",
    "chat.sug1": "Show me available laptops",
    "chat.sug2": "Do you have the iPhone 15 in stock?",
    "chat.sug3": "I'm looking for headphones",
    "chat.sug4": "What are the shipping methods?",
    "chat.placeholder": "Type your message...",
    "chat.button.send": "Send",
    "chat.button.clear": "Clear chat",
    "chat.confirm.title": "Clear history",
    "chat.confirm.clear": "Are you sure you want to clear the entire conversation? This action cannot be undone.",
    "chat.confirm.cancel": "Cancel",
    "chat.confirm.accept": "Yes, clear",
    "chat.error": "Error:"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  // Update HTML lang attribute for SEO and Accessibility
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
