export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  emoji: string;
};

export const categories: Category[] = [
  {
    slug: 'voice-ai-fundamentals',
    name: 'Voice AI Fundamentals',
    shortName: 'Fundamentals',
    description: 'Foundational concepts: what voice agents are, how they work, and the building blocks behind a real-time conversation.',
    emoji: '🎙️',
  },
  {
    slug: 'conversational-ai',
    name: 'Conversational AI & LLMs',
    shortName: 'LLMs',
    description: 'How large language models power voice agents — prompting, function calling, memory, evaluations, and orchestration.',
    emoji: '🧠',
  },
  {
    slug: 'customer-support',
    name: 'Customer Support Automation',
    shortName: 'Support',
    description: 'Designing, deploying, and measuring AI agents that resolve customer issues across voice and chat.',
    emoji: '💬',
  },
  {
    slug: 'outbound-sales',
    name: 'Outbound Sales & Calling',
    shortName: 'Outbound',
    description: 'Building outbound voice agents that book meetings, qualify leads, and follow up — without burning trust.',
    emoji: '📞',
  },
  {
    slug: 'lead-qualification',
    name: 'Lead Qualification & Inbound',
    shortName: 'Lead Qual',
    description: 'Capturing and qualifying inbound leads with voice and chat — frameworks, scoring, and routing.',
    emoji: '🎯',
  },
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionists & Front Office',
    shortName: 'Receptionist',
    description: 'Replacing or augmenting front-office work — call routing, appointment booking, after-hours coverage.',
    emoji: '🏢',
  },
  {
    slug: 'speech-tech',
    name: 'Speech Technology',
    shortName: 'Speech Tech',
    description: 'TTS, STT, voice cloning, latency engineering, and the hard parts of making AI sound human.',
    emoji: '🔊',
  },
  {
    slug: 'integrations-telephony',
    name: 'Integrations & Telephony',
    shortName: 'Integrations',
    description: 'Twilio, SIP trunks, CRMs, helpdesks, calendars — connecting voice agents to the systems your business already runs.',
    emoji: '🔌',
  },
  {
    slug: 'industry',
    name: 'Industry Deep-Dives',
    shortName: 'Industry',
    description: 'How voice AI is being applied in healthcare, finance, retail, government, SaaS, and telecom.',
    emoji: '🏭',
  },
  {
    slug: 'comparisons-trends',
    name: 'Comparisons, Guides & Trends',
    shortName: 'Guides & Trends',
    description: 'Buyer\'s guides, vendor comparisons, market trends, and frameworks for making the right voice-AI decisions.',
    emoji: '📊',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
