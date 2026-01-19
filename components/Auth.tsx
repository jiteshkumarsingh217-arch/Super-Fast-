import React, { useState } from 'react';
import { Phone, ArrowRight, Loader2, Zap } from 'lucide-react';

interface AuthProps {
  onLogin: (phoneNumber: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(phoneNumber);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center justify-center mb-10">
            {/* Logo Construction */}
            <div className="relative mb-2">
                <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 p-4 rounded-2xl shadow-2xl shadow-orange-500/30 transform -rotate-3 border-2 border-yellow-200/50">
                    <Zap className="w-12 h-12 text-white fill-white" />
                </div>
            </div>
            
            <h1 className="text-5xl font-black italic tracking-tighter text-white transform -skew-x-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              SUPER <span className="text-yellow-400">FAST</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium tracking-wide text-sm">Play Games. Win Real Money.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-xl">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || phoneNumber.length < 10}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get OTP <ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-slate-400 text-sm">OTP sent to +91 {phoneNumber}</p>
                <button 
                  type="button" 
                  onClick={() => setStep('phone')}
                  className="text-indigo-400 text-xs mt-1 hover:underline"
                >
                  Change Number
                </button>
              </div>
              
              <div className="flex justify-center gap-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                  className="w-32 text-center bg-slate-900 border border-slate-700 rounded-xl py-3 text-2xl tracking-widest text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  maxLength={4}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};