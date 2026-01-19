import React from 'react';
import { User, Transaction } from '../types';
import { LogOut, User as UserIcon, Shield, HelpCircle, ChevronRight, Youtube, Activity, Facebook, Instagram } from 'lucide-react';

interface ProfileProps {
  user: User;
  transactions: Transaction[];
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, transactions, onLogout }) => {
  const totalWinnings = transactions
    .filter(t => t.type === 'credit' && t.description.includes('Game Win'))
    .reduce((sum, t) => sum + t.amount, 0);

  const gamesPlayed = transactions.filter(t => t.description.includes('Game')).length;

  return (
    <div className="p-4">
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 flex items-center gap-4 border border-slate-700">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-slate-400 text-sm">+91 {user.phoneNumber}</p>
          <p className="text-slate-500 text-xs mt-1">ID: KP{user.phoneNumber.slice(-4)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">Total Winnings</p>
          <p className="text-2xl font-bold text-green-400">₹{totalWinnings}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">Games Played</p>
          <p className="text-2xl font-bold text-white">{gamesPlayed}</p>
        </div>
      </div>
      
      {/* Fake Stats Area for "Private Security" requirement */}
      <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/20 mb-6">
         <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h4 className="font-bold text-indigo-100 text-sm">Live App Activity</h4>
         </div>
         <div className="flex justify-between text-xs text-slate-400">
            <span>Total Downloads:</span>
            <span className="text-white font-bold">10K+</span>
         </div>
         <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Active Players:</span>
            <span className="text-white font-bold">1,245</span>
         </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1 mb-2">Join Community</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <a 
            href="https://www.youtube.com/@Hansoyaar-02" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors shadow-lg"
          >
            <Youtube className="w-6 h-6 text-white" />
            <span className="text-[10px] text-white font-bold">YouTube</span>
          </a>

          <a 
            href="https://www.facebook.com/share/1FDEisAbD4/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors shadow-lg"
          >
            <Facebook className="w-6 h-6 text-white" />
            <span className="text-[10px] text-white font-bold">Facebook</span>
          </a>

          <a 
            href="https://www.instagram.com/hansoyaar_02?igsh=MTVoZXl5cjIzbGRhdg==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-pink-600 hover:bg-pink-700 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors shadow-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
          >
            <Instagram className="w-6 h-6 text-white" />
            <span className="text-[10px] text-white font-bold">Instagram</span>
          </a>
        </div>

        <div className="h-px bg-slate-800 my-4"></div>

        <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700 hover:bg-slate-750 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
        <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700 hover:bg-slate-750 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Help & Support</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        <button 
          onClick={onLogout}
          className="w-full mt-6 bg-red-500/10 hover:bg-red-500/20 p-4 rounded-xl flex items-center justify-center gap-2 border border-red-500/30 transition-colors text-red-500 font-bold"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      <p className="text-center text-slate-600 text-xs mt-8">Version 2.0.0</p>
    </div>
  );
};