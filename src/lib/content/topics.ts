// Cross-cutting topic tags used for interlinking articles across categories.
// These create "pillar bridges" — e.g., latency is relevant to both fundamentals
// and engineering articles.

export const topics = [
  'latency',
  'tts',
  'stt',
  'voice-cloning',
  'function-calling',
  'twilio',
  'sip',
  'compliance',
  'hipaa',
  'tcpa',
  'pci',
  'soc2',
  'evaluation',
  'rag',
  'knowledge-base',
  'analytics',
  'deflection',
  'csat',
  'multilingual',
  'barge-in',
  'turn-taking',
  'voice-cloning-ethics',
  'webhooks',
  'crm',
  'salesforce',
  'hubspot',
  'zendesk',
  'intercom',
  'a2p-10dlc',
  'sip-trunk',
  'on-call',
  'after-hours',
  'qa',
  'guardrails',
  'red-teaming',
  'pii',
  'observability',
] as const;

export type Topic = (typeof topics)[number];

export function topicLabel(t: string): string {
  // Convert slug to display label
  const map: Record<string, string> = {
    tts: 'TTS',
    stt: 'STT',
    rag: 'RAG',
    csat: 'CSAT',
    hipaa: 'HIPAA',
    tcpa: 'TCPA',
    pci: 'PCI',
    soc2: 'SOC 2',
    crm: 'CRM',
    sip: 'SIP',
    'a2p-10dlc': 'A2P 10DLC',
    pii: 'PII',
    qa: 'QA',
  };
  if (map[t]) return map[t];
  return t
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
