"use client";

import { useState } from "react";
import Link from "next/link";
import { useConsumptionRecords } from "@/features/consumption/hooks";
import { useContracts } from "@/features/contracts/hooks";
import { ConsumptionRow } from "./ConsumptionRow";
import { ConsumptionForm } from "./ConsumptionForm";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";

interface ConsumptionListProps {
  contractId: number;
}

export function ConsumptionList({ contractId }: ConsumptionListProps) {
  const [showCreate, setShowCreate] = useState(false);

  const { data: records, isLoading, isError } = useConsumptionRecords(contractId);
  const { data: contracts } = useContracts();
  const contract = contracts?.find((c) => c.id === contractId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 text-sm text-red-500">
        No se pudieron cargar los registros de consumo.
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link
          href="/dashboard"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          Contratos
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-900 truncate">
          {contract?.contractName ?? `Contrato #${contractId}`}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Registros de consumo
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {records?.length ?? 0}{" "}
            {records?.length === 1 ? "registro" : "registros"}
            {contract && (
              <span className="ml-1.5 text-gray-300">· T-{contract.tariff.type}</span>
            )}
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ Nuevo registro</Button>
      </div>

      {records?.length === 0 ? (
        <EmptyState
          title="Sin registros de consumo"
          description="Agrega el consumo bimestral de este contrato para simular tu recibo de luz."
          action={
            <Button onClick={() => setShowCreate(true)}>Agregar registro</Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Periodo
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  kWh no verano
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  kWh verano
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Total kWh
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records?.map((record) => (
                <ConsumptionRow
                  key={record.id}
                  record={record}
                  contractId={contractId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConsumptionForm
        open={showCreate}
        onClose={() => setShowCreate(false)}
        contractId={contractId}
      />
    </>
  );
}
