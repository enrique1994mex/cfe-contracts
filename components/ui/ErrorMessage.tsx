interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}
