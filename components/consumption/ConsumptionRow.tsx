"use client";

import { useState } from "react";
import type { ConsumptionRecord } from "@/features/consumption/types";
import { useDeleteConsumptionRecord } from "@/features/consumption/hooks";
import { ConsumptionForm } from "./ConsumptionForm";
import { BillingModal } from "@/components/billing/BillingModal";

function fmtDate(iso: string): string {
  // Avoids timezone shift: parse YYYY-MM-DD directly
  const [year, month, day] = iso.slice(0, 10).split("-");
  return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface ConsumptionRowProps {
  record: ConsumptionRecord;
  contractId: number;
}

export function ConsumptionRow({ record, contractId }: ConsumptionRowProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: deleteRecord, isPending: isDeleting } =
    useDeleteConsumptionRecord(contractId);

  const total = record.kwhNonSummer + record.kwhSummer;

  if (confirmDelete) {
    return (
      <tr className="bg-red-50">
        <td colSpan={4} className="px-4 py-3 text-sm text-red-700">
          ¿Eliminar el periodo{" "}
          <span className="font-medium">{fmtDate(record.periodStart)}</span>
          {" → "}
          <span className="font-medium">{fmtDate(record.periodEnd)}</span>?
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() =>
                deleteRecord(record.id, { onSuccess: () => setConfirmDelete(false) })
              }
              disabled={isDeleting}
              className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Eliminando…" : "Confirmar"}
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm text-gray-900">
          <span className="font-medium">{fmtDate(record.periodStart)}</span>
          <span className="text-gray-300 mx-1.5">→</span>
          <span className="text-gray-500">{fmtDate(record.periodEnd)}</span>
        </td>
        <td className="px-4 py-3 text-right text-sm text-gray-600 tabular-nums">
          {record.kwhNonSummer.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-right text-sm text-gray-600 tabular-nums">
          {record.kwhSummer.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 tabular-nums">
          {total.toFixed(1)}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setShowEdit(true)}
              className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Eliminar
            </button>
            <button
              onClick={() => setShowBilling(true)}
              className="text-xs font-medium text-green-700 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50 transition-colors"
            >
              Simular →
            </button>
          </div>
        </td>
      </tr>

      <ConsumptionForm
        open={showEdit}
        onClose={() => setShowEdit(false)}
        contractId={contractId}
        record={record}
      />
      <BillingModal
        open={showBilling}
        onClose={() => setShowBilling(false)}
        contractId={contractId}
        recordId={record.id}
      />
    </>
  );
}
