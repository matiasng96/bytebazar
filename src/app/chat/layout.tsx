import Link from "next/link";

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
  return (
    <div className="flex min-h-screen text-center">
      <nav className="w-64 bg-indigo-400 pb-4 text-2xl font-medium text-white">
        <header className="fle bg-indigo-600 py-4">
          <h1>AI Tutor App</h1>
        </header>
        {conversations?.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/chat/${conversation.id}`}
            className="block px-4 py-2 hover:bg-indigo-500"
          >
            {conversation.title}
          </Link>
        ))}
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        {children}
      </main>
    </div>
  );
}
