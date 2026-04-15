import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsGovernmentData: PageData = {
  meta: {
    title: 'AI Agents for Government',
    description: 'AI agents for government that automate citizen services, benefits navigation, crisis hotlines, permit guidance, and multilingual outreach.',
  },
  hero: {
    headline: 'AI agents for government',
    subheadline: 'From resident inquiries and benefits navigation to crisis hotlines, permit guidance, and multilingual outreach, our AI agents automate citizen and staff workflows without sacrificing public trust.',
    primaryCTA: { label: 'Create an Agent', href: '/get-started' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Government',
    headline: 'Improve access to public services',
    cards: [
      { title: 'Improve resident experience', description: 'Resolve inquiries across voice and digital channels in residents\' preferred language, 24/7. No hold times, no transfers.' },
      { title: 'Reduce operational burden', description: 'Automate high-volume contacts like hours, locations, document requirements, and policy questions. Free staff for complex casework.' },
      { title: 'Meet public sector standards', description: 'SOC 2 Type II, ISO 27001 compliant with zero retention modes and regional data residency for sensitive citizen data.' },
    ],
  },
  workflows: {
    headline: 'Built for every civic workflow',
    items: [
      {
        title: 'Instant answers for residents',
        description: 'Hours, locations, required documents, and policy questions answered instantly across phone, chat, and text.',
        conversation: [
          { role: 'user', text: 'What documents do I need to renew my business license?' },
          { role: 'agent', text: 'To renew your business license, you\'ll need: your current license number, a completed renewal application, proof of insurance, and the renewal fee of $150. Would you like me to walk you through the application process?' },
          { role: 'user', text: 'Yes, and can I do it online?' },
          { role: 'agent', text: 'Yes, you can complete the entire renewal online through our city portal. I can guide you through the steps or send you the direct link to the renewal page.' },
        ],
      },
      {
        title: 'Benefits and permits',
        description: 'Eligibility screening, form guidance, document collection, and appointment booking for government services.',
      },
      {
        title: 'Crisis response operations',
        description: 'Rapid incident hotlines, outbound notification campaigns, emergency triage, and case routing.',
      },
      {
        title: 'Multilingual outreach',
        description: 'Deliver messages in dozens of languages to reach diverse communities with critical information.',
      },
    ],
  },
  industryDeepDive: {
    headline: 'Serving every level of government',
    industries: [
      { name: 'Federal agencies and departments', description: 'Benefits inquiries, immigration services, veterans support, and tax assistance at scale.' },
      { name: 'State and regional departments', description: 'Licensing, employment services, health programs, and regulatory compliance.' },
      { name: 'Cities and local governments', description: '311 lines, utility support, permits, community outreach, and emergency notifications.' },
    ],
  },
  stats: { value: '4357697', label: 'Agents launched and counting' },
  platformFeatures: {
    headline: 'One platform for every government workflow',
    tabs: [
      { label: 'Adapt', title: 'Adapt to requirements', description: 'Upload policy documents, SOPs, and service guidelines. Agents follow your procedures precisely and consistently.' },
      { label: 'Integrate', title: 'Link to tools and systems', description: 'Connect to case management, scheduling, and records systems. Agents read and write data with proper access controls.' },
      { label: 'Monitor', title: 'Complete visibility', description: 'Review every transcript, track key metrics, run A/B tests, and continuously improve agent performance.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for government',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    headline: 'Get started with government AI agents',
    webOption: {
      title: 'Build on the web',
      description: 'Create agents from your SOPs and policy documents. No coding required.',
      ctas: [{ label: 'Sign Up', href: '/get-started', variant: 'primary' as const }],
    },
    apiOption: {
      title: 'Integrate via API',
      description: 'Connect to your call center, citizen portals, and case management systems.',
      ctas: [
        { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
        { label: 'Get API Key', href: '#', variant: 'ghost' as const },
      ],
    },
  },
  faq: {
    questions: [
      { question: 'What security certifications do you have?', answer: 'SIMBA holds SOC 2 Type II and ISO 27001 certifications. We offer zero retention mode, VPC hosting, and regional data residency.' },
      { question: 'Can agents handle sensitive citizen data?', answer: 'Yes. All data is encrypted in transit and at rest. Zero retention mode ensures no conversation data is stored after processing. Regional data residency keeps data within your jurisdiction.' },
      { question: 'How do you support accessibility requirements?', answer: 'Our agents support voice, text, and multilingual interactions to serve residents with diverse needs. We follow WCAG guidelines for web-based interactions.' },
      { question: 'Can agents integrate with existing government systems?', answer: 'Yes. SIMBA integrates with case management platforms, scheduling systems, records databases, and telephony infrastructure via secure APIs.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/government'),
};
