"use client";

import { useBilling } from "@/features/billing/hooks";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { BillingCard } from "./BillingCard";
import { BillingBreakdown } from "./BillingBreakdown";

interface BillingModalProps {
  open: boolean;
  onClose: () => void;
  contractId: number;
  recordId: number;
}

export function BillingModal({
  open,
  onClose,
  contractId,
  recordId,
}: BillingModalProps) {
  const { data, isLoading, isError, error } = useBilling(
    open ? contractId : null,
    open ? recordId : null
  );

  return (
    <Modal open={open} onClose={onClose} title="Simulación de factura" size="xl">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-gray-400">Calculando factura…</p>
        </div>
      )}

      {isError && (
        <div className="py-8 text-center">
          <p className="text-sm text-red-500">
            {(error as Error)?.message ?? "No se pudo calcular la factura."}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Verifica que el contrato tenga tarifas configuradas para el periodo.
          </p>
        </div>
      )}

      {data && (
        <div className="flex-1 min-h-0 flex flex-col gap-5 pb-2">
          <div className="flex-shrink-0">
            <BillingCard result={data} />
          </div>
          <div className="flex flex-col min-h-0 flex-1">
            <p className="flex-shrink-0 text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Desglose por bloques
            </p>
            <div className="overflow-y-auto min-h-0 flex-1">
              <BillingBreakdown nonSummer={data.nonSummer} summer={data.summer} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
