
import React, { useState } from 'react';

interface LoginModalProps {
  mode?: 'login' | 'change';
  correctPin: string;
  onClose: () => void;
  onSuccess: () => void;
  onUpdatePin?: (newPin: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ mode = 'login', correctPin, onClose, onSuccess, onUpdatePin }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<1 | 2>(1); // 1: Initial entry, 2: Confirmation for change
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (pin === correctPin) {
        onSuccess();
      } else {
        triggerError();
      }
    } else {
      // Change mode
      if (step === 1) {
        if (pin.length > 0) {
          setStep(2);
        } else {
          triggerError();
        }
      } else {
        if (pin === confirmPin) {
          onUpdatePin?.(pin);
        } else {
          triggerError();
          setConfirmPin('');
        }
      }
    }
  };

  const triggerError = () => {
    setError(true);
    if (mode === 'login' || step === 1) setPin('');
    else setConfirmPin('');
    setTimeout(() => setError(false), 500);
  };

  const title = mode === 'login' ? 'OWNER ACCESS' : step === 1 ? 'UPDATE CODE' : 'CONFIRM NEW CODE';
  const subtitle = mode === 'login' ? 'Enter security code' : step === 1 ? 'Enter your new security code' : 'Re-enter the new code to confirm';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
      <div className={`bg-zinc-900 border ${error ? 'border-red-600 animate-shake' : 'border-white/10'} w-full max-w-sm rounded-3xl p-8 shadow-2xl transition-all`}>
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-black tracking-tighter text-white uppercase">{title}</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password"
            autoFocus
            value={step === 1 ? pin : confirmPin}
            onChange={(e) => {
              const val = e.target.value;
              if (step === 1) setPin(val);
              else setConfirmPin(val);
            }}
            placeholder="••••••••"
            className="w-full bg-black/50 border border-white/10 rounded-2xl py-5 text-center text-2xl font-black text-red-600 focus:border-red-600 outline-none transition-all placeholder:text-zinc-800"
          />

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => {
                if (step === 2) {
                    setStep(1);
                    setConfirmPin('');
                } else {
                    onClose();
                }
              }}
              className="py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              {step === 2 ? 'Back' : 'Cancel'}
            </button>
            <button 
              type="submit"
              className="bg-red-600 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
            >
              {mode === 'login' ? 'Verify' : step === 1 ? 'Next' : 'Save'}
            </button>
          </div>
        </form>

        {mode === 'login' && (
          <p className="mt-8 text-[9px] text-zinc-600 text-center uppercase tracking-widest leading-relaxed">
            Authorized personnel only.<br/>
            Security verification required.
          </p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
