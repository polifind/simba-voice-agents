import { Button } from '@/components/ui/Button';
import { LogoBar } from '@/components/sections/LogoBar';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TabGroup } from '@/components/ui/TabGroup';
import { Accordion } from '@/components/ui/Accordion';
import { RelatedUseCases } from '@/components/sections/RelatedUseCases';
import { HeroDemoWidget } from '@/components/sections/HeroDemoWidget';
import { BackedBySpeechify } from '@/components/sections/BackedBySpeechify';
import { relatedUseCases, platformFeatureTabs, voiceFeatures, enterpriseSecurityFeatures } from '@/data/shared';
import Link from 'next/link';

const solutions = [
  { title: 'Customer Support', description: 'Resolve inquiries across voice and chat with AI agents that follow your SOPs.', href: '/support' },
  { title: 'Lead Qualification', description: 'Screen, score, and route leads automatically with natural conversations.', href: '/lead-qualification' },
  { title: 'Outbound Sales', description: 'Scale outbound calling with human-like voice agents that convert.', href: '/outbound-agents' },
  { title: 'AI Receptionist', description: 'Answer every call 24/7 with intelligent routing and scheduling.', href: '/ai-virtual-receptionist' },
  { title: 'Inbound Scheduling', description: 'Book, reschedule, and confirm appointments across every channel.', href: '/ai-virtual-receptionist' },
  { title: 'E-commerce', description: 'Product recommendations, order support, and cart recovery.', href: '/agents/retail-ecommerce' },
];

const multimodalFeatures = [
  { title: 'AI agents that speak, read, and see', description: 'Multimodal agents that understand voice, text, images, and documents to handle complex interactions across every channel.' },
  { title: 'Take action with external tool calls', description: 'Agents don\'t just talk — they take action. Update CRM records, process payments, book appointments, and trigger workflows in real-time.' },
  { title: 'Deploy anywhere your customers are', description: 'Web chat, phone, email, WhatsApp, SMS, in-app — deploy once and deliver consistent experiences across every touchpoint.' },
];

const workflowFeatures = [
  { title: 'Build multi-agent workflows', description: 'Chain multiple specialized agents together for complex workflows. Route conversations between agents based on intent, context, and business rules.' },
  { title: 'Test with guardrails', description: 'Simulate real conversations to validate agent behavior before deployment. Define safety rules, compliance boundaries, and escalation triggers.' },
  { title: 'Monitor performance', description: 'Track every conversation, measure key metrics, and continuously improve agent performance with built-in analytics and A/B testing.' },
];

const customizationFeatures = [
  { title: 'Knowledge base', description: 'Upload documents, SOPs, FAQs, and product catalogs. Agents draw from your knowledge base to provide accurate, consistent answers.' },
  { title: 'Custom voices and tailored personalities', description: 'Choose from 10,000+ voices or clone your own. Define your agent\'s personality, tone, and communication style to match your brand.' },
  { title: 'Tight integration with your stack', description: 'Connect to Salesforce, Zendesk, Twilio, Stripe, and 40+ more tools. Build custom integrations with our APIs and webhooks.' },
];

const developerTools = [
  { title: 'Powerful SDK', description: 'JavaScript, Python, Swift, and REST APIs. Build custom agent experiences with our comprehensive developer toolkit.' },
  { title: 'Low latency', description: 'Sub-second response times with global edge deployment. Natural turn-taking that feels like talking to a human.' },
  { title: 'Bring any LLM', description: 'Use OpenAI, Anthropic, Google, or open-source models. Switch between models or use different models for different tasks.' },
  { title: 'RAG', description: 'Advanced retrieval-augmented generation ensures agents always reference the most current and relevant information from your knowledge base.' },
];

const languages = ['English', 'Chinese', 'Spanish', 'French', 'Portuguese', 'German', 'Japanese', 'Italian', 'Hindi', 'Korean', 'Arabic', 'Russian', 'Dutch', 'Swedish', 'Polish', 'Turkish', 'Thai', 'Vietnamese', 'Indonesian', 'Czech', 'Greek', 'Romanian', 'Hungarian', 'Danish', 'Finnish', 'Norwegian', 'Hebrew', 'Malay', 'Filipino', 'Ukrainian', 'Bulgarian', 'Croatian'];

