import React, { useState } from 'react';
import { Screen, TriviaQuestion } from '../types';
import { getTriviaQuestion, getWinningMessage } from '../services/geminiService';
import { Loader2, AlertCircle, Coins, CheckCircle, XCircle, Ticket } from 'lucide-react';

interface GameZoneProps {
  balance: number;
  tickets: number;
  onConsumeTicket: () => void;
  onGameEnd: (winAmount: number) => void;
  onNavigate: (screen: Screen) => void;
}

const WIN_AMOUNT = 1;

export const GameZone: React.FC<GameZoneProps> = ({ balance, tickets, onConsumeTicket, onGameEnd, onNavigate }) => {
  const [gameState, setGameState] = useState<'start' | 'loading' | 'playing' | 'result'>('start');
  const [question, setQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [winMessage, setWinMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const startGame = async () => {
    if (tickets < 1) {
      setError("No Tickets! Spin the wheel to get more tickets.");
      return;
    }
    setError('');
    
    // Consume ticket
    onConsumeTicket();
    
    setGameState('loading');
    const q = await getTriviaQuestion();
    if (q) {
      setQuestion(q);
      setGameState('playing');
    } else {
      setError("Failed to load game. Check internet.");
      setGameState('start');
    }
  };

  const handleAnswer = async (option: string) => {
    if (selectedOption) return; // Prevent double click
    setSelectedOption(option);
    
    const won = option === question?.correctAnswer;
    setIsCorrect(won);
    
    if (won) {
        // Generate winning message in background
        getWinningMessage(WIN_AMOUNT).then(setWinMessage);
        onGameEnd(WIN_AMOUNT);
    } else {
        onGameEnd(0);
    }

    setTimeout(() => {
      setGameState('result');
    }, 1500);
  };

  const resetGame = () => {
    setGameState('start');
    setQuestion(null);
    setSelectedOption(null);
    setIsCorrect(false);
    setWinMessage('');
  };

  if (gameState === 'start') {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse">
          <Coins className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Game</h2>
        <p className="text-slate-400 mb-8 max-w-xs">Correct Answer: ₹{WIN_AMOUNT} | Wrong Answer: ₹0</p>
        
        <div className="bg-slate-800 p-4 rounded-xl w-full max-w-xs mb-8 border border-slate-700">
            <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
                <span className="text-slate-400 flex items-center gap-2"><Ticket className="w-4 h-4" /> Entry Fee</span>
                <span className="text-white font-bold">1 Ticket</span>
            </div>
            <div className="flex justify-between items-center text-lg pt-1">
                <span className="text-green-400 font-bold">Winning Prize</span>
                <span className="text-green-400 font-bold">₹{WIN_AMOUNT}</span>
            </div>
        </div>

        {error && (
            <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 mb-4 text-sm">
                <AlertCircle className="w-4 h-4" /> {error}
            </div>
        )}

        {tickets < 1 ? (
             <button 
             onClick={() => onNavigate('spin')}
             className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
           >
             <Ticket className="w-5 h-5" /> Get Tickets
           </button>
        ) : (
            <button 
            onClick={startGame}
            className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95"
          >
            Play Now
          </button>
        )}
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-400 animate-pulse">Preparing Question...</p>
        </div>
    );
  }

  if (gameState === 'result') {
    return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            {isCorrect ? (
                <>
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">You Won ₹{WIN_AMOUNT}!</h2>
                    <p className="text-slate-300 mb-8 italic">"{winMessage || "Great job!"}"</p>
                </>
            ) : (
                <>
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Wrong Answer</h2>
                    <p className="text-slate-400 mb-8">You won ₹0. Better luck next time!</p>
                </>
            )}

            <button 
                onClick={resetGame}
                className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all mb-4"
            >
                Play Again
            </button>
            <button 
                onClick={() => onNavigate('dashboard')}
                className="text-slate-400 hover:text-white transition-colors"
            >
                Back to Home
            </button>
        </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
            <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase mb-2">Question</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                {question?.question}
            </h3>

            <div className="space-y-3">
                {question?.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const showCorrect = selectedOption && option === question.correctAnswer;
                    const showWrong = isSelected && option !== question.correctAnswer;

                    let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-700";
                    // If option is selected or we are showing results
                    if (selectedOption) {
                        if (option === question.correctAnswer) {
                            btnClass = "bg-green-600 border-green-500"; // Correct is always Green
                        } else if (isSelected && option !== question.correctAnswer) {
                            btnClass = "bg-red-600 border-red-500"; // Wrong selected is Red
                        } else {
                            btnClass = "bg-slate-800 border-slate-700 opacity-50"; // Others dimmed
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedOption}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-white ${btnClass}`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{option}</span>
                                {selectedOption && option === question.correctAnswer && <CheckCircle className="w-5 h-5 text-white" />}
                                {selectedOption && isSelected && option !== question.correctAnswer && <XCircle className="w-5 h-5 text-white" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    </div>
  );
};