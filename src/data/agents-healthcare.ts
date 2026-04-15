import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsHealthcareData: PageData = {
  meta: {
    title: 'AI Agents for Healthcare',
    description: 'AI agents for healthcare that automate scheduling, patient intake, triage, follow-up, and revenue cycle workflows.',
  },
  hero: {
    headline: 'AI agents for healthcare',
    subheadline: 'From inquiries and scheduling to triage, follow-up, and prescription management, our AI agents automate patient and provider workflows without sacrificing care quality.',
    primaryCTA: { label: 'Create an Agent', href: '/get-started' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Healthcare',
    headline: 'Transform healthcare operations without sacrificing care',
    cards: [
      { title: 'Improve patient care', description: '24/7 voice and chat resolution for appointment booking, prescription refills, and care navigation in patients\' preferred language.' },
      { title: 'Reduce operational costs', description: 'Automate patient intake, scheduling, reminders, benefits verification, and billing inquiries to free staff for clinical work.' },
      { title: 'Trusted for healthcare', description: 'Enterprise-grade security with zero retention mode, VPC deployment options, and end-to-end encryption for sensitive health data.' },
    ],
  },
  workflows: {
    headline: 'Conversational agents for every healthcare setting',
    items: [
      {
        title: 'Medical clinics and practices',
        description: 'Handle inbound calls, patient intake, pre-visit checklists, appointment scheduling, and insurance verification.',
        conversation: [
          { role: 'user', text: 'I need to schedule a follow-up appointment with Dr. Chen.' },
          { role: 'agent', text: 'I\'d be happy to help schedule that. Dr. Chen has openings on Thursday at 10 AM and Friday at 2 PM. Which works better for you?' },
          { role: 'user', text: 'Thursday at 10 works.' },
          { role: 'agent', text: 'You\'re booked for Thursday at 10 AM with Dr. Chen. I\'ll send you a confirmation and a pre-visit questionnaire to complete before your appointment.' },
        ],
      },
      {
        title: 'Health insurance and payers',
        description: 'Benefits inquiries, eligibility verification, enrollment support, and outbound engagement.',
      },
      {
        title: 'Pharmacies and prescription management',
        description: 'Refill requests, order status, prior authorization follow-ups, and medication reminders.',
      },
      {
        title: 'Health systems and hospitals',
        description: 'Patient access, post-discharge follow-up, revenue cycle workflows, and care coordination.',
      },
      {
        title: 'Dental and orthodontic practices',
        description: 'Scheduling, insurance capture, emergency triage, and after-hours call handling.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'One platform for every healthcare workflow',
    tabs: [
      platformFeatureTabs[0],
      { label: 'EHR Integration', title: 'Tightly integrated with your systems', description: 'Connect to EHR, practice management, billing, and scheduling systems. Agents read and write patient data in real-time with proper access controls.' },
      platformFeatureTabs[2],
    ],
  },
  featureGrid: {
    headline: 'Built for healthcare workflows that matter most',
    features: [
      { title: 'Intake, scheduling, and reminders', description: 'Automate the entire patient intake flow — from initial contact through scheduling, insurance verification, and appointment reminders.' },
      { title: 'Outbound engagement and follow-up', description: 'Proactive outreach for care reminders, post-visit follow-ups, preventive care campaigns, and appointment re-engagement.' },
      { title: 'Revenue cycle and billing support', description: 'Automate payment reminders, balance inquiries, payment plan setup, and insurance claim status updates.' },
    ],
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for healthcare',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    headline: 'Get started with healthcare AI agents',
    webOption: {
      title: 'Start on the web',
      description: 'Create a clinic or dental agent from templates, upload SOPs, and test simulated patient flows in minutes.',
      ctas: [{ label: 'Sign Up', href: '/get-started', variant: 'primary' as const }],
    },
    apiOption: {
      title: 'Build via API',
      description: 'Use our APIs and SDKs for EHR, phone, and scheduling integration. Deploy custom workflows with webhooks.',
      ctas: [
        { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
        { label: 'Get API Key', href: '#', variant: 'ghost' as const },
      ],
    },
  },
  faq: {
    questions: [
      { question: 'How do you ensure clinical safety?', answer: 'Agents follow your clinical protocols and SOPs. Guardrails prevent agents from providing medical advice outside defined boundaries. Escalation to clinical staff is automatic for complex cases.' },
      { question: 'Can agents integrate with our EHR or billing system?', answer: 'Yes. SIMBA integrates with major EHR platforms, practice management systems, and billing platforms via secure APIs and HL7/FHIR standards.' },
      { question: 'What security measures are in place?', answer: 'Enterprise-grade encryption, zero retention mode, VPC hosting options, regional data residency, and comprehensive access controls protect patient data.' },
      { question: 'Can we use voice agents for dental and therapy workflows?', answer: 'Absolutely. We have templates and pre-built workflows for dental practices, therapy offices, and specialty clinics that you can customize to your needs.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/healthcare'),
};
