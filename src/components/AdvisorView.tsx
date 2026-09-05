import React, { useState } from 'react';
import { 
  MandiCommodity, 
  AdvisoryInsight, 
  EntrepreneurProfile 
} from '../types';
import { MANDI_COMMODITIES, ADVISORY_INSIGHTS } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Lightbulb, 
  Users, 
  Package, 
  Truck, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Sparkles,
  ArrowRight,
  Calculator
} from 'lucide-react';

interface AdvisorViewProps {
  profile: EntrepreneurProfile;
  onNavigateToCalculator: () => void;
}

export const AdvisorView: React.FC<AdvisorViewProps> = ({
  profile,
  onNavigateToCalculator,
}) => {
  const [selectedCommodity, setSelectedCommodity] = useState<MandiCommodity>(MANDI_COMMODITIES[0]);
  
  // Arbitrage Calculator State
  const [quantityQuintals, setQuantityQuintals] = useState<number>(10);
  const [localTraderPrice, setLocalTraderPrice] = useState<number>(5350);
  const [transportCost, setTransportCost] = useState<number>(600);

  // Collective Pool Opt-in State
  const [hasJoinedPool, setHasJoinedPool] = useState<boolean>(false);

  // Advisory Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Namaste ${profile.name}! I am your FinSight Hyper-Local Advisor for ${profile.district}. Today, Bareilly APMC yard is reporting strong mustard demand, and 6 SHG members are pooling a bulk fertilizer order. How can I help optimize your margins today?`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);

  // Calculate Net Mandi Arbitrage
  const grossLocalRevenue = quantityQuintals * localTraderPrice;
  const grossMandiRevenue = quantityQuintals * selectedCommodity.currentPrice;
  const netMandiRevenue = grossMandiRevenue - transportCost;
  const netArbitrageGain = netMandiRevenue - grossLocalRevenue;

  const handleAskQuestion = (promptText?: string) => {
    const query = promptText || inputQuestion;
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { role: 'user', text: query }]);
    setInputQuestion('');
    setIsAskingAI(true);

    setTimeout(() => {
      let responseText = '';
      const lower = query.toLowerCase();

      if (lower.includes('mustard') || lower.includes('sarson') || lower.includes('sell')) {
        responseText = `Based on current arrivals at ${selectedCommodity.market}, mustard prices are trading at ₹${selectedCommodity.currentPrice}/quintal (${selectedCommodity.changePercent > 0 ? '+' : ''}${selectedCommodity.changePercent}% today). We recommend selling at least 60% of your stock before the Friday Haat to lock in this premium, as arrivals from neighboring Pilibhit district are expected to increase next week.`;
      } else if (lower.includes('loan') || lower.includes('nbcfdc') || lower.includes('subsidy')) {
        responseText = `As an ${profile.category} micro-entrepreneur in ${profile.state}, you are eligible for the NBCFDC New Swarnima Scheme offering loans up to ₹5,00,000 at only 4% effective interest with a 6-month moratorium. Your credit score of ${profile.creditScore} puts you in the fast-track approval tier through your local Regional Rural Bank (RRB).`;
      } else if (lower.includes('freight') || lower.includes('transport') || lower.includes('pool')) {
        responseText = `You can save up to ₹450 per trip by booking through the Kisan Mitra SHG shared tempo service operating every Tuesday and Saturday between ${profile.district} village cluster and the main APMC yard.`;
      } else {
        responseText = `For your ${profile.sector} enterprise in ${profile.district}, maintaining daily digital Bahi-Khata records increases your working capital loan eligibility by 35%. The Ministry of Social Justice & Empowerment currently subsidizes interest rates for registered rural artisans and shopkeepers.`;
      }

      setChatMessages((prev) => [...prev, { role: 'assistant', text: responseText }]);
      setIsAskingAI(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Hyper-Local Business Advisory
            </h1>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase tracking-wider">
              {profile.district} Mandi Cluster
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time agricultural market intelligence, middleman arbitrage calculators, and community collective buying pools engineered for rural micro-units.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Live APMC Feeds:</span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Synced 10m ago
          </span>
        </div>
      </div>

      {/* Mandi Price Benchmarking Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Regional Mandi & Haat Benchmarks
            </h2>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              Current Commodities Trading in {profile.district} District
            </p>
          </div>
          <span className="text-xs text-slate-400 italic">
            Click commodity row to model net arbitrage
          </span>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">COMMODITY</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">MARKET / MANDI</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">TODAY'S RATE</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">24H TREND</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider pl-4">HAAT SCHEDULE</th>
                <th className="text-center py-2.5 font-semibold uppercase tracking-wider">RECOMMENDATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MANDI_COMMODITIES.map((c) => {
                const isSelected = selectedCommodity.id === c.id;
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCommodity(c)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-orange-50/70 font-medium' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{c.commodityName}</span>
                        <span className="text-[10px] text-slate-400 font-hindi">({c.hindiName})</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">
                      {c.market}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-slate-900">
                      ₹{c.currentPrice.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ Qtl</span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold font-mono text-[11px] ${
                          c.trend === 'up'
                            ? 'text-emerald-600'
                            : c.trend === 'down'
                            ? 'text-red-500'
                            : 'text-slate-500'
                        }`}
                      >
                        {c.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                        {c.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                        {c.trend === 'neutral' && <Minus className="w-3 h-3" />}
                        {c.changePercent > 0 ? '+' : ''}
                        {c.changePercent}%
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-slate-500 text-[11px]">
                      {c.haatDay}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          c.recommendation === 'SELL_NOW'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : c.recommendation === 'HOLD'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {c.recommendation === 'SELL_NOW'
                          ? 'Sell Today'
                          : c.recommendation === 'HOLD'
                          ? 'Hold Stock'
                          : 'Bulk Buy'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Mandi vs Middleman Arbitrage Modeler + Collective Buying Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Mandi vs Local Middleman Arbitrage Modeler (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-orange-500" />
                  Mandi Arbitrage Calculator
                </h3>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  Model Net Margin: Selling to Local Middleman vs. APMC Yard
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                {selectedCommodity.commodityName}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Quantity (Quintals)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantityQuintals}
                  onChange={(e) => setQuantityQuintals(Math.max(1, Number(e.target.value)))}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono font-bold text-slate-800"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Local Trader Offer (₹/Qtl)
                </label>
                <input
                  type="number"
                  value={localTraderPrice}
                  onChange={(e) => setLocalTraderPrice(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono font-bold text-slate-800"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Est. Transport / Cartage (₹)
                </label>
                <input
                  type="number"
                  value={transportCost}
                  onChange={(e) => setTransportCost(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Arbitrage Result Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Net Profit By Taking Crop to APMC Yard
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className={`text-2xl font-black font-mono ${netArbitrageGain > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {netArbitrageGain > 0 ? '+' : ''}₹{netArbitrageGain.toLocaleString('en-IN')}
                  </p>
                  <span className="text-xs text-slate-400">
                    (after ₹{transportCost} cartage deduction)
                  </span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                <p className="text-[10px] text-slate-400 uppercase font-mono">APMC Gross</p>
                <p className="text-sm font-bold text-slate-100 font-mono">
                  ₹{grossMandiRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">Local Village Offer</p>
                <p className="text-sm font-bold text-slate-400 font-mono">
                  ₹{grossLocalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Recommendation: Dispatch to {selectedCommodity.market}
            </span>
          </div>
        </div>

        {/* Collective Buying Pool Card (5 cols) */}
        <div className="lg:col-span-5 bg-orange-50/70 rounded-xl border border-orange-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-orange-200/80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-bold text-orange-950 uppercase tracking-widest">
                  SHG Collective Buying Pool
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-200 text-orange-900 rounded font-bold">
                Closes in 2d
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              <p className="text-sm font-bold text-orange-950">
                Bulk Organic Packing Sacks & Fertilizer Order
              </p>
              <p className="text-xs text-orange-900 leading-relaxed">
                6 micro-units in <strong>{profile.shgGroup}</strong> are pooling their order for HDPE woven bags and DAP fertilizer. Reaching 50 units unlocks a 12% factory wholesale rebate.
              </p>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-semibold text-orange-900 mb-1">
                  <span>Pool Target: 42 / 50 bags pledged</span>
                  <span className="text-orange-700">84%</span>
                </div>
                <div className="w-full h-2.5 bg-orange-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full w-[84%]" />
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-orange-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Individual Savings:</span>
                  <span className="font-bold text-emerald-600 font-mono">₹1,400</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shared Freight Saving:</span>
                  <span className="font-bold text-emerald-600 font-mono">₹350</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-orange-200/80">
            {hasJoinedPool ? (
              <div className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Pledged with {profile.shgGroup}!</span>
              </div>
            ) : (
              <button
                id="btn-join-collective-pool"
                onClick={() => setHasJoinedPool(true)}
                className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Pledge 5 Bags to Group Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Advisory Q&A Chat Interactive Engine */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              FinSight AI Advisory Engine
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            District Model: {profile.district} (MSJE Trained)
          </span>
        </div>

        {/* Chat message stream */}
        <div className="my-4 space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isAskingAI && (
            <div className="flex justify-start">
              <div className="bg-slate-50 text-slate-500 border border-slate-200 rounded-xl px-4 py-2 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span>Synthesizing local market advisory...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick query chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px]">
          <span className="text-slate-400 font-semibold shrink-0">Suggestions:</span>
          <button
            onClick={() => handleAskQuestion("Should I sell mustard today at Bareilly Mandi?")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition-colors cursor-pointer border border-slate-200 font-medium"
          >
            Should I sell mustard today?
          </button>
          <button
            onClick={() => handleAskQuestion("How does NBCFDC scheme benefit my business?")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition-colors cursor-pointer border border-slate-200 font-medium"
          >
            How does NBCFDC scheme benefit me?
          </button>
          <button
            onClick={() => handleAskQuestion("How to reduce transport freight costs to the haat?")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition-colors cursor-pointer border border-slate-200 font-medium"
          >
            How to reduce transport freight?
          </button>
        </div>

        {/* Input Bar */}
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Ask anything about local prices, seasonal stock, or loan terms..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
          />
          <button
            onClick={() => handleAskQuestion()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>Ask Advisor</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
