import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ alert, onDismiss }) {
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert, onDismiss]);

  if (!alert) return null;

  const isSuccess = alert.type === 'success';
  const isError = alert.type === 'error';

  return (
    <div
      className={`rounded-xl border p-4 mb-6 flex items-start justify-between shadow-xs transition-all duration-200 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : isError
          ? 'bg-rose-50 border-rose-200 text-rose-900'
          : 'bg-indigo-50 border-indigo-200 text-indigo-900'
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />}

        <div>
          <h4 className="font-semibold text-sm">
            {isSuccess ? 'Success' : isError ? 'Error Occurred' : 'Information'}
          </h4>
          <p className="text-sm opacity-90 mt-0.5">{alert.message}</p>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-black/5 text-current/70 hover:text-current transition-colors cursor-pointer"
        title="Dismiss alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
