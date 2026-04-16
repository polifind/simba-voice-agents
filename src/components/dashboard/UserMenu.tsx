'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

type Props = {
  email: string;
};

export function UserMenu({ email }: Props) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/login');
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="h-8 w-8 rounded-full border border-simba-gray-200 flex items-center justify-center text-simba-gray-600 hover:bg-simba-gray-50"
      >
        <UserCircleIcon className="h-5 w-5" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-xl border border-simba-gray-200 bg-white shadow-lg py-2 z-30"
        >
          <div className="px-3 py-2">
            <div className="text-[11px] uppercase tracking-wider text-simba-gray-500">Signed in as</div>
            <div className="mt-0.5 text-sm font-semibold text-simba-black truncate">{email}</div>
          </div>
          <div className="h-px bg-simba-gray-100 my-1" />
          <Link
            href="/dashboard/settings"
            className="block px-3 py-2 text-sm text-simba-gray-700 hover:bg-simba-gray-50"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <Link
            href="/"
            className="block px-3 py-2 text-sm text-simba-gray-700 hover:bg-simba-gray-50"
            onClick={() => setOpen(false)}
          >
            Marketing site
          </Link>
          <div className="h-px bg-simba-gray-100 my-1" />
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="w-full text-left px-3 py-2 text-sm text-simba-gray-700 hover:bg-simba-gray-50 flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  );
}
