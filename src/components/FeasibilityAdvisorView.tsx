import React, { useState } from 'react';
import { 
  EntrepreneurProfile, 
  FeasibilityReport,
  SelectedLocationDetails
} from '../types';
import { 
  FEASIBILITY_PRESETS 
} from '../data/mockData';
import { RealAddressMapPicker } from './RealAddressMapPicker';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Calculator, 
  Compass,
  ArrowRight,
  Printer,
  ShoppingBag,
  Building,
  Layers,
  Coins,
  Map,
  Navigation,
  Globe,
  Check
} from 'lucide-react';

interface FeasibilityAdvisorViewProps {
  profile: EntrepreneurProfile;
  onNavigateToKarza: (marginMoney: number, category: string) => void;
}

export const FeasibilityAdvisorView: React.FC<FeasibilityAdvisorViewProps> = ({
  profile,
  onNavigateToKarza,
}) => {
  // Input states
  const [selectedCategory, setSelectedCategory] = useState<string>(
    'Pickle & Agro-Food Processing Unit'
  );
  const [village, setVillage] = useState(profile.village || 'Bithri Chainpur');
  const [block, setBlock] = useState(profile.block || 'Bithri');
  const [district, setDistrict] = useState(profile.district || 'Bareilly');
  const [marginMoney, setMarginMoney] = useState<number>(20000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [showRealMap, setShowRealMap] = useState(true);

  // Selected accurate geographic location
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocationDetails>({
    formattedAddress: `${profile.village || 'Bithri Chainpur'}, ${profile.block || 'Bithri'}, ${profile.district || 'Bareilly'}, Uttar Pradesh, 243122`,
    village: profile.village || 'Bithri Chainpur',
    block: profile.block || 'Bithri',
    district: profile.district || 'Bareilly',
    state: profile.state || 'Uttar Pradesh',
    pincode: '243122',
    lat: 28.3242,
    lng: 79.4674
  });

  const currentPreset = FEASIBILITY_PRESETS[selectedCategory] || FEASIBILITY_PRESETS['Pickle & Agro-Food Processing Unit'];

  // Handle location update from RealAddressMapPicker
  const handleLocationSelect = (details: SelectedLocationDetails) => {
    setSelectedLocation(details);
    if (details.village) setVillage(details.village);
    if (details.block) setBlock(details.block);
    if (details.district) setDistrict(details.district);
  };

  // Handle category change to adjust default margin
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (FEASIBILITY_PRESETS[category]) {
      setMarginMoney(FEASIBILITY_PRESETS[category].defaultMargin);
    }
  };

  // Quick preset loader (e.g. from PPT Slide 6)
  const handleLoadPptDairySimulation = () => {
    setSelectedCategory('Dairy & Milk Chilling Unit');
    setVillage('Othakadai');
    setBlock('Madurai East');
    setDistrict('Madurai');
    setMarginMoney(50000);
    setSelectedLocation({
      formattedAddress: 'Othakadai, Madurai East, Madurai, Tamil Nadu, 625107',
      village: 'Othakadai',
      block: 'Madurai East',
      district: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625107',
      lat: 9.9723,
      lng: 78.1818
    });
  };

  const totalProjectCost = marginMoney * 10;
  const loanRequired = Math.round(totalProjectCost * 0.90);

  // Dynamic Feasibility Scoring logic
  const calculateScore = () => {
    let base = 82;
    if (selectedCategory === 'Dairy & Milk Chilling Unit') base = 88;
    if (selectedCategory === 'Pickle & Agro-Food Processing Unit') base = 85;
    if (selectedCategory === 'Handloom & Zari Crafts Unit') base = 79;
    if (marginMoney >= 50000) base += 4;
    return Math.min(96, base);
  };

  const feasibilityScore = calculateScore();
  const isGo = feasibilityScore >= 80;

  const handleRecalculate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 450);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner with PPT Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase font-mono">
              Module 1 · Salaah (सलाह)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SIH PS ID 26091 · MoSJE
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Hyper-Local Business Feasibility & Market Reach Advisor
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Eliminates enterprise failure by replacing anecdote-driven decisions with verified geo-demographic data, competitor density mapping, SWOT analysis, and a clear pre-funding Go/No-Go read-out.
          </p>
        </div>

        {/* Action Button: PPT Demo Preset */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadPptDairySimulation}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Load the PPT Slide 6 simulation test: Dairy unit with ₹50,000 capital"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Load PPT Dairy Test (₹50k)</span>
          </button>
        </div>
      </div>

      {/* Input Configuration Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Project Geo-Parameters & Margin Capital Input
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowRealMap(!showRealMap)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                showRealMap 
                  ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 shadow-2xs'
                  : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>{showRealMap ? 'Hide Map Picker' : 'Select Accurate Address on Real Map'}</span>
            </button>
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              Step 1 of 2: Hyper-Local Assessment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Business Category */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Proposed Business Category *
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:border-orange-500"
            >
              {Object.keys(FEASIBILITY_PRESETS).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Village & Block */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Village / Gram Panchayat *
              </label>
              <button
                type="button"
                onClick={() => setShowRealMap(true)}
                className="text-[10px] text-orange-600 font-bold hover:underline cursor-pointer"
              >
                Pin on Map
              </button>
            </div>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Village Name"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          {/* Block & District */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Block & District *
            </label>
            <input
              type="text"
              value={`${block}, ${district}`}
              onChange={(e) => {
                const parts = e.target.value.split(',');
                setBlock(parts[0] ? parts[0].trim() : '');
                setDistrict(parts[1] ? parts[1].trim() : '');
              }}
              placeholder="Block, District"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
            />
          </div>

          {/* Available Margin Capital */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Available Margin (10%) *
              </label>
              <span className="text-[10px] font-mono font-bold text-emerald-600">
                ₹{marginMoney.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="5000"
                max="500000"
                step="5000"
                value={marginMoney}
                onChange={(e) => setMarginMoney(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:border-orange-500"
              />
              <button
                onClick={handleRecalculate}
                disabled={isGenerating}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {isGenerating ? 'Assessing...' : 'Assess'}
              </button>
            </div>
          </div>
        </div>

        {/* Selected Accurate Address Badge Bar */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Accurate Geo-Premises:
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  GPS: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </span>
              </div>
              <p className="font-semibold text-slate-800 truncate text-[11px] mt-0.5">
                {selectedLocation.formattedAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowRealMap(!showRealMap)}
              className="text-xs text-orange-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>{showRealMap ? 'Collapse Map' : 'Adjust Pin on Real Map'}</span>
            </button>
          </div>
        </div>

        {/* Real Interactive Leaflet Map for Precise Address Selection */}
        {showRealMap && (
          <div className="pt-2">
            <RealAddressMapPicker
              initialVillage={village}
              initialBlock={block}
              initialDistrict={district}
              radiusKm={currentPreset.radiusKm}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        )}

        {/* Quick Margin Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
            Quick Margin Presets:
          </span>
          {[15000, 20000, 35000, 50000, 100000].map((amt) => (
            <button
              key={amt}
              onClick={() => setMarginMoney(amt)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                marginMoney === amt
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ₹{amt.toLocaleString('en-IN')}
            </button>
          ))}
          <span className="text-[11px] text-slate-500 ml-auto italic">
            *Auto-leverages 10% Margin / 90% Concessional MoSJE Credit
          </span>
        </div>
      </div>

      {/* Feasibility Assessment Read-Out */}
      {hasGenerated && (
        <div className="space-y-6">
          {/* Top Score & Financial Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Go / No-Go Readout Card */}
            <div className={`rounded-xl border p-5 shadow-xs flex flex-col justify-between ${
              isGo ? 'bg-emerald-950 text-white border-emerald-800' : 'bg-amber-950 text-white border-amber-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Pre-Funding Feasibility Verdict
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono font-bold border border-emerald-500/30">
                    Rule-Based AI Score
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black font-mono tracking-tight text-white">
                    {feasibilityScore}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">/ 100</span>
                  <span className="ml-auto text-xs font-bold px-2.5 py-1 bg-emerald-500 text-slate-950 rounded-md uppercase tracking-wider">
                    {isGo ? 'GO (Viable)' : 'CAUTION'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  High local demand index with low competitor saturation in {village}. Clear unit economics and fast breakeven before committing capital.
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-800/60 mt-4 flex items-center justify-between text-xs text-emerald-300 font-mono">
                <span>Capital Protection: HIGH</span>
                <span>Default Risk: LOW</span>
              </div>
            </div>

            {/* Financial Scaling Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Financial Structuring (10% / 90%)
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Computed Project Capacity
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Margin Capital</p>
                  <p className="text-base font-black font-mono text-slate-900">
                    ₹{marginMoney.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[9px] text-slate-500">10% Entrepreneur</p>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                  <p className="text-[10px] text-emerald-700 font-mono uppercase">Total Project Cost</p>
                  <p className="text-base font-black font-mono text-emerald-700">
                    ₹{totalProjectCost.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[9px] text-emerald-600">10x Capital Scale</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">MoSJE Loan (90%):</span>
                <span className="font-bold text-slate-900">₹{loanRequired.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Quick Action: Seamless Route to Karza */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-mono font-bold uppercase">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Module 2 Integration</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Route to Karza Scheme Engine
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Auto-transfer this ₹{marginMoney.toLocaleString('en-IN')} margin profile to generate exact EMI, moratorium schedules, and bank dossier.
                </p>
              </div>

              <button
                onClick={() => onNavigateToKarza(marginMoney, selectedCategory)}
                className="w-full mt-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 rounded-lg text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Proceed to Karza Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Module 1 Deep Dive: Market Reach & Competitor Mapping */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Reach & Geo-Demographics */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Hyper-Local Market Reach Potential
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  Radius: {currentPreset.radiusKm} km
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Catchment Pop.</span>
                  <span className="text-sm font-bold font-mono text-slate-900">14,200</span>
                  <span className="text-[9px] text-slate-500 block">3 Gram Panchayats</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Target Households</span>
                  <span className="text-sm font-bold font-mono text-slate-900">2,480</span>
                  <span className="text-[9px] text-slate-500 block">Direct Buyers</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Weekly Haat Footfall</span>
                  <span className="text-sm font-bold font-mono text-orange-600">8,500+</span>
                  <span className="text-[9px] text-slate-500 block">Bi-Weekly Market</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Est. Monthly Volume</span>
                  <span className="text-sm font-bold font-mono text-emerald-600">
                    {currentPreset.targetDemandUnits.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-slate-500 block">Units / Month</span>
                </div>
              </div>

              {/* Pricing Guidance */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">Recommended Pricing Guidance:</span>
                  <span className="font-mono font-bold text-amber-800">{currentPreset.avgSellingPrice}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Estimated Gross Margin: <strong className="text-emerald-700">{currentPreset.grossMargin}</strong> · Estimated Breakeven Period: <strong className="text-slate-900">{currentPreset.breakevenMonths} Months</strong>
                </p>
              </div>
            </div>

            {/* Competitor Density Mapping */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Competitor Density & Supply Gap
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Unmet Demand Gap: +38%
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-medium text-slate-600">Competitor Units within {currentPreset.radiusKm}km radius:</span>
                    <span className="font-mono font-bold text-slate-900">{currentPreset.competitorsPerVillage} Units (Low Saturation)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Main Competing Source
                    </p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      Informal Middlemen from District Center
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Charge 15-20% high transport margins. Local processing offers superior price-to-freshness advantage.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Market Absorption Buffer
                    </p>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                      Very High (Capacity to absorb 2 new units)
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Local weekly haat provides guaranteed liquidation channel without expensive advertising.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SWOT Analysis Matrix (From PPT Slide 2 & Slide 3) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-800" />
                <h3 className="text-sm font-bold text-slate-900">
                  Comprehensive SWOT Analysis Matrix for {selectedCategory}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Location: {village}, {block}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Strengths */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>STRENGTHS (Internal Advantages)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] pl-1">
                  {currentPreset.swot.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>WEAKNESSES (Internal Constraints)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] pl-1">
                  {currentPreset.swot.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-bold">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>OPPORTUNITIES (Market Tailwinds)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] pl-1">
                  {currentPreset.swot.opportunities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">★</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200/80 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>THREATS (External Headwinds & Mitigation)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] pl-1">
                  {currentPreset.swot.threats.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
