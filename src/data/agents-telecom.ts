import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsTelecomData: PageData = {
  meta: {
    title: 'AI Agents for Telecommunications',
    description: 'Smarter support for every subscriber. AI agents that handle billing, troubleshooting, outage alerts, and retention across voice and digital channels.',
  },
  hero: {
    headline: 'AI agents for telecommunications',
    subheadline: 'From billing inquiries and network troubleshooting to outage alerts and subscriber retention, our AI agents automate telecom customer workflows without sacrificing service quality.',
    primaryCTA: { label: 'Create an Agent', href: '/get-started' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Telecommunications',
    headline: 'Transform subscriber experiences at scale',
    cards: [
      { title: 'Improve subscriber satisfaction', description: 'Resolve billing questions, troubleshoot connectivity issues, and manage account changes instantly across voice and chat channels.' },
      { title: 'Reduce operational costs', description: 'Automate high-volume interactions like plan changes, payment processing, and outage notifications. Reduce cost per interaction by up to 80%.' },
      { title: 'Increase retention and ARPU', description: 'Proactive engagement, personalized upgrade offers, and instant resolution keep subscribers happy and reduce churn.' },
    ],
  },
  workflows: {
    headline: 'Built for every telecom workflow',
    items: [
      {
        title: 'Network troubleshooting',
        description: 'Diagnose connectivity issues, run remote diagnostics, and escalate to field teams when needed.',
        conversation: [
          { role: 'user', text: 'My internet keeps dropping every few minutes.' },
          { role: 'agent', text: 'I\'m sorry to hear that. Let me run a quick diagnostic on your connection. I can see some packet loss on your line — let me reset your connection from our end.' },
          { role: 'agent', text: 'I\'ve reset your connection. Can you check if it\'s more stable now? If the issue persists, I can schedule a technician visit.' },
        ],
      },
      {
        title: 'Billing and account management',
        description: 'Handle payment inquiries, plan changes, invoice disputes, and account modifications.',
      },
      {
        title: 'Proactive outage alerts',
        description: 'Automatically notify subscribers about network maintenance, outages, and estimated restoration times.',
      },
      {
        title: 'Subscriber retention',
        description: 'Detect churn signals and engage with personalized offers, plan recommendations, and loyalty rewards.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'One platform for every telecom workflow',
    tabs: platformFeatureTabs,
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for telecom',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: { ...gettingStartedDefault, headline: 'Get started with telecom AI agents' },
  faq: {
    questions: [
      { question: 'Can agents access our BSS/OSS systems?', answer: 'Yes. SIMBA agents integrate with your billing, provisioning, and network management systems via APIs to perform real-time lookups and actions.' },
      { question: 'How do you handle network-specific troubleshooting?', answer: 'Agents can run diagnostics, check network status, and guide subscribers through troubleshooting steps. They escalate to field teams with full context when needed.' },
      { question: 'What channels are supported?', answer: 'Voice, web chat, SMS, WhatsApp, and in-app messaging. Design once, deploy everywhere.' },
      { question: 'How do you handle regulatory compliance?', answer: 'Agents follow your compliance rules for subscriber data handling, consent management, and communication preferences. All interactions are logged for audit purposes.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/telecommunications'),
};
