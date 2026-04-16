import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const leadQualificationData: PageData = {
  meta: {
    title: 'AI Agents for Lead Qualification',
    description: 'Automate lead screening, scoring, meeting scheduling, and follow-up outreach with AI agents that never miss a lead.',
  },
  hero: {
    headline: 'AI agents for lead qualification',
    subheadline: 'From inbound screening and lead scoring to meeting scheduling and follow-up outreach, our AI agents automate sales development workflows without sacrificing conversion quality.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Lead Qualification',
    headline: 'More qualified pipeline, lower cost per lead',
    cards: [
      { title: 'Improve lead conversion rates', description: 'Respond to every inbound lead in seconds, 24/7. Qualify based on your criteria, score in real-time, and route to the right rep instantly.' },
      { title: 'Reduce cost per qualified lead', description: 'Automate the first-touch conversation that SDRs handle today. Focus your team on high-intent leads that are ready to close.' },
      { title: 'Drive more pipeline revenue', description: 'Re-engage cold leads, follow up on demos, and book meetings automatically. Never let a lead fall through the cracks.' },
    ],
  },
  workflows: {
    headline: 'Built for every lead qualification workflow',
    items: [
      {
        title: 'Inbound lead screening',
        description: 'Answer, qualify, score, and route inbound leads based on your ICP criteria.',
        conversation: [
          { role: 'agent', text: 'Hi, thanks for your interest in SIMBA. I\'d love to learn more about what you\'re looking for. What\'s your company size?' },
          { role: 'user', text: 'We have about 500 employees.' },
          { role: 'agent', text: 'Great. And what\'s the main challenge you\'re trying to solve with AI agents?' },
          { role: 'user', text: 'We need to automate our customer support across phone and chat.' },
          { role: 'agent', text: 'Perfect — that\'s right in our wheelhouse. Let me connect you with a solutions engineer. Would tomorrow at 2 PM work for a quick call?' },
        ],
      },
      {
        title: 'Outbound re-engagement',
        description: 'Follow up with leads who went cold, attended webinars, or downloaded content.',
        conversation: [
          { role: 'agent', text: 'Hi Sarah, this is the SIMBA team following up on the whitepaper you downloaded last week. Did you have a chance to review it?' },
          { role: 'user', text: 'I did, it was interesting. We\'re actually looking into AI for our call center.' },
          { role: 'agent', text: 'That\'s great to hear! Would you like to see a quick demo of how our agents handle inbound calls? I can set one up for this week.' },
        ],
      },
      {
        title: 'Meeting scheduling',
        description: 'Automatically book meetings with qualified leads based on rep availability.',
      },
      {
        title: 'Pre-qualification for licensed teams',
        description: 'Screen leads for financial services, insurance, or regulated industries before routing to licensed agents.',
      },
      {
        title: 'Lead capture and enrichment',
        description: 'Collect contact details, company information, and intent signals during every conversation.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'One platform for every lead qualification workflow',
    tabs: [
      { ...platformFeatureTabs[0], label: 'Omnichannel', title: 'One brain across channels', description: 'Qualify leads across phone, chat, email, and WhatsApp. The same qualification criteria and scoring logic power every channel.' },
      { ...platformFeatureTabs[1], label: 'CRM Integration', title: 'Tightly integrated with your CRM', description: 'Write qualified leads, scores, and conversation summaries directly to Salesforce, HubSpot, or Pipedrive. Sync calendar availability for automated booking.' },
      { label: 'Guardrails', title: 'Workflows and guardrails', description: 'Define your qualification criteria, scoring rubrics, and escalation rules. Agents follow them consistently on every call.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for lead qualification',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    ...gettingStartedDefault,
    headline: 'Get started with AI lead qualification today',
  },
  faq: {
    questions: [
      { question: 'How do SIMBA Agents determine lead intent?', answer: 'Agents qualify leads based on your custom criteria — company size, budget, use case, timeline, and more. Real-time scoring and routing ensures high-intent leads reach your team fast.' },
      { question: 'Can agents write back to our CRM and calendar?', answer: 'Yes. SIMBA integrates with Salesforce, HubSpot, Pipedrive, and more. Agents can create and update records, log call summaries, and book meetings based on rep availability.' },
      { question: 'How do you ensure telemarketing compliance?', answer: 'Agents follow opt-in/opt-out workflows, DNC list checks, and time-of-day calling restrictions. All calls are recorded and transcribed for audit purposes.' },
      { question: 'Which LLMs can we use?', answer: 'SIMBA supports multiple LLM providers including OpenAI, Anthropic, Google, and open-source models. You can choose the best model for your use case or bring your own.' },
      { question: 'What ROI can we expect?', answer: 'Customers typically see 3-5x more qualified meetings per SDR, 60-80% reduction in cost per qualified lead, and faster pipeline velocity from instant lead response.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/lead-qualification'),
};
