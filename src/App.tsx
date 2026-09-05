import React, { useState } from 'react';
import { 
  ViewMode, 
  EntrepreneurProfile, 
  LedgerTransaction, 
  WeeklyDataPoint 
} from './types';
import { 
  PROFILES, 
  INITIAL_TRANSACTIONS, 
  WEEKLY_PROFIT_DATA 
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { VoiceLedgerView } from './components/VoiceLedgerView';
import { FeasibilityAdvisorView } from './components/FeasibilityAdvisorView';
import { KarzaCalculatorView } from './components/KarzaCalculatorView';
import { SchemesView } from './components/SchemesView';
import { ImpactResearchView } from './components/ImpactResearchView';
import { AddTransactionModal } from './components/AddTransactionModal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [currentProfile, setCurrentProfile] = useState<EntrepreneurProfile>(PROFILES[0]);
  const [currentLang, setCurrentLang] = useState<string>('English');
  const [transactions, setTransactions] = useState<LedgerTransaction[]>(INITIAL_TRANSACTIONS);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>(WEEKLY_PROFIT_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [autoOpenVoice, setAutoOpenVoice] = useState(false);

  // Cross-module state flow from Salaah to Karza
  const [carriedMarginMoney, setCarriedMarginMoney] = useState<number>(35000);
  const [carriedCategory, setCarriedCategory] = useState<string>('Pickle & Agro-Food Processing Unit');

  // Dynamic balance calculation based on current profile & transactions
  const balance = currentProfile.currentBalance + transactions.reduce((acc, tx) => {
    return tx.type === 'CREDIT' ? acc + tx.amount : acc - tx.amount;
  }, 0) - INITIAL_TRANSACTIONS.reduce((acc, tx) => {
    return tx.type === 'CREDIT' ? acc + tx.amount : acc - tx.amount;
  }, 0);

  // Add a new transaction (manual or voice-parsed)
  const handleAddTransaction = (newTxData: Omit<LedgerTransaction, 'id' | 'timestamp'>) => {
    const newTx: LedgerTransaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Update Saturday or current day in weekly stats if sales/raw material
    if (newTx.type === 'CREDIT') {
      setWeeklyData((prev) =>
        prev.map((d) =>
          d.day === 'Sat'
            ? { ...d, credit: d.credit + newTx.amount, profit: d.profit + newTx.amount }
            : d
        )
      );
    } else {
      setWeeklyData((prev) =>
        prev.map((d) =>
          d.day === 'Sat'
            ? { ...d, debit: d.debit + newTx.amount, profit: d.profit - newTx.amount }
            : d
        )
      );
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTriggerQuickVoice = () => {
    setAutoOpenVoice(true);
    setActiveView('voice-ledger');
  };

  const handleNavigateFromSalaahToKarza = (margin: number, category: string) => {
    setCarriedMarginMoney(margin);
    setCarriedCategory(category);
    setActiveView('calculator');
  };

  return (
    <div className="h-screen w-screen bg-[#fdfdfd] flex flex-col font-sans text-slate-800 overflow-hidden select-none">
      {/* Geometric Balance App Header */}
      <Header
        currentProfile={currentProfile}
        onSelectProfile={setCurrentProfile}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Geometric Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={(view) => {
            setAutoOpenVoice(false);
            setActiveView(view);
          }}
          balance={balance}
          profile={currentProfile}
          onQuickVoiceTrigger={handleTriggerQuickVoice}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-4 sm:p-6 bg-[#f8fafc] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && (
              <DashboardView
                profile={currentProfile}
                transactions={transactions}
                weeklyData={weeklyData}
                onNavigate={setActiveView}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                onTriggerQuickVoice={handleTriggerQuickVoice}
              />
            )}

            {activeView === 'voice-ledger' && (
              <VoiceLedgerView
                profile={currentProfile}
                transactions={transactions}
                onAddTransaction={handleAddTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                autoOpenVoice={autoOpenVoice}
              />
            )}

            {activeView === 'advisor' && (
              <FeasibilityAdvisorView
                profile={currentProfile}
                onNavigateToKarza={handleNavigateFromSalaahToKarza}
              />
            )}

            {activeView === 'calculator' && (
              <KarzaCalculatorView
                profile={currentProfile}
                initialMarginMoney={carriedMarginMoney}
                initialCategory={carriedCategory}
                onNavigateToFeasibility={() => setActiveView('advisor')}
              />
            )}

            {activeView === 'schemes' && (
              <SchemesView
                profile={currentProfile}
                onSelectSchemeForCalculator={(schemeId) => {
                  setActiveView('calculator');
                }}
              />
            )}

            {activeView === 'impact' && (
              <ImpactResearchView />
            )}
          </div>
        </main>
      </div>

      {/* Global Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
