import type { RelatedItem, FeatureItem } from '@/templates/types';

export const relatedUseCases: RelatedItem[] = [
  { title: 'Customer Support', description: 'Resolve customer inquiries with AI-powered voice and chat agents.', href: '/support' },
  { title: 'Lead Qualification', description: 'Automate lead screening, scoring, and meeting scheduling.', href: '/lead-qualification' },
  { title: 'Outbound Agents', description: 'Scale outbound calling for sales, collections, and engagement.', href: '/outbound-agents' },
  { title: 'AI Virtual Receptionist', description: 'Answer every call 24/7 with intelligent routing and scheduling.', href: '/ai-virtual-receptionist' },
  { title: 'Telecommunications', description: 'Smarter support for every subscriber.', href: '/agents/telecommunications' },
  { title: 'Financial Services', description: 'Deliver secure, instant financial service.', href: '/agents/financial-services' },
  { title: 'Healthcare', description: 'Improve care operations with AI agents.', href: '/agents/healthcare' },
  { title: 'Technology', description: 'Drive growth and retention for tech companies.', href: '/agents/technology' },
  { title: 'Retail & E-commerce', description: 'Increase sales and customer loyalty.', href: '/agents/retail-ecommerce' },
  { title: 'Government', description: 'Improve access to public services.', href: '/agents/government' },
];

export const enterpriseSecurityFeatures: FeatureItem[] = [
  {
    title: 'Enterprise-level data protection',
    description: 'End-to-end encryption, SOC 2 Type II certification, zero retention modes, and regional data residency options to keep your data secure.',
  },
  {
    title: 'Granular team permissions',
    description: 'Role-based access controls, workspace-level isolation, and audit trails to manage your team securely at scale.',
  },
  {
    title: 'Elevated support and custom deployments',
    description: 'Dedicated account management, custom SLAs, priority support queues, and VPC deployment options for enterprise customers.',
  },
];

export const platformFeatureTabs = [
  {
    label: 'Omnichannel',
    title: 'One brain across channels',
    description: 'Design your agent once and deploy it everywhere your customers are — chat, phone, email, WhatsApp, and more. The same knowledge base, personality, and workflows power every channel, ensuring a consistent experience.',
  },
  {
    label: 'Integrations',
    title: 'Tightly integrated with your stack',
    description: 'Connect your agents to your CRM, support desk, calendar, payment system, or telephony provider. Whether it\'s Salesforce, Stripe, Zendesk, or Twilio, integrations work out of the box.',
  },
  {
    label: 'Workflows',
    title: 'Deterministic workflows and guardrails',
    description: 'Define step-by-step workflows your agents must follow for high-risk or compliance-sensitive tasks. Set behavioral guardrails, safety rules, and escalation triggers to maintain control.',
  },
];

export const voiceFeatures: FeatureItem[] = [
  {
    title: 'Expressive, natural voices',
    description: 'Choose from 10,000+ voices or clone your own. Control tone, cadence, and emotion for every interaction. Our voices are indistinguishable from humans.',
  },
  {
    title: 'Sub-second latency',
    description: 'Industry-leading response times under 1 second. Natural turn-taking and interruption handling make conversations feel real.',
  },
  {
    title: 'Multilingual support',
    description: 'Deploy agents in 70+ languages with automatic language detection and seamless switching mid-conversation.',
  },
];

export const gettingStartedDefault = {
  headline: 'Get started today',
  webOption: {
    title: 'Create an agent on the web',
    description: 'Set up your first AI agent in just a few minutes using our web platform. Upload your SOPs, knowledge base, and configure workflows — no coding required.',
    ctas: [{ label: 'Sign Up', href: '/login', variant: 'primary' as const }],
  },
  apiOption: {
    title: 'Build via API',
    description: 'Build, launch, and scale agents using our powerful APIs and SDKs. Available in JavaScript, Python, Swift, and more.',
    ctas: [
      { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
      { label: 'Get API Key', href: '#', variant: 'ghost' as const },
    ],
  },
};
