import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsTechnologyData: PageData = {
  meta: {
    title: 'AI Agents for Technology Companies',
    description: 'AI agents for tech companies. Automate support, onboarding, lead qualification, and sales conversations that drive resolution, revenue, and retention.',
  },
  hero: {
    headline: 'AI agents for technology companies',
    subheadline: 'From customer support and onboarding to lead qualification, outbound sales, and scheduling automation, SIMBA Agents handles the conversations that drive resolution, revenue, and retention.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Technology',
    headline: 'Scale conversations that drive growth',
    cards: [
      { title: 'Improve user satisfaction', description: 'Resolve product questions across web, phone, and in-app chat instantly. Reduce ticket volume and improve NPS scores.' },
      { title: 'Reduce cost to serve', description: 'Automate high-volume support, onboarding workflows, and billing inquiries. Handle 80% of Tier 1 support automatically.' },
      { title: 'Drive growth and retention', description: 'Qualify leads, automate outbound outreach, and trigger upsell conversations at the right moment in the customer journey.' },
    ],
  },
  workflows: {
    headline: 'Built for every tech company workflow',
    items: [
      {
        title: 'Inbound support and resolution',
        description: 'Handle account inquiries, feature questions, bug reports, and troubleshooting with full context from your systems.',
        conversation: [
          { role: 'user', text: 'My dashboard is showing an error when I try to export data.' },
          { role: 'agent', text: 'I can help with that. Let me check your account. I can see the export feature was temporarily affected by a recent update. I\'ve applied a fix — can you try the export again?' },
          { role: 'user', text: 'It\'s working now, thanks!' },
          { role: 'agent', text: 'You\'re all set. This was a known issue that\'s been resolved. Let me know if you need anything else.' },
        ],
      },
      {
        title: 'Growth, pipeline, and revenue',
        description: 'Qualify inbound leads, automate outbound outreach, and trigger upsell conversations at the right moment.',
      },
      {
        title: 'Product activation and onboarding',
        description: 'Guide new users through setup, reduce time-to-value, and proactively engage users who are stuck.',
      },
      {
        title: 'Training and L&D',
        description: 'Simulate customer scenarios for agent training, sales coaching, and security awareness testing.',
      },
      {
        title: 'Embedded and white-label',
        description: 'Enable your customers to build their own AI agents using your platform with white-labeled SIMBA infrastructure.',
      },
    ],
  },
  stats: { value: '4357697', label: 'Agents launched and counting' },
  platformFeatures: {
    headline: 'One platform for every tech workflow',
    tabs: [
      { ...platformFeatureTabs[0], description: 'Deploy across chat, phone, email, in-app, and WhatsApp. Your agent works consistently across every channel your users prefer.' },
      { label: 'Integrations', title: 'Tightly integrated with your stack', description: 'Connect to your CRM, ticketing system, analytics platform, and internal tools. Real-time data sync ensures agents always have context.' },
      platformFeatureTabs[2],
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for tech',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    headline: 'Get started with AI agents for tech',
    webOption: {
      title: 'Build on the web',
      description: 'Upload your SOPs, knowledge base, and support scripts. Build and deploy agents without writing code.',
      ctas: [{ label: 'Sign Up', href: '/login', variant: 'primary' as const }],
    },
    apiOption: {
      title: 'Build via APIs and SDKs',
      description: 'Automate agent creation, embed in your product, and provision for your customers programmatically.',
      ctas: [
        { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
        { label: 'Get API Key', href: '#', variant: 'ghost' as const },
      ],
    },
  },
  faq: {
    questions: [
      { question: 'Can agents follow our support policies?', answer: 'Yes. Upload your support policies, escalation rules, and workflows. Agents follow them precisely and consistently across every interaction.' },
      { question: 'Can non-technical teams update agents?', answer: 'Absolutely. The web platform lets product, support, and ops teams update knowledge bases, workflows, and agent behavior without engineering involvement.' },
      { question: 'What channels are supported?', answer: 'Voice, web chat, email, WhatsApp, SMS, in-app messaging, and custom channels via API.' },
      { question: 'Can agents integrate with our internal systems?', answer: 'Yes. SIMBA connects to your CRM, ticketing, analytics, and custom APIs. Agents can read and write data in real-time.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/technology'),
};
