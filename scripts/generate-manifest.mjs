#!/usr/bin/env node
// Generates src/content/manifest.json — the master list of 200 articles.
// Distributes publish dates evenly from 2026-01-01 → today, rotates authors,
// and enriches each entry with topics derived from the title.
//
// Run: node scripts/generate-manifest.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MANIFEST_PATH = path.join(ROOT, 'src/content/manifest.json');

const AUTHORS = ['cliff-weitzman', 'tyler-weitzman', 'rohan-pavuluri'];

// slugify
const s = (t) => t
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

// excerpt builder helper
const ex = (text) => text.length > 180 ? text.slice(0, 177) + '...' : text;

// Article definitions: [title, category, author-bias?, topics[], pillar?, featured?]
// author-bias: 'tyler' = engineering, 'cliff' = vision, 'rohan' = product/use cases, null = any
// We'll round-robin among unbiased; biased ones override.
const ARTICLES = [
  // ============ VOICE AI FUNDAMENTALS (25) ============
  ['What Is a Voice Agent? A 2026 Primer', 'voice-ai-fundamentals', 'cliff', [], true, true],
  ['How a Conversational Voice Agent Actually Works (Under the Hood)', 'voice-ai-fundamentals', 'tyler', ['tts','stt','latency'], true],
  ['Voice Agents vs IVR: A Side-by-Side Comparison', 'voice-ai-fundamentals', null, []],
  ['Voice Agents vs Chatbots: When to Use Which', 'voice-ai-fundamentals', null, []],
  ['Latency in Voice AI: Why Sub-500ms Matters', 'voice-ai-fundamentals', 'tyler', ['latency']],
  ['Turn-Taking and Barge-In: The Mechanics of Natural Conversation', 'voice-ai-fundamentals', 'tyler', ['turn-taking','barge-in']],
  ['The Anatomy of a Voice Agent Pipeline', 'voice-ai-fundamentals', 'tyler', ['tts','stt'], true],
  ['How Voice Agents Handle Interruptions Gracefully', 'voice-ai-fundamentals', 'tyler', ['barge-in']],
  ['What Voice Agents Can and Can\'t Do in 2026', 'voice-ai-fundamentals', 'cliff', []],
  ['The Real Cost of a Voice Agent Conversation', 'voice-ai-fundamentals', null, []],
  ['Voice AI Glossary: 50 Terms You Need to Know', 'voice-ai-fundamentals', null, []],
  ['Voice Agent Persona Design: A Framework', 'voice-ai-fundamentals', 'rohan', []],
  ['How Voice Agents Differ from Voice Assistants', 'voice-ai-fundamentals', null, []],
  ['Why Voice Agents Sound More Human Every Year', 'voice-ai-fundamentals', 'tyler', ['tts']],
  ['What Makes a Voice Agent "Production Ready"', 'voice-ai-fundamentals', 'tyler', ['evaluation','observability']],
  ['Synchronous vs Asynchronous Voice Agents', 'voice-ai-fundamentals', 'tyler', []],
  ['How Voice Agents Decide When to Stop Talking', 'voice-ai-fundamentals', 'tyler', ['turn-taking']],
  ['The Difference Between Streaming and Non-Streaming Voice Agents', 'voice-ai-fundamentals', 'tyler', ['latency']],
  ['How Voice Agents Recover from Misunderstandings', 'voice-ai-fundamentals', 'tyler', ['stt']],
  ['Voice Agent Use Cases: A Field Guide', 'voice-ai-fundamentals', 'rohan', []],
  ['Why Voice AI Will Transform Phone Channels by 2030', 'voice-ai-fundamentals', 'cliff', []],
  ['First-Time Builder\'s Guide to Voice Agents', 'voice-ai-fundamentals', 'rohan', []],
  ['How to Measure Voice Agent Quality', 'voice-ai-fundamentals', 'tyler', ['evaluation']],
  ['The Hidden Complexity of Numbers in Voice Agents', 'voice-ai-fundamentals', 'tyler', ['tts','stt']],
  ['How Voice Agents Handle Accents and Dialects', 'voice-ai-fundamentals', 'tyler', ['stt','multilingual']],

  // ============ CONVERSATIONAL AI & LLMs (22) ============
  ['How Large Language Models Power Voice Agents', 'conversational-ai', 'tyler', [], true, true],
  ['Function Calling for Voice Agents: A Practical Guide', 'conversational-ai', 'tyler', ['function-calling']],
  ['Prompt Engineering for Voice (vs Text) Agents', 'conversational-ai', 'tyler', []],
  ['How to Give a Voice Agent Long-Term Memory', 'conversational-ai', 'tyler', ['rag']],
  ['Retrieval-Augmented Generation for Voice Agents', 'conversational-ai', 'tyler', ['rag','knowledge-base']],
  ['LLM Evaluation for Conversational Agents', 'conversational-ai', 'tyler', ['evaluation']],
  ['Guardrails for Voice Agents: A Pragmatic Take', 'conversational-ai', 'tyler', ['guardrails']],
  ['Why Smaller LLMs Often Win for Voice Agents', 'conversational-ai', 'tyler', ['latency']],
  ['Tool Use vs Function Calling: What\'s the Difference?', 'conversational-ai', 'tyler', ['function-calling']],
  ['Designing System Prompts for Multi-Turn Voice Conversations', 'conversational-ai', 'tyler', []],
  ['How to Stop a Voice Agent from Hallucinating', 'conversational-ai', 'tyler', ['guardrails','rag']],
  ['Multi-Agent Architectures for Customer Service', 'conversational-ai', 'tyler', []],
  ['The Role of Embeddings in Voice Agent Knowledge', 'conversational-ai', 'tyler', ['rag']],
  ['Streaming LLM Outputs to Voice: The Engineering', 'conversational-ai', 'tyler', ['latency']],
  ['How to A/B Test Voice Agent Prompts', 'conversational-ai', 'tyler', ['evaluation']],
  ['Why Context Windows Matter Less Than You Think for Voice', 'conversational-ai', 'tyler', []],
  ['Building a Conversation Memory Layer for Voice Agents', 'conversational-ai', 'tyler', ['rag']],
  ['Red-Teaming Your Voice Agent', 'conversational-ai', 'tyler', ['red-teaming','guardrails']],
  ['How LLMs Decide What to Say Next in a Voice Conversation', 'conversational-ai', 'tyler', []],
  ['Open-Source vs Closed-Source LLMs for Voice Agents', 'conversational-ai', 'tyler', []],
  ['Designing Voice Agents That Ask Better Questions', 'conversational-ai', 'rohan', []],
  ['How to Handle Personally Identifiable Information in Voice Agents', 'conversational-ai', 'tyler', ['pii','compliance']],

  // ============ CUSTOMER SUPPORT AUTOMATION (28) ============
  ['The Definitive Guide to AI Customer Support in 2026', 'customer-support', 'rohan', [], true, true],
  ['What Is AI Deflection (and How to Measure It)', 'customer-support', 'rohan', ['deflection','analytics']],
  ['Building a Tier-1 AI Support Agent Step by Step', 'customer-support', 'rohan', [], true],
  ['Voice vs Chat for Customer Support: Which to Deploy First', 'customer-support', 'rohan', []],
  ['How AI Agents Handle Refunds and Returns', 'customer-support', 'rohan', []],
  ['Designing Escalation Paths Between AI and Human Agents', 'customer-support', 'rohan', []],
  ['CSAT for AI Agents: Benchmarks and Frameworks', 'customer-support', 'rohan', ['csat','analytics']],
  ['How to Migrate from a Legacy Contact Center to AI', 'customer-support', 'rohan', []],
  ['The Anatomy of an AI-Resolved Support Ticket', 'customer-support', 'rohan', []],
  ['Building Trust Between AI Support Agents and Customers', 'customer-support', 'cliff', []],
  ['How AI Agents Handle Multi-Step Account Issues', 'customer-support', 'rohan', []],
  ['Why First-Contact Resolution Is the North Star for AI Support', 'customer-support', 'rohan', ['analytics']],
  ['Cutting Average Handle Time with Voice Agents', 'customer-support', 'rohan', ['analytics']],
  ['How AI Agents Should Handle Angry Customers', 'customer-support', 'rohan', []],
  ['When to Let an AI Agent Apologize (and When Not To)', 'customer-support', 'rohan', []],
  ['Designing Voice Agents for After-Hours Support', 'customer-support', 'rohan', ['after-hours']],
  ['Self-Service vs AI-Assisted Support: A Decision Framework', 'customer-support', 'rohan', []],
  ['How AI Agents Coordinate with Helpdesks Like Zendesk', 'customer-support', 'rohan', ['zendesk']],
  ['How AI Agents Coordinate with Intercom', 'customer-support', 'rohan', ['intercom']],
  ['Quality Assurance for AI Voice Support', 'customer-support', 'rohan', ['qa','evaluation']],
  ['How to Tag and Categorize AI Conversations', 'customer-support', 'rohan', ['analytics']],
  ['Reducing Repeat Contacts with Better Knowledge Bases', 'customer-support', 'rohan', ['knowledge-base']],
  ['Voice Agent Onboarding: A 30-Day Plan for Support Teams', 'customer-support', 'rohan', []],
  ['Multilingual Support: When and How to Add a Second Language', 'customer-support', 'rohan', ['multilingual']],
  ['How AI Support Agents Should Handle Account Verification', 'customer-support', 'rohan', ['compliance']],
  ['Designing AI Agents That Cancel Subscriptions Honestly', 'customer-support', 'rohan', []],
  ['How to Calculate ROI for AI Customer Support', 'customer-support', 'rohan', []],
  ['Why "Human-in-the-Loop" Beats "Fully Autonomous" for Most Teams', 'customer-support', 'rohan', []],

  // ============ OUTBOUND SALES & CALLING (22) ============
  ['Outbound AI Calling in 2026: A Practical Playbook', 'outbound-sales', 'rohan', [], true, true],
  ['TCPA Compliance for AI-Powered Outbound Calls', 'outbound-sales', 'rohan', ['tcpa','compliance']],
  ['A2P 10DLC Explained for Voice Agent Builders', 'outbound-sales', 'rohan', ['a2p-10dlc','compliance']],
  ['Voice Agents for SDR Workflows: A Field Guide', 'outbound-sales', 'rohan', []],
  ['How AI Agents Should Handle "Not Interested"', 'outbound-sales', 'rohan', []],
  ['Designing Outbound Sequences That Convert', 'outbound-sales', 'rohan', []],
  ['When to Use AI for Discovery Calls (and When Not To)', 'outbound-sales', 'rohan', []],
  ['How AI Voice Agents Book Meetings on Calendars', 'outbound-sales', 'rohan', ['function-calling']],
  ['Cold Email vs Cold Call vs AI Cold Call: What Wins', 'outbound-sales', 'cliff', []],
  ['Lead Re-Engagement Sequences with Voice Agents', 'outbound-sales', 'rohan', []],
  ['How to Personalize Outbound Voice Agents at Scale', 'outbound-sales', 'rohan', []],
  ['Voicemail Handling for Outbound AI Agents', 'outbound-sales', 'rohan', []],
  ['DTMF and IVR Navigation for Outbound Voice Agents', 'outbound-sales', 'tyler', []],
  ['Caller ID and Trust: Why Numbers Get Marked as Spam', 'outbound-sales', 'rohan', ['compliance']],
  ['How to Build a Compliant Outbound Voice Agent in 30 Days', 'outbound-sales', 'rohan', ['compliance']],
  ['Outbound Voice Agents for Renewal Conversations', 'outbound-sales', 'rohan', []],
  ['How to Coach an AI Outbound Agent Like an SDR', 'outbound-sales', 'rohan', ['evaluation']],
  ['When AI Should Hand Off an Outbound Call to a Human', 'outbound-sales', 'rohan', []],
  ['Outbound Agent Metrics That Actually Matter', 'outbound-sales', 'rohan', ['analytics']],
  ['How to Run an Outbound AI Pilot That Doesn\'t Embarrass You', 'outbound-sales', 'rohan', []],
  ['Outbound for B2C: Subscription, Healthcare, and Auto', 'outbound-sales', 'rohan', []],
  ['Outbound for B2B: Pipeline, Renewals, and Win-Backs', 'outbound-sales', 'rohan', []],

  // ============ LEAD QUALIFICATION & INBOUND (15) ============
  ['Inbound Lead Qualification with Voice Agents', 'lead-qualification', 'rohan', [], true],
  ['BANT vs MEDDIC vs CHAMP: Which Framework for AI Agents?', 'lead-qualification', 'rohan', []],
  ['How to Score Leads From a Voice Conversation', 'lead-qualification', 'rohan', ['analytics']],
  ['Routing Qualified Leads from AI Agents to Sales Reps', 'lead-qualification', 'rohan', ['crm']],
  ['Using Voice Agents to Filter Out Tire-Kickers', 'lead-qualification', 'rohan', []],
  ['Inbound Voice Agents for SaaS Demos', 'lead-qualification', 'rohan', []],
  ['Designing Discovery Questions for AI Lead Qualification', 'lead-qualification', 'rohan', []],
  ['How AI Agents Handle "Send Me an Email Instead"', 'lead-qualification', 'rohan', []],
  ['Lead Qualification for High-Volume Marketing Channels', 'lead-qualification', 'rohan', []],
  ['Connecting Voice Lead Qual to Salesforce', 'lead-qualification', 'rohan', ['salesforce','crm']],
  ['Connecting Voice Lead Qual to HubSpot', 'lead-qualification', 'rohan', ['hubspot','crm']],
  ['How AI Agents Should Handle Pricing Questions on Inbound Calls', 'lead-qualification', 'rohan', []],
  ['Inbound Voice for Trade Shows and Events', 'lead-qualification', 'rohan', []],
  ['Multilingual Lead Qualification: A Practical Guide', 'lead-qualification', 'rohan', ['multilingual']],
  ['When AI Should Book Meetings vs Hand Off to Humans', 'lead-qualification', 'rohan', []],

  // ============ AI RECEPTIONIST & FRONT OFFICE (15) ============
  ['Designing an AI Receptionist From First Principles', 'ai-receptionist', 'rohan', [], true],
  ['AI Receptionists for Healthcare Clinics', 'ai-receptionist', 'rohan', ['hipaa']],
  ['AI Receptionists for Law Firms', 'ai-receptionist', 'rohan', []],
  ['AI Receptionists for Dental Practices', 'ai-receptionist', 'rohan', []],
  ['AI Receptionists for Hotels and Hospitality', 'ai-receptionist', 'rohan', []],
  ['Multi-Department Call Routing with AI Voice Agents', 'ai-receptionist', 'rohan', []],
  ['After-Hours Coverage with AI Receptionists', 'ai-receptionist', 'rohan', ['after-hours']],
  ['Appointment Booking via Voice Agent: A Complete Guide', 'ai-receptionist', 'rohan', ['function-calling']],
  ['How AI Receptionists Should Handle Emergencies', 'ai-receptionist', 'rohan', []],
  ['Voicemail Replacement: Why AI Receptionists Win', 'ai-receptionist', 'rohan', []],
  ['When to Hand Off to a Human Receptionist', 'ai-receptionist', 'rohan', []],
  ['How AI Receptionists Handle Repeat Callers', 'ai-receptionist', 'rohan', []],
  ['Greeting Design: First-Impression Engineering for AI Voices', 'ai-receptionist', 'cliff', []],
  ['How AI Receptionists Coordinate with Calendars', 'ai-receptionist', 'rohan', ['function-calling']],
  ['Cost Comparison: Hiring a Receptionist vs Deploying AI', 'ai-receptionist', 'rohan', []],

  // ============ SPEECH TECH (25) ============
  ['Text-to-Speech in 2026: The State of the Art', 'speech-tech', 'tyler', ['tts'], true, true],
  ['Speech-to-Text Word Error Rate Explained', 'speech-tech', 'tyler', ['stt']],
  ['Voice Cloning: How It Works and Why It Matters', 'speech-tech', 'tyler', ['voice-cloning']],
  ['Voice Cloning Ethics: A Practical Framework', 'speech-tech', 'cliff', ['voice-cloning-ethics']],
  ['Latency Engineering for Real-Time Voice Agents', 'speech-tech', 'tyler', ['latency'], true],
  ['Streaming TTS: How to Cut First-Audio Latency', 'speech-tech', 'tyler', ['tts','latency']],
  ['Streaming STT: How to Cut Recognition Latency', 'speech-tech', 'tyler', ['stt','latency']],
  ['How TTS Models Handle Numbers, Dates, and Acronyms', 'speech-tech', 'tyler', ['tts']],
  ['Why TTS Quality Plateaus and How to Push Past It', 'speech-tech', 'tyler', ['tts']],
  ['Multilingual TTS: Choosing a Voice Model', 'speech-tech', 'tyler', ['tts','multilingual']],
  ['How STT Handles Disfluencies and Filler Words', 'speech-tech', 'tyler', ['stt']],
  ['The Engineering Behind Sub-Second Voice Agents', 'speech-tech', 'tyler', ['latency']],
  ['Voice Activity Detection in Production Voice Agents', 'speech-tech', 'tyler', ['turn-taking']],
  ['Diarization: Knowing Who\'s Speaking in a Voice Conversation', 'speech-tech', 'tyler', []],
  ['Audio Codecs for Voice Agents: Opus, PCMU, and More', 'speech-tech', 'tyler', []],
  ['How Background Noise Affects Voice Agent Accuracy', 'speech-tech', 'tyler', ['stt']],
  ['Echo Cancellation in Real-Time Voice AI', 'speech-tech', 'tyler', []],
  ['How Sample Rate Affects Voice Agent Quality', 'speech-tech', 'tyler', []],
  ['Voice Cloning for Customer Brands: A Buyer\'s Guide', 'speech-tech', 'cliff', ['voice-cloning']],
  ['Why Some Voices Sound Robotic Even in 2026', 'speech-tech', 'tyler', ['tts']],
  ['Phoneme-Level Tuning for Voice Agents', 'speech-tech', 'tyler', ['tts']],
  ['Comparing Neural TTS Architectures', 'speech-tech', 'tyler', ['tts']],
  ['Whisper vs Deepgram vs ElevenLabs STT', 'speech-tech', 'tyler', ['stt']],
  ['Streaming Audio Over WebRTC for Voice Agents', 'speech-tech', 'tyler', ['latency']],
  ['How to Benchmark a Voice Agent\'s End-to-End Latency', 'speech-tech', 'tyler', ['latency','evaluation']],

  // ============ INTEGRATIONS & TELEPHONY (18) ============
  ['Twilio + Voice Agents: A Complete Guide', 'integrations-telephony', 'tyler', ['twilio'], true],
  ['SIP Trunking 101 for Voice Agent Builders', 'integrations-telephony', 'tyler', ['sip','sip-trunk']],
  ['Connecting Voice Agents to Salesforce CRM', 'integrations-telephony', 'rohan', ['salesforce','crm']],
  ['Connecting Voice Agents to HubSpot CRM', 'integrations-telephony', 'rohan', ['hubspot','crm']],
  ['Connecting Voice Agents to Zendesk', 'integrations-telephony', 'rohan', ['zendesk']],
  ['Connecting Voice Agents to Intercom', 'integrations-telephony', 'rohan', ['intercom']],
  ['Webhooks 101 for Voice Agents', 'integrations-telephony', 'tyler', ['webhooks']],
  ['Calendar Integrations: Cal.com, Google, Outlook', 'integrations-telephony', 'rohan', ['function-calling']],
  ['Sending SMS Follow-Ups from Voice Agents', 'integrations-telephony', 'rohan', []],
  ['Connecting Voice Agents to Stripe for Payments', 'integrations-telephony', 'tyler', ['compliance','pci']],
  ['How to Use Twilio Studio with AI Voice Agents', 'integrations-telephony', 'tyler', ['twilio']],
  ['Bring Your Own Twilio: Pros, Cons, and Setup', 'integrations-telephony', 'tyler', ['twilio']],
  ['SIP vs WebRTC for Voice Agents', 'integrations-telephony', 'tyler', ['sip','latency']],
  ['Setting Up Toll-Free Verification for AI Calling', 'integrations-telephony', 'rohan', ['compliance']],
  ['How to Port a Phone Number to Your Voice Agent', 'integrations-telephony', 'rohan', []],
  ['Connecting Voice Agents to Snowflake or BigQuery', 'integrations-telephony', 'tyler', ['analytics']],
  ['Sending Voice Agent Transcripts to Slack', 'integrations-telephony', 'rohan', ['webhooks']],
  ['How to Integrate Voice Agents with a Custom REST API', 'integrations-telephony', 'tyler', ['function-calling','webhooks']],

  // ============ INDUSTRY DEEP-DIVES (18 — 3 per industry × 6) ============
  // Healthcare
  ['Voice AI in Healthcare: A 2026 Field Guide', 'industry', 'rohan', ['hipaa'], true],
  ['HIPAA Compliance for AI Voice Agents in Healthcare', 'industry', 'rohan', ['hipaa','compliance']],
  ['How Healthcare Providers Use Voice Agents for Intake', 'industry', 'rohan', ['hipaa']],
  // Financial
  ['Voice AI in Financial Services: Trends and Use Cases', 'industry', 'rohan', ['compliance']],
  ['Compliance Considerations for AI Voice in Banking', 'industry', 'rohan', ['compliance','pci']],
  ['Voice Agents for Loan Servicing and Collections', 'industry', 'rohan', ['compliance','tcpa']],
  // Retail / E-commerce
  ['Voice AI for Retail and E-commerce', 'industry', 'rohan', []],
  ['Order-Status Voice Agents: The Quickest E-commerce Win', 'industry', 'rohan', []],
  ['Returns and Refunds via Voice Agent: A Playbook', 'industry', 'rohan', []],
  // Government
  ['Voice AI for Government Agencies', 'industry', 'rohan', ['compliance']],
  ['Citizen Services with AI Voice Agents', 'industry', 'rohan', []],
  ['Compliance and Accessibility for Government Voice AI', 'industry', 'rohan', ['compliance']],
  // SaaS / Technology
  ['Voice AI for SaaS Companies', 'industry', 'rohan', []],
  ['Voice Agents for Developer Support', 'industry', 'rohan', []],
  ['Onboarding SaaS Customers with Voice Agents', 'industry', 'rohan', []],
  // Telecom
  ['Voice AI in Telecommunications', 'industry', 'rohan', []],
  ['Network Outage Communications via Voice Agents', 'industry', 'rohan', []],
  ['Telco Bill Inquiries: An AI-First Approach', 'industry', 'rohan', []],

  // ============ COMPARISONS, GUIDES & TRENDS (12) ============
  ['Choosing a Voice Agent Platform in 2026: A Buyer\'s Guide', 'comparisons-trends', 'rohan', [], true, true],
  ['ElevenLabs vs Vapi vs Retell: A Technical Comparison', 'comparisons-trends', 'tyler', []],
  ['The State of Voice AI in 2026', 'comparisons-trends', 'cliff', [], true],
  ['Build vs Buy: When to Build Your Own Voice Agent', 'comparisons-trends', 'tyler', []],
  ['Voice Agent Pricing Models Compared', 'comparisons-trends', 'rohan', []],
  ['What to Look for in a Voice Agent Vendor', 'comparisons-trends', 'rohan', []],
  ['Open-Source vs Proprietary Voice Agent Stacks', 'comparisons-trends', 'tyler', []],
  ['Voice AI Trends to Watch in 2026 and Beyond', 'comparisons-trends', 'cliff', []],
  ['How AI Voice Will Reshape Customer Service Jobs', 'comparisons-trends', 'cliff', []],
  ['The Economics of AI Voice Agents at Scale', 'comparisons-trends', 'cliff', []],
  ['What Decagon, Sierra, and Fin Get Right About AI Support', 'comparisons-trends', 'rohan', []],
  ['Why Voice Will Be the Default UX for Enterprise AI', 'comparisons-trends', 'cliff', []],
];

