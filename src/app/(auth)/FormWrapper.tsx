import { ReactNode } from "react";
import clsx from "clsx";

export default function FormWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-200 bg-white p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
