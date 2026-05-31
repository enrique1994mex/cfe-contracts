import { z } from "zod";

export const createConsumptionSchema = z.object({
  periodStart: z.string().min(1, "La fecha de inicio es requerida"),
  periodEnd: z.string().min(1, "La fecha de fin es requerida"),
  kwhNonSummer: z.number().min(0, "Debe ser 0 o más"),
  kwhSummer: z.number().min(0, "Debe ser 0 o más"),
});

export const updateConsumptionSchema = z.object({
  kwhNonSummer: z.number().min(0, "Debe ser 0 o más"),
  kwhSummer: z.number().min(0, "Debe ser 0 o más"),
});

export type CreateConsumptionInput = z.infer<typeof createConsumptionSchema>;
export type UpdateConsumptionInput = z.infer<typeof updateConsumptionSchema>;
