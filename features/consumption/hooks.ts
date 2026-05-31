import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as consumptionApi from './api';
import type { CreateConsumptionInput, UpdateConsumptionInput } from './schemas';

const queryKey = (contractId: number) =>
  ['contracts', contractId, 'consumption'] as const;

export const useConsumptionRecords = (contractId: number) => {
  return useQuery({
    queryKey: queryKey(contractId),
    queryFn: () => consumptionApi.getConsumptionRecords(contractId),
    enabled: contractId > 0,
    retry: false,
  });
};

export const useCreateConsumptionRecord = (contractId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConsumptionInput) =>
      consumptionApi.createConsumptionRecord(contractId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(contractId) });
    },
  });
};

export const useUpdateConsumptionRecord = (contractId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateConsumptionInput }) =>
      consumptionApi.updateConsumptionRecord(contractId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(contractId) });
    },
  });
};

export const useDeleteConsumptionRecord = (contractId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      consumptionApi.deleteConsumptionRecord(contractId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(contractId) });
    },
  });
};
