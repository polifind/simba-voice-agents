import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Create your first SIMBA Voice Agent in minutes.',
};

export default function GetStartedPage() {
  return (
    <section className="pt-24 pb-32 bg-white">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-simba-black leading-[1.1]">
          Get started with SIMBA
        </h1>
        <p className="mt-6 text-lg text-simba-gray-600 leading-relaxed">
          Create your first AI voice agent in minutes. No credit card required.
        </p>
        <div className="mt-12 rounded-2xl border border-simba-gray-200 bg-simba-gray-50 p-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-simba-blue/10 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Platform launching soon</h2>
          <p className="text-simba-gray-600 mb-6">
            We&apos;re onboarding customers now. Talk to our team to get early access and priority onboarding.
          </p>
          <Button href="/contact" size="lg">Contact Sales for Early Access</Button>
        </div>
      </div>
    </section>
  );
}
