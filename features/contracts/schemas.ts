import { z } from "zod";

export const createContractSchema = z.object({
  contractName: z.string().min(1, "El nombre del contrato es requerido"),
  meterNumber: z.string().min(1, "El número de medidor es requerido"),
  tariffId: z.number().int().positive("Selecciona una tarifa"),
  city: z.string().optional(),
});

export const updateContractSchema = z.object({
  contractName: z.string().min(1).optional(),
  meterNumber: z.string().min(1).optional(),
  tariffId: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  city: z.string().optional(),
});

export type CreateContractInput = z.infer<typeof createContractSchema>;
export type UpdateContractInput = z.infer<typeof updateContractSchema>;
