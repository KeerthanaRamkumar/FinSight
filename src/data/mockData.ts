import { 
  EntrepreneurProfile, 
  LedgerTransaction, 
  WeeklyDataPoint, 
  MandiCommodity, 
  AdvisoryInsight, 
  GovtScheme, 
  VoiceSample,
  OcrReceiptSample,
  SwotItem,
  KarzaSchemeRouteResult
} from '../types';

export const PROFILES: EntrepreneurProfile[] = [
  {
    id: 'ramesh-chandra',
    name: 'Ramesh Chandra',
    businessName: 'Shree Ganesh Agro & Kirana Store',
    village: 'Bithri Chainpur',
    block: 'Bithri',
    district: 'Bareilly',
    state: 'Uttar Pradesh',
    sector: 'Kirana & Farm Inputs',
    category: 'OBC',
    shgGroup: 'Kisan Mitra Self-Help Group (Bareilly-04)',
    currentBalance: 42850,
    monthlyRevenue: 98400,
    creditScore: 768,
    udyamNumber: 'UDYAM-UP-08-0049218',
    avatarSeed: 'ramesh',
  },
  {
    id: 'sunita-devi',
    name: 'Sunita Devi',
    businessName: 'Ganga Kripa Handloom & Zari Crafts',
    village: 'Shivpur',
    block: 'Harahua',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sector: 'Handloom & Textile Crafts',
    category: 'SC',
    shgGroup: 'Mahila Utthan Bunkar Sangh',
    currentBalance: 31200,
    monthlyRevenue: 64500,
    creditScore: 742,
    udyamNumber: 'UDYAM-UP-72-0091842',
    avatarSeed: 'sunita',
  },
  {
    id: 'muthu-kumar',
    name: 'Muthu Kumar',
    businessName: 'Vaigai Dairy & Animal Feeds',
    village: 'Othakadai',
    block: 'Madurai East',
    district: 'Madurai',
    state: 'Tamil Nadu',
    sector: 'Dairy & Rural Co-operative',
    category: 'OBC',
    shgGroup: 'Gokulam Milk Producers Society',
    currentBalance: 56300,
    monthlyRevenue: 112000,
    creditScore: 790,
    udyamNumber: 'UDYAM-TN-12-0038104',
    avatarSeed: 'muthu',
  },
];

export const INITIAL_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: 'tx-101',
    date: '12 Oct',
    item: 'Fertilizer Supply (DAP 5 bags)',
    category: 'Raw Material',
    type: 'DEBIT',
    amount: 1200,
    party: 'IFFCO Kendra Bareilly',
    paymentMode: 'Cash',
    note: 'Advance for rabi season top-up',
    timestamp: Date.now() - 86400000 * 1,
  },
  {
    id: 'tx-102',
    date: '11 Oct',
    item: 'Wheat Sale (Bulk 12 quintals)',
    category: 'Sales',
    type: 'CREDIT',
    amount: 14500,
    party: 'Om Traders (Mandi Yard)',
    paymentMode: 'Bank Transfer',
    note: 'Direct mandi dispatch',
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: 'tx-103',
    date: '10 Oct',
    item: 'Grain Warehouse Storage Rental',
    category: 'Storage / Rent',
    type: 'DEBIT',
    amount: 450,
    party: 'Bareilly Rural Godown No. 3',
    paymentMode: 'Cash',
    note: 'October storage slip #149',
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    id: 'tx-104',
    date: '09 Oct',
    item: 'Mustard Seeds Wholesale Stock',
    category: 'Sales',
    type: 'CREDIT',
    amount: 8600,
    party: 'Gupta Oil Millers',
    paymentMode: 'UPI',
    note: 'Payment received via phonepe',
    voiceRecorded: true,
    timestamp: Date.now() - 86400000 * 4,
  },
  {
    id: 'tx-105',
    date: '08 Oct',
    item: 'Solar Shop Inverter Maintenance',
    category: 'Utility / Electricity',
    type: 'DEBIT',
    amount: 850,
    party: 'Shree Sai Electricals',
    paymentMode: 'Cash',
    note: 'Battery water and circuit servicing',
    timestamp: Date.now() - 86400000 * 5,
  },
  {
    id: 'tx-106',
    date: '07 Oct',
    item: 'Kirana Retail Daily Cash Sales',
    category: 'Sales',
    type: 'CREDIT',
    amount: 6300,
    party: 'Counter Walk-in Customers',
    paymentMode: 'Cash',
    note: 'Haat day sales register',
    voiceRecorded: true,
    timestamp: Date.now() - 86400000 * 6,
  },
  {
    id: 'tx-107',
    date: '06 Oct',
    item: 'Mini Goods Tempo Freight to Haat',
    category: 'Transport',
    type: 'DEBIT',
    amount: 900,
    party: 'Balram Transport Bareilly',
    paymentMode: 'Cash',
    note: 'Carried 18 crates to weekly bazaar',
    timestamp: Date.now() - 86400000 * 7,
  },
  {
    id: 'tx-108',
    date: '05 Oct',
    item: 'PM SVANidhi Micro-Credit Subsidy',
    category: 'Govt Subsidy',
    type: 'CREDIT',
    amount: 1400,
    party: 'Direct Benefit Transfer (DBT)',
    paymentMode: 'Bank Transfer',
    note: 'Quarterly 7% interest subvention credited',
    timestamp: Date.now() - 86400000 * 8,
  }
];

