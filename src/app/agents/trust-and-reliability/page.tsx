import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { enterpriseSecurityFeatures } from '@/data/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust and Reliability',
  description: 'Build AI systems you can trust in production. Guardrails, testing, monitoring, and enterprise-grade compliance.',
};

const coreFeatures = [
  { title: 'Define guardrails', description: 'Ensure agent alignment with your requirements before deployment. Set behavioral boundaries, safety rules, and compliance constraints that agents must follow.' },
  { title: 'Test agents', description: 'Simulate real-life conversations to validate agent behavior before launch. Catch issues early and iterate before going live.' },
  { title: 'Monitor performance', description: 'Track live agent interactions and key metrics — latency, success rates, cost, and customer satisfaction — in real-time dashboards.' },
];

const safetyFeatures = [
  { title: 'Prevent harmful or off-brand outputs', description: 'Define behavioral, safety, and compliance guardrails before deployment. Agents stay within your defined boundaries every time.' },
  { title: 'Simulate real-world conversations', description: 'Validate agent behavior before launch with simulated conversations. Catch edge cases and iterate before customers see your agent.' },
  { title: 'Ensure reliable performance at scale', description: 'Track latency, cost, and success rates via built-in analytics. Automatic scaling, fallback mechanisms, and model cascading ensure uptime.' },
];

const visibilityFeatures = [
  { title: 'Audit historical interactions', description: 'Searchable logs for every conversation. Trace context, validate compliance, and identify improvement opportunities across all agents.' },
  { title: 'Iterate and improve', description: 'Update prompts, knowledge bases, and models. Run new test suites. Deploy improvements without downtime.' },
  { title: 'Partner with experts', description: 'Embed SIMBA experts alongside your team to build, test, and scale reliable AI agents for your specific compliance requirements.' },
];

const complianceFeatures = [
  { title: 'SOC 2 Type II', description: 'Independently audited with zero exceptions. Comprehensive security controls for enterprise data protection.' },
  { title: 'ISO 27001', description: 'Information security management system certified to international standards.' },
  { title: 'Regional data residency', description: 'Keep data within your jurisdiction with US, EU, and India residency options plus VPC hosting.' },
  { title: 'Zero retention mode', description: 'No conversation data stored after processing. Complete control over your data lifecycle.' },
  { title: 'End-to-end encryption', description: 'All data encrypted in transit and at rest using industry-standard encryption protocols.' },
  { title: 'Auto-scaling and failover', description: 'Built-in redundancy, automatic scaling, and model cascading ensure your agents are always available.' },
];

const faqItems = [
  { question: 'How do I ensure agents behave predictably?', answer: 'Define behavioral guardrails, safety rules, and compliance constraints in the SIMBA platform. Test with simulated conversations before deployment, and monitor live performance with real-time analytics.' },
  { question: 'How do I evaluate agents after launch?', answer: 'Use our built-in analytics dashboard to track key metrics — response quality, latency, success rates, and customer satisfaction. Review conversation logs and run A/B tests to continuously improve.' },
  { question: 'What visibility do I get into agent behavior?', answer: 'Complete visibility. Every conversation is logged and searchable. Trace decision paths, audit compliance, and identify improvement opportunities across all agents from a single dashboard.' },
  { question: 'What compliance standards do you support?', answer: 'SIMBA holds SOC 2 Type II and ISO 27001 certifications. We offer zero retention mode, regional data residency, VPC hosting, and comprehensive audit trails.' },
  { question: 'Do you offer Forward Deployed Engineers?', answer: 'Yes. Our FDE team works alongside your team to scope, architect, and launch production-ready agents. They stay engaged through stabilization and ongoing optimization.' },
];

export default function TrustAndReliabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-simba-black leading-[1.1]">
            Build AI systems you can trust in production
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-simba-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ensure AI behaves predictably and safely with guardrails you can define and test before launch. Our platform provides full visibility and monitoring across every agent, ensuring compliant, transparent operations at scale.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">Talk to Sales</Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="grid md:grid-cols-3 gap-8">
          {coreFeatures.map((f, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-simba-blue/10 flex items-center justify-center mb-4">
                <span className="text-simba-blue font-bold text-xl">{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Safety Features */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Safety and reliability at every layer</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {safetyFeatures.map((f, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Visibility */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Operational visibility and control</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {visibilityFeatures.map((f, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Compliance */}
      <section className="py-20 sm:py-28 bg-simba-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Build secure, compliant AI systems</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFeatures.map((f, i) => (
              <Card key={i} dark>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <Accordion items={faqItems} />
        </div>
      </SectionWrapper>
    </>
  );
}
