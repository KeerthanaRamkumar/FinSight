import React, { useState, useEffect } from 'react';
import { 
  EntrepreneurProfile 
} from '../types';
import { 
  computeKarzaRouting 
} from '../data/mockData';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  Percent, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ArrowRight,
  Printer,
  ChevronRight,
  TrendingDown,
  Info,
  BarChart2
} from 'lucide-react';

interface KarzaCalculatorViewProps {
  profile: EntrepreneurProfile;
  initialMarginMoney?: number;
  initialCategory?: string;
  onNavigateToFeasibility?: () => void;
}

export const KarzaCalculatorView: React.FC<KarzaCalculatorViewProps> = ({
  profile,
  initialMarginMoney = 50000,
  initialCategory = 'Dairy & Milk Chilling Unit',
  onNavigateToFeasibility,
}) => {
  const [marginMoney, setMarginMoney] = useState<number>(initialMarginMoney);
  const [customProjectCost, setCustomProjectCost] = useState<number | ''>('');
  const [businessCategory, setBusinessCategory] = useState<string>(initialCategory);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'dossier'>('overview');
  const [showPitchModal, setShowPitchModal] = useState(false);

  // Update margin when initialMarginMoney prop changes
  useEffect(() => {
    if (initialMarginMoney) {
      setMarginMoney(initialMarginMoney);
    }
  }, [initialMarginMoney]);

  // Compute deterministic routing result
  const routeResult = computeKarzaRouting(marginMoney);

  // Quick loaders
  const loadPptDairyRun = () => {
    setMarginMoney(50000);
    setBusinessCategory('Dairy & Milk Chilling Unit');
  };

  const loadPptMicroFinanceRun = () => {
    setMarginMoney(12000);
    setBusinessCategory('Pickle & Agro-Food Processing Unit');
  };

  const isMicro = routeResult.schemeType === 'Micro Finance';

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner with PPT Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase font-mono">
              Module 2 · Karza (कर्ज़)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Deterministic 10%/90% Margin Engine
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Smart Scheme-Routing & Moratorium EMI Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Eliminates financial confusion by mapping available margin capital directly to project scale, automatically routing between Micro Finance (6.5%) and Term Loan (8.0%), and structuring realistic moratorium repayment schedules.
          </p>
        </div>

        {/* Quick Test Bench buttons from PPT Slide 3 & Slide 6 */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={loadPptDairyRun}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            title="PPT Slide 6 run: Dairy unit with ₹50,000 margin -> ₹5,00,000 project cost"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>PPT Dairy Run (₹50k)</span>
          </button>
          <button
            onClick={loadPptMicroFinanceRun}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
            title="Micro Finance run: ₹12,000 margin -> ₹1,20,000 project cost"
          >
            <span>Micro Finance (₹12k)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Parameter Slider & Scheme Route Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-orange-600" />
              <h2 className="text-sm font-bold text-slate-900">
                10% Margin Capital Input
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
              Deterministic Logic
            </span>
          </div>

          {/* Slider for Margin Capital */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-mono uppercase font-bold text-slate-500">
                Entrepreneur Margin Capital (₹)
              </label>
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-slate-900">
                  ₹{marginMoney.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  10% of Total Project
                </span>
              </div>
            </div>

            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={marginMoney}
              onChange={(e) => setMarginMoney(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Min: ₹10,000 (Micro)</span>
              <span>₹1.4L Cutoff</span>
              <span>Max: ₹5,00,000 (Term)</span>
            </div>
          </div>

          {/* Scheme Auto-Routing Banner */}
          <div className={`p-4 rounded-xl border ${
            isMicro 
              ? 'bg-blue-50/80 border-blue-200 text-blue-900' 
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
          } space-y-2`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-black tracking-wider px-2 py-0.5 rounded bg-white/80 border border-current shadow-2xs">
                Auto-Routed Scheme: {routeResult.schemeType}
              </span>
              <span className="text-xs font-mono font-bold">
                {routeResult.interestRate}% p.a.
              </span>
            </div>

            <p className="text-xs leading-relaxed font-medium">
              {isMicro ? (
                <>
                  Project cost is within <strong>₹1.40 Lakh</strong> ceiling. Auto-assigned to <strong>Micro Finance Scheme</strong> with <strong>3-month setup moratorium</strong> and 3-year repayment.
                </>
              ) : (
                <>
                  Project cost exceeds ₹1.40 Lakh threshold. Auto-assigned to <strong>Term Loan Scheme</strong> with <strong>6-month machinery setup moratorium</strong> and 7-year tenure.
                </>
              )}
            </p>

            <div className="pt-2 border-t border-current/20 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="opacity-70 block">Tenure:</span>
                <span className="font-bold">{routeResult.tenureYears} Years ({routeResult.tenureMonths} Mos)</span>
              </div>
              <div>
                <span className="opacity-70 block">Moratorium Relief:</span>
                <span className="font-bold">{routeResult.moratoriumMonths} Months Grace</span>
              </div>
            </div>
          </div>

          {/* Key Metric Breakdowns */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Total Project Cost (10x)
              </span>
              <span className="text-base font-black font-mono text-slate-900">
                ₹{routeResult.projectCost.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] font-mono text-emerald-700 uppercase block">
                Sanctioned Loan (90%)
              </span>
              <span className="text-base font-black font-mono text-emerald-700">
                ₹{routeResult.loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Scheme Routing Comparison Table (Direct from PPT Slide 3) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              SIH-26091 Deterministic Routing Table:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="py-1">Scheme</th>
                    <th className="py-1">Project Cost</th>
                    <th className="py-1">Rate</th>
                    <th className="py-1">Tenure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className={isMicro ? 'bg-orange-50 font-bold text-orange-900' : ''}>
                    <td className="py-1.5">Micro Finance</td>
                    <td>Up to ₹1.40 L</td>
                    <td>6.5%</td>
                    <td>3y (3m morat.)</td>
                  </tr>
                  <tr className={!isMicro ? 'bg-orange-50 font-bold text-orange-900' : ''}>
                    <td className="py-1.5">Term Loan</td>
                    <td>₹1.40L – ₹50L</td>
                    <td>8.0%</td>
                    <td>7y (6m morat.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Financial Structuring & Repayment Matrix */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dual-Phase Repayment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phase 1: Moratorium Phase */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Phase 1 · Moratorium Period
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900">
                    {routeResult.moratoriumMonths} Months
                  </span>
                </div>
                <h3 className="text-xs font-bold text-amber-950 uppercase font-mono">
                  Monthly Simple Interest Only
                </h3>
                <p className="text-2xl font-black font-mono text-amber-900 mt-1">
                  ₹{routeResult.moratoriumMonthlyInterest.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-amber-700 font-sans"> / mo</span>
                </p>
                <p className="text-[11px] text-amber-800 mt-2 leading-relaxed">
                  Zero principal burden during initial setup, gestation, and seasonal crop cycles. Total moratorium interest: ₹{(routeResult.moratoriumMonthlyInterest * routeResult.moratoriumMonths).toLocaleString('en-IN')}.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200 mt-3 text-[10px] font-mono text-amber-900 flex justify-between">
                <span>Principal Repaid: ₹0</span>
                <span>Protects Early Working Capital</span>
              </div>
            </div>

            {/* Phase 2: Post-Moratorium EMI */}
            <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Phase 2 · Regular Amortization
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {routeResult.tenureMonths - routeResult.moratoriumMonths} Months
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-300 uppercase font-mono">
                  Post-Moratorium Monthly EMI
                </h3>
                <p className="text-2xl font-black font-mono text-emerald-400 mt-1">
                  ₹{routeResult.postMoratoriumMonthlyEMI.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-300 font-sans"> / mo</span>
                </p>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                  Principal + interest spread comfortably over productive enterprise operating months.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Total Tenure: {routeResult.tenureYears} Years</span>
                <span className="text-emerald-400 font-bold">Concessional MoSJE Rate</span>
              </div>
            </div>
          </div>

          {/* Concessional Credit vs Commercial MFI Comparison (Slide 5: Lower Default Risk) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Government Concession vs Commercial NBFC Baseline
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Direct Beneficiary Relief
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  MoSJE Concessional Total
                </span>
                <span className="text-base font-black font-mono text-slate-900">
                  ₹{routeResult.totalRepayment.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Rate: {routeResult.interestRate}% + Moratorium
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Commercial NBFC / MFI Total
                </span>
                <span className="text-base font-black font-mono text-rose-700 line-through">
                  ₹{(routeResult.loanAmount + routeResult.commercialInterestCost).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Commercial 14% p.a. (No moratorium)
                </span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block">
                  Net Interest Saved
                </span>
                <span className="text-base font-black font-mono text-emerald-700">
                  ₹{routeResult.interestSavedUnderGovt.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-600 block font-medium">
                  Direct cash saved for business
                </span>
              </div>
            </div>

            {/* Visual Interest Burden Bar Graph */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 font-mono">
                  <BarChart2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>Interest Outgo Bar Graph Comparison</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">
                  {Math.round((routeResult.interestSavedUnderGovt / (routeResult.commercialInterestCost || 1)) * 100)}% Cost Reduction
                </span>
              </div>

              {/* Commercial Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">Commercial NBFC (14% p.a., No Moratorium)</span>
                  <span className="font-mono font-bold text-rose-700">₹{routeResult.commercialInterestCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-rose-500 to-rose-600 h-full rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* FinSight MoSJE Concessional Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-900 font-bold">FinSight MoSJE Concessional ({routeResult.interestRate}%, with Moratorium)</span>
                  <span className="font-mono font-bold text-emerald-700">₹{routeResult.totalInterestPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.max(Math.round((routeResult.totalInterestPaid / (routeResult.commercialInterestCost || 1)) * 100), 12)}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Bar: Download Bank Appraisal Dossier */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Format compliant with State Channelizing Agencies (SCAs) & RRB loan sanctions.</span>
              </div>
              <button
                onClick={() => setShowPitchModal(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Printer className="w-3.5 h-3.5 text-orange-400" />
                <span>Generate SCA/CA Loan Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Pitch Kit / Loan Dossier Modal */}
      {showPitchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider">
                  MoSJE Pre-Sanction Project Report
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Beneficiary Financial Structuring Appraisal Dossier
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Reference: FIN-MSJE-2025-08492 · Channelizing Agency Submission
                </p>
              </div>
              <button
                onClick={() => setShowPitchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Dossier Content */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Entrepreneur / Unit</span>
                  <span className="font-bold text-slate-900">{profile.name} ({profile.businessName})</span>
                  <span className="text-[10px] text-slate-500 block">{profile.village}, {profile.block}, {profile.district}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Social Category / SHG</span>
                  <span className="font-bold text-slate-900">{profile.category} · {profile.shgGroup}</span>
                  <span className="text-[10px] text-slate-500 block">Udyam: {profile.udyamNumber}</span>
                </div>
              </div>

              <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 font-mono space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-orange-900 block">
                  Project Cost & Margin Structuring (10% / 90%)
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Total Project Cost:</span>
                    <span className="font-bold text-slate-900">₹{routeResult.projectCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Beneficiary Margin (10%):</span>
                    <span className="font-bold text-emerald-700">₹{routeResult.marginMoney.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Concessional Loan (90%):</span>
                    <span className="font-bold text-slate-900">₹{routeResult.loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                  Amortization & Moratorium Terms:
                </span>
                <ul className="space-y-1.5 text-slate-700 text-xs">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Scheme Routed:</strong> {routeResult.schemeType} at {routeResult.interestRate}% per annum fixed.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Moratorium Relief:</strong> {routeResult.moratoriumMonths} Months gestation (Simple interest: ₹{routeResult.moratoriumMonthlyInterest.toLocaleString('en-IN')}/mo).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Post-Moratorium Regular EMI:</strong> ₹{routeResult.postMoratoriumMonthlyEMI.toLocaleString('en-IN')} for {routeResult.tenureMonths - routeResult.moratoriumMonths} months.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Total Interest Savings vs Commercial NBFC:</strong> ₹{routeResult.interestSavedUnderGovt.toLocaleString('en-IN')}.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowPitchModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Official PDF Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