export const WEEKLY_PROFIT_DATA: WeeklyDataPoint[] = [
  { day: 'Mon', fullDay: 'Monday', credit: 5200, debit: 2100, profit: 3100 },
  { day: 'Tue', fullDay: 'Tuesday', credit: 7400, debit: 2800, profit: 4600 },
  { day: 'Wed', fullDay: 'Wednesday', credit: 4100, debit: 2300, profit: 1800 },
  { day: 'Thu', fullDay: 'Thursday', credit: 8900, debit: 3400, profit: 5500 },
  { day: 'Fri', fullDay: 'Friday', credit: 5800, debit: 3100, profit: 2700 },
  { day: 'Sat', fullDay: 'Saturday (Haat)', credit: 16800, debit: 4200, profit: 12600 },
  { day: 'Sun', fullDay: 'Sunday', credit: 6200, debit: 2500, profit: 3700 },
];

export const MANDI_COMMODITIES: MandiCommodity[] = [
  {
    id: 'c-1',
    commodityName: 'Mustard Seeds (Sarson)',
    hindiName: 'सरसों',
    market: 'Bareilly APMC Yard',
    currentPrice: 5650,
    previousPrice: 5380,
    unit: '₹ / Quintal',
    changePercent: 5.02,
    trend: 'up',
    recommendation: 'SELL_NOW',
    haatDay: 'Friday & Tuesday',
  },
  {
    id: 'c-2',
    commodityName: 'Wheat (Gehun - Sharbati)',
    hindiName: 'गेहूं',
    market: 'Fatehganj Grain Mandi',
    currentPrice: 2420,
    previousPrice: 2450,
    unit: '₹ / Quintal',
    changePercent: -1.22,
    trend: 'down',
    recommendation: 'HOLD',
    haatDay: 'Wednesday',
  },
  {
    id: 'c-3',
    commodityName: 'Paddy / Rice (Basmati 1509)',
    hindiName: 'धान',
    market: 'Bareilly Main Krishi Mandi',
    currentPrice: 3280,
    previousPrice: 3200,
    unit: '₹ / Quintal',
    changePercent: 2.5,
    trend: 'up',
    recommendation: 'SELL_NOW',
    haatDay: 'Monday & Thursday',
  },
  {
    id: 'c-4',
    commodityName: 'Desi Chana (Gram)',
    hindiName: 'चना',
    market: 'Aonla Sub-Market',
    currentPrice: 6100,
    previousPrice: 6050,
    unit: '₹ / Quintal',
    changePercent: 0.83,
    trend: 'neutral',
    recommendation: 'HOLD',
    haatDay: 'Saturday',
  },
  {
    id: 'c-5',
    commodityName: 'Organic Jaggery (Gur)',
    hindiName: 'देसी गुड़',
    market: 'Bareilly Haat Bazaar',
    currentPrice: 3950,
    previousPrice: 3700,
    unit: '₹ / Quintal',
    changePercent: 6.76,
    trend: 'up',
    recommendation: 'BUY_BULK',
    haatDay: 'Daily',
  },
];

