import CircularProgress from "@/components/CircularProgress";
import React from "react";

export default function Loading() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <CircularProgress />
    </section>
  );
}
