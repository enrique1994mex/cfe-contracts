"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createConsumptionSchema,
  type CreateConsumptionInput,
} from "@/features/consumption/schemas";
import {
  useCreateConsumptionRecord,
  useUpdateConsumptionRecord,
} from "@/features/consumption/hooks";
import type { ConsumptionRecord } from "@/features/consumption/types";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface ConsumptionFormProps {
  open: boolean;
  onClose: () => void;
  contractId: number;
  record?: ConsumptionRecord;
}

export function ConsumptionForm({
  open,
  onClose,
  contractId,
  record,
}: ConsumptionFormProps) {
  const isEdit = !!record;

  const { mutate: create, isPending: isCreating, error: createError } =
    useCreateConsumptionRecord(contractId);
  const { mutate: update, isPending: isUpdating, error: updateError } =
    useUpdateConsumptionRecord(contractId);

  const isPending = isCreating || isUpdating;
  const serverError = (createError ?? updateError) as Error | null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateConsumptionInput>({
    resolver: zodResolver(createConsumptionSchema),
    defaultValues: { periodStart: "", periodEnd: "", kwhNonSummer: 0, kwhSummer: 0 },
  });

  useEffect(() => {
    if (open) {
      reset(
        record
          ? {
              periodStart: record.periodStart.slice(0, 10),
              periodEnd: record.periodEnd.slice(0, 10),
              kwhNonSummer: record.kwhNonSummer,
              kwhSummer: record.kwhSummer,
            }
          : { periodStart: "", periodEnd: "", kwhNonSummer: 0, kwhSummer: 0 }
      );
    }
  }, [open, record, reset]);

  const onSubmit = (data: CreateConsumptionInput) => {
    if (isEdit) {
      update(
        { id: record.id, data: { kwhNonSummer: data.kwhNonSummer, kwhSummer: data.kwhSummer } },
        { onSuccess: onClose }
      );
    } else {
      create(data, { onSuccess: onClose });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar consumo" : "Nuevo registro de consumo"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Period */}
        {isEdit ? (
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-1">Periodo</p>
            <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
              {record.periodStart.slice(0, 10)} → {record.periodEnd.slice(0, 10)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              El periodo no se puede modificar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Inicio del periodo"
              type="date"
              error={errors.periodStart?.message}
              {...register("periodStart")}
            />
            <Input
              label="Fin del periodo"
              type="date"
              error={errors.periodEnd?.message}
              {...register("periodEnd")}
            />
          </div>
        )}

        {/* kWh */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="kWh no verano"
            type="number"
            min="0"
            step="0.01"
            error={errors.kwhNonSummer?.message}
            {...register("kwhNonSummer", { valueAsNumber: true })}
          />
          <Input
            label="kWh verano"
            type="number"
            min="0"
            step="0.01"
            error={errors.kwhSummer?.message}
            {...register("kwhSummer", { valueAsNumber: true })}
          />
        </div>

        {serverError && (
          <ErrorMessage message={serverError.message ?? "Error al guardar"} />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isPending}>
            {isEdit ? "Guardar cambios" : "Crear registro"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