export const ADVISORY_INSIGHTS: AdvisoryInsight[] = [
  {
    id: 'adv-1',
    type: 'opportunity',
    title: 'Mandi Price Divergence',
    badge: 'Opportunity',
    description: 'Mustard seed prices at Bareilly APMC are 5.02% higher today than local village middlemen are offering. Transport to APMC Yard yields net +₹1,850 after cartage.',
    potentialImpact: '+₹1,850 net gain per 10 quintals',
    actionableStep: 'Book collective tractor trolley to Bareilly Mandi before 11:00 AM auction.',
    sector: 'Agriculture & Trading',
    timestamp: 'Updated 20 mins ago',
  },
  {
    id: 'adv-2',
    type: 'inventory',
    title: 'Fertilizer & DAP Price Peak Forecast',
    badge: 'Inventory Alert',
    description: 'Raw material procurement costs historically climb 14-18% over the next 4 weeks as rabi sowing accelerates. Pre-booking wholesale stock now protects working margins.',
    potentialImpact: 'Saves approx. ₹4,200 on upcoming 30-day stock',
    actionableStep: 'Utilize 15-day supplier credit or NBCFDC micro-loan working capital.',
    sector: 'Kirana & Agri Inputs',
    timestamp: '2 hours ago',
  },
  {
    id: 'adv-3',
    type: 'collective',
    title: 'Self-Help Group (SHG) Bulk Purchase Pool',
    badge: 'Collective Buying',
    description: '6 entrepreneurs in Kisan Mitra SHG are purchasing organic packing bags and grain sacks. Joining this combined order triggers a 12% bulk factory rebate.',
    potentialImpact: '12% direct cost reduction (₹1,400 saved)',
    actionableStep: 'Opt into the pooled purchase order before Thursday 5 PM.',
    sector: 'Community SHG',
    timestamp: '4 hours ago',
  },
  {
    id: 'adv-4',
    type: 'strategy',
    title: 'High-Cost Informal Debt Refinancing',
    badge: 'Success Strategy',
    description: 'Local village money lenders charge 2.5% to 3% monthly (36% annual). Refinancing this under NBCFDC or MUDRA Shishu at 5-7% saves ₹1,200 monthly interest.',
    potentialImpact: 'Cuts interest burden by 78%',
    actionableStep: 'Apply for NBCFDC term loan with your current Bahi-Khata ledger records.',
    sector: 'Financial Structuring',
    timestamp: 'Yesterday',
  }
];

