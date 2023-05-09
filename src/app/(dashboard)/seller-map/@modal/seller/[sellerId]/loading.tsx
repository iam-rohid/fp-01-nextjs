import CircularProgress from "@/components/CircularProgress";
import React from "react";

export default function Loading() {
  return (
    <div className="absolute bottom-0 right-0 top-0 z-10 flex w-[512px] max-w-[100vw] flex-col items-center justify-center overflow-hidden border-l border-slate-200 bg-white">
      <CircularProgress />
    </div>
  );
}
