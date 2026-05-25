import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as contractsApi from "./api";
import type { CreateContractInput, UpdateContractInput } from "./schemas";

export const useContracts = () => {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: contractsApi.getContracts,
    retry: false,
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContractInput) => contractsApi.createContract(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });
};

export const useUpdateContract = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateContractInput) => contractsApi.updateContract(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });
};

export const useDeleteContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contractsApi.deleteContract(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });
};