export const GOVT_SCHEMES: GovtScheme[] = [
  {
    id: 'scheme-nbcfdc',
    name: 'NBCFDC Term Loan & New Swarnima',
    acronym: 'NBCFDC',
    ministry: 'Ministry of Social Justice and Empowerment (MSJE)',
    tagline: 'Flagship concessional financing for rural backward class & marginalized micro-enterprises.',
    targetBeneficiary: 'Rural OBC/EBC artisans, shopkeepers, agro-processors & self-employed individuals.',
    maxAmount: 500000,
    interestRate: 6.0,
    interestSubsidy: 2.0,
    effectiveRate: 4.0,
    collateralFree: true,
    eligibility: [
      'Belong to Backward Classes / Target Group under MSJE mandate',
      'Annual family income under ₹3,00,000 for rural areas',
      'Existing or proposed micro-enterprise with feasible business plan',
      'Age between 18 and 55 years',
    ],
    keyBenefits: [
      'Lowest concessional interest rate in India (effective 4-5% p.a.)',
      'Moratorium period of 6 months for enterprise setup',
      'Repayment tenure up to 5 years (60 months)',
      'Direct disbursement through State Channelizing Agencies (SCAs) & RRBs',
    ],
    documentsRequired: [
      'Aadhaar Card & Proof of Identity',
      'Caste Certificate / Income Certificate issued by Tehsildar',
      'FinSight Digital Bahi-Khata (Cashflow Statement)',
      'Bank Passbook photocopy (first page & 6-month entries)',
      'Udyam Assist / Micro-Enterprise Registration',
    ],
    msjeSpecialFocus: true,
  },
  {
    id: 'scheme-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    acronym: 'PM-VISHWAKARMA',
    ministry: 'Ministry of MSME & Social Justice',
    tagline: 'End-to-end holistic support for traditional artisans & craftspeople (18 traditional trades).',
    targetBeneficiary: 'Carpenters, blacksmiths, potters, weavers, cobblers, tailors & rural makers.',
    maxAmount: 300000,
    interestRate: 5.0,
    interestSubsidy: 8.0,
    effectiveRate: 5.0,
    collateralFree: true,
    eligibility: [
      'Practitioner of one of 18 recognized traditional artisanal trades',
      'Minimum age 18 years at time of registration',
      'Beneficiary not availed PMEGP or MUDRA in preceding 5 years',
      'One member per family eligible',
    ],
    keyBenefits: [
      'Collateral-free credit: Tranche 1 (₹1 Lakh) & Tranche 2 (₹2 Lakhs)',
      'Fixed subsidized interest of only 5% with Govt paying balance subvention',
      '₹15,000 modern toolkit incentive e-voucher',
      '5-7 days basic skill training with ₹500/day stipend',
    ],
    documentsRequired: [
      'Aadhaar linked with mobile number',
      'Ration Card / Family identity proof',
      'Skill trade verification through Gram Panchayat / Urban Body',
      'Active Bank Account details',
    ],
    msjeSpecialFocus: true,
  },
  {
    id: 'scheme-svanidhi',
    name: 'PM SVANidhi (Micro-Credit for Street Vendors)',
    acronym: 'PM-SVANIDHI',
    ministry: 'Ministry of Housing and Urban Affairs & Financial Services',
    tagline: 'Working capital micro-loans with 7% interest subsidy and digital transaction cashback.',
    targetBeneficiary: 'Micro-retailers, vegetable/fruit sellers, haat-vendors, mobile cart operators.',
    maxAmount: 50000,
    interestRate: 11.0,
    interestSubsidy: 7.0,
    effectiveRate: 4.0,
    collateralFree: true,
    eligibility: [
      'Street vendors & micro-traders operating before designated cutoff',
      'Possession of Certificate of Vending or Local Body recommendation',
      'Graduating tranches: ₹10,000 -> ₹20,000 -> ₹50,000 upon timely repayment',
    ],
    keyBenefits: [
      '7% interest subsidy credited directly to bank account quarterly',
      'No processing fees, zero collateral, quick digital onboarding',
      'Up to ₹1,200 per year cashback on digital UPI merchant collections',
      'Enhances formal credit score for larger commercial loans',
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Voter ID / Driving License',
      'Recommendation letter from Town Vending Committee (TVC) or Sarpanch',
      'UPI QR code registration certificate',
    ],
  },
  {
    id: 'scheme-mudra',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    acronym: 'PMMY-MUDRA',
    ministry: 'Department of Financial Services, Ministry of Finance',
    tagline: 'Funding the unfunded non-corporate micro and small enterprises across rural India.',
    targetBeneficiary: 'Kirana shops, small agro-processing, service centers, transport operators.',
    maxAmount: 1000000,
    interestRate: 8.5,
    interestSubsidy: 1.5,
    effectiveRate: 7.0,
    collateralFree: true,
    eligibility: [
      'Any non-farm rural or semi-urban micro-enterprise',
      'Shishu (Up to ₹50,000), Kishore (₹50,001 to ₹5,00,000), Tarun (Up to ₹10,00,000)',
      'Clean repayment track record with no prior defaults',
    ],
    keyBenefits: [
      'No collateral requirement covered under CGFMU guarantee',
      'Flexible MUDRA Card (RuPay Debit Card) for instant working capital overdraft',
      'Available through all Commercial, Regional Rural (RRBs), & Co-op Banks',
      'Tenure ranging from 3 to 5 years',
    ],
    documentsRequired: [
      'Proof of identity & address (Aadhaar / Voter ID)',
      'Proof of business establishment (Udyam, Shop Act, or FinSight Ledger)',
      'Last 6 months bank statement',
      'Quotation of machinery / stock to be purchased (for Kishore/Tarun)',
    ],
  },
  {
    id: 'scheme-nsfdc',
    name: 'NSFDC Micro-Credit Finance (Mahila Samriddhi)',
    acronym: 'NSFDC',
    ministry: 'Ministry of Social Justice and Empowerment (MSJE)',
    tagline: 'Direct economic empowerment and asset creation for SC micro-entrepreneurs and women SHGs.',
    targetBeneficiary: 'Scheduled Caste entrepreneurs, rural women artisans, micro-scale trades.',
    maxAmount: 140000,
    interestRate: 5.0,
    interestSubsidy: 1.0,
    effectiveRate: 4.0,
    collateralFree: true,
    eligibility: [
      'Beneficiary belonging to Scheduled Caste with valid community proof',
      'Family income within specified ceiling (under ₹3 Lakh/year)',
      'Priority given to women micro-entrepreneurs & SHG cluster federations',
    ],
    keyBenefits: [
      'Interest rate capped at just 4% per annum for women entrepreneurs',
      'Term period of 3 years with quarterly repayment schedules',
      'Direct tie-up with District Social Welfare Offices',
    ],
    documentsRequired: [
      'Caste Certificate duly verified',
      'Income Certificate from competent revenue authority',
      'SHG resolution letter (if applying through group)',
      'Bank Account passbook copy',
    ],
    msjeSpecialFocus: true,
  }
];

