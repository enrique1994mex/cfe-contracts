import api from "@/lib/axios";
import type { BillingResult } from "./types";

export const simulateBilling = async (
  contractId: number,
  recordId: number
): Promise<BillingResult> => {
  const res = await api.get<BillingResult>(
    `/api/contracts/${contractId}/consumption-records/${recordId}/simulate-billing`
  );
  return res.data;
};
