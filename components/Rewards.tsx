import React from 'react';
import { Fuel, Smartphone, Gift, Lock } from 'lucide-react';

interface RewardsProps {
  balance: number;
  onRedeem: (amount: number, item: string) => void;
}

export const Rewards: React.FC<RewardsProps> = ({ balance, onRedeem }) => {
  const handleRedeem = (cost: number, item: string) => {
    if (balance >= cost) {
      if (window.confirm(`Redeem ${item} for ₹${cost}?`)) {
        onRedeem(cost, item);
        alert(`Success! Voucher code for ${item} has been sent to your number.`);
      }
    } else {
      alert("Insufficient Balance!");
    }
  };

  const RewardCard = ({ icon: Icon, title, cost, color }: any) => {
    const canAfford = balance >= cost;
    
    return (
      <div className={`bg-slate-800 rounded-2xl p-5 border ${canAfford ? 'border-slate-700' : 'border-slate-800 opacity-70'} relative overflow-hidden group`}>
        <div className={`absolute top-0 right-0 p-3 bg-${color}-500/10 rounded-bl-2xl`}>
            <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
        
        <h4 className="font-bold text-lg text-white mb-1 w-3/4">{title}</h4>
        <p className="text-slate-400 text-xs mb-4">Instant delivery</p>
        
        <div className="flex justify-between items-end">
            <span className="text-xl font-bold text-white">₹{cost}</span>
            <button 
                onClick={() => handleRedeem(cost, title)}
                disabled={!canAfford}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    canAfford 
                    ? `bg-${color}-600 hover:bg-${color}-700 text-white shadow-lg` 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
            >
                {canAfford ? 'Redeem' : <Lock className="w-4 h-4 inline" />}
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Rewards Store</h2>
        <p className="text-slate-400">Use your winnings for real-life benefits.</p>
      </div>

      <div className="grid gap-4">
        <RewardCard 
            icon={Fuel} 
            title="Petrol Voucher" 
            cost={100} 
            color="orange" 
        />
        <RewardCard 
            icon={Smartphone} 
            title="Mobile Recharge" 
            cost={50} 
            color="blue" 
        />
        <RewardCard 
            icon={Gift} 
            title="Amazon Gift Card" 
            cost={200} 
            color="yellow" 
        />
        <RewardCard 
            icon={Fuel} 
            title="Diesel Voucher" 
            cost={500} 
            color="red" 
        />
      </div>

      <div className="mt-8 bg-indigo-900/30 rounded-xl p-4 border border-indigo-500/30">
        <h4 className="font-bold text-indigo-300 mb-2">How it works?</h4>
        <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
            <li>Play games and win money in your wallet.</li>
            <li>Select a reward from the list above.</li>
            <li>Click Redeem if you have enough balance.</li>
            <li>Receive the voucher code instantly via SMS.</li>
        </ol>
      </div>
    </div>
  );
};