import React, { useState } from 'react';
import { EntrepreneurProfile } from '../types';
import { PROFILES } from '../data/mockData';
import { ShieldCheck, ChevronDown, Check, Globe } from 'lucide-react';

interface HeaderProps {
  currentProfile: EntrepreneurProfile;
  onSelectProfile: (profile: EntrepreneurProfile) => void;
  currentLang: string;
  onSelectLang: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onSelectProfile,
  currentLang,
  onSelectLang,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="h-16 bg-[#1e293b] flex items-center justify-between px-4 sm:px-6 md:px-8 text-white shadow-md shrink-0 border-b border-slate-700 z-30">
      {/* Left Branding */}
      <div className="flex items-center gap-3">
        <div 
          id="app-logo-badge"
          className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center font-black text-xl text-white shadow-sm"
        >
          F
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            FinSight
          </span>
          <span className="text-sm font-light text-slate-300 hidden sm:inline">
            | MSJE AI Prototype
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-slate-700/80 text-orange-400 rounded border border-slate-600">
            PS ID 26091
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Vernacular Language Selector */}
        <div className="relative">
          <button
            id="lang-selector-btn"
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowProfileMenu(false);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 px-2.5 py-1.5 rounded border border-slate-700 hover:border-slate-600 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-medium hidden sm:inline">{currentLang}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-xl py-1 z-50">
              {[
                { code: 'English', label: 'English' },
                { code: 'हिंदी', label: 'हिंदी (Hindi)' },
                { code: 'தமிழ்', label: 'தமிழ் (Tamil)' },
                { code: 'తెలుగు', label: 'తెలుగు (Telugu)' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLang(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-700 transition-colors ${
                    currentLang === lang.code ? 'text-orange-400 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span>{lang.label}</span>
                  {currentLang === lang.code && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Switcher & Info */}
        <div className="relative">
          <button
            id="profile-selector-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowLangMenu(false);
            }}
            className="flex items-center gap-3 text-left p-1 rounded-lg hover:bg-slate-800/80 transition-colors group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider leading-none">
                {currentProfile.sector}
              </p>
              <p className="text-sm font-semibold text-slate-100 group-hover:text-orange-400 transition-colors flex items-center gap-1">
                {currentProfile.name}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-600 via-slate-500 to-orange-500 p-0.5 border-2 border-slate-600 shadow-sm flex items-center justify-center font-bold text-xs text-white">
              {currentProfile.name.charAt(0)}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1e293b] border border-slate-700 rounded-lg shadow-2xl py-2 z-50">
              <div className="px-3 py-2 border-b border-slate-700 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Micro-Entrepreneur Persona
              </div>
              {PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProfile(p);
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 flex items-start gap-3 hover:bg-slate-800/90 transition-colors border-b border-slate-700/50 last:border-none ${
                    currentProfile.id === p.id ? 'bg-slate-800/80' : ''
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-orange-400 shrink-0 mt-0.5">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-100 truncate">{p.name}</p>
                      <span className="text-[9px] px-1.5 py-0.5 bg-orange-950/80 text-orange-400 rounded border border-orange-800 font-mono">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate">{p.businessName}</p>
                    <p className="text-[10px] text-slate-400">{p.district}, {p.state}</p>
                  </div>
                  {currentProfile.id === p.id && (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  )}
                </button>
              ))}
              <div className="p-2 bg-slate-900/80 m-2 rounded text-[11px] text-slate-300 flex items-center gap-2 border border-slate-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Udyam Assist: {currentProfile.udyamNumber}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
