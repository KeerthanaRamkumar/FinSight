export type ViewMode = 'dashboard' | 'voice-ledger' | 'advisor' | 'calculator' | 'schemes' | 'impact';

export type TransactionType = 'CREDIT' | 'DEBIT';

export type TransactionCategory = 
  | 'Sales'
  | 'Raw Material'
  | 'Transport'
  | 'Labor / Wage'
  | 'Storage / Rent'
  | 'Utility / Electricity'
  | 'Loan EMI'
  | 'Govt Subsidy'
  | 'Other';

export type PaymentMode = 'Cash' | 'UPI' | 'Bank Transfer' | 'Udhar (Credit)';

export interface LedgerTransaction {
  id: string;
  date: string;
  item: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  party: string;
  paymentMode: PaymentMode;
  note?: string;
  voiceRecorded?: boolean;
  ocrScanned?: boolean;
  timestamp: number;
}

export interface EntrepreneurProfile {
  id: string;
  name: string;
  businessName: string;
  village: string;
  block: string;
  district: string;
  state: string;
  sector: string;
  category: 'OBC' | 'SC' | 'ST' | 'General / EWS';
  shgGroup: string;
  currentBalance: number;
  monthlyRevenue: number;
  creditScore: number;
  udyamNumber: string;
  avatarSeed: string;
}

export interface WeeklyDataPoint {
  day: string;
  fullDay: string;
  credit: number;
  debit: number;
  profit: number;
}

export interface MandiCommodity {
  id: string;
  commodityName: string;
  hindiName: string;
  market: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  recommendation: 'SELL_NOW' | 'HOLD' | 'BUY_BULK';
  haatDay: string;
}

export interface AdvisoryInsight {
  id: string;
  type: 'opportunity' | 'inventory' | 'strategy' | 'collective';
  title: string;
  badge: string;
  description: string;
  potentialImpact: string;
  actionableStep: string;
  sector: string;
  timestamp: string;
}

export interface GovtScheme {
  id: string;
  name: string;
  acronym: string;
  ministry: string;
  tagline: string;
  targetBeneficiary: string;
  maxAmount: number;
  interestRate: number;
  interestSubsidy: number;
  effectiveRate: number;
  collateralFree: boolean;
  eligibility: string[];
  keyBenefits: string[];
  documentsRequired: string[];
  msjeSpecialFocus?: boolean;
}

export interface VoiceSample {
  id: string;
  language: 'Hindi' | 'English' | 'Tamil' | 'Telugu';
  audioTitle: string;
  transcript: string;
  parsedItem: string;
  parsedAmount: number;
  parsedType: TransactionType;
  parsedCategory: TransactionCategory;
  parsedMode: PaymentMode;
  parsedParty: string;
}

export interface OcrReceiptSample {
  id: string;
  vendorName: string;
  receiptType: string;
  date: string;
  totalAmount: number;
  items: Array<{ name: string; qty: string; price: number }>;
  paymentMode: PaymentMode;
  category: TransactionCategory;
  type: TransactionType;
}

export interface SwotItem {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface FeasibilityReport {
  id: string;
  businessCategory: string;
  village: string;
  block: string;
  district: string;
  marginMoney: number;
  totalProjectCost: number;
  loanRequired: number;
  feasibilityScore: number; // 0 - 100
  verdict: 'GO' | 'CAUTION' | 'NO_GO';
  verdictMessage: string;
  competitorDensity: {
    existingUnitsCount: number;
    radiusKm: number;
    densityLevel: 'Low' | 'Moderate' | 'High';
    marketSaturation: number; // %
  };
  marketReach: {
    villagePopulation: number;
    targetHouseholds: number;
    weeklyHaatFootfall: number;
    estimatedMonthlyDemandUnits: number;
  };
  pricingGuidance: {
    suggestedPrice: string;
    localMarketRange: string;
    estimatedGrossMargin: string;
    breakevenMonths: number;
  };
  swot: SwotItem;
}

export interface GeoLocationPoint {
  lat: number;
  lng: number;
  label?: string;
  type?: 'selected' | 'haat' | 'competitor' | 'raw_material' | 'storage';
}

export interface SelectedLocationDetails {
  formattedAddress: string;
  village: string;
  block: string;
  district: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface KarzaSchemeRouteResult {
  schemeType: 'Micro Finance' | 'Term Loan';
  projectCost: number;
  marginMoney: number; // 10%
  loanAmount: number; // 90%
  interestRate: number; // 6.5% or 8.0%
  tenureYears: number; // 3 yrs or 7 yrs
  tenureMonths: number;
  moratoriumMonths: number; // 3-mo or 6-mo
  moratoriumMonthlyInterest: number;
  postMoratoriumMonthlyEMI: number;
  totalInterestPaid: number;
  totalRepayment: number;
  commercialInterestCost: number;
  interestSavedUnderGovt: number;
}

