import type { BillingResult } from "@/features/billing/types";
import { BillingSeasonBadge } from "./BillingSeasonBadge";

const mxn = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2.5">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}

function Line({
  label,
  value,
  bold,
  green,
}: {
  label: string;
  value: string;
  bold?: boolean;
  green?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center ${bold ? "pt-2 border-t border-gray-200" : ""}`}>
      <span className={`text-sm ${bold ? "font-semibold text-gray-900" : "text-gray-500"}`}>
        {label}
      </span>
      <span className={`text-sm tabular-nums ${bold ? `font-bold ${green ? "text-green-700" : "text-gray-900"}` : "text-gray-700"}`}>
        {value}
      </span>
    </div>
  );
}

interface BillingCardProps {
  result: BillingResult;
}

export function BillingCard({ result }: BillingCardProps) {
  return (
    <div className="space-y-4">
      {/* Period + season */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {result.period.start.slice(0, 10)} → {result.period.end.slice(0, 10)}
          <span className="ml-2 text-gray-300">({result.period.totalDays} días)</span>
        </p>
        <BillingSeasonBadge result={result} />
      </div>

      {/* Consumption metrics */}
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Total kWh" value={result.consumption.total.toFixed(1)} />
        <Metric label="No verano" value={`${result.consumption.nonSummer.toFixed(1)} kWh`} />
        <Metric label="Verano" value={`${result.consumption.summer.toFixed(1)} kWh`} />
      </div>

      {/* Charge summary */}
      <div className="rounded-xl border border-gray-200 px-4 py-3 space-y-2">
        <Line label="Energía eléctrica" value={mxn(result.energiaSubtotal)} />
        <Line label="IVA (16%)" value={mxn(result.iva)} />
        <Line label="Factura del periodo" value={mxn(result.facturaDelPeriodo)} />
        <Line label="DAP estimado" value={mxn(result.dapEstimado)} />
        <Line label="Total estimado" value={mxn(result.totalEstimado)} bold green />
      </div>
    </div>
  );
}
