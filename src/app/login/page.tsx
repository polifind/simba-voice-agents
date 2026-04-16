import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Sign in — SIMBA',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
      <Suspense>
        <AuthForm mode="signin" />
      </Suspense>
    </main>
  );
}
