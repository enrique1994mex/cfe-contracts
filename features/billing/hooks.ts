import { useQuery } from "@tanstack/react-query";
import { simulateBilling } from "./api";

export const useBilling = (
  contractId: number | null,
  recordId: number | null
) => {
  return useQuery({
    queryKey: ["billing", contractId, recordId],
    queryFn: () => simulateBilling(contractId!, recordId!),
    enabled: contractId != null && recordId != null,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
