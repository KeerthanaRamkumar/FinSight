import React, { useState } from 'react';
import { 
  LedgerTransaction, 
  TransactionType, 
  TransactionCategory, 
  PaymentMode 
} from '../types';
import { X, Plus, Check } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<LedgerTransaction, 'id' | 'timestamp'>) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<TransactionType>('CREDIT');
  const [category, setCategory] = useState<TransactionCategory>('Sales');
  const [party, setParty] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('Cash');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !amount || Number(amount) <= 0) return;

    onAddTransaction({
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      item: item.trim(),
      amount: Number(amount),
      type,
      category,
      party: party.trim() || 'Direct Rural Counter',
      paymentMode,
      note: note.trim() || undefined,
    });

    onClose();
    // Reset fields
    setItem('');
    setAmount('');
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono text-orange-600 font-bold uppercase">
              Bahi-Khata Entry
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Add Ledger Transaction
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
              Item / Crop / Service Name *
            </label>
            <input
              type="text"
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="e.g. Paddy Sale (10 bags), Urea Fertilizer..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="₹ Amount"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
                Type (Khata) *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
                className={`w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-hidden ${
                  type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                <option value="CREDIT">CREDIT (Jama / Income)</option>
                <option value="DEBIT">DEBIT (Kharcha / Expense)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="Sales">Sales</option>
                <option value="Raw Material">Raw Material</option>
                <option value="Transport">Transport</option>
                <option value="Storage / Rent">Storage / Rent</option>
                <option value="Utility / Electricity">Utility / Electricity</option>
                <option value="Labor / Wage">Labor / Wage</option>
                <option value="Govt Subsidy">Govt Subsidy</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="Cash">Cash (नकद)</option>
                <option value="UPI">UPI (PhonePe / GPay)</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Udhar (Credit)">Udhar (Credit)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
              Customer / Vendor Party
            </label>
            <input
              type="text"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              placeholder="e.g. Bareilly APMC Buyer, Ramu Farmer"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase font-semibold text-slate-500 block mb-1">
              Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Bill #84, weekly haat stall"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
