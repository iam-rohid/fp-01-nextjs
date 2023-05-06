import CircularProgress from "@/components/CircularProgress";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden">
      <CircularProgress />
    </div>
  );
}
