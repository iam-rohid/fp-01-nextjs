import { forwardRef } from "react";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  loading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading,
      disabled,
      variant = "primary",
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        disabled={loading || disabled}
        className={clsx(
          "flex items-center justify-center rounded-lg px-4 py-2.5 text-center font-medium",
          {
            "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-500/80 disabled:text-white/80":
              variant === "primary",
            "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 disabled:bg-slate-100 disabled:text-slate-400":
              variant === "secondary",
          },
          {
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
        ref={ref}
      >
        {loading ? <p>Loading...</p> : children}
      </button>
    );
  }
);

export default Button;

Button.displayName = "Button";
