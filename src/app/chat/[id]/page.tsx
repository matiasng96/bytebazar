export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <p className="text-lime-500">Chat Page: {id}</p>;
}
