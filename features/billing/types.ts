export interface BillingBlock {
  blockOrder: number;
  blockName: string;
  kwhLimit: number | null;
  kwhConsumed: number;
  pricePerKwh: number;
  subtotal: number;
}

interface RateMonth {
  month: number;
  year: number;
}

export interface BillingSection {
  days: number;
  kwhConsumed: number;
  rateMonth: RateMonth;
  blocks: BillingBlock[];
  subtotal: number;
}

export interface BillingResult {
  period: {
    start: string;
    end: string;
    totalDays: number;
  };
  consumption: {
    total: number;
    nonSummer: number;
    summer: number;
  };
  isMixed: boolean;
  nonSummer: BillingSection | null;
  summer: BillingSection | null;
  energiaSubtotal: number;
  iva: number;
  facturaDelPeriodo: number;
  dapEstimado: number;
  totalEstimado: number;
}
