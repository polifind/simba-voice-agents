import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsSupportData: PageData = {
  meta: {
    title: 'SIMBA Agents for Support',
    description: 'Always-on, emotionally aware AI agents that de-escalate issues, build trust, and resolve tickets faster across voice and digital channels in 70+ languages.',
  },
  hero: {
    headline: 'SIMBA Agents for Support',
    subheadline: 'Always-on, emotionally aware conversational AI agents that de-escalate issues, build trust, and resolve tickets faster across voice and digital channels in 70+ languages.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Self-improving support agents that sound human',
    headline: 'Launch continuously improving conversational agents',
    description: 'Deploy conversational agents across voice and digital that deflect frontline volume, reduce time to response, and lift CSAT scores — improving with every interaction.',
    cards: [
      { title: 'Your SOPs, followed by agents', description: 'Upload your standard operating procedures and the agent follows them precisely — consistent, compliant responses every time.' },
      { title: 'Improve interactions each week', description: 'Review transcripts, update knowledge bases, and tune agent behavior. Performance improves continuously without rebuilding.' },
      { title: 'Guardrails you can trust', description: 'Define behavioral boundaries, safety rules, and escalation triggers. Full visibility into every agent decision.' },
    ],
  },
  workflows: {
    headline: 'Emotionally and contextually aware AI agents',
    items: [
      {
        title: 'Natural, human-like conversations',
        description: 'Expressive mode agents that adapt tone, cadence, and emotion to match the conversation context.',
        conversation: [
          { role: 'user', text: 'I\'ve been trying to resolve this for three days now and I\'m really frustrated.' },
          { role: 'agent', text: 'I completely understand your frustration, and I\'m sorry you\'ve had to deal with this for so long. Let me take a fresh look at your case and get this resolved for you right now.' },
          { role: 'user', text: 'Thank you, I appreciate that.' },
          { role: 'agent', text: 'I\'ve found the issue. Your account was affected by a billing system update. I\'ve corrected it and applied a credit for the inconvenience. Is there anything else I can help with?' },
        ],
      },
      {
        title: 'Clean, context-rich handoffs',
        description: 'When escalation is needed, agents transfer with full conversation context, customer intent, and suggested resolution.',
      },
      {
        title: 'Sub-second responsiveness',
        description: 'Industry-leading latency with natural turn-taking. No awkward pauses or robotic delays.',
      },
      {
        title: '10,000+ voices',
        description: 'Choose from thousands of natural voices or clone your own to match your brand identity.',
      },
      {
        title: 'Multilingual support',
        description: 'Deploy agents in 70+ languages with automatic language detection and seamless switching.',
      },
    ],
  },
  stats: { value: '4357697', label: 'Agents launched and counting' },
  platformFeatures: {
    headline: 'Consistent, accurate help in every channel',
    tabs: platformFeatureTabs,
  },
  featureGrid: {
    headline: 'Gain full visibility and control',
    features: [
      { title: 'Audit historical interactions', description: 'Search and review every conversation. Trace context, validate compliance, and identify improvement opportunities.' },
      { title: 'Iterate and improve', description: 'Update prompts, knowledge bases, and models. Run new tests. Deploy improvements without downtime.' },
      { title: 'Partner with our experts', description: 'Embed SIMBA experts to help build, test, and scale reliable AI agents for your specific use cases.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for support',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    headline: 'Get started with SIMBA Agents for Support',
    webOption: {
      title: 'Create a Support Agent',
      description: 'Set up your first support agent in just a few minutes using our web platform. No coding required.',
      ctas: [{ label: 'Sign Up', href: '/login', variant: 'primary' as const }],
    },
    apiOption: {
      title: 'Agent APIs',
      description: 'Build, launch, and scale support agents using our APIs and SDKs.',
      ctas: [
        { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
        { label: 'Get API Key', href: '#', variant: 'ghost' as const },
      ],
    },
  },
  faq: {
    questions: [
      { question: 'How do I create an agent from our SOPs and documentation?', answer: 'Upload your documents to the SIMBA platform. Our system indexes the content and creates an agent that follows your procedures. Test, refine, and deploy in minutes.' },
      { question: 'Is the platform suitable for non-technical team members?', answer: 'Yes. The web platform is designed for support operations teams to build, test, and manage agents without writing any code.' },
      { question: 'What channels does SIMBA Agents for Support cover?', answer: 'Voice (phone), web chat, email, WhatsApp, SMS, and in-app messaging. Design once, deploy everywhere.' },
      { question: 'How do human handoffs work?', answer: 'When an agent detects a conversation requiring human intervention, it transfers with full context — conversation history, customer intent, and suggested actions.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/support'),
};
