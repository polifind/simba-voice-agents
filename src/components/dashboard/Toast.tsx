'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

type ToastType = 'success' | 'error';

type ToastState = { message: string; type: ToastType; visible: boolean };

export function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  const dismiss = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  return { toast, showToast, dismiss };
}

export function Toast({ message, type, visible, onDismiss }: {
  message: string;
  type: ToastType;
  visible: boolean;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [visible, onDismiss]);

  if (!visible) return null;

  const Icon = type === 'success' ? CheckCircleIcon : ExclamationCircleIcon;
  const colors = type === 'success'
    ? 'border-green-300 bg-green-50 text-green-800'
    : 'border-red-300 bg-red-50 text-red-800';

  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${colors}`}>
      <Icon className="h-5 w-5 shrink-0" />
      {message}
    </div>
  );
}
