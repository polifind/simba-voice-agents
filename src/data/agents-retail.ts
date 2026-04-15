import type { PageData } from '@/templates/types';
import { enterpriseSecurityFeatures, platformFeatureTabs, voiceFeatures, gettingStartedDefault, relatedUseCases } from './shared';

export const agentsRetailData: PageData = {
  meta: {
    title: 'AI Agents for Retail and E-commerce',
    description: 'AI agents for retail that drive conversion, manage orders, handle returns, and deliver personalized shopping experiences.',
  },
  hero: {
    headline: 'AI agents for retail and e-commerce',
    subheadline: 'From product recommendations and cart recovery to order support and returns, our AI agents drive better customer experiences and higher LTV without adding headcount.',
    primaryCTA: { label: 'Create an Agent', href: '/get-started' },
    secondaryCTA: { label: 'Talk to Sales', href: '/contact' },
  },
  logos: [],
  intro: {
    sectionLabel: 'Introducing SIMBA Agents for Retail',
    headline: 'Drive conversion and loyalty at scale',
    cards: [
      { title: 'Drive conversion', description: 'On-site shopping agents surface product recommendations, recover abandoned carts, and guide customers from discovery to purchase across every channel.' },
      { title: 'Grow LTV and reach', description: 'Better shopping experiences drive repeat purchases, stronger reviews, and organic growth. Agents engage customers in 70+ languages.' },
      { title: 'Reduce costs', description: 'Automate order status, returns, FAQs, and shipping inquiries. Free your team to focus on complex issues and VIP customers.' },
    ],
  },
  workflows: {
    headline: 'Built for every retail workflow',
    items: [
      {
        title: 'Pre-purchase and guided shopping',
        description: 'Surface products based on browsing behavior, guide discovery to purchase across voice, chat, email, and WhatsApp.',
        conversation: [
          { role: 'user', text: 'I\'m looking for a waterproof hiking backpack for a week-long trip.' },
          { role: 'agent', text: 'For a week-long trip, I\'d recommend our 55L Trailblazer pack. It\'s fully waterproof, has a rain cover, and includes a built-in hydration sleeve. Would you like to see it in different colors?' },
          { role: 'user', text: 'Yes, do you have it in green?' },
          { role: 'agent', text: 'We have it in forest green and sage. Both are in stock and ship by tomorrow. I can add one to your cart — which shade do you prefer?' },
        ],
      },
      {
        title: 'Order management and tracking',
        description: 'Handle order modifications, shipment status, delivery updates, and address changes in real-time.',
      },
      {
        title: 'Returns, exchanges, and refunds',
        description: 'Walk customers through eligibility, generate return labels, process exchanges, and handle refunds.',
      },
      {
        title: 'Supply-side and partner operations',
        description: 'Onboard sellers, verify store hours, coordinate with delivery partners, and manage partner campaigns.',
      },
      {
        title: 'In-store expertise at scale',
        description: 'QR-triggered agents for product details, stock checks, size recommendations, and checkout links.',
      },
    ],
  },
  stats: { value: '250000', label: 'Hours of conversations every month' },
  platformFeatures: {
    headline: 'One platform for every retail workflow',
    tabs: platformFeatureTabs,
  },
  voiceSection: {
    headline: 'Emotionally aware voice agents for retail',
    features: voiceFeatures,
  },
  enterpriseSecurity: { features: enterpriseSecurityFeatures },
  gettingStarted: {
    headline: 'Get started with retail AI agents',
    webOption: {
      title: 'Build from your catalog',
      description: 'Connect your product catalog, upload SOPs, and build shopping agents in minutes. No coding required.',
      ctas: [{ label: 'Sign Up', href: '/get-started', variant: 'primary' as const }],
    },
    apiOption: {
      title: 'Embed via API',
      description: 'Embed agents in your checkout, POS, mobile app, and CRM with our APIs and SDKs.',
      ctas: [
        { label: 'Explore Docs', href: '#', variant: 'secondary' as const },
        { label: 'Get API Key', href: '#', variant: 'ghost' as const },
      ],
    },
  },
  faq: {
    questions: [
      { question: 'Can agents handle order confirmations and modifications?', answer: 'Yes. Agents integrate with your OMS to confirm orders, process modifications, update shipping addresses, and provide real-time delivery status.' },
      { question: 'Can agents process refunds or purchases?', answer: 'Agents can initiate refunds and guide purchases through your existing payment and order systems. All financial actions follow your defined approval workflows.' },
      { question: 'How do agents enforce pricing rules?', answer: 'Agents reference your product catalog and pricing rules in real-time. Discounts, promotions, and pricing tiers are applied automatically based on customer eligibility.' },
      { question: 'What security controls are available?', answer: 'SOC 2 Type II certified with end-to-end encryption, zero retention modes, and role-based access controls for your team.' },
    ],
  },
  relatedUseCases: relatedUseCases.filter(r => r.href !== '/agents/retail-ecommerce'),
};
