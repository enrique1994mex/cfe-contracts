import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gray" | "green" | "yellow" | "red" | "blue";
}

const variants = {
  gray:   "bg-gray-100 text-gray-700",
  green:  "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red:    "bg-red-100 text-red-700",
  blue:   "bg-blue-100 text-blue-700",
};

export function Badge({ children, variant = "gray" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
