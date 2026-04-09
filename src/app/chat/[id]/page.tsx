import Chat from "@/components/Chat";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex h-full flex-col">
      <h1 className="p-4 text-xl font-semibold">Conversación {id}</h1>
      <Chat />
    </div>
  );
}
