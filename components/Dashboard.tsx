import React from 'react';
import { Screen } from '../types';
import { Gamepad2, Gift, Plus, ChevronRight, Zap, Trophy, ShieldCheck, Ticket, CircleDashed, Play, Infinity } from 'lucide-react';

interface DashboardProps {
  balance: number;
  tickets: number;
  onNavigate: (screen: Screen) => void;
}

const GAMES_LIST = [
"1B Game", "Shadow Strike", "Fire Rush", "Pixel Warrior", "Battle Zone X", "Dark Hunter", "Speed Legends", "Ninja Escape", "Zombie Town", "Sky Fighters", "Thunder Race", "Ghost Run", "Dragon Quest", "Urban Sniper", "Mega Clash", "Space Raiders", "Road Fury", "Night Survival", "War City", "Alien Attack", "Stealth Mission", "Crazy Jump", "Turbo Drift", "Monster Arena", "Dead Zone", "Ice Warrior", "Jungle Run Pro", "Skyfall Battle", "Robo Wars", "Fire Arena", "Dark City Chase", "Magic Realm", "Power Punch", "Hero Rising", "Shadow Ninja", "Extreme Parkour", "Desert Storm", "Pixel Fight", "Cyber Clash", "Infinity Run", "Battle Kings", "Zombie Escape", "Fast Wheels", "Blade Master", "Space Sprint", "War Machine", "Lava Jump", "Gun Fury", "Silent Assassin", "Monster Run", "Steel Arena", "Dragon Run", "Shadow World", "Turbo Fight", "Galaxy Wars", "Urban Runner", "Ice Storm", "Ninja Dash", "Battle Ground X", "Fire Punch", "Deadly Roads", "Sky Warriors", "Robo Runner", "Night Fighters", "Power Arena", "Jungle Fury", "Alien Escape", "Dark Legends", "Speed Breaker", "War Zone Pro", "Pixel Dash", "Zombie Hunter", "Mega Jump", "Cyber Runner", "Thunder Clash", "Ninja Arena", "Space Hunter", "Street Brawler", "Dragon Fighters", "Turbo Chase", "Shadow Arena", "Ice Dash", "Monster Clash", "Galaxy Runner", "Fire Storm", "War Legends", "Silent Run", "Robo Clash", "Dark Escape", "Power Strike", "Jungle Battle", "Zombie Rush", "Sky Dash", "Ninja Strike", "Alien Wars", "Urban Clash", "Speed Attack", "Shadow Runner", "Fire Legends", "Battle Quest", "Pixel Wars", "Ghost Arena", "Turbo Ninja", "Dark Fighters", "Space Arena", "Mega Run", "War Escape", "Dragon Storm", "Cyber Arena", "Fire Dash", "Ice Battle", "Monster Fury", "Ninja World", "Shadow Wars", "Speed Hunter", "Robo Strike", "Jungle Escape", "Alien Dash", "Dark Run", "Power Rush", "Battle Storm", "Zombie Arena", "Sky Clash", "Ninja Fury", "Space Legends", "Urban Fight", "Fire Runner", "Shadow Dash", "Mega Arena", "War Hunter", "Pixel Runner", "Ghost Dash", "Turbo Arena", "Dark Quest", "Cyber Storm", "Speed Wars", "Ninja Battle", "Alien Runner", "Fire Arena X", "Ice Legends", "Monster Dash", "Dragon Arena", "Shadow Hunter", "Power Battle", "Jungle Run X", "Robo Dash", "Dark Arena", "Speed Ninja", "War Clash", "Pixel Arena", "Zombie Dash", "Sky Battle", "Ninja Legends", "Fire Hunter", "Space Clash", "Urban Dash", "Shadow Strike X", "Mega Fury", "Ice Runner", "Monster Wars", "Cyber Dash", "Dragon Hunter", "Power Arena X", "Jungle Clash", "Robo Legends", "Dark Fury", "Speed Arena", "Ninja Run Pro", "Alien Storm", "Fire Quest", "Shadow Arena X", "Zombie Clash", "Sky Runner", "Ninja Escape Pro", "Space Fury", "Urban Legends", "Power Dash", "Ice Arena", "Monster Quest", "Cyber Hunter", "War Dash", "Dragon Clash", "Shadow Quest", "Fire Ninja", "Jungle Legends", "Robo Arena", "Dark Storm", "Speed Clash", "Alien Arena", "Pixel Fury", "Zombie Hunter X", "Sky Legends", "Ninja Storm", "Fire Arena Pro", "Space Runner X", "Urban Fury", "Shadow Legends", "Mega Storm", "Ice Clash", "Monster Arena X", "Battle Rush"
];

const COLORS = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
  "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
  "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
  "bg-pink-500", "bg-rose-500"
];

export const Dashboard: React.FC<DashboardProps> = ({ balance, tickets, onNavigate }) => {
  // Simulate a larger list by repeating the games
  const DISPLAY_GAMES = [...GAMES_LIST, ...GAMES_LIST, ...GAMES_LIST]; 

  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold">₹ {balance}</h2>
             </div>
             <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
                <Ticket className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{tickets} Tickets</span>
             </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('wallet')}
              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add / Withdraw
            </button>
            <button 
              onClick={() => onNavigate('spin')}
              className="flex-1 bg-yellow-400 text-yellow-900 hover:bg-yellow-300 py-2 px-4 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CircleDashed className="w-4 h-4 animate-spin-slow" /> Spin & Win
            </button>
          </div>
        </div>
      </div>

      {/* Featured Game */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white">Featured Game</h3>
        </div>
        
        <div 
          onClick={() => onNavigate('game')}
          className="bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer group mb-6"
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 py-1">
              <h4 className="font-bold text-lg text-white mb-1">Trivia Quiz</h4>
              <p className="text-slate-400 text-xs mb-3">Answer & Win Real Cash!</p>
              <div className="flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">Win ₹1</span>
                <span className="text-slate-500 text-[10px] flex items-center gap-1"><Ticket className="w-3 h-3" /> Entry: 1 Ticket</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* All Games Grid */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            All Games <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full flex items-center gap-1"><Infinity className="w-3 h-3" /> 1B+</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-8">
            {DISPLAY_GAMES.map((game, index) => {
                const color = COLORS[index % COLORS.length];
                // Using index as key is okay for static lists
                return (
                    <div 
                        key={`${game}-${index}`}
                        onClick={() => onNavigate('game')}
                        className="bg-slate-800 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-indigo-500 transition-colors flex flex-col items-center text-center gap-2"
                    >
                        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shadow-md`}>
                             {/* Simple generic logo based on first letter */}
                             <span className="text-white font-bold text-xl">{game.charAt(0)}</span>
                        </div>
                        <div>
                             <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">{game}</h4>
                             <p className="text-[9px] text-slate-400 mt-1">Play Now</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Quick Stats / Info */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-[10px] text-slate-400">Fast</p>
          <p className="text-xs font-bold text-white">Withdrawal</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-[10px] text-slate-400">Daily</p>
          <p className="text-xs font-bold text-white">Rewards</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-[10px] text-slate-400">100%</p>
          <p className="text-xs font-bold text-white">Secure</p>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 flex items-center justify-between text-white shadow-lg cursor-pointer" onClick={() => onNavigate('rewards')}>
        <div>
          <p className="font-bold text-lg">Petrol Voucher</p>
          <p className="text-xs opacity-90">Redeem your winnings now!</p>
        </div>
        <Gift className="w-10 h-10 opacity-80" />
      </div>
    </div>
  );
};