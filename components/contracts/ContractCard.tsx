"use client";

import { useState } from "react";
import Link from "next/link";
import type { Contract } from "@/features/contracts/types";
import { Badge } from "@/components/ui/Badge";
import { ContractForm } from "./ContractForm";
import { DeleteContractDialog } from "./DeleteContractDialog";

const TARIFF_VARIANT: Record<string, "gray" | "green" | "blue" | "yellow" | "red"> = {
  "1": "gray",
  "1A": "green",
  "1B": "green",
  "1C": "yellow",
  "1D": "yellow",
  "1E": "red",
  "1F": "red",
};

export function ContractCard({ contract }: { contract: Contract }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:border-green-200 hover:shadow-sm transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate leading-tight">
              {contract.contractName}
            </p>
            {contract.city && (
              <p className="text-xs text-gray-400 mt-0.5">{contract.city}</p>
            )}
          </div>
          <Badge variant={TARIFF_VARIANT[contract.tariff.type] ?? "gray"}>
            T-{contract.tariff.type}
          </Badge>
        </div>

        {/* Meter number */}
        <p className="text-xs text-gray-400 font-mono -mt-2">
          Servicio: {contract.meterNumber}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1 border-t border-gray-100 pt-3 -mx-1">
          <Link
            href={`/dashboard/contracts/${contract.id}`}
            className="flex-1 text-center text-xs font-medium text-green-700 hover:text-green-800 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
          >
            Ver consumos →
          </Link>
          <button
            onClick={() => setShowEdit(true)}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 py-1.5 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="text-xs font-medium text-red-400 hover:text-red-600 py-1.5 px-3 rounded-lg hover:bg-red-50 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>

      <ContractForm
        open={showEdit}
        onClose={() => setShowEdit(false)}
        contract={contract}
      />
      <DeleteContractDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        contract={contract}
      />
    </>
  );
}
