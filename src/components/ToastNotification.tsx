import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertOctagon, AlertTriangle, AlertCircle, X, ArrowRight } from 'lucide-react';

export interface Toast {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onClose: (id: string) => void;
  onViewAlert: (id: string) => void;
}

export default function ToastNotification({ toasts, onClose, onViewAlert }: ToastNotificationProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          border: 'border-l-4 border-l-rose-600 border-slate-200 bg-white',
          icon: <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />,
          badge: 'bg-rose-50 text-rose-800 border-rose-200 font-bold',
        };
      case 'High':
        return {
          border: 'border-l-4 border-l-orange-500 border-slate-200 bg-white',
          icon: <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />,
          badge: 'bg-orange-50 text-orange-800 border-orange-200 font-bold',
        };
      case 'Medium':
        return {
          border: 'border-l-4 border-l-amber-500 border-slate-200 bg-white',
          icon: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      default:
        return {
          border: 'border-l-4 border-l-indigo-500 border-slate-200 bg-white',
          icon: <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0" />,
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3 w-full max-w-md px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const styles = getSeverityStyles(toast.severity);
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              layout
              className={`pointer-events-auto flex items-start space-x-3.5 p-4 rounded-2xl border shadow-lg ${styles.border} transition-all duration-300`}
            >
              <div className="mt-0.5">{styles.icon}</div>
              <div className="flex-1 space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-5xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border uppercase leading-none ${styles.badge}`}>
                      {toast.severity}
                    </span>
                    <span className="text-5xs font-mono text-slate-400 font-medium">{toast.timestamp}</span>
                  </div>
                  <button
                    onClick={() => onClose(toast.id)}
                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug font-display">{toast.title}</h4>
                  <p className="text-xxs text-slate-500 leading-normal mt-1 font-sans">{toast.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                  <span className="text-5xs font-mono text-indigo-600 font-bold uppercase tracking-widest">
                    CRITICAL RISK DETECTED
                  </span>
                  <button
                    onClick={() => onViewAlert(toast.id)}
                    className="flex items-center space-x-1 text-5xs font-mono text-slate-500 hover:text-indigo-600 font-bold tracking-wider transition cursor-pointer"
                  >
                    <span>ANALYZE DISRUPTION</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
