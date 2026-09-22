import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto p-3 rounded-xl bg-[#283044] text-[#eef0ff] shadow-xl flex items-center gap-2.5 transform transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <span className="material-symbols-outlined text-[#b4c5ff] text-[20px] shrink-0">
        {icon}
      </span>
      <span className="text-[13px] font-medium flex-1 leading-snug">{message}</span>
    </div>
  );
};
