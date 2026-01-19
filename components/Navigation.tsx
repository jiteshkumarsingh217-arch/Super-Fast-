import React from 'react';
import { Screen } from '../types';
import { Home, Gamepad2, Wallet, Gift, User } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { id: 'game', icon: <Gamepad2 className="w-6 h-6" />, label: 'Play' },
    { id: 'rewards', icon: <Gift className="w-6 h-6" />, label: 'Rewards' },
    { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe z-40 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};