console.log(`Total articles: ${ARTICLES.length}`);
if (ARTICLES.length !== 200) {
  console.error(`Expected 200, got ${ARTICLES.length}`);
  process.exit(1);
}

// Date distribution: Jan 1 2026 → today, evenly spread
const START = new Date('2026-01-01T09:00:00Z');
const END = new Date('2026-04-16T09:00:00Z');
const DAYS = (END - START) / (1000 * 60 * 60 * 24);
const SPACING_DAYS = DAYS / ARTICLES.length;

// Author rotation
let cursor = 0;
function nextAuthor() {
  const a = AUTHORS[cursor % AUTHORS.length];
  cursor++;
  return a;
}

// Build entries
const seenSlugs = new Set();
const entries = ARTICLES.map(([title, category, bias, topics, pillar, featured], i) => {
  let slug = s(title);
  // De-duplicate slug if needed
  let suffix = 2;
  while (seenSlugs.has(slug)) {
    slug = `${s(title)}-${suffix}`;
    suffix++;
  }
  seenSlugs.add(slug);

  // Date — spaced evenly, with hour variation for visual realism
  const dayOffset = Math.floor(i * SPACING_DAYS);
  const hour = 9 + (i % 6);
  const minute = (i * 7) % 60;
  const date = new Date(START);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  date.setUTCHours(hour, minute, 0, 0);
  const publishedAt = date.toISOString();

  // Author: bias overrides round-robin
  let author;
  if (bias === 'cliff') author = 'cliff-weitzman';
  else if (bias === 'tyler') author = 'tyler-weitzman';
  else if (bias === 'rohan') author = 'rohan-pavuluri';
  else author = nextAuthor();

  // Excerpt — generated short version of title hint
  const excerpt = ex(`${title}. A practical, vendor-neutral guide for teams building or buying voice AI agents.`);

  return {
    slug,
    title,
    description: title,
    excerpt,
    category,
    topics: topics || [],
    author,
    publishedAt,
    ...(featured ? { featured: true } : {}),
    ...(pillar ? { pillar: true } : {}),
  };
});

// Newest first (so manifest reads naturally)
entries.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(entries, null, 2));
console.log(`Wrote ${entries.length} entries to ${MANIFEST_PATH}`);
console.log(`Date range: ${entries[entries.length - 1].publishedAt} → ${entries[0].publishedAt}`);

// Counts per category
const counts = {};
for (const e of entries) counts[e.category] = (counts[e.category] || 0) + 1;
console.log('Per-category counts:', counts);

// Counts per author
const authorCounts = {};
for (const e of entries) authorCounts[e.author] = (authorCounts[e.author] || 0) + 1;
console.log('Per-author counts:', authorCounts);
