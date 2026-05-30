"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContractSchema, type CreateContractInput } from "@/features/contracts/schemas";
import { useCreateContract, useUpdateContract } from "@/features/contracts/hooks";
import type { Contract } from "@/features/contracts/types";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FieldWrapper } from "@/components/forms/FieldWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const TARIFFS = [
  { id: 1, label: "1 — Uso doméstico general" },
  { id: 2, label: "1A — Zonas cálidas (medias)" },
  { id: 3, label: "1B — Zonas cálidas" },
  { id: 4, label: "1C — Zonas muy cálidas" },
  { id: 5, label: "1D — Zonas extremadamente cálidas" },
  { id: 6, label: "1E — Zonas áridas" },
  { id: 7, label: "1F — Zonas áridas extremas" },
];

interface ContractFormProps {
  open: boolean;
  onClose: () => void;
  contract?: Contract;
}

export function ContractForm({ open, onClose, contract }: ContractFormProps) {
  const isEdit = !!contract;
  const { mutate: createContract, isPending: isCreating, error: createError } = useCreateContract();
  const { mutate: updateContract, isPending: isUpdating, error: updateError } = useUpdateContract(contract?.id ?? 0);

  const isPending = isCreating || isUpdating;
  const serverError = (createError ?? updateError) as Error | null;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContractInput>({
    resolver: zodResolver(createContractSchema),
    defaultValues: {
      contractName: "",
      meterNumber: "",
      tariffId: 1,
      city: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        contract
          ? {
              contractName: contract.contractName,
              meterNumber: contract.meterNumber,
              tariffId: contract.tariff.id,
              city: contract.city ?? "",
            }
          : { contractName: "", meterNumber: "", tariffId: 1, city: "" }
      );
    }
  }, [open, contract, reset]);

  const onSubmit = (data: CreateContractInput) => {
    const payload = { ...data, city: data.city || undefined };
    if (isEdit) {
      updateContract(payload, { onSuccess: onClose });
    } else {
      createContract(payload, { onSuccess: onClose });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar contrato" : "Nuevo contrato"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre del contrato"
          placeholder="Ej. Casa principal"
          error={errors.contractName?.message}
          {...register("contractName")}
        />

        <Input
          label="No. de servicio / medidor"
          placeholder="Ej. 1234567890"
          error={errors.meterNumber?.message}
          {...register("meterNumber")}
        />

        <FieldWrapper label="Tarifa" error={errors.tariffId?.message}>
          <Controller
            control={control}
            name="tariffId"
            render={({ field }) => (
              <select
                value={String(field.value)}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-white"
              >
                {TARIFFS.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
          />
        </FieldWrapper>

        <Input
          label="Ciudad (opcional)"
          placeholder="Ej. Hermosillo"
          error={errors.city?.message}
          {...register("city")}
        />

        {serverError && (
          <ErrorMessage message={serverError.message ?? "Error al guardar"} />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isPending}>
            {isEdit ? "Guardar cambios" : "Crear contrato"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
