import { useQuery } from "@tanstack/react-query";
import { getContractInsights } from "./api";

export const useContractInsights = (contractId: number | null) => {
  return useQuery({
    queryKey: ["contracts", contractId, "ai-insights"],
    queryFn: () => getContractInsights(contractId!),
    enabled: contractId != null,
    staleTime: 1000 * 60 * 15,
    retry: false,
  });
};
