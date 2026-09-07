import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-[#25D366]" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-[#D97706]" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1C1917] text-white shadow-2xl border border-[#292524] max-w-md">
        {getIcon()}
        <span className="text-xs sm:text-sm font-medium pr-2">{toast.message}</span>
      </div>
    </div>
  );
};
