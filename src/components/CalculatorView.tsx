import React, { useState } from 'react';
import { EntrepreneurProfile, GovtScheme } from '../types';
import { GOVT_SCHEMES } from '../data/mockData';
import { 
  Calculator, 
  ShieldCheck, 
  Download, 
  CheckCircle, 
  Percent, 
  Calendar, 
  Coins, 
  Sparkles, 
  FileCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

interface CalculatorViewProps {
  profile: EntrepreneurProfile;
  selectedSchemeId?: string;
  onNavigateToSchemes: () => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  profile,
  selectedSchemeId,
  onNavigateToSchemes,
}) => {
  // Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [activeSchemeId, setActiveSchemeId] = useState<string>(selectedSchemeId || 'scheme-nbcfdc');
  const [categorySubvention, setCategorySubvention] = useState<boolean>(true);
  const [showKitModal, setShowKitModal] = useState<boolean>(false);

  const activeScheme = GOVT_SCHEMES.find((s) => s.id === activeSchemeId) || GOVT_SCHEMES[0];

  // Base interest rate and government subvention
  const rawInterestRate = activeScheme.interestRate;
  const subsidyPercent = activeScheme.interestSubsidy + (categorySubvention ? 1.0 : 0.0);
  const effectiveInterestRate = Math.max(3.0, rawInterestRate - subsidyPercent);
  const commercialMarketRate = 13.5; // Average commercial NBFC/MFI rate in rural India

  // Standard EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = (principal: number, annualRate: number, months: number) => {
    if (annualRate <= 0) return Math.round(principal / months);
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const subsidizedEMI = calculateEMI(loanAmount, effectiveInterestRate, tenureMonths);
  const commercialEMI = calculateEMI(loanAmount, commercialMarketRate, tenureMonths);

  const totalSubsidizedPayment = subsidizedEMI * tenureMonths;
  const totalCommercialPayment = commercialEMI * tenureMonths;

  const totalInterestSubsidized = Math.max(0, totalSubsidizedPayment - loanAmount);
  const totalInterestCommercial = Math.max(0, totalCommercialPayment - loanAmount);
  const totalInterestSaved = Math.max(0, totalCommercialPayment - totalSubsidizedPayment);

  // Quick preset amount helper
  const handleSetPreset = (amount: number, tenure: number, schemeId: string) => {
    setLoanAmount(amount);
    setTenureMonths(tenure);
    setActiveSchemeId(schemeId);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              MSJE Loan & Scheme Calculator
            </h1>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 uppercase tracking-wider">
              Concessional Structuring
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Calculate exact EMIs factoring in Ministry of Social Justice & Empowerment interest subventions, capital subsidies, and moratorium periods for rural micro-enterprises.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKitModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-orange-400" />
            <span>Generate Bank Pitch Kit</span>
          </button>
        </div>
      </div>

      {/* Quick Scheme Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {GOVT_SCHEMES.map((scheme) => {
          const isSelected = activeSchemeId === scheme.id;
          return (
            <button
              key={scheme.id}
              onClick={() => {
                setActiveSchemeId(scheme.id);
                if (loanAmount > scheme.maxAmount) {
                  setLoanAmount(scheme.maxAmount);
                }
              }}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-mono font-bold ${isSelected ? 'text-orange-400' : 'text-slate-400'}`}>
                    {scheme.acronym}
                  </span>
                  {scheme.msjeSpecialFocus && (
                    <span className={`px-1 rounded text-[9px] font-bold ${
                      isSelected ? 'bg-orange-950 text-orange-300' : 'bg-orange-50 text-orange-700'
                    }`}>
                      MSJE
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold mt-1 line-clamp-1">
                  {scheme.name}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                <span className="font-mono">Max ₹{(scheme.maxAmount / 100000).toFixed(1)}L</span>
                <span className={`font-bold font-mono ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {scheme.effectiveRate}% Eff.
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Calculator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders & Parameters Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-orange-500" />
              Structuring Parameters
            </h2>
            <span className="text-xs font-mono text-slate-600">
              Active Scheme: <strong>{activeScheme.name}</strong>
            </span>
          </div>

          {/* Preset Buttons */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
              Quick Micro-Finance Presets:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleSetPreset(50000, 12, 'scheme-svanidhi')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 cursor-pointer"
              >
                ₹50,000 (SVANidhi 1yr)
              </button>
              <button
                onClick={() => handleSetPreset(100000, 24, 'scheme-vishwakarma')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 cursor-pointer"
              >
                ₹1,00,000 (Vishwakarma Tranche 1)
              </button>
              <button
                onClick={() => handleSetPreset(200000, 36, 'scheme-nbcfdc')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 cursor-pointer"
              >
                ₹2,00,000 (NBCFDC 3yr)
              </button>
              <button
                onClick={() => handleSetPreset(500000, 60, 'scheme-mudra')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 cursor-pointer"
              >
                ₹5,00,000 (MUDRA Kishore 5yr)
              </button>
            </div>
          </div>

          {/* Loan Amount Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Loan Amount Required (Principal)
              </label>
              <div className="flex items-center gap-1 font-mono text-base font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                <span>₹</span>
                <input
                  type="number"
                  min="10000"
                  max={activeScheme.maxAmount}
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.min(activeScheme.maxAmount, Number(e.target.value)))}
                  className="w-28 text-right bg-transparent focus:outline-hidden"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max={activeScheme.maxAmount}
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10,000</span>
              <span>₹{(activeScheme.maxAmount / 2).toLocaleString('en-IN')}</span>
              <span>Max: ₹{activeScheme.maxAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Loan Tenure Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Repayment Tenure
              </label>
              <span className="font-mono text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                {tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Years)
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>6 Months</span>
              <span>24 Months</span>
              <span>36 Months</span>
              <span>60 Months</span>
            </div>
          </div>

          {/* Social Category Subvention Toggle */}
          <div className="p-3.5 bg-orange-50 rounded-lg border border-orange-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                Apply {profile.category} Category Interest Subvention (-1.0%)
              </p>
              <p className="text-[11px] text-orange-800 mt-0.5">
                Mandated under Ministry of Social Justice & Empowerment guidelines.
              </p>
            </div>
            <button
              onClick={() => setCategorySubvention(!categorySubvention)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                categorySubvention ? 'bg-orange-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  categorySubvention ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Scheme Specific Rules / Subsidies Note */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>Ministry Guarantee & Subsidy Breakdown:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Base Scheme Rate: <strong>{rawInterestRate}%</strong> | Central Subvention: <strong>-{subsidyPercent}%</strong> | Effective Borrower Rate: <strong className="text-emerald-600">{effectiveInterestRate}% p.a.</strong>
            </p>
          </div>
        </div>

        {/* Calculation Results & Savings Spotlight (5 cols) - Geometric Balance Theme */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 text-white flex flex-col justify-between shadow-md relative overflow-hidden border border-slate-800">
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                Monthly Repayment Structure
              </span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono rounded border border-emerald-800 font-bold">
                {effectiveInterestRate}% Fixed
              </span>
            </div>

            {/* Subsidized Monthly EMI Display */}
            <div className="mt-5 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Subsidized Monthly EMI
              </p>
              <p className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                ₹{subsidizedEMI.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                payable over {tenureMonths} monthly installments
              </p>
            </div>

            {/* Savings Comparison Metric Card */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">Total Interest (MSJE Scheme):</span>
                <span className="font-mono font-bold text-slate-200">₹{totalInterestSubsidized.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">Total Interest (Unregulated / Commercial 13.5%):</span>
                <span className="font-mono font-bold text-red-400">₹{totalInterestCommercial.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-orange-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Interest Subsidy Benefit:
                </span>
                <span className="font-mono font-black text-emerald-400 text-sm">
                  +₹{totalInterestSaved.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Eligibility Checkmark List */}
            <div className="mt-4 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Collateral needed (Credit Guarantee Fund)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>6 Months Moratorium period for raw stock procurement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fast-track via Regional Rural Bank (RRB) SCA network</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              id="btn-open-pitch-kit"
              onClick={() => setShowKitModal(true)}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Download Bank Pitch Kit & Application Slip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bank Pitch Kit Modal */}
      {showKitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-orange-600 font-bold uppercase">
                  MSJE Lead Bank Dossier
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Micro-Enterprise Credit Appraisal Kit
                </h3>
              </div>
              <button
                onClick={() => setShowKitModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-800">{profile.name} ({profile.businessName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Scheme:</span>
                <span className="font-bold text-slate-800">{activeScheme.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Proposed Loan Amount:</span>
                <span className="font-bold text-emerald-700">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Effective Concessional Rate:</span>
                <span className="font-bold text-slate-800">{effectiveInterestRate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Installment (EMI):</span>
                <span className="font-bold text-slate-800">₹{subsidizedEMI.toLocaleString('en-IN')} / month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Subsidy Subvention:</span>
                <span className="font-bold text-emerald-600">₹{totalInterestSaved.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">FinSight Credit Health Score:</span>
                <span className="font-bold text-emerald-700">{profile.creditScore} (High Grade)</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 mb-2">
                Mandatory Documentation Checklist for {activeScheme.acronym}:
              </p>
              <div className="space-y-1.5 text-xs text-slate-600">
                {activeScheme.documentsRequired.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowKitModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('FinSight Loan Appraisal Dossier PDF generated successfully for ' + profile.name + '!');
                  setShowKitModal(false);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