export const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 'sample-hi-1',
    language: 'Hindi',
    audioTitle: 'गेहूं बिक्री (नकद)',
    transcript: 'कल मंडी में 14,500 रुपये का गेहूं नकद बेचा।',
    parsedItem: 'Wheat Sale (Bulk)',
    parsedAmount: 14500,
    parsedType: 'CREDIT',
    parsedCategory: 'Sales',
    parsedMode: 'Cash',
    parsedParty: 'Mandi Yard Buyer',
  },
  {
    id: 'sample-hi-2',
    language: 'Hindi',
    audioTitle: 'खाद खरीद (नकद)',
    transcript: 'इफको केंद्र से 1200 रुपये का खाद और डीएपी खरीदा।',
    parsedItem: 'Fertilizer & DAP Supply',
    parsedAmount: 1200,
    parsedType: 'DEBIT',
    parsedCategory: 'Raw Material',
    parsedMode: 'Cash',
    parsedParty: 'IFFCO Kendra',
  },
  {
    id: 'sample-en-1',
    language: 'English',
    audioTitle: 'Mustard Sale (UPI)',
    transcript: 'Received 8,600 rupees online for mustard seed stock from Gupta Oil Millers.',
    parsedItem: 'Mustard Seed Stock',
    parsedAmount: 8600,
    parsedType: 'CREDIT',
    parsedCategory: 'Sales',
    parsedMode: 'UPI',
    parsedParty: 'Gupta Oil Millers',
  },
  {
    id: 'sample-hi-3',
    language: 'Hindi',
    audioTitle: 'दुकान किराया (नकद)',
    transcript: 'गोदाम और दुकान का किराया 450 रुपये नकद चुकाया।',
    parsedItem: 'Godown Storage Rent',
    parsedAmount: 450,
    parsedType: 'DEBIT',
    parsedCategory: 'Storage / Rent',
    parsedMode: 'Cash',
    parsedParty: 'Bareilly Rural Godown',
  },
  {
    id: 'sample-ta-1',
    language: 'Tamil',
    audioTitle: 'கரும்பு விற்பனை (UPI)',
    transcript: 'கரும்பு மற்றும் வெல்லம் விற்றதில் 4200 ரூபாய் கூகுள் பே மூலம் வந்தது.',
    parsedItem: 'Sugarcane & Jaggery Sale',
    parsedAmount: 4200,
    parsedType: 'CREDIT',
    parsedCategory: 'Sales',
    parsedMode: 'UPI',
    parsedParty: 'Madurai Mandi Buyer',
  },
  {
    id: 'sample-te-1',
    language: 'Telugu',
    audioTitle: 'విత్తనాలు కొనుగోలు (Cash)',
    transcript: 'సొసైటీ వద్ద 1800 రూపాయల విత్తనాలు కొన్నాము.',
    parsedItem: 'Certified Paddy Seeds Purchase',
    parsedAmount: 1800,
    parsedType: 'DEBIT',
    parsedCategory: 'Raw Material',
    parsedMode: 'Cash',
    parsedParty: 'Primary Agri Society',
  },
];

