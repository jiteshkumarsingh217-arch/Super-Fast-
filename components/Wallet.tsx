import React, { useState } from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, CreditCard, History, Wallet as WalletIcon, Banknote, QrCode } from 'lucide-react';

interface WalletProps {
  balance: number;
  transactions: Transaction[];
  onAddMoney: (amount: number, upiId: string) => void;
  onWithdraw: (amount: number, method: string) => void;
}

export const Wallet: React.FC<WalletProps> = ({ balance, transactions, onAddMoney, onWithdraw }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'withdraw'>('add');
  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState<'upi' | 'bank'>('upi');
  const [details, setDetails] = useState('');
  const [addUpiId, setAddUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount);
    if (!val || val < 10) return;

    if (activeTab === 'withdraw' && val > balance) {
        alert("Insufficient Balance");
        return;
    }

    if (activeTab === 'add' && !addUpiId) {
        alert("Please enter UPI ID to proceed");
        return;
    }

    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'add') {
        onAddMoney(val, addUpiId);
        alert(`Payment Request sent to ${addUpiId}! Payment Successful.`);
      } else {
        onWithdraw(val, method === 'upi' ? `UPI (${details})` : `Bank (${details})`);
        alert('Withdrawal Request Submitted Successfully!');
      }
      setAmount('');
      setDetails('');
      setAddUpiId('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Current Balance */}
      <div className="text-center py-6">
        <p className="text-slate-400 mb-2">Available Balance</p>
        <h1 className="text-5xl font-bold text-white mb-2">₹ {balance.toFixed(2)}</h1>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
        <button 
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'add' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            onClick={() => { setActiveTab('add'); setAmount(''); }}
        >
            Add Money
        </button>
        <button 
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'withdraw' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            onClick={() => { setActiveTab('withdraw'); setAmount(''); }}
        >
            Withdraw
        </button>
      </div>

      {/* Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            {activeTab === 'add' ? <CreditCard className="w-5 h-5 text-green-400" /> : <Banknote className="w-5 h-5 text-orange-400" />} 
            {activeTab === 'add' ? 'Add Money via UPI' : 'Withdraw Money'}
        </h3>
        <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">₹</span>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (Min ₹10)"
                    className="w-full bg-slate-900 border border-slate-600 rounded-xl py-4 pl-10 pr-4 text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="10"
                    required
                />
            </div>

            {activeTab === 'add' && (
                <div className="mb-4">
                    <div className="relative">
                        <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                            type="text" 
                            value={addUpiId}
                            onChange={(e) => setAddUpiId(e.target.value)}
                            placeholder="Enter UPI ID (e.g. user@upi)"
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 ml-1">You will receive a payment request on your UPI app.</p>
                </div>
            )}

            {activeTab === 'withdraw' && (
                <div className="mb-4 space-y-3">
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setMethod('upi')} className={`flex-1 py-2 rounded-lg border text-sm ${method === 'upi' ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600 text-slate-400'}`}>UPI</button>
                        <button type="button" onClick={() => setMethod('bank')} className={`flex-1 py-2 rounded-lg border text-sm ${method === 'bank' ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600 text-slate-400'}`}>Bank</button>
                    </div>
                    <input 
                        type="text" 
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder={method === 'upi' ? "Enter UPI ID (e.g. 98765@ybl)" : "Enter Account Number"}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
            )}
            
            {activeTab === 'add' && (
                <div className="flex gap-2 mb-4">
                    {[10, 50, 100, 500].map(val => (
                        <button 
                            key={val}
                            type="button"
                            onClick={() => setAmount(val.toString())}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs py-2 rounded-lg text-slate-300 transition-colors"
                        >
                            ₹{val}
                        </button>
                    ))}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading || !amount || parseInt(amount) < 10 || (activeTab === 'add' && !addUpiId) || (activeTab === 'withdraw' && !details)}
                className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg ${
                    activeTab === 'add' 
                    ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' 
                    : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/20'
                } disabled:opacity-50 disabled:cursor-not-allowed text-white`}
            >
                {loading ? 'Processing...' : (activeTab === 'add' ? 'Pay Securely' : 'Withdraw Now')}
            </button>
        </form>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="font-bold text-white mb-4 flex items-center gap-2 px-2">
            <History className="w-5 h-5 text-slate-400" /> Recent Transactions
        </h3>
        <div className="space-y-3 pb-4">
            {transactions.length === 0 ? (
                <div className="text-center text-slate-500 py-8 bg-slate-800/50 rounded-xl">
                    No transactions yet.
                </div>
            ) : (
                transactions.map(tx => (
                    <div key={tx.id} className="bg-slate-800 rounded-xl p-4 flex justify-between items-center border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-medium text-white">{tx.description}</p>
                                <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <span className={`font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                        </span>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};