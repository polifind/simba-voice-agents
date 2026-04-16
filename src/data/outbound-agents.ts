import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, gettingStartedDefault, relatedUseCases } from './shared';

export const outboundAgentsData: PageData = {
  meta: {
    title: 'Outbound AI Agents for Sales and Collections',
    description: 'Automate human-like outbound calling and lead generation. Raise conversion, cut cost per lead, and maintain audit-ready controls.',
  },
  hero: {
    headline: 'Outbound AI Agents for sales and collections',
    subheadline: 'Automate human-like outbound calling and lead generation to raise conversion, cut CPL, and keep audit-ready controls. Pair realistic voice, deterministic workflows, and CRM integration.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Outbound',
    headline: 'Outcome-focused outbound automation',
    cards: [
      { title: 'Accelerate pipeline velocity', description: 'Make thousands of calls per day with human-like voice agents. Qualify leads, book meetings, and follow up automatically.' },
      { title: 'Lower cost per lead', description: 'Replace manual dialing with AI agents that call, qualify, and route in parallel. Cut your cost per lead by 70% or more.' },
      { title: 'Reduce days to payment', description: 'Automate collections outreach with compliant, empathetic voice agents that negotiate payment plans and confirm commitments.' },
    ],
  },
  workflows: {
    headline: 'Built for every outbound workflow',
    items: [
      {
        title: 'High-volume lead qualification',
        description: 'Call, qualify, and route thousands of leads daily with consistent messaging and real-time CRM updates.',
        conversation: [
          { role: 'agent', text: 'Hi, this is Alex from SIMBA. We noticed you recently explored AI solutions for your contact center. Do you have a minute to chat?' },
          { role: 'user', text: 'Sure, what do you have?' },
          { role: 'agent', text: 'We help companies automate their inbound and outbound calls with AI voice agents. How many calls does your team handle per day?' },
          { role: 'user', text: 'About 2,000 inbound and 500 outbound.' },
          { role: 'agent', text: 'That\'s a great fit for our platform. Would you like to see a demo this week? I can connect you with our solutions team.' },
        ],
      },
      {
        title: 'Automated collections',
        description: 'Negotiate payment plans, confirm commitments, and escalate when needed — all with compliant, empathetic conversations.',
      },
      {
        title: 'Identity and benefits verification',
        description: 'Verify identity, confirm eligibility, and update records across healthcare, insurance, and government workflows.',
      },
      {
        title: 'Network-wide status sweeps',
        description: 'Proactively contact customers about outages, maintenance windows, or service changes at scale.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'The simplest enterprise-ready outbound AI platform',
    tabs: platformFeatureTabs,
  },
  featureGrid: {
    headline: 'Everything you need to scale outbound',
    features: [
      { title: 'Human-sounding, low-latency voice', description: 'Natural-sounding agents with sub-second response times. Callers can\'t tell they\'re talking to AI.' },
      { title: 'Voicemail and answer detection', description: 'Automatically detect voicemail vs. live answer and adapt the interaction accordingly. Leave personalized voicemails at scale.' },
      { title: 'Script enforcement and dynamic branching', description: 'Define call scripts with dynamic branching logic. Agents follow your scripts while adapting naturally to the conversation.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for outbound',
    features: [
      { title: 'Expressive voice library', description: 'Choose from 10,000+ voices optimized for outbound calling. Match your brand tone across every campaign.' },
      { title: 'Voice cloning and localization', description: 'Clone your top performer\'s voice or create region-specific voices for localized outbound campaigns in 70+ languages.' },
      { title: 'Sub-second response latency', description: 'Industry-leading latency ensures natural conversation flow. No awkward pauses or robotic delays.' },
    ],
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    ...gettingStartedDefault,
    headline: 'Get started automating your outbound',
    webOption: {
      ...gettingStartedDefault.webOption,
      title: 'Launch from the console',
      description: 'Upload your call scripts, connect your telephony provider, and launch outbound campaigns in minutes.',
    },
    apiOption: {
      ...gettingStartedDefault.apiOption,
      title: 'Use our APIs',
      description: 'Programmatically manage campaigns, trigger calls from CRM events, and integrate with your dialer infrastructure.',
    },
  },
  faq: {
    questions: [
      { question: 'How quickly can we launch a campaign?', answer: 'Most customers launch their first outbound campaign within 24-48 hours. Upload your scripts, connect your telephony provider, and start dialing.' },
      { question: 'Is outbound calling compliant?', answer: 'Yes. SIMBA supports DNC list management, time-of-day restrictions, opt-out workflows, and call recording for compliance. We support TCPA, FCC, and international calling regulations.' },
      { question: 'How do agents handle live handoffs?', answer: 'When a lead qualifies or a situation requires a human, the agent transfers the call with full context — conversation summary, qualification data, and recommended next steps.' },
      { question: 'Can agents update our CRM?', answer: 'Yes. Agents write call outcomes, qualification data, and next steps directly to Salesforce, HubSpot, Pipedrive, and other CRMs in real-time.' },
      { question: 'What ROI can we expect?', answer: 'Customers typically see 5-10x call volume, 60-80% lower cost per lead, and 3x more qualified meetings from outbound campaigns.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/outbound-agents'),
};
