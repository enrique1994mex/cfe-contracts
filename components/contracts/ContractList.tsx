"use client";

import { useState } from "react";
import { useContracts } from "@/features/contracts/hooks";
import { ContractCard } from "./ContractCard";
import { ContractForm } from "./ContractForm";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";

export function ContractList() {
  const { data: contracts, isLoading, isError } = useContracts();
  const [showCreate, setShowCreate] = useState(false);

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
        No se pudieron cargar los contratos.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Mis contratos
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {contracts?.length ?? 0}{" "}
            {contracts?.length === 1 ? "contrato" : "contratos"} registrados
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ Nuevo contrato</Button>
      </div>

      {contracts?.length === 0 ? (
        <EmptyState
          title="Sin contratos"
          description="Agrega tu primer contrato CFE para comenzar a simular tus recibos de luz."
          action={
            <Button onClick={() => setShowCreate(true)}>
              Agregar contrato
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {contracts?.map((c) => (
            <ContractCard key={c.id} contract={c} />
          ))}
        </div>
      )}

      <ContractForm open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  );
}
