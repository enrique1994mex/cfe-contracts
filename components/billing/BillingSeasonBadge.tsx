import type { BillingResult } from "@/features/billing/types";

interface BillingSeasonBadgeProps {
  result: Pick<BillingResult, "isMixed" | "summer" | "nonSummer">;
}

export function BillingSeasonBadge({ result }: BillingSeasonBadgeProps) {
  if (result.isMixed) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Periodo mixto
      </span>
    );
  }

  if (result.summer) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
        Verano
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      No verano
    </span>
  );
}
