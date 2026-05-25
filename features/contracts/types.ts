export interface ContractTariff {
  id: number;
  type: "1" | "1A" | "1B" | "1C" | "1D" | "1E" | "1F";
}

export interface Contract {
  id: number;
  contractName: string;
  meterNumber: string;
  city: string | null;
  isActive: boolean;
  createdAt: string;
  tariff: ContractTariff;
}

