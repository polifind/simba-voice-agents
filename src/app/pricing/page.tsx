import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Accordion } from '@/components/ui/Accordion';
import { CheckIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'SIMBA Voice Agents pricing. Starting at $0.008 per minute.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started and experiment with voice agents.',
    features: [
      '30 minutes of conversation/month',
      '1 agent',
      'Community support',
      'Web chat deployment',
      'Basic analytics',
    ],
    cta: { label: 'Get Started Free', href: '/get-started', variant: 'secondary' as const },
  },
  {
    name: 'Starter',
    price: '$0.50',
    period: '/month',
    description: 'For individuals and small projects getting started.',
    priceNote: '+ $0.008/min',
    features: [
      '100 minutes included/month',
      '3 agents',
      'Email support',
      'Voice + chat deployment',
      'Custom knowledge base',
      'Basic integrations',
    ],
    cta: { label: 'Get Started', href: '/get-started', variant: 'primary' as const },
  },
  {
    name: 'Scale',
    price: '$2.20',
    period: '/month',
    description: 'For growing teams that need more power and flexibility.',
    priceNote: '+ $0.005/min',
    popular: true,
    features: [
      '500 minutes included/month',
      '10 agents',
      'Priority support',
      'All deployment channels',
      'Advanced analytics',
      'All integrations',
      'Custom voices',
      'Multi-agent workflows',
      'API access',
    ],
    cta: { label: 'Get Started', href: '/get-started', variant: 'primary' as const },
  },
  {
    name: 'Business',
    price: '$9.90',
    period: '/month',
    description: 'For businesses with high-volume needs and custom requirements.',
    priceNote: '+ $0.003/min',
    features: [
      '2,000 minutes included/month',
      'Unlimited agents',
      'Dedicated support',
      'All deployment channels',
      'Advanced analytics & reporting',
      'All integrations + custom',
      'Voice cloning',
      'Multi-agent workflows',
      'Full API access',
      'Team permissions',
      'SSO/SAML',
    ],
    cta: { label: 'Get Started', href: '/get-started', variant: 'primary' as const },
  },
];

const enterprisePlan = {
  name: 'Enterprise',
  description: 'For organizations that need dedicated infrastructure, custom compliance, and hands-on support.',
  features: [
    'Custom minute volume and pricing',
    'Unlimited agents',
    'Forward Deployed Engineers',
    'Custom SLAs and uptime guarantees',
    'VPC / dedicated infrastructure',
    'Regional data residency',
    'Zero retention mode',
    'SOC 2 Type II compliance',
    'ISO 27001 compliance',
    'Custom integrations and workflows',
    'Priority engineering support',
    'Quarterly business reviews',
  ],
};

const faqItems = [
  { question: 'What counts as a conversation minute?', answer: 'A conversation minute is measured from when the agent starts processing a conversation to when it ends. Both voice and chat conversations are metered. Idle time is not counted.' },
  { question: 'Can I change plans at any time?', answer: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and your billing is prorated.' },
  { question: 'What happens if I exceed my included minutes?', answer: 'You\'ll be charged the per-minute overage rate for your plan. We\'ll notify you when you\'re approaching your limit so there are no surprises.' },
  { question: 'Do you offer annual billing?', answer: 'Yes. Annual plans receive a 20% discount compared to monthly billing. Contact sales for annual pricing on Business and Enterprise plans.' },
  { question: 'Is there a free trial?', answer: 'Yes. The Free plan gives you 30 minutes of conversation per month at no cost, forever. Paid plans include a 14-day money-back guarantee.' },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-simba-black">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. Pay only for what you use.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  plan.popular
                    ? 'border-simba-blue ring-2 ring-simba-blue/20 relative'
                    : 'border-simba-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-simba-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-simba-gray-500">{plan.period}</span>
                </div>
                {plan.priceNote && (
                  <p className="text-sm text-simba-blue font-semibold mt-1">{plan.priceNote}</p>
                )}
                <p className="text-sm text-simba-gray-600 mt-3">{plan.description}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="h-4 w-4 text-simba-blue shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    href={plan.cta.href}
                    variant={plan.cta.variant}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-12 rounded-2xl border border-simba-gray-200 bg-simba-gray-50 p-8 sm:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold">{enterprisePlan.name}</h3>
                <p className="text-simba-gray-600 mt-3 leading-relaxed">{enterprisePlan.description}</p>
                <div className="mt-6">
                  <Button href="/contact" size="lg">Contact Sales</Button>
                </div>
              </div>
              <div>
                <ul className="space-y-3">
                  {enterprisePlan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="h-4 w-4 text-simba-blue shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <Accordion items={faqItems} />
        </div>
      </SectionWrapper>
    </>
  );
}