const faqItems = [
  { question: 'Can I integrate SIMBA into my own app?', answer: 'Yes. Use our APIs and SDKs to embed SIMBA agents directly into your web app, mobile app, or any custom interface. We provide JavaScript, Python, and Swift SDKs with comprehensive documentation.' },
  { question: 'How many agents can I create?', answer: 'There\'s no limit on the number of agents you can create. Build specialized agents for different use cases, departments, or customer segments — all managed from a single platform.' },
  { question: 'What LLMs can I use?', answer: 'SIMBA supports OpenAI, Anthropic, Google, and major open-source models. You can use different models for different agents or tasks, and switch between them at any time.' },
  { question: 'Can my agent make API calls?', answer: 'Yes. Agents can call external APIs to look up information, update records, process payments, book appointments, and trigger any custom workflow you define.' },
  { question: 'How can I make and receive phone calls?', answer: 'Connect your Twilio, Vonage, RingCentral, or other telephony provider. SIMBA handles inbound and outbound calls with natural voice conversations, including call transfers and voicemail detection.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-simba-blue/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-simba-blue/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-simba-black leading-[1.05]">
                The conversational <span className="text-simba-blue">voice</span> agents platform
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-simba-gray-600 leading-relaxed max-w-xl">
                Deploy natural, human-sounding agents in 70+ languages with low latency across voice or chat. Connected to your knowledge base and tools, our agents handle complex workflows end-to-end.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/signup" size="lg">Create an AI Agent</Button>
                <Button href="/contact" variant="secondary" size="lg">Talk to Sales</Button>
              </div>
            </div>

            {/* Demo widget */}
            <HeroDemoWidget />
          </div>
        </div>
      </section>

      <LogoBar />

      {/* Solutions Carousel */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Solutions for every use case</h2>
          <p className="mt-4 text-lg text-simba-gray-600">From support and sales to scheduling and engagement</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <Link key={s.title} href={s.href} className="group">
              <Card>
                <h3 className="text-lg font-bold mb-2 group-hover:text-simba-blue transition-colors">{s.title}</h3>
                <p className="text-simba-gray-600 text-sm leading-relaxed">{s.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Multimodal Section */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-simba-blue uppercase tracking-wider mb-3">Multimodal agents</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Industry-leading AI agents</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {multimodalFeatures.map((f, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-simba-blue/10 flex items-center justify-center mb-4">
                <span className="text-simba-blue font-bold text-xl">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Workflows & Testing */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Workflows, testing, and monitoring</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {workflowFeatures.map((f, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Customization */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Fully customizable</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {customizationFeatures.map((f, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Multilingual */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Human-like and multilingual</h2>
          <p className="mt-4 text-lg text-simba-gray-600">Deploy agents in 70+ languages with automatic detection and seamless switching</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {languages.map((lang) => (
            <span key={lang} className="px-3 py-1.5 rounded-full bg-simba-gray-100 text-sm font-medium text-simba-gray-600">
              {lang}
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
          <div>
            <p className="text-3xl font-black text-simba-blue">10,000+</p>
            <p className="text-sm text-simba-gray-600 mt-1">Voices to choose from</p>
          </div>
          <div>
            <p className="text-3xl font-black text-simba-blue">70+</p>
            <p className="text-sm text-simba-gray-600 mt-1">Languages supported</p>
          </div>
          <div>
            <p className="text-3xl font-black text-simba-blue">&lt;1s</p>
            <p className="text-sm text-simba-gray-600 mt-1">Response latency</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Developer Toolkit */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Complete developer toolkit</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {developerTools.map((t, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{t.title}</h3>
              <p className="text-simba-gray-600 text-sm leading-relaxed">{t.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Integrations Preview */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Integrate with your tech stack</h2>
          <p className="mt-4 text-lg text-simba-gray-600">Connect agents to your CRM, support desk, calendar, payment system, or telephony provider</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Salesforce', 'Stripe', 'Zendesk', 'Twilio', 'HubSpot', 'Slack', 'Calendly', 'Shopify', 'Zapier'].map((name) => (
            <span key={name} className="px-5 py-3 rounded-xl bg-simba-gray-50 border border-simba-gray-200 text-sm font-semibold text-simba-gray-600">
              {name}
            </span>
          ))}
        </div>
        <div className="text-center">
          <Button href="/agents/integrations" variant="secondary">View All Integrations</Button>
        </div>
      </SectionWrapper>

      {/* Enterprise Security */}
      <section className="py-20 sm:py-28 bg-simba-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Enterprise ready</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseSecurityFeatures.map((f, i) => (
              <Card key={i} dark>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start in days, not months</h2>
          <p className="text-xl text-simba-gray-600 mb-2">Starting at <span className="font-bold text-simba-blue">$0.008 per minute</span></p>
          <p className="text-simba-gray-500 mb-8">Lower rates on annual Business plans</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg">Talk to Sales</Button>
            <Button href="/signup" size="lg">Create an AI Agent</Button>
          </div>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <section className="py-20 bg-simba-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedCounter value="4357697" label="Agents launched and counting" />
        </div>
      </section>

      {/* FAQ */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <Accordion items={faqItems} />
        </div>
      </SectionWrapper>

      {/* Related Use Cases */}
      <RelatedUseCases items={relatedUseCases} />

      {/* Built by Speechify — credibility section above footer */}
      <BackedBySpeechify />
    </>
  );
}