export const OCR_RECEIPT_SAMPLES: OcrReceiptSample[] = [
  {
    id: 'ocr-1',
    vendorName: 'IFFCO Kisan Sewa Kendra (Bareilly Central)',
    receiptType: 'Agro Inputs Tax Invoice',
    date: '12 Oct 2025',
    totalAmount: 1200,
    category: 'Raw Material',
    type: 'DEBIT',
    paymentMode: 'Cash',
    items: [
      { name: 'DAP Fertilizer 50kg bag', qty: '1 Bag', price: 1350 },
      { name: 'Govt Subsidy DBT Adjusted', qty: '1 unit', price: -150 },
    ],
  },
  {
    id: 'ocr-2',
    vendorName: 'APMC Krishi Upaj Mandi Yard (Receipt #8491)',
    receiptType: 'Mandi Auction Settlement J-Form',
    date: '11 Oct 2025',
    totalAmount: 14500,
    category: 'Sales',
    type: 'CREDIT',
    paymentMode: 'Bank Transfer',
    items: [
      { name: 'Wheat (Sharbati A-Grade)', qty: '12 Quintals', price: 14700 },
      { name: 'Mandi Cess & Weighing fee', qty: 'Toll slip', price: -200 },
    ],
  },
  {
    id: 'ocr-3',
    vendorName: 'Madhyanchal Vidyut Vitran Nigam (UPPCL)',
    receiptType: 'Rural Commercial Power Bill',
    date: '08 Oct 2025',
    totalAmount: 850,
    category: 'Utility / Electricity',
    type: 'DEBIT',
    paymentMode: 'UPI',
    items: [
      { name: 'Agro Store 2kW Commercial Tariffs', qty: '142 Units', price: 850 },
    ],
  },
];

export interface FeasibilityPreset {
  category: string;
  defaultMargin: number;
  swot: SwotItem;
  competitorsPerVillage: number;
  radiusKm: number;
  avgSellingPrice: string;
  grossMargin: string;
  targetDemandUnits: number;
  breakevenMonths: number;
}

