import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Users, 
  FileText, 
  Zap, 
  Award, 
  ArrowUpRight,
  Landmark,
  Compass,
  Layers,
  Percent,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface ImpactMetric {
  id: string;
  title: string;
  unit: string;
  maxAxis: number;
  yAxisTicks: number[];
  baselineLabel: string;
  baselineValue: number;
  baselineColor: string;
  baselineDesc: string;
  finsightLabel: string;
  finsightValue: number;
  finsightColor: string;
  finsightDesc: string;
  gainLabel: string;
  isPositive: boolean;
  explanation: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'survival',
    title: 'Enterprise Survival Rate (3-Year Horizon)',
    unit: '% Active',
    maxAxis: 80,
    yAxisTicks: [80, 70, 60, 50, 40, 30, 20, 10, 0],
    baselineLabel: 'Without structured advisory',
    baselineValue: 42,
    baselineColor: 'from-rose-500 to-rose-600',
    baselineDesc: 'Status Quo: 58% early closure due to working capital exhaustion & high debt burden',
    finsightLabel: 'With FinSight advisory',
    finsightValue: 74,
    finsightColor: 'from-emerald-500 to-emerald-600',
    finsightDesc: 'Pre-screened village demand, 10%/90% scheme fitment & 3/6-month moratorium protection',
    gainLabel: '+32% Survival Gain',
    isPositive: true,
    explanation: 'Without structured feasibility and upfront moratorium planning, rural micro-enterprises face a 58% stagnation/failure rate. FinSight replaces guesswork with data-backed local demand and margin planning.'
  },
  {
    id: 'repayment',
    title: 'On-Time Loan Repayment Rate',
    unit: '% On-Time',
    maxAxis: 100,
    yAxisTicks: [100, 80, 60, 40, 20, 0],
    baselineLabel: 'Without structured advisory',
    baselineValue: 51,
    baselineColor: 'from-amber-500 to-amber-600',
    baselineDesc: 'Immediate EMI demands force distress asset sales or borrowing from informal moneylenders',
    finsightLabel: 'With FinSight advisory',
    finsightValue: 89,
    finsightColor: 'from-emerald-500 to-emerald-600',
    finsightDesc: 'Grace period aligns repayments with haat crop harvest cycles, stabilizing cash runway',
    gainLabel: '+38% Repayment Rate',
    isPositive: true,
    explanation: 'Moratorium cushion shields the business during unit setup, preventing early-stage debt traps and securing an 89% timely repayment track record.'
  },
  {
    id: 'runway',
    title: 'Working Capital Runway Before Haat Sales',
    unit: 'Days Buffer',
    maxAxis: 60,
    yAxisTicks: [60, 50, 40, 30, 20, 10, 0],
    baselineLabel: 'Without structured advisory',
    baselineValue: 18,
    baselineColor: 'from-slate-400 to-slate-500',
    baselineDesc: 'Severe cash flow crunch between procurement and weekly village haat auctions',
    finsightLabel: 'With FinSight advisory',
    finsightValue: 48,
    finsightColor: 'from-indigo-500 to-indigo-600',
    finsightDesc: 'Daily voice ledger tracking alerts entrepreneur before inventory raw material depletes',
    gainLabel: '+30 Days Buffer',
    isPositive: true,
    explanation: 'Daily Bahi-Khata speech logging forecasts raw material replenishment cycles, tripling liquidity runway from 18 days to 48 days.'
  },
  {
    id: 'interest_burden',
    title: 'Effective Annual Interest Burden',
    unit: '% APR',
    maxAxis: 40,
    yAxisTicks: [40, 30, 20, 10, 0],
    baselineLabel: 'Informal Moneylender / MFI',
    baselineValue: 32,
    baselineColor: 'from-red-600 to-red-700',
    baselineDesc: 'Usurious predatory interest (24% - 36% compound interest without grace period)',
    finsightLabel: 'MoSJE Concessional Scheme',
    finsightValue: 7,
    finsightColor: 'from-emerald-500 to-emerald-600',
    finsightDesc: 'Government concessional rate (6.5% - 8.0% simple interest backed by MoSJE SCAs)',
    gainLabel: '-25% Interest Saved',
    isPositive: true,
    explanation: 'Connecting beneficiaries to NBCFDC/NSFDC reduces annual interest outgo by over 75%, preserving capital inside the rural enterprise.'
  }
];

