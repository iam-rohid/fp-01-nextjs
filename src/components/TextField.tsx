import React, { forwardRef } from "react";
import clsx from "clsx";

export type TextFieldProps = {
  label?: string;
  error?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={className}>
        {!!label && (
          <label
            htmlFor={props.id}
            className="mb-1 inline-block text-slate-600"
          >
            {label}
          </label>
        )}
        <input
          className={clsx(
            "w-full rounded-lg border bg-slate-50 px-4 py-2.5",
            error ? "border-red-400" : "border-slate-200 hover:border-slate-300"
          )}
          {...props}
          ref={ref}
        />
        {!!error && (
          <p className="mt-1 inline-block text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

export default TextField;

TextField.displayName = "TextField";
