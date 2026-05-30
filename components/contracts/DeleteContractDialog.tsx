"use client";

import { useDeleteContract } from "@/features/contracts/hooks";
import type { Contract } from "@/features/contracts/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface DeleteContractDialogProps {
  open: boolean;
  onClose: () => void;
  contract: Contract;
}

export function DeleteContractDialog({
  open,
  onClose,
  contract,
}: DeleteContractDialogProps) {
  const { mutate: deleteContract, isPending, error } = useDeleteContract();

  const handleConfirm = () => {
    deleteContract(contract.id, { onSuccess: onClose });
  };

  return (
    <Modal open={open} onClose={onClose} title="Eliminar contrato">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          ¿Estás seguro de que deseas eliminar{" "}
          <span className="font-semibold text-gray-900">
            {contract.contractName}
          </span>
          ? Esta acción no se puede deshacer y eliminará también todos sus
          registros de consumo.
        </p>

        {error && (
          <ErrorMessage message={(error as Error).message ?? "Error al eliminar"} />
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" isLoading={isPending} onClick={handleConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
