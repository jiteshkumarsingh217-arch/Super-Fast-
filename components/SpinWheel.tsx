import React, { useState } from 'react';
import { Screen } from '../types';
import { Ticket, ArrowLeft, Loader2, Star } from 'lucide-react';

interface SpinWheelProps {
  onReward: (type: 'ticket' | 'cash', value: number) => void;
  onNavigate: (screen: Screen) => void;
}

const SEGMENTS = [
  { label: '1 Ticket', type: 'ticket', value: 1, color: '#3b82f6' },
  { label: '₹1 Cash', type: 'cash', value: 1, color: '#22c55e' },
  { label: '5 Tickets', type: 'ticket', value: 5, color: '#a855f7' },
  { label: 'Try Again', type: 'ticket', value: 0, color: '#64748b' },
  { label: '2 Tickets', type: 'ticket', value: 2, color: '#f59e0b' },
  { label: '100 Tickets', type: 'ticket', value: 100, color: '#ec4899' },
  { label: '₹5 Cash', type: 'cash', value: 5, color: '#10b981' },
  { label: '1 Ticket', type: 'ticket', value: 1, color: '#3b82f6' },
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ onReward, onNavigate }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState<string | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setReward(null);

    // Calculate random spin
    const randomSegmentIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    // Rotate at least 5 times (1800 deg) + random segment
    // We need to land on the index. The wheel rotates clockwise.
    // Index 0 is at 0 degrees (top? right? standard CSS rotate is clockwise from top if we set it up right)
    const extraRotations = 1800 + Math.random() * 360; 
    const finalRotation = rotation + extraRotations;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Determine result based on angle
      // Normalize angle to 0-360
      const normalizedRotation = finalRotation % 360;
      // This is a rough estimation for visual effect. 
      // For a real app, we'd pre-determine the result index and rotate to it.
      // Let's just pick a random result logically since the visual is random too.
      const result = SEGMENTS[Math.floor(Math.random() * SEGMENTS.length)];
      
      setReward(`You won ${result.label}!`);
      if (result.value > 0) {
        onReward(result.type as 'ticket'|'cash', result.value);
      }
    }, 3000); // 3s animation duration
  };

  return (
    <div className="h-full flex flex-col items-center p-4 bg-slate-900 relative overflow-hidden">
        {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 z-0"></div>

      <div className="z-10 w-full mb-4 flex items-center justify-between">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-white">Spin & Win Tickets</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
        
        {/* Pointer */}
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400 z-20 translate-y-2 drop-shadow-lg"></div>

        {/* Wheel Container */}
        <div 
            className="w-72 h-72 rounded-full border-4 border-slate-700 relative shadow-2xl overflow-hidden transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {SEGMENTS.map((seg, i) => {
                const angle = 360 / SEGMENTS.length;
                return (
                    <div 
                        key={i}
                        className="absolute top-0 left-0 w-full h-full origin-center flex justify-center pt-2"
                        style={{ 
                            transform: `rotate(${i * angle}deg)`,
                            clipPath: 'polygon(50% 50%, 0 0, 100% 0)' // Rough sector approximation or better use conic gradient
                        }}
                    >
                        {/* 
                           Building a proper wheel with CSS clip-path is tricky for dynamic segments. 
                           Simpler approach: Conic gradient background and just labels. 
                        */}
                    </div>
                );
            })}
            
            {/* Simpler Visual Wheel using Conic Gradient */}
            <div className="absolute inset-0 rounded-full" 
                style={{
                    background: `conic-gradient(
                        ${SEGMENTS.map((s, i) => `${s.color} ${i * (100/SEGMENTS.length)}% ${(i+1) * (100/SEGMENTS.length)}%`).join(', ')}
                    )`
                }}
            ></div>

            {/* Labels overlay */}
            {SEGMENTS.map((seg, i) => {
                const angle = 360 / SEGMENTS.length;
                const rotate = i * angle + angle/2;
                return (
                    <div 
                        key={i}
                        className="absolute top-0 left-1/2 -ml-0.5 h-1/2 origin-bottom text-center pt-8"
                        style={{ transform: `rotate(${rotate}deg)` }}
                    >
                        <span className="text-white font-bold text-xs drop-shadow-md block -rotate-90 w-24 -ml-12">{seg.label}</span>
                    </div>
                );
            })}
            
            {/* Center Cap */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center z-20">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
        </div>

        {/* Stand */}
        <div className="w-4 h-16 bg-slate-700 rounded-b-lg -mt-4 z-0"></div>
        <div className="w-32 h-4 bg-slate-700 rounded-full z-0"></div>

        <div className="mt-8 h-20 w-full text-center">
            {reward && !isSpinning ? (
                <div className="animate-bounce">
                    <p className="text-yellow-400 font-bold text-xl">{reward}</p>
                    <p className="text-slate-400 text-sm">Tickets added to balance!</p>
                </div>
            ) : (
                <p className="text-slate-400 text-sm">Spin to win up to 100 Tickets!</p>
            )}
        </div>

        <button 
            onClick={spin}
            disabled={isSpinning}
            className="mt-4 px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
        >
            {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};