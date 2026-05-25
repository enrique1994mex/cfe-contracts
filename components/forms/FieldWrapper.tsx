import { type ReactNode } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FieldWrapper({ label, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      <ErrorMessage message={error} />
    </div>
  );
}