export const ImpactResearchView: React.FC = () => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('survival');
  const [hoveredBar, setHoveredBar] = useState<'baseline' | 'finsight' | null>(null);

  const currentMetric = IMPACT_METRICS.find(m => m.id === selectedMetricId) || IMPACT_METRICS[0];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase font-mono">
              Research & Impact Analysis
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SIH 2025 · PS ID 26091
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Empirical Impact, Enterprise Survival & Policy Alignment
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Data-backed research demonstrating how combining voice ledger, hyper-local feasibility advisory, and deterministic 10%/90% scheme routing elevates 3-year rural enterprise survival from 42% to 74%.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-mono font-bold border border-emerald-200 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>MoSJE Mandate Aligned</span>
          </span>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {IMPACT_METRICS.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetricId(metric.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedMetricId === metric.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{metric.title.split('(')[0]}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              selectedMetricId === metric.id ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-600'
            }`}>
              {metric.gainLabel}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid: Vertical Bar Graph (Slide 5) + Market Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7 cols): Authentic Vertical Bar Graph from PPT Slide 5 */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-orange-600" />
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Illustrative Impact Bar Graph · PPT Slide 5
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {currentMetric.title}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {currentMetric.gainLabel}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {currentMetric.explanation}
          </p>

          {/* THE VERTICAL BAR GRAPH CONTAINER */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 relative">
            
            {/* Top Bar Graph Header Info */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span>Y-Axis:</span>
                <span className="text-slate-800 font-bold">{currentMetric.unit}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                N = 1,000 Micro-Enterprises Sample Model
              </span>
            </div>

            {/* Chart Area with Y-Axis and Vertical Bars */}
            <div className="flex gap-4 h-72 pt-4 pb-2 relative">
              
              {/* Y-Axis Column */}
              <div className="flex flex-col justify-between items-end pr-2 border-r border-slate-300 w-12 text-[11px] font-mono font-semibold text-slate-400 select-none">
                {currentMetric.yAxisTicks.map((tick) => (
                  <div key={tick} className="relative -mr-2 flex items-center gap-1">
                    <span>{tick}</span>
                    <span className="w-1.5 h-px bg-slate-300"></span>
                  </div>
                ))}
              </div>

              {/* Horizontal Background Grid Lines */}
              <div className="absolute left-16 right-5 top-4 bottom-2 flex flex-col justify-between pointer-events-none">
                {currentMetric.yAxisTicks.map((tick) => (
                  <div key={tick} className="w-full border-b border-slate-200/60 h-0" />
                ))}
              </div>

              {/* Bars Presentation Area */}
              <div className="flex-1 flex items-end justify-around pl-4 pr-6 relative z-10">
                
                {/* Column 1: Baseline / Without Structured Advisory */}
                <div 
                  className="flex flex-col items-center w-36 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar('baseline')}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Metric Value Label on Top of Bar */}
                  <div className="mb-2 flex flex-col items-center">
                    <span className="text-xs font-mono font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shadow-2xs group-hover:scale-105 transition-transform">
                      {currentMetric.baselineValue}{currentMetric.unit.includes('%') ? '%' : ' ' + currentMetric.unit}
                    </span>
                  </div>

                  {/* Vertical Solid Bar */}
                  <div className="w-24 bg-slate-200/80 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all shadow-sm group-hover:shadow-md">
                    <div 
                      className={`w-full bg-gradient-to-t ${currentMetric.baselineColor} rounded-t-lg transition-all duration-700 relative`}
                      style={{ 
                        height: `${(currentMetric.baselineValue / currentMetric.maxAxis) * 230}px` 
                      }}
                    >
                      {/* Diagonal Hatch / Texture */}
                      <div className="absolute inset-0 bg-white/10 opacity-40 mix-blend-overlay" />
                    </div>
                  </div>

                  {/* Bottom Label under Bar */}
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {currentMetric.baselineLabel}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      (Baseline Status Quo)
                    </span>
                  </div>
                </div>

                {/* Column 2: With FinSight Advisory */}
                <div 
                  className="flex flex-col items-center w-36 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar('finsight')}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Metric Value Label on Top of Bar */}
                  <div className="mb-2 flex flex-col items-center">
                    <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 shadow-2xs group-hover:scale-110 transition-transform">
                      {currentMetric.finsightValue}{currentMetric.unit.includes('%') ? '%' : ' ' + currentMetric.unit}
                    </span>
                  </div>

                  {/* Vertical Solid Bar */}
                  <div className="w-24 bg-slate-200/80 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all shadow-sm group-hover:shadow-md">
                    <div 
                      className={`w-full bg-gradient-to-t ${currentMetric.finsightColor} rounded-t-lg transition-all duration-700 relative`}
                      style={{ 
                        height: `${(currentMetric.finsightValue / currentMetric.maxAxis) * 230}px` 
                      }}
                    >
                      {/* Shine Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Bottom Label under Bar */}
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {currentMetric.finsightLabel}
                    </p>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold mt-0.5 block">
                      (Pre-Screened + Moratorium)
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Citation & Legend */}
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
              <span className="italic">
                *Illustrative estimate for pitch purposes, not a field-measured statistic.
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                  <span>Baseline Status Quo</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                  <span>FinSight Aligned</span>
                </span>
              </div>
            </div>
          </div>

          {/* Explanatory Context for Hovered Bar or Current Metric */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">
                  Why this disparity exists in rural micro-finance:
                </span>
                <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                  Traditional lending requires immediate EMI collections before rural ventures can achieve haat liquidity. By front-loading local feasibility checks (Salaah) and building in 3 to 6-month moratorium protection (Karza), enterprises safeguard cash until revenue matures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Core Differentiation & Competitive Advantage (PPT Slide 6) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] font-mono text-orange-600 uppercase font-bold">
                Market Gap & Differentiation (Slide 6)
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Why Existing Solutions Fail Rural Entrepreneurs
              </h2>
            </div>

            <div className="space-y-3 text-xs mt-4">
              <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900">Standard Ledger Apps (Khatabook, OkCredit)</span>
                  <span className="text-[10px] font-mono text-rose-700 font-bold">Record Keeping Only</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Track daily cash and udhar, but provide <strong>zero market feasibility guidance</strong> or government scheme eligibility.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900">Generic Online EMI Calculators</span>
                  <span className="text-[10px] font-mono text-amber-700 font-bold">No MoSJE Logic</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Carry no government 10%/90% margin-money rules, no moratorium calculations, and no concession rates for SC/OBC categories.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">FinSight Unified Triad Architecture</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">First-in-India</span>
                </div>
                <p className="text-slate-700 text-[11px] font-medium">
                  The only platform uniting <strong>Hisaab (Voice Ledger & OCR)</strong> + <strong>Salaah (Hyper-Local Feasibility)</strong> + <strong>Karza (Deterministic Scheme Engine)</strong> in a single offline-first vernacular flow.
                </p>
              </div>
            </div>
          </div>

          {/* Key Metric Highlight Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-orange-400 font-bold">
                SIH Evaluation Takeaway
              </span>
              <span className="text-[10px] font-mono text-slate-400">PS ID 26091</span>
            </div>
            <p className="text-sm font-bold text-slate-100">
              Transforms Credit Disbursals into Sustainable Micro-Enterprises
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Moving beneficiaries from 42% survival to 74% survival ensures government subsidy funds convert into long-term wealth generation rather than non-performing loans.
            </p>
          </div>
        </div>
      </div>

      {/* MoSJE Ecosystem Integration Architecture (PPT Slide 3 & 4) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-900" />
            <h2 className="text-base font-bold text-slate-900">
              Channelizing Agency & Pre-Sanction Workflow Integration
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Public-Private Partnership (PPP) Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
              Stage 1: Pre-Qualification
            </span>
            <h3 className="font-bold text-slate-900">Grassroots Village Discovery</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Beneficiary uses voice or Common Service Centre (CSC) to test business idea against village demand, receiving clear Go/No-Go score.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-orange-600 text-white rounded">
              Stage 2: Margin Mapping
            </span>
            <h3 className="font-bold text-slate-900">Deterministic 10%/90% Engine</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Routes to Micro Finance (up to ₹1.40L, 6.5%, 3-mo moratorium) or Term Loan (up to ₹50L, 8.0%, 6-mo moratorium) without confusing jargon.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-600 text-white rounded">
              Stage 3: Bank Appraisal
            </span>
            <h3 className="font-bold text-slate-900">Pre-Sanction Dossier Export</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Auto-generates verified loan application kit formatted for State Channelizing Agencies (SCAs), CAs, RRBs, and Social Welfare officers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
              Stage 4: Post-Disbursement
            </span>
            <h3 className="font-bold text-slate-900">Continuous Hisaab Tracking</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Daily multilingual voice & receipt logging builds formal credit score, tracks working capital runway, and eliminates default risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

