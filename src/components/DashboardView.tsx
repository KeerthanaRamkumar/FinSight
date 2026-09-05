import React, { useState } from 'react';
import { 
  LedgerTransaction, 
  EntrepreneurProfile, 
  WeeklyDataPoint, 
  ViewMode 
} from '../types';
import { 
  Plus, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Mic, 
  Shield, 
  ExternalLink,
  ChevronRight,
  Filter,
  Calendar,
  BarChart2,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  profile: EntrepreneurProfile;
  transactions: LedgerTransaction[];
  weeklyData: WeeklyDataPoint[];
  onNavigate: (view: ViewMode) => void;
  onOpenAddModal: () => void;
  onTriggerQuickVoice: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  transactions,
  weeklyData,
  onNavigate,
  onOpenAddModal,
  onTriggerQuickVoice,
}) => {
  const [txFilter, setTxFilter] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [activeDayIndex, setActiveDayIndex] = useState<number | null>(5); // Default to Saturday (Haat peak)
  const [barGraphMode, setBarGraphMode] = useState<'profit' | 'dual' | 'survival'>('profit');


  // Filtered transactions
  const filteredTxs = transactions.filter((tx) => {
    if (txFilter === 'CREDIT') return tx.type === 'CREDIT';
    if (txFilter === 'DEBIT') return tx.type === 'DEBIT';
    return true;
  });

  const maxWeeklyProfit = Math.max(...weeklyData.map((d) => d.profit), 1);
  const activeDay = activeDayIndex !== null ? weeklyData[activeDayIndex] : weeklyData[5];

  // Financial summary calculations
  const totalCredits = transactions
    .filter((t) => t.type === 'CREDIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = transactions
    .filter((t) => t.type === 'DEBIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const netWeeklyProfit = weeklyData.reduce((acc, curr) => acc + curr.profit, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner: Micro-Enterprise Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black text-xl shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {profile.businessName}
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded border border-slate-200">
                {profile.district}, {profile.state}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-100 text-orange-800 rounded border border-orange-200">
                {profile.category} Category
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Udyam: <span className="font-mono text-slate-700">{profile.udyamNumber}</span></span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">Bahi-Khata verified for MSJE Concessional Finance</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="btn-quick-voice-entry"
            onClick={onTriggerQuickVoice}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Voice Log Entry</span>
          </button>
          <button
            id="btn-manual-add-entry"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Weekly Net Profit
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">
            +₹{netWeeklyProfit.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +14.2% vs last week
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Working Capital Runway
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">
            42 Days
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Healthy buffer for haat cycle
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Credit Health Score
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
              {profile.creditScore}
            </p>
            <span className="text-[11px] text-slate-400 font-mono">/ 850</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <Shield className="w-3 h-3" /> MSJE Subsidized Tier
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Eligible Govt Subsidy
          </p>
          <p className="text-xl sm:text-2xl font-black text-orange-600 font-mono mt-1">
            ₹75,000
          </p>
          <button 
            onClick={() => onNavigate('calculator')}
            className="text-[11px] text-orange-700 font-bold hover:underline flex items-center gap-0.5 mt-1 cursor-pointer"
          >
            Calculate EMI & Subsidies →
          </button>
        </div>
      </div>

      {/* Main Grid: Weekly Chart + Voice Ledger + AI Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (8 cols): Weekly Profit & Impact Bar Graph */}
        <section 
          id="chart-weekly-profit"
          className="lg:col-span-8 bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col relative overflow-hidden shadow-xs"
        >
          {/* Subtle Decorative Geometric Arc */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100 rounded-bl-full opacity-35 pointer-events-none" />

          {/* Bar Graph Header and Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-orange-600" />
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Financial Bar Graph
                </h2>
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {barGraphMode === 'profit' && 'Daily Net Margin & Haat Inflow'}
                {barGraphMode === 'dual' && 'Daily Income vs. Expenditure (Dual Bar Graph)'}
                {barGraphMode === 'survival' && 'SIH Impact Benchmark: Enterprise Survival'}
              </p>
            </div>

            {/* Mode Toggle Controls */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setBarGraphMode('profit')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                  barGraphMode === 'profit' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Net Profit
              </button>
              <button
                type="button"
                onClick={() => setBarGraphMode('dual')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                  barGraphMode === 'dual' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In vs Out (Dual)
              </button>
              <button
                type="button"
                onClick={() => setBarGraphMode('survival')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  barGraphMode === 'survival' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3 h-3 text-amber-400" />
                <span>Survival 74%</span>
              </button>
            </div>
          </div>

          {/* MODE 1: SINGLE PROFIT BARS */}
          {barGraphMode === 'profit' && (
            <>
              {/* Interactive Geometric Bars */}
              <div className="flex items-end justify-between gap-3 flex-1 pt-6 pb-2 min-h-[160px] z-10">
                {weeklyData.map((d, index) => {
                  const heightPercent = Math.max(Math.round((d.profit / maxWeeklyProfit) * 100), 18);
                  const isSaturday = d.day === 'Sat';
                  const isSelected = activeDayIndex === index;

                  return (
                    <div 
                      key={d.day}
                      onClick={() => setActiveDayIndex(index)}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                    >
                      {/* Hover tooltip indicator */}
                      <span className={`text-[10px] font-mono font-bold transition-opacity ${
                        isSelected ? 'opacity-100 text-slate-800' : 'opacity-0 group-hover:opacity-100 text-slate-500'
                      }`}>
                        ₹{d.profit >= 1000 ? `${(d.profit / 1000).toFixed(1)}k` : d.profit}
                      </span>

                      {/* Geometric bar */}
                      <div className="w-full max-w-[48px] bg-slate-200 rounded-t-sm overflow-hidden flex flex-col justify-end transition-all group-hover:bg-slate-300">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            isSelected 
                              ? isSaturday ? 'bg-emerald-600 ring-2 ring-emerald-400 ring-offset-1' : 'bg-slate-800'
                              : isSaturday ? 'bg-emerald-500' : 'bg-slate-400 group-hover:bg-slate-500'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day Labels */}
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono uppercase border-t border-slate-200/70 pt-2 z-10">
                {weeklyData.map((d, index) => (
                  <span 
                    key={d.day}
                    onClick={() => setActiveDayIndex(index)}
                    className={`flex-1 text-center cursor-pointer transition-colors ${
                      activeDayIndex === index 
                        ? d.day === 'Sat' ? 'text-emerald-700 font-bold' : 'text-slate-900 font-bold' 
                        : d.day === 'Sat' ? 'text-emerald-600 font-semibold' : 'hover:text-slate-700'
                    }`}
                  >
                    {d.day}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs"></span>
                  <span>Saturday Haat Peak: <strong>+₹12,600</strong></span>
                </span>
                <span className="text-[10px] text-slate-400">Click any bar to inspect daily ledger split</span>
              </div>
            </>
          )}

          {/* MODE 2: DUAL COMPARATIVE BAR GRAPH (INCOME VS EXPENSE) */}
          {barGraphMode === 'dual' && (
            <>
              <div className="flex items-end justify-between gap-2 sm:gap-3 flex-1 pt-6 pb-2 min-h-[160px] z-10">
                {weeklyData.map((d, index) => {
                  const maxVal = 17000;
                  const creditHeight = Math.max(Math.round((d.credit / maxVal) * 100), 12);
                  const debitHeight = Math.max(Math.round((d.debit / maxVal) * 100), 12);

                  return (
                    <div 
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
                    >
                      {/* Side-by-Side Dual Bars */}
                      <div className="flex items-end gap-1 w-full justify-center max-w-[54px]">
                        {/* Green Credit Bar */}
                        <div className="w-1/2 bg-slate-200 rounded-t-xs overflow-hidden flex flex-col justify-end">
                          <div
                            style={{ height: `${creditHeight}%` }}
                            className="w-full bg-emerald-600 rounded-t-xs hover:bg-emerald-700 transition-all"
                            title={`Credit (Income): ₹${d.credit.toLocaleString('en-IN')}`}
                          />
                        </div>

                        {/* Rose Debit Bar */}
                        <div className="w-1/2 bg-slate-200 rounded-t-xs overflow-hidden flex flex-col justify-end">
                          <div
                            style={{ height: `${debitHeight}%` }}
                            className="w-full bg-rose-500 rounded-t-xs hover:bg-rose-600 transition-all"
                            title={`Debit (Expense): ₹${d.debit.toLocaleString('en-IN')}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day Labels */}
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono uppercase border-t border-slate-200/70 pt-2 z-10">
                {weeklyData.map((d) => (
                  <span key={d.day} className="flex-1 text-center font-semibold">
                    {d.day}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100 z-10">
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span>
                    <span>Cash Inflow (Income)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-xs"></span>
                    <span>Cash Outflow (Expense)</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Weekly Haat Surplus: +₹25,800
                </span>
              </div>
            </>
          )}

          {/* MODE 3: PPT SLIDE 5 ENTERPRISE SURVIVAL BAR GRAPH */}
          {barGraphMode === 'survival' && (
            <div className="flex-1 flex flex-col justify-between py-2 z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  Illustrative impact comparing micro-enterprises with vs without FinSight:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +32% Active Survival
                </span>
              </div>

              {/* Vertical Bar Graph Visual */}
              <div className="flex items-end justify-center gap-10 py-4 h-40">
                {/* 42% Baseline Bar */}
                <div className="flex flex-col items-center group">
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 mb-1.5">
                    42% Active
                  </span>
                  <div className="w-20 bg-slate-200 rounded-t-md overflow-hidden flex flex-col justify-end">
                    <div 
                      className="w-full bg-gradient-to-t from-rose-500 to-rose-600 rounded-t-md transition-all duration-700"
                      style={{ height: '95px' }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 mt-2 text-center max-w-[120px] leading-tight">
                    Without structured advisory
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">(Status Quo)</span>
                </div>

                {/* 74% FinSight Bar */}
                <div className="flex flex-col items-center group">
                  <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-1.5">
                    74% Active
                  </span>
                  <div className="w-20 bg-slate-200 rounded-t-md overflow-hidden flex flex-col justify-end">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-t-md transition-all duration-700"
                      style={{ height: '160px' }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 mt-2 text-center max-w-[120px] leading-tight">
                    With FinSight advisory
                  </span>
                  <span className="text-[9px] text-emerald-700 font-mono font-semibold">(MoSJE Aligned)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[10px] text-slate-500 font-mono">
                <span>*Illustrative estimate for pitch purposes (PPT Slide 5).</span>
                <button
                  onClick={() => onNavigate('impact')}
                  className="text-orange-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Research & Metrics</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </section>


        {/* Right Col Top (4 cols): Voice Ledger Promo Card */}
        <section 
          id="card-voice-ledger-promo"
          className="lg:col-span-4 bg-indigo-600 rounded-xl shadow-md p-5 text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          {/* Subtle geometric ring */}
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-500/40 rounded-full blur-xs" />
          
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 text-2xl shadow-inner backdrop-blur-xs">
            🎙️
          </div>
          <h2 className="text-lg font-bold mb-1 tracking-tight">Voice Ledger</h2>
          <p className="text-xs text-indigo-100 mb-4 px-2 leading-relaxed">
            Press and speak to record a sale or purchase in Hindi, Tamil, Telugu, or English.
          </p>
          <div className="space-y-2 w-full max-w-[200px]">
            <button
              id="btn-voice-start-recording"
              onClick={onTriggerQuickVoice}
              className="w-full bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-4 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              <span>Start Recording</span>
            </button>
            <button
              onClick={() => onNavigate('voice-ledger')}
              className="w-full text-[11px] text-indigo-200 hover:text-white underline py-1 cursor-pointer"
            >
              Open Full Bahi-Khata Ledger
            </button>
          </div>
        </section>
      </div>

      {/* Second Row: AI Business Advisor + Recommended Schemes & Loans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recommended Schemes & Loans (8 cols) */}
        <section 
          id="section-recommended-schemes"
          className="lg:col-span-8 bg-slate-900 rounded-xl p-5 text-white flex flex-col relative overflow-hidden shadow-md"
        >
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4 z-10">
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Recommended Schemes & Loans
              </h2>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                Targeted Financial Assistance for {profile.category} Category Micro-Units
              </p>
            </div>
            <button
              onClick={() => onNavigate('schemes')}
              className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 5 Schemes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 z-10">
            {/* Scheme Card 1: NBCFDC (MSJE Flagship) */}
            <div 
              onClick={() => onNavigate('calculator')}
              className="border border-slate-700 bg-slate-800/60 p-4 rounded-lg flex flex-col justify-between hover:border-orange-500/80 transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-orange-950 text-orange-400 px-2 py-0.5 rounded border border-orange-800">
                    MSJE Flagship
                  </span>
                  <span className="text-[10px] text-slate-400">4% Eff. Interest</span>
                </div>
                <p className="text-sm font-bold text-white mt-2 group-hover:text-orange-300 transition-colors">
                  NBCFDC Term Loan (New Swarnima)
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Concessional term loans for rural OBC/EBC artisans & kirana operators.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Up to ₹5,00,000
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-white flex items-center gap-1 font-medium">
                  Check EMI <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Scheme Card 2: PM Vishwakarma */}
            <div 
              onClick={() => onNavigate('calculator')}
              className="border border-slate-700 bg-slate-800/60 p-4 rounded-lg flex flex-col justify-between hover:border-orange-500/80 transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    Collateral-Free
                  </span>
                  <span className="text-[10px] text-slate-400">5% Fixed Rate</span>
                </div>
                <p className="text-sm font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                  PM Vishwakarma Scheme
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Tranche 1 & 2 credit plus ₹15,000 toolkits for craftspersons & village makers.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Up to ₹3,00,000
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-white flex items-center gap-1 font-medium">
                  Check EMI <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Business Advisor Right (4 cols) */}
        <section 
          id="section-ai-advisor-brief"
          className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              AI Business Advisor
            </h2>
            <button
              onClick={() => onNavigate('advisor')}
              className="text-[11px] font-bold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer"
            >
              Explore Mandi →
            </button>
          </div>

          <div className="space-y-3 flex-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Opportunity</p>
                <span className="text-[9px] text-emerald-600 font-bold font-mono">+5.02%</span>
              </div>
              <p className="text-xs text-slate-700 mt-1 font-medium leading-snug">
                Demand for Mustard Seeds at Bareilly Mandi is climbing. Dispatch before Friday for +₹1,850 gain.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Inventory Alert</p>
              <p className="text-xs text-slate-700 mt-1 font-medium leading-snug">
                Fertilizer DAP prices usually peak next month. Bulk purchase via Kisan Mitra SHG recommended.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-700 uppercase">Success Strategy</p>
              <p className="text-xs text-slate-800 mt-1 font-medium leading-snug">
                Micro-entrepreneurs in your cluster cut interest costs by 78% by refinancing via NBCFDC.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Third Row: Recent Transactions (Local Ledger) */}
      <section 
        id="section-recent-transactions"
        className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Recent Transactions (Local Ledger)
            </h2>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">
              Digital Bahi-Khata Ledger Records ({filteredTxs.length} entries)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs */}
            <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setTxFilter('ALL')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  txFilter === 'ALL' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTxFilter('CREDIT')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  txFilter === 'CREDIT' ? 'bg-white font-bold text-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Credits (Jama)
              </button>
              <button
                onClick={() => setTxFilter('DEBIT')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  txFilter === 'DEBIT' ? 'bg-white font-bold text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Debits (Kharcha)
              </button>
            </div>

            <button
              onClick={onOpenAddModal}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer transition-colors"
              title="Add New Entry"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table - Geometric Balance Theme */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">DATE</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">ITEM / SERVICE</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider hidden md:table-cell">PARTY / CATEGORY</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider hidden sm:table-cell">MODE</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">TYPE</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTxs.slice(0, 6).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono text-slate-500 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{tx.item}</span>
                      {tx.voiceRecorded && (
                        <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-600 text-[9px] rounded font-mono font-medium border border-indigo-100 flex items-center gap-0.5">
                          <Mic className="w-2.5 h-2.5" /> Voice
                        </span>
                      )}
                    </div>
                    {tx.note && (
                      <p className="text-[10px] text-slate-400 truncate max-w-xs">{tx.note}</p>
                    )}
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <p className="text-slate-600 truncate">{tx.party}</p>
                    <span className="text-[10px] text-slate-400">{tx.category}</span>
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                      {tx.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`font-semibold text-[11px] ${
                      tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-slate-900">
                    <span className={tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {Math.min(filteredTxs.length, 6)} of {filteredTxs.length} entries</span>
          <button
            onClick={() => onNavigate('voice-ledger')}
            className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Ledger & Export Statement</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
