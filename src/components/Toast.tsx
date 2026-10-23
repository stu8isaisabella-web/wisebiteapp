import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  icon?: string;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  icon = 'check_circle',
  duration = 2800,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2d3228] text-[#eef3e3] px-4 py-2.5 rounded-full text-[13px] font-medium shadow-xl flex items-center gap-2 transition-all duration-300 max-w-[90vw] animate-in fade-in slide-in-from-top-2"
    >
      <span className="material-symbols-outlined text-[18px] text-[#bfcbac]">
        {icon}
      </span>
      <span className="truncate">{message}</span>
    </div>
  );
};
