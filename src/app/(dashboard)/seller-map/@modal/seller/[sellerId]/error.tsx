"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error.message === "NEXT_NOT_FOUND") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <p className="mb-2 text-4xl font-bold text-slate-400">404</p>
        <h1 className="text-center text-slate-400">Seller not Found!</h1>
      </div>
    );
  }
  return <div>Error: {error.message}</div>;
}
