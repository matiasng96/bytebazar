import Chat from "@/components/Chat";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex h-full w-full flex-col p-4">
      <Chat />
    </div>
  );
}
