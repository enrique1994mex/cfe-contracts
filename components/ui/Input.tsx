import { forwardRef, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-50 disabled:text-gray-500"
          {...props}
        />
        <ErrorMessage message={error} />
      </div>
    );
  }
);

Input.displayName = "Input";
