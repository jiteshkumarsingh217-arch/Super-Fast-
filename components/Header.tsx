import React from 'react';
import { User, Screen } from '../types';
import { Wallet, Bell } from 'lucide-react';

interface HeaderProps {
  balance: number;
  user: User;
  currentScreen: Screen;
}

export const Header: React.FC<HeaderProps> = ({ balance, user, currentScreen }) => {
  const getTitle = () => {
    switch(currentScreen) {
      case 'dashboard': return `Hi, ${user.name.split(' ')[0]} 👋`;
      case 'game': return 'Game Zone 🎮';
      case 'wallet': return 'My Wallet 💳';
      case 'rewards': return 'Rewards Store 🎁';
      case 'profile': return 'My Profile 👤';
      default: return 'SUPER FAST';
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm sticky top-0 z-30 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold text-white">{getTitle()}</h2>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="bg-slate-800 rounded-full px-3 py-1 flex items-center gap-2 border border-slate-700">
          <Wallet className="w-4 h-4 text-green-400" />
          <span className="font-bold text-green-400">₹{balance}</span>
        </div>
        <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};