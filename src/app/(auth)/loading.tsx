import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="mx-auto my-16 w-fit">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
