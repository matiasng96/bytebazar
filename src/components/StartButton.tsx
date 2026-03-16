"use client";

function handleClick(): void {
  console.log("Start Learning clicked");
}

export default function StartButton({ text }: { text: string }) {
  return (
    <button
      onClick={handleClick}
      className="rounded-xl border-2 border-transparent bg-indigo-600 px-3 py-2 text-lg font-medium text-white hover:border-indigo-600 hover:bg-white hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 active:scale-95 disabled:opacity-50"
    >
      {text}
    </button>
  );
}
