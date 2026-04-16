import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const supportData: PageData = {
  meta: {
    title: 'AI Support Agents for Customer Service',
    description: 'Build enterprise-ready AI agents for customer support. Human-like voice and chat agents that cut response time, reduce costs, and raise satisfaction.',
  },
  hero: {
    headline: 'AI Support Agents for Customer Service',
    subheadline: 'Build enterprise-ready AI agents with support for SOPs, authentication, system actions, and contextual escalation. We deliver human-like support — cutting response time, costs, and raising satisfaction from day one.',
    primaryCTA: { label: 'Create an Agent', href: '/login' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Support',
    headline: 'AI agents that cut volume and improve CSAT',
    cards: [
      { title: 'Deflect high-volume interactions', description: 'Automate order tracking, billing inquiries, password resets, and FAQs. Free your team to focus on complex, high-value interactions.' },
      { title: 'Faster time to resolution', description: 'Sub-second voice responses and instant chat replies. Agents resolve issues in minutes, not hours, with full context from your systems.' },
      { title: 'Lower cost per resolution', description: 'Reduce your cost per resolution by up to 80% while maintaining or improving customer satisfaction scores.' },
    ],
  },
  workflows: {
    headline: 'Built for every customer service use case',
    items: [
      {
        title: 'Telecom support',
        description: 'Triage network outages, troubleshoot connectivity, send proactive service alerts, and manage billing inquiries.',
        conversation: [
          { role: 'user', text: 'My internet has been down since this morning.' },
          { role: 'agent', text: 'I can see there\'s a network issue in your area. Let me check the status and estimated restoration time for you.' },
          { role: 'agent', text: 'There\'s a planned maintenance affecting your zone. Service should be restored by 2:00 PM today. Would you like me to send you an update when it\'s back?' },
          { role: 'user', text: 'Yes please, that would be great.' },
        ],
      },
      {
        title: 'Financial services',
        description: 'Handle account recovery, transaction disputes, payment reminders, and compliance-sensitive workflows.',
        conversation: [
          { role: 'user', text: 'I see a charge I don\'t recognize on my statement.' },
          { role: 'agent', text: 'I\'d be happy to help you with that. Can you tell me the date and amount of the charge you\'re concerned about?' },
          { role: 'user', text: 'It\'s from March 15th for $49.99.' },
          { role: 'agent', text: 'I\'ve located that transaction. I\'ll initiate a dispute for you right now and send you a confirmation email with the case details.' },
        ],
      },
      {
        title: 'E-commerce & retail',
        description: 'Manage orders, process returns and exchanges, handle shipping inquiries, and support product questions.',
        conversation: [
          { role: 'user', text: 'Where\'s my order? I placed it 5 days ago.' },
          { role: 'agent', text: 'Let me pull up your order details. Your order #38291 shipped on Monday and is currently in transit. Expected delivery is tomorrow by 5 PM.' },
          { role: 'user', text: 'Can I change the delivery address?' },
          { role: 'agent', text: 'I\'ve updated the delivery address for you. You\'ll receive a confirmation email shortly with the new delivery details.' },
        ],
      },
      {
        title: 'Tech & marketplaces',
        description: 'Support user onboarding, troubleshoot technical issues, manage account settings, and handle incident reports.',
        conversation: [
          { role: 'user', text: 'I can\'t log into my dashboard. It keeps showing an error.' },
          { role: 'agent', text: 'I can help you with that. Let me check your account status. It looks like your session token expired. I\'m sending a fresh login link to your email now.' },
        ],
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'The simplest enterprise-ready AI support platform',
    tabs: platformFeatureTabs,
  },
  featureGrid: {
    headline: 'Features that drive reliable customer service',
    features: [
      { title: 'SOP-driven agents', description: 'Upload your standard operating procedures and let agents follow them exactly. Consistent, compliant responses every time.' },
      { title: 'Behavioral and safety guardrails', description: 'Define what agents can and cannot say or do. Set safety rules, escalation triggers, and compliance boundaries.' },
      { title: 'Deterministic workflows', description: 'For high-risk tasks like refunds, cancellations, or data changes, define exact step-by-step workflows agents must follow.' },
      { title: 'Expressive, human-like speech', description: 'Agents speak with natural emotion, tone, and cadence. Control how your brand sounds across every interaction.' },
      { title: 'Sub-second responsiveness', description: 'Industry-leading latency under 1 second. Natural turn-taking and interruption handling for real conversations.' },
      { title: 'Multilingual support', description: 'Serve customers in 70+ languages with automatic detection and seamless mid-conversation language switching.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for support',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    ...gettingStartedDefault,
    headline: 'Create your first support agent',
  },
  faq: {
    questions: [
      { question: 'How do we create an agent from our SOPs and documentation?', answer: 'Upload your SOPs, knowledge base articles, and training documents to the SIMBA platform. Our system automatically indexes the content and creates an agent that follows your procedures. You can test and refine the agent before deploying it live.' },
      { question: 'Is the platform suitable for non-technical team members?', answer: 'Yes. The web platform is designed for support operations teams to build, test, and manage agents without writing code. You can configure workflows, update knowledge bases, and monitor performance through an intuitive interface.' },
      { question: 'What channels does SIMBA Agents for Support cover?', answer: 'SIMBA Agents deploy across voice (phone), web chat, email, WhatsApp, SMS, and in-app messaging. You design the agent once and it works consistently across all channels.' },
      { question: 'How do human handoffs work?', answer: 'When an agent detects a conversation that requires human intervention — based on sentiment, complexity, or your defined escalation rules — it transfers the conversation with full context to your support team. The handoff includes conversation history, customer intent, and suggested actions.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/support'),
};
