'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type Mode = 'signin' | 'signup';

type Props = {
  mode: Mode;
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to sign in.');
        setSubmitting(false);
        return;
      }
      router.replace(redirectTo);
      // Force a refetch of server components on the destination page
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const copy =
    mode === 'signup'
      ? {
          heading: 'Create an account',
          googleLabel: 'Sign up with Google',
          submitLabel: submitting ? 'Creating account…' : 'Sign up',
          footerPrompt: 'Already registered?',
          footerHref: '/login',
          footerLabel: 'Sign in',
        }
      : {
          heading: 'Welcome back',
          googleLabel: 'Continue with Google',
          submitLabel: submitting ? 'Signing in…' : 'Sign in',
          footerPrompt: "Don't have an account?",
          footerHref: '/signup',
          footerLabel: 'Sign up',
        };

  return (
    <div className="w-full max-w-md">
      {/* Brand */}
      <div className="flex flex-col items-center mb-14">
        <Link href="/" className="flex items-center gap-2 text-simba-black">
          <Image
            src="/simba-mark.png"
            alt="SIMBA"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-xl font-black tracking-tight">SIMBA</span>
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-simba-black text-center">
        {copy.heading}
      </h1>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        {/* Google (placeholder — not wired to real OAuth yet) */}
        <button
          type="button"
          onClick={() =>
            setError('Google sign-in is coming soon. Use email for now.')
          }
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm font-semibold text-simba-black hover:bg-simba-gray-50 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C17 3.5 14.8 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-8.1 0-.5-.1-1-.2-1.4H12Z" />
            <path fill="#4285F4" d="M21.3 12.1c0-.5-.1-1-.2-1.4H12v3.4h5.2c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.1 2.9-7.3Z" />
            <path fill="#FBBC05" d="M6 14.1c-.2-.6-.3-1.3-.3-2 0-.7.1-1.4.3-2V7.7H2.9C2.3 9 2 10.4 2 12s.3 3 .9 4.3L6 14.1Z" />
            <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.1-2.4c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.2H2.9v2.6C4.5 19.7 8 22 12 22Z" />
          </svg>
          {copy.googleLabel}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-simba-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-simba-gray-500">or</span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-simba-black mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-simba-black mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 pr-11 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-simba-gray-500 hover:text-simba-gray-700"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className={clsx(
            'w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
            canSubmit
              ? 'bg-simba-black text-white hover:bg-simba-gray-800'
              : 'bg-simba-gray-300 text-white cursor-not-allowed'
          )}
        >
          {copy.submitLabel}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-simba-gray-600">
        {copy.footerPrompt}{' '}
        <Link href={copy.footerHref} className="font-semibold text-simba-black underline underline-offset-2">
          {copy.footerLabel}
        </Link>
      </p>

      {mode === 'signin' && (
        <p className="mt-10 text-center text-xs text-simba-gray-500">
          Demo mode: any valid email + any 4+ char password.
        </p>
      )}
    </div>
  );
}
