import CircularProgress from "@/components/CircularProgress";
import React from "react";

export default function Loading() {
  return (
    <section className="flex h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden">
      <CircularProgress />
    </section>
  );
}