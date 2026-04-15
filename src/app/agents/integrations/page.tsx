'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Automation',
    integrations: [
      { name: 'Zapier', description: 'Connect your SIMBA agents to 5,000+ apps with automated workflows.' },
      { name: 'n8n', description: 'Build complex automation workflows with open-source n8n integration.' },
      { name: 'Make', description: 'Create sophisticated automations that connect SIMBA with your tools.' },
    ],
  },
  {
    name: 'CRM',
    integrations: [
      { name: 'Salesforce', description: 'Sync agent conversations with Salesforce records in real-time.' },
      { name: 'HubSpot', description: 'Write leads, contacts, and deal updates directly to HubSpot.' },
      { name: 'Pipedrive', description: 'Manage your sales pipeline with AI-powered lead qualification.' },
      { name: 'Zoho', description: 'Connect your Zoho CRM for seamless lead and contact management.' },
      { name: 'Monday.com', description: 'Sync agent tasks and workflows with Monday.com boards.' },
    ],
  },
  {
    name: 'Customer Support',
    integrations: [
      { name: 'Zendesk', description: 'Create and update tickets, pull customer context, and escalate to human agents.' },
      { name: 'ServiceNow', description: 'Integrate with ServiceNow for enterprise IT and customer service workflows.' },
      { name: 'Intercom', description: 'Connect SIMBA agents with your Intercom conversations and customer data.' },
    ],
  },
  {
    name: 'Data Platform',
    integrations: [
      { name: 'Airtable', description: 'Read and write data to Airtable bases during agent conversations.' },
      { name: 'Supabase', description: 'Use Supabase as your agent\'s real-time database and auth provider.' },
      { name: 'Asana', description: 'Create tasks, update projects, and manage workflows from conversations.' },
    ],
  },
  {
    name: 'Inference Provider',
    integrations: [
      { name: 'OpenAI', description: 'Use GPT-4o, GPT-4, and other OpenAI models for your agents.' },
      { name: 'Anthropic', description: 'Power your agents with Claude for nuanced, safe conversations.' },
      { name: 'Google', description: 'Use Gemini models for your agent conversations.' },
      { name: 'Groq', description: 'Ultra-fast inference with Groq\'s LPU for real-time conversations.' },
    ],
  },
  {
    name: 'Payment',
    integrations: [
      { name: 'Stripe', description: 'Process payments, manage subscriptions, and handle billing inquiries.' },
    ],
  },
  {
    name: 'Retail',
    integrations: [
      { name: 'Shopify', description: 'Pull product catalog, manage orders, and handle customer inquiries.' },
    ],
  },
  {
    name: 'Scheduling',
    integrations: [
      { name: 'Calendly', description: 'Book, reschedule, and cancel meetings based on real-time availability.' },
      { name: 'Cal.com', description: 'Open-source scheduling integration for appointment management.' },
      { name: 'Slack', description: 'Send notifications, updates, and alerts to Slack channels.' },
      { name: 'Mailchimp', description: 'Add contacts to email lists and trigger campaign workflows.' },
      { name: 'DocuSign', description: 'Send documents for signature and track completion status.' },
    ],
  },
  {
    name: 'Telephony',
    integrations: [
      { name: 'Twilio', description: 'Use AI Voice Agents with your Twilio phone numbers for inbound and outbound calls.' },
      { name: 'Vonage', description: 'Connect SIMBA agents to Vonage for enterprise telephony.' },
      { name: 'RingCentral', description: 'Integrate with RingCentral for business phone and messaging.' },
      { name: 'Telnyx', description: 'Use Telnyx SIP trunking for cost-effective voice connectivity.' },
      { name: 'Genesys', description: 'Connect with Genesys Cloud for enterprise contact center integration.' },
      { name: 'Amazon Connect', description: 'Integrate with Amazon Connect for cloud-based contact center workflows.' },
      { name: 'Plivo', description: 'Use Plivo for programmable voice and SMS connectivity.' },
      { name: 'SIP Trunking', description: 'Connect via standard SIP trunking to any compatible PBX or platform.' },
    ],
  },
];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.name === activeCategory)
    : categories;

  return (
    <>
      <section className="pt-16 pb-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-simba-black">
            Integrations
          </h1>
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl">
            Explore integrations that connect your Conversational Agent to a wide range of tools, enabling it to execute complex workflows.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                !activeCategory
                  ? 'bg-simba-blue text-white'
                  : 'bg-simba-gray-100 text-simba-gray-600 hover:bg-simba-gray-200'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  activeCategory === cat.name
                    ? 'bg-simba-blue text-white'
                    : 'bg-simba-gray-100 text-simba-gray-600 hover:bg-simba-gray-200'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Integration cards */}
          {filteredCategories.map((cat) => (
            <div key={cat.name} className="mb-12">
              <h2 className="text-xl font-bold text-simba-black mb-6">{cat.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="rounded-xl border border-simba-gray-200 p-5 hover:border-simba-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-simba-gray-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-simba-gray-500">{integration.name[0]}</span>
                      </div>
                      <h3 className="font-bold">{integration.name}</h3>
                    </div>
                    <p className="text-sm text-simba-gray-600">{integration.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
