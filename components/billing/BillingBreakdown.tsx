import type { BillingSection } from "@/features/billing/types";

const MONTHS = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const mxn = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });

const mxn4 = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 4, maximumFractionDigits: 4 });

interface SectionTableProps {
  section: BillingSection;
  label: "No verano" | "Verano";
}

function SectionTable({ section, label }: SectionTableProps) {
  const isVer = label === "Verano";
  const accent = isVer
    ? "bg-orange-50 text-orange-800"
    : "bg-blue-50 text-blue-800";
  const border = isVer ? "border-orange-200" : "border-blue-200";

  return (
    <div className={`rounded-xl border ${border} overflow-hidden`}>
      {/* Section header */}
      <div className={`flex items-center justify-between px-4 py-2 text-xs font-medium ${accent}`}>
        <span>
          {label} — {MONTHS[section.rateMonth.month]} {section.rateMonth.year}
        </span>
        <span>
          {section.days} días · {section.kwhConsumed.toFixed(1)} kWh
        </span>
      </div>

      {/* Blocks table */}
      <table className="w-full text-xs">
        <thead className="bg-gray-50 border-y border-gray-100">
          <tr>
            <th className="text-left px-4 py-2 font-medium text-gray-500">Bloque</th>
            <th className="text-right px-3 py-2 font-medium text-gray-500">Límite</th>
            <th className="text-right px-3 py-2 font-medium text-gray-500">kWh</th>
            <th className="text-right px-3 py-2 font-medium text-gray-500">$/kWh</th>
            <th className="text-right px-4 py-2 font-medium text-gray-500">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {section.blocks.map((block) => (
            <tr key={block.blockOrder}>
              <td className="px-4 py-2 text-gray-700">{block.blockName}</td>
              <td className="px-3 py-2 text-right text-gray-400">
                {block.kwhLimit != null ? `${block.kwhLimit} kWh` : "—"}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-gray-900 font-medium">
                {block.kwhConsumed.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-gray-500">
                {mxn4(block.pricePerKwh)}
              </td>
              <td className="px-4 py-2 text-right tabular-nums text-gray-900 font-medium">
                {mxn(block.subtotal)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-gray-200 bg-gray-50">
          <tr>
            <td colSpan={4} className="px-4 py-2 text-right text-xs font-medium text-gray-600">
              Subtotal {label.toLowerCase()}
            </td>
            <td className="px-4 py-2 text-right text-sm font-semibold text-gray-900 tabular-nums">
              {mxn(section.subtotal)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

interface BillingBreakdownProps {
  nonSummer: BillingSection | null;
  summer: BillingSection | null;
}

export function BillingBreakdown({ nonSummer, summer }: BillingBreakdownProps) {
  return (
    <div className="space-y-3">
      {nonSummer && <SectionTable section={nonSummer} label="No verano" />}
      {summer && <SectionTable section={summer} label="Verano" />}
    </div>
  );
}
