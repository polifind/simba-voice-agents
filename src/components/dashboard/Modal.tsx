'use client';

import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const widthMap = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-4xl' };

export function Modal({ open, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={clsx(
          'relative w-full mx-4 rounded-2xl border border-simba-gray-200 bg-white shadow-lg max-h-[85vh] flex flex-col',
          widthMap[size],
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-simba-gray-100">
          <h2 className="text-lg font-bold text-simba-black">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-simba-gray-100 text-simba-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