export const FEASIBILITY_PRESETS: Record<string, FeasibilityPreset> = {
  'Dairy & Milk Chilling Unit': {
    category: 'Dairy & Milk Chilling Unit',
    defaultMargin: 50000,
    swot: {
      strengths: [
        'Guaranteed daily off-take by regional milk co-operative union (Amul/Parag/Aavin)',
        'Local availability of green fodder and paddy straw within 3km',
        'Direct cashflow with daily or weekly DBT milk settlement cycles',
      ],
      weaknesses: [
        'Requires continuous morning and evening labor commitment',
        'Vulnerability of milch animals to seasonal mastitis / foot-and-mouth infection',
        'Initial electricity reliability risk for bulk milk chillers',
      ],
      opportunities: [
        'Value addition into Paneer, Desi Ghee and Curd at nearby weekly Haat (+30% margin)',
        'MoSJE subsidized animal husbandry credit with 6-month loan moratorium',
        'Organic cow dung vermicompost packaging for peri-urban nurseries',
      ],
      threats: [
        'Sharp seasonal spikes in cattle feed (oil-cake) prices during dry summer',
        'Informal local dudhiya middlemen attempting price suppression',
      ],
    },
    competitorsPerVillage: 2,
    radiusKm: 5,
    avgSellingPrice: '₹52 - ₹58 per liter (6.0% FAT)',
    grossMargin: '26% - 32%',
    targetDemandUnits: 3600, // Liters / month
    breakevenMonths: 4,
  },
  'Pickle & Agro-Food Processing Unit': {
    category: 'Pickle & Agro-Food Processing Unit',
    defaultMargin: 20000,
    swot: {
      strengths: [
        'Direct farm-gate access to cheap seasonal raw mango, amla, and green chilies',
        'Low initial machinery cost utilizing traditional stone grinders and solar drying',
        'High consumer trust in preservative-free regional recipes',
      ],
      weaknesses: [
        'Seasonal availability of raw spices and seasonal curing time (2-4 weeks)',
        'Packaging in glass vs food-grade pouches requires careful transport cartage',
      ],
      opportunities: [
        'Selling branded 250g/500g jars at district haats and tourist highways',
        'Tie-up with local SHG federation and PM Formalisation of Micro Food Processing (PMFME)',
        'Supplying rural dhabas and marriage caterers in bulk 5kg buckets',
      ],
      threats: [
        'Entry of factory-mass-produced FMCG brands in rural kiranas',
        'Unseasonal rain disrupting open-air sun curing',
      ],
    },
    competitorsPerVillage: 1,
    radiusKm: 8,
    avgSellingPrice: '₹140 - ₹180 per kg',
    grossMargin: '38% - 45%',
    targetDemandUnits: 450, // Kg / month
    breakevenMonths: 3,
  },
  'Kirana & Farm Inputs Retail': {
    category: 'Kirana & Farm Inputs Retail',
    defaultMargin: 35000,
    swot: {
      strengths: [
        'Central village crossroads location with high recurring footfall',
        'Dual revenue stream: FMCG household provisions + Certified seeds & bio-fertilizers',
        'Deep community ties enabling customer retention',
      ],
      weaknesses: [
        'Customer expectation of seasonal credit (Udhar) during crop sowing cycle',
        'Inventory cash tied up in slow-moving items',
      ],
      opportunities: [
        'Joining Kisan Mitra SHG collective bulk procurement to gain 12-15% manufacturer margin',
        'Installing micro-ATM / Aadhaar Enabled Payment (AePS) cash withdrawal point',
        'Digital Bahi-Khata record keeping unlocks instant bank overdraft',
      ],
      threats: [
        'Aggressive credit default risk if seasonal crops face hail/drought damage',
        'Wholesale supplier price volatility',
      ],
    },
    competitorsPerVillage: 4,
    radiusKm: 3,
    avgSellingPrice: 'MRP benchmark (8% - 18% trade margin)',
    grossMargin: '14% - 19%',
    targetDemandUnits: 1800, // Footfall / month
    breakevenMonths: 2,
  },
  'Handloom & Zari Crafts Unit': {
    category: 'Handloom & Zari Crafts Unit',
    defaultMargin: 25000,
    swot: {
      strengths: [
        'Generational artisan skill heritage with high cultural brand recognition',
        'High value-to-weight ratio making shipping to urban exhibitions cost-effective',
        'Zero industrial noise pollution, home-based production flexibility',
      ],
      weaknesses: [
        'High working capital lock-in for pure silk and zari metallic threads',
        'Physical strain and handloom setup setup maintenance',
      ],
      opportunities: [
        'PM Vishwakarma Scheme providing ₹15,000 toolkits and 5% subsidized credit',
        'Direct listing on ONDC (Open Network for Digital Commerce) & Tribes India',
        'Festival season premium pricing (Diwali / Wedding season)',
      ],
      threats: [
        'Cheap polyester power-loom replicas sold under artisan tags',
        'Delayed payment cycles from urban boutique buyers',
      ],
    },
    competitorsPerVillage: 2,
    radiusKm: 6,
    avgSellingPrice: '₹2,500 - ₹8,500 per saree / fabric unit',
    grossMargin: '40% - 55%',
    targetDemandUnits: 40, // Pieces / month
    breakevenMonths: 3,
  },
  'Bamboo & Woodcraft Workshop': {
    category: 'Bamboo & Woodcraft Workshop',
    defaultMargin: 15000,
    swot: {
      strengths: [
        'Abundant raw local bamboo poles at minimal procurement cost',
        'Lightweight, eco-friendly consumer preference replacing single-use plastics',
      ],
      weaknesses: [
        'Manual cutting and shaping limits daily batch throughput',
        'Pest susceptibility if bamboo seasoning treatment is skipped',
      ],
      opportunities: [
        'Supplying utility grain storage baskets, poultry coops, and decorative lamps',
        'NBCFDC concessional micro-term loan at 4% effective interest',
      ],
      threats: [
        'Plastic crate proliferation at rural fruit and vegetable mandis',
      ],
    },
    competitorsPerVillage: 1,
    radiusKm: 10,
    avgSellingPrice: '₹120 - ₹650 per utility item',
    grossMargin: '45% - 60%',
    targetDemandUnits: 220,
    breakevenMonths: 2,
  },
  'Poultry & Broiler Unit': {
    category: 'Poultry & Broiler Unit',
    defaultMargin: 30000,
    swot: {
      strengths: [
        'Short production cycle (35-42 days per broiler batch)',
        'Rapid working capital turnover and high local protein demand',
      ],
      weaknesses: [
        'High sensitivity to ambient temperature and hygiene biosecurity',
        'Feed costs constitute over 65% of recurrent operating expenditure',
      ],
      opportunities: [
        'Direct contract farming integration with regional hatcheries',
        'Selling chicken manure to local horticulture orchard farmers',
      ],
      threats: [
        'Sudden disease outbreak rumors dampening retail demand',
        'Feed price escalation during maize shortages',
      ],
    },
    competitorsPerVillage: 2,
    radiusKm: 5,
    avgSellingPrice: '₹110 - ₹145 per kg live bird',
    grossMargin: '18% - 24%',
    targetDemandUnits: 1200, // Birds / batch
    breakevenMonths: 3,
  },
};

