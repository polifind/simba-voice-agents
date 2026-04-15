import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsFinancialData: PageData = {
  meta: {
    title: 'AI Agents for Financial Services',
    description: 'AI agents for banking, insurance, wealth management, and lending. Automate customer and advisor workflows with enterprise-grade security.',
  },
  hero: {
    headline: 'AI agents for financial services',
    subheadline: 'From account inquiries and loan origination to claims processing, collections, and compliance verification, our AI agents automate customer and advisor workflows without sacrificing financial trust.',
    primaryCTA: { label: 'Create an Agent', href: '/get-started' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Financial Services',
    headline: 'Automate financial workflows with trust',
    cards: [
      { title: 'Improve customer satisfaction', description: 'Emotionally aware agents guide customers through sensitive financial conversations — account disputes, claims, and payment difficulties — with empathy and precision.' },
      { title: 'Reduce cost per resolution', description: 'Automate balance checks, payment reminders, transaction lookups, and status updates. Free your team for complex advisory conversations.' },
      { title: 'Built for financial compliance', description: 'SOC 2 Type II certified, ISO 27001 compliant, with zero retention mode and regional data residency options.' },
    ],
  },
  workflows: {
    headline: 'Conversational agents for every financial service',
    items: [
      {
        title: 'Retail banking and neobanks',
        description: 'Handle account inquiries, transaction disputes, card activations, and payment scheduling.',
        conversation: [
          { role: 'user', text: 'I need to dispute a charge on my debit card from last week.' },
          { role: 'agent', text: 'I can help you with that. I see a charge of $89.99 from March 10th. Is that the one you\'d like to dispute?' },
          { role: 'user', text: 'Yes, I didn\'t make that purchase.' },
          { role: 'agent', text: 'I\'ve initiated the dispute and temporarily credited $89.99 to your account. You\'ll receive a confirmation email with your case number shortly.' },
        ],
      },
      {
        title: 'Insurance carriers and brokers',
        description: 'Automate claims intake, policy inquiries, renewal reminders, and coverage explanations.',
      },
      {
        title: 'Wealth management and advisory',
        description: 'Handle onboarding, portfolio inquiries, appointment scheduling, and document collection.',
      },
      {
        title: 'Lending and mortgage',
        description: 'Qualify leads, collect application details, provide rate information, and manage document workflows.',
      },
      {
        title: 'Payments and fintech',
        description: 'Support merchant inquiries, handle disputes, verify KYC, and manage subscription changes.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'One platform for every financial workflow',
    tabs: platformFeatureTabs,
  },
  featureGrid: {
    headline: 'Built for financial workflows that matter',
    features: [
      { title: 'Inbound support and account service', description: 'Resolve account inquiries, process transactions, and update customer information in real-time with full audit trails.' },
      { title: 'Outbound sales and collections', description: 'Proactive outreach for payment reminders, loan offers, renewal notices, and collections with compliant workflows.' },
      { title: 'Lead qualification and conversion', description: 'Screen and qualify prospects for financial products, collect application data, and route to licensed advisors.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for finance',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: { ...gettingStartedDefault, headline: 'Get started with financial AI agents' },
  faq: {
    questions: [
      { question: 'What compliance standards do you meet?', answer: 'SIMBA holds SOC 2 Type II certification with zero exceptions and ISO 27001 compliance. We offer zero retention mode and regional data residency for sensitive financial data.' },
      { question: 'Can agents access our core banking systems?', answer: 'Yes. SIMBA integrates with core banking platforms, CRMs, and internal systems via secure APIs to perform real-time lookups and transactions.' },
      { question: 'How do you measure ROI?', answer: 'We track cost per resolution, average handle time, first-call resolution rate, CSAT scores, and agent deflection rate. Most customers see 60-80% cost reduction within 90 days.' },
      { question: 'Do you support regional data residency?', answer: 'Yes. We offer data residency in the US, EU, and India with options for VPC hosting and dedicated infrastructure.' },
      { question: 'Can agents handle outbound campaigns?', answer: 'Yes. Deploy compliant outbound campaigns for collections, payment reminders, renewal notices, and cross-sell opportunities.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/financial-services'),
};
