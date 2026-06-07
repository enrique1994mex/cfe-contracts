import api from "@/lib/axios";
import type { CreateContractInput, UpdateContractInput } from "./schemas";
import type { Contract } from "./types";

export const getContracts = async (): Promise<Contract[]> => {
  const res = await api.get<Contract[]>("/api/contracts");
  return res.data;
}

export const getContract = async (id: number): Promise<Contract> => {
  const res = await api.get<Contract>(`/api/contracts/${id}`);
  return res.data;
}

export const createContract = async (contractData: CreateContractInput): Promise<Contract> => {
  const res = await api.post<Contract>("/api/contracts", contractData);
  return res.data;
}

export const updateContract = async (id: number, contractData: UpdateContractInput): Promise<Contract> => {
  const res = await api.put<Contract>(`/api/contracts/${id}`, contractData);
  return res.data;
}

export const deleteContract = async (id: number): Promise<void> => {
  await api.delete(`/api/contracts/${id}`);
}