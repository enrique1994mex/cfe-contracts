import api from "@/lib/axios";
import type { ContractInsights } from "./types";

export const getContractInsights = async (contractId: number): Promise<ContractInsights> => {
  const res = await api.get<ContractInsights>(`/api/contracts/${contractId}/ai-insights`);
  return res.data;
};
