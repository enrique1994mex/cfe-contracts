export interface ConsumptionRecord {
  id: number;
  periodStart: string;
  periodEnd: string;
  kwhNonSummer: number;
  kwhSummer: number;
  createdAt: string;
  contractId: number;
}

export interface CreateConsumptionRecordRequest {
  periodStart: string;
  periodEnd: string;
  kwhNonSummer: number;
  kwhSummer: number;
}

export interface UpdateConsumptionRecordRequest {
  kwhNonSummer?: number;
  kwhSummer?: number;
}