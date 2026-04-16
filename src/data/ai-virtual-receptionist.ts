import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const aiVirtualReceptionistData: PageData = {
  meta: {
    title: 'AI Virtual Receptionist - Answer Every Call, 24/7',
    description: 'AI virtual receptionist that answers every call, schedules appointments, routes visitors, and handles after-hours coverage across every industry.',
  },
  hero: {
    headline: 'AI virtual receptionist — answer every call, 24/7',
    subheadline: 'From call answering and appointment scheduling to visitor routing, intake capture, and after-hours coverage, our virtual receptionists automate front-desk workflows across every industry without sacrificing caller experience.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing AI Virtual Receptionist',
    headline: 'Better caller experiences, lower front-desk costs',
    cards: [
      { title: 'Greet every caller warmly', description: 'Answer every call with a friendly, professional voice — 24/7, including holidays and after-hours. No hold music, no missed calls.' },
      { title: 'Reduce front-desk overhead', description: 'Automate call answering, routing, scheduling, and intake. Free your team to focus on in-person visitors and complex requests.' },
      { title: 'Capture every opportunity', description: 'Never miss a new patient, client, or customer inquiry. Every call is answered, every lead is captured, and every appointment is booked.' },
    ],
  },
  workflows: {
    headline: 'Built for every industry',
    items: [
      {
        title: 'Healthcare and dental practices',
        description: 'Schedule appointments, capture insurance details, handle prescription refill requests, and manage after-hours calls.',
        conversation: [
          { role: 'user', text: 'Hi, I\'d like to schedule a dental cleaning.' },
          { role: 'agent', text: 'I\'d be happy to help you schedule that. Do you have a preferred day and time?' },
          { role: 'user', text: 'Sometime next Tuesday afternoon if possible.' },
          { role: 'agent', text: 'I have an opening at 2:30 PM on Tuesday. Shall I book that for you? I\'ll also need your insurance information.' },
          { role: 'user', text: 'Yes, 2:30 works great.' },
          { role: 'agent', text: 'You\'re all set for Tuesday at 2:30 PM. I\'ll send you a confirmation text with the details and a reminder the day before.' },
        ],
      },
      {
        title: 'Legal and professional services',
        description: 'Screen potential clients, schedule consultations, route urgent matters to on-call attorneys, and capture case details.',
      },
      {
        title: 'Real estate and property management',
        description: 'Handle property inquiries, schedule showings, route maintenance requests, and qualify prospective tenants.',
      },
      {
        title: 'Hospitality and travel',
        description: 'Manage reservations, answer guest inquiries, handle check-in/check-out, and route concierge requests.',
      },
      {
        title: 'Automotive dealerships and service',
        description: 'Schedule test drives, book service appointments, provide vehicle status updates, and qualify buyers.',
      },
    ],
  },
  stats: { value: '4357697', label: 'Agents launched and counting' },
  platformFeatures: {
    headline: 'One platform for every receptionist workflow',
    tabs: platformFeatureTabs,
  },
  featureGrid: {
    headline: 'Built for the caller interactions that matter most',
    features: [
      { title: 'Inbound call handling and routing', description: 'Answer calls, identify caller intent, and route to the right person or department. Handle multi-level IVR trees naturally.' },
      { title: 'Scheduling and appointment management', description: 'Book, reschedule, and cancel appointments with real-time calendar integration. Send confirmations and reminders automatically.' },
      { title: 'After-hours and overflow coverage', description: 'Provide 24/7 coverage with consistent quality. Handle overflow during peak hours and take messages when your team is unavailable.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for reception',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    ...gettingStartedDefault,
    headline: 'Get started with AI virtual receptionist today',
  },
  faq: {
    questions: [
      { question: 'How quickly can we deploy a virtual receptionist?', answer: 'Most businesses are live within 24-48 hours. Upload your call handling scripts, connect your phone system, and your AI receptionist is ready to answer calls.' },
      { question: 'Can the receptionist book and modify appointments?', answer: 'Yes. The receptionist integrates with Calendly, Cal.com, and custom scheduling systems to book, reschedule, and cancel appointments in real-time.' },
      { question: 'What integrations are supported?', answer: 'SIMBA integrates with all major telephony providers (Twilio, Vonage, RingCentral), scheduling tools, CRMs, and custom APIs via webhooks.' },
      { question: 'How do you handle complex or urgent calls?', answer: 'Agents detect urgency and complexity based on your rules and immediately transfer to the appropriate person with full conversation context.' },
      { question: 'Do you offer LLM model choice?', answer: 'Yes. Choose from OpenAI, Anthropic, Google, or open-source models. Different models can be used for different tasks within the same agent.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/ai-virtual-receptionist'),
};
