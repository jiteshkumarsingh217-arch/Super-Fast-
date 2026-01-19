import React, { useState, useEffect } from 'react';
import { User, Transaction, Screen } from './types';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { GameZone } from './components/GameZone';
import { Wallet } from './components/Wallet';
import { Rewards } from './components/Rewards';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { SpinWheel } from './components/SpinWheel';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [balance, setBalance] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(5); // Start with 5 free tickets
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for existing session
  useEffect(() => {
    const timer = setTimeout(() => {
      // For demo purposes, we start at auth
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (phoneNumber: string) => {
    setUser({ phoneNumber, name: 'Player 1' });
    setCurrentScreen('dashboard');
    // Give a welcome bonus transaction
    if (balance === 0) {
      addTransaction(10, 'Welcome Bonus', 'credit');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
    setBalance(0);
    setTickets(5);
    setTransactions([]);
  };

  const addTransaction = (amount: number, description: string, type: 'credit' | 'debit') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      description,
      date: new Date().toISOString(),
      type
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => type === 'credit' ? prev + amount : prev - amount);
  };

  const handleTicketChange = (amount: number, type: 'add' | 'remove') => {
    setTickets(prev => type === 'add' ? prev + amount : Math.max(0, prev - amount));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-800">
      
      {/* Header */}
      {currentScreen !== 'auth' && (
        <Header 
          balance={balance} 
          user={user} 
          currentScreen={currentScreen} 
        />
      )}

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {currentScreen === 'dashboard' && (
          <Dashboard 
            balance={balance} 
            tickets={tickets}
            onNavigate={setCurrentScreen} 
          />
        )}
        {currentScreen === 'game' && (
          <GameZone 
            balance={balance}
            tickets={tickets}
            onConsumeTicket={() => handleTicketChange(1, 'remove')}
            onGameEnd={(winAmount) => {
              if (winAmount > 0) addTransaction(winAmount, 'Game Win', 'credit');
            }}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'spin' && (
          <SpinWheel 
            onReward={(type, value) => {
              if (type === 'ticket') handleTicketChange(value, 'add');
              if (type === 'cash') addTransaction(value, 'Spin Reward', 'credit');
            }}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'wallet' && (
          <Wallet 
            balance={balance} 
            transactions={transactions} 
            onAddMoney={(amount, upiId) => addTransaction(amount, `Wallet Deposit (UPI: ${upiId})`, 'credit')}
            onWithdraw={(amount, method) => addTransaction(amount, `Withdrawal to ${method}`, 'debit')}
          />
        )}
        {currentScreen === 'rewards' && (
          <Rewards 
            balance={balance}
            onRedeem={(amount, item) => addTransaction(amount, `Redeemed: ${item}`, 'debit')}
          />
        )}
        {currentScreen === 'profile' && (
          <Profile 
            user={user} 
            transactions={transactions} 
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
      />
    </div>
  );
};

export default App;