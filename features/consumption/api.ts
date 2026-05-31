import api from "@/lib/axios";
import type { CreateConsumptionInput, UpdateConsumptionInput } from "./schemas";
import type { ConsumptionRecord } from "./types";

export const getConsumptionRecords = async (contractId: number): Promise<ConsumptionRecord[]> => {
  const res = await api.get<ConsumptionRecord[]>(`/api/contracts/${contractId}/consumption-records`);
  return res.data;
}

export const getConsumptionRecord = async (contractId: number, id: number): Promise<ConsumptionRecord> => {
  const res = await api.get<ConsumptionRecord>(`/api/contracts/${contractId}/consumption-records/${id}`);
  return res.data;
}

export const createConsumptionRecord = async (contractId: number, consumptionData: CreateConsumptionInput): Promise<ConsumptionRecord> => {
  const res = await api.post<ConsumptionRecord>(`/api/contracts/${contractId}/consumption-records`, consumptionData);
  return res.data;
}

export const updateConsumptionRecord = async (contractId: number, id: number, consumptionData: UpdateConsumptionInput): Promise<ConsumptionRecord> => {
  const res = await api.put<ConsumptionRecord>(`/api/contracts/${contractId}/consumption-records/${id}`, consumptionData);
  return res.data;
}

export const deleteConsumptionRecord = async (contractId: number, id: number): Promise<void> => {
  await api.delete(`/api/contracts/${contractId}/consumption-records/${id}`);
}