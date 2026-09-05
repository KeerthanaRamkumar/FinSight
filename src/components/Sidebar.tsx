import React from 'react';
import { ViewMode, EntrepreneurProfile } from '../types';
import { 
  LayoutDashboard, 
  Mic, 
  Lightbulb, 
  Calculator, 
  FileText, 
  TrendingUp,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  balance: number;
  profile: EntrepreneurProfile;
  onQuickVoiceTrigger: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  balance,
  profile,
}) => {
  const navItems: { id: ViewMode; label: string; subLabel: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      subLabel: 'Overview & Health',
      icon: <LayoutDashboard className="w-5 h-5 text-slate-700" />,
    },
    {
      id: 'voice-ledger',
      label: 'Hisaab (हिसाब)',
      subLabel: 'Voice & Bill OCR',
      icon: <Mic className="w-5 h-5 text-indigo-600" />,
      badge: 'Module 1',
    },
    {
      id: 'advisor',
      label: 'Salaah (सलाह)',
      subLabel: 'Feasibility & SWOT',
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      badge: 'Module 2',
    },
    {
      id: 'calculator',
      label: 'Karza (कर्ज़)',
      subLabel: '10%/90% Scheme Engine',
      icon: <Calculator className="w-5 h-5 text-emerald-600" />,
      badge: 'Module 3',
    },
    {
      id: 'schemes',
      label: 'MoSJE Schemes',
      subLabel: 'Concessional Credit',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      badge: 'Portals',
    },
    {
      id: 'impact',
      label: 'Impact & Research',
      subLabel: 'SIH-26091 Presentation',
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      badge: '74% Survival',
    },
  ];

  return (
    <aside className="w-64 bg-slate-100 border-r border-slate-200 flex flex-col p-4 gap-2 shrink-0 h-full overflow-y-auto">
      {/* Current Balance Card - Geometric Balance Theme */}
      <div 
        id="sidebar-balance-card"
        className="px-3 py-4 mb-2 bg-white rounded-lg shadow-sm border border-slate-200 text-center relative group"
      >
        <p className="text-2xl font-bold text-emerald-600 font-mono tracking-tight">
          ₹{balance.toLocaleString('en-IN')}
        </p>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
          Current Balance
        </p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Score: <strong className="text-slate-800">{profile.creditScore}</strong>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded border border-emerald-200">
            Bank Ready
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all ${
                isActive
                  ? 'bg-white border-l-4 border-orange-500 font-bold text-slate-900 shadow-sm rounded-r-md'
                  : 'text-slate-500 hover:bg-white/80 hover:text-slate-800 cursor-pointer rounded-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0">{item.icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm tracking-tight leading-tight">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.subLabel}</span>
                </div>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-orange-100 text-orange-800 border border-orange-200'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Self Help Group / Micro-Unit Badge */}
      <div className="px-3 py-2 bg-slate-200/60 rounded-lg border border-slate-300/60 text-[11px] text-slate-600">
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Affiliation</p>
        <p className="font-semibold text-slate-800 truncate">{profile.shgGroup}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{profile.district} Cluster</p>
      </div>

      {/* Village Insight Card - Geometric Balance Theme */}
      <div 
        id="sidebar-village-insight"
        className="mt-auto p-4 bg-orange-50 rounded-lg border border-orange-100"
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-bold text-orange-800 uppercase italic flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
            Village Insight
          </p>
          <span className="text-[9px] font-mono text-orange-700 bg-orange-100 px-1 py-0.2 rounded">
            Live
          </span>
        </div>
        <p className="text-xs leading-relaxed text-orange-900 font-medium">
          Mandi prices in {profile.district} up by 5.02% today for Mustard Seeds. Friday Haat expected high footfall.
        </p>
        <button
          onClick={() => onNavigate('advisor')}
          className="mt-2 text-[11px] font-bold text-orange-700 hover:text-orange-900 underline flex items-center gap-1 cursor-pointer"
        >
          View haat price spread →
        </button>
      </div>
    </aside>
  );
};