/**
 * Deterministic 10% Margin / 90% Loan Smart Scheme-Routing Engine
 * Directly mirroring PPT Slide 3 and Slide 6 specifications:
 * - Scheme: Micro Finance (Project Cost Up to ₹1.40 L | Loan Max ₹1.25 L | 6.5% p.a. | 3 yrs with 3-mo moratorium)
 * - Scheme: Term Loan (Project Cost ₹1.40 L – ₹50 L | Loan Max ₹45 L | 8.0% p.a. | 7 yrs with 6-mo moratorium)
 */
export function computeKarzaRouting(marginMoney: number): KarzaSchemeRouteResult {
  // Available Margin Capital is 10% of Project Cost
  const rawProjectCost = Math.max(10000, marginMoney * 10);
  
  // Cap project cost to maximum permissible under MoSJE guidelines (₹50 Lakhs)
  const projectCost = Math.min(5000000, rawProjectCost);
  const actualMarginMoney = Math.round(projectCost * 0.10);
  const rawLoanAmount = Math.round(projectCost * 0.90);

  const isMicroFinance = projectCost <= 140000;
  
  const schemeType: 'Micro Finance' | 'Term Loan' = isMicroFinance ? 'Micro Finance' : 'Term Loan';
  const maxLoanCeiling = isMicroFinance ? 125000 : 4500000;
  const loanAmount = Math.min(rawLoanAmount, maxLoanCeiling);

  const interestRate = isMicroFinance ? 6.5 : 8.0;
  const tenureYears = isMicroFinance ? 3 : 7;
  const tenureMonths = tenureYears * 12;
  const moratoriumMonths = isMicroFinance ? 3 : 6;

  // During moratorium: simple monthly interest only
  const monthlyInterestRate = interestRate / 12 / 100;
  const moratoriumMonthlyInterest = Math.round(loanAmount * monthlyInterestRate);

  // Post-moratorium: regular EMI for the remaining months
  const postMoratoriumMonths = tenureMonths - moratoriumMonths;
  const r = monthlyInterestRate;
  const postMoratoriumMonthlyEMI = Math.round(
    (loanAmount * r * Math.pow(1 + r, postMoratoriumMonths)) /
    (Math.pow(1 + r, postMoratoriumMonths) - 1)
  );

  const totalMoratoriumInterest = moratoriumMonthlyInterest * moratoriumMonths;
  const totalPostMoratoriumPayment = postMoratoriumMonthlyEMI * postMoratoriumMonths;
  const totalRepayment = totalMoratoriumInterest + totalPostMoratoriumPayment;
  const totalInterestPaid = Math.max(0, totalRepayment - loanAmount);

  // Commercial baseline: 14% p.a. without moratorium over same tenure
  const commR = 14.0 / 12 / 100;
  const commEMI = Math.round(
    (loanAmount * commR * Math.pow(1 + commR, tenureMonths)) /
    (Math.pow(1 + commR, tenureMonths) - 1)
  );
  const commercialTotalRepayment = commEMI * tenureMonths;
  const commercialInterestCost = Math.max(0, commercialTotalRepayment - loanAmount);
  const interestSavedUnderGovt = Math.max(0, commercialTotalRepayment - totalRepayment);

  return {
    schemeType,
    projectCost,
    marginMoney: actualMarginMoney,
    loanAmount,
    interestRate,
    tenureYears,
    tenureMonths,
    moratoriumMonths,
    moratoriumMonthlyInterest,
    postMoratoriumMonthlyEMI,
    totalInterestPaid,
    totalRepayment,
    commercialInterestCost,
    interestSavedUnderGovt,
  };
}

