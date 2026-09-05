import React, { useState } from 'react';
import { GovtScheme, EntrepreneurProfile } from '../types';
import { GOVT_SCHEMES } from '../data/mockData';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  ChevronRight, 
  Sparkles, 
  Search, 
  Building2, 
  ArrowRight,
  Calculator
} from 'lucide-react';

interface SchemesViewProps {
  profile: EntrepreneurProfile;
  onSelectSchemeForCalculator: (schemeId: string) => void;
}

export const SchemesView: React.FC<SchemesViewProps> = ({
  profile,
  onSelectSchemeForCalculator,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'MSJE' | 'COLLATERAL_FREE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = GOVT_SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.acronym.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === 'ALL' ||
      (filterType === 'MSJE' && scheme.msjeSpecialFocus) ||
      (filterType === 'COLLATERAL_FREE' && scheme.collateralFree);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Ministry Schemes & Financial Assistance Directory
            </h1>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase tracking-wider">
              MSJE & Central Portals
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Verified concessional financing schemes, interest subvention programs, and capital subsidies curated for rural backward classes, scheduled castes, and micro-entrepreneurs.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterType === 'ALL' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Schemes
            </button>
            <button
              onClick={() => setFilterType('MSJE')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterType === 'MSJE' ? 'bg-white font-bold text-orange-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MSJE Focused
            </button>
            <button
              onClick={() => setFilterType('COLLATERAL_FREE')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterType === 'COLLATERAL_FREE' ? 'bg-white font-bold text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Zero Collateral
            </button>
          </div>
        </div>
      </div>

      {/* Schemes List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between gap-6"
          >
            {/* Left Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                  {scheme.acronym}
                </span>
                {scheme.msjeSpecialFocus && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-orange-800 rounded border border-orange-200">
                    MSJE Flagship
                  </span>
                )}
                {scheme.collateralFree && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                    Collateral-Free
                  </span>
                )}
                <span className="text-[11px] text-slate-500 font-medium">
                  {scheme.ministry}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {scheme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {scheme.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Target Beneficiaries:
                  </p>
                  <p className="text-slate-700 font-medium">{scheme.targetBeneficiary}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Primary MSJE Benefit:
                  </p>
                  <p className="text-emerald-700 font-medium">
                    {scheme.interestSubsidy}% Interest Subsidy (Effective Rate: {scheme.effectiveRate}%)
                  </p>
                </div>
              </div>

              {/* Key Benefits List */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                  Core Highlights:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {scheme.keyBenefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full md:w-56 bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between shrink-0">
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                    Max Sanction Limit
                  </p>
                  <p className="text-lg font-black font-mono text-slate-900">
                    ₹{scheme.maxAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                    Concessional Interest
                  </p>
                  <p className="text-base font-black font-mono text-emerald-600">
                    {scheme.effectiveRate}% p.a.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onSelectSchemeForCalculator(scheme.id)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5 text-orange-400" />
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
