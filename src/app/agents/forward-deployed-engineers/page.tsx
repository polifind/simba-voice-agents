import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forward Deployed Engineers',
  description: 'Launch enterprise AI agents that deliver value faster with embedded expertise from SIMBA.',
};

const challenges = [
  { title: 'Capability gap', description: 'Scaling AI agents requires more than ambition — it requires implementation expertise, battle-tested patterns, and deep platform knowledge.' },
  { title: 'System fragmentation', description: 'Siloed data, disconnected workflows, and legacy systems make automation complex. Integration expertise is the difference between POC and production.' },
  { title: 'Trust barriers', description: 'Security, compliance, and stakeholder confidence are non-negotiable. Enterprise AI requires proven deployment patterns and governance frameworks.' },
];

const partnership = [
  { title: 'Embedded expertise', description: 'Forward Deployed Engineers work alongside your team to scope, architect, and launch production-ready agents. Not consultants — embedded builders who ship.' },
  { title: 'Outcome accountability', description: 'Every engagement is tied to clear KPIs — resolution rate, speed to response, CSAT improvement. We measure success the same way you do.' },
  { title: 'Enterprise compliance', description: 'Experience deploying across Fortune 500 enterprises with SOC 2, ISO 27001, and industry-specific compliance requirements.' },
];

const process = [
  { step: '1', title: 'Hands-on implementation', description: 'Scope, build, and deploy agents in close collaboration with your team. 4-8 weeks from kickoff to production.' },
  { step: '2', title: 'Stabilization and enablement', description: 'Monitor performance, fine-tune agent behavior, and transfer best practices to your team.' },
  { step: '3', title: 'Continuous collaboration', description: 'Ongoing optimization, new use case expansion, and technical support as your agent fleet grows.' },
];

const faqItems = [
  { question: 'How is this different from consulting?', answer: 'FDEs are embedded engineers who build alongside your team — not external advisors who hand off a document. They write code, configure agents, and own outcomes through deployment and stabilization.' },
  { question: 'What\'s the typical timeline?', answer: 'Most engagements go from kickoff to production in 4-8 weeks. Complex multi-agent deployments may take longer, but we focus on delivering value incrementally.' },
  { question: 'How do you measure success?', answer: 'Every engagement has defined KPIs — resolution rate, response time, CSAT, cost savings, or pipeline impact. We report against these metrics throughout the engagement.' },
  { question: 'Do FDEs work with our existing systems?', answer: 'Yes. FDEs have deep experience integrating with CRMs, ticketing systems, telephony platforms, and custom APIs. They adapt to your tech stack, not the other way around.' },
  { question: 'What about security and compliance?', answer: 'FDEs follow your security protocols and compliance requirements. They have experience deploying in regulated industries including financial services, healthcare, and government.' },
];

export default function ForwardDeployedEngineersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-simba-black leading-[1.1]">
            Launch enterprise AI agents that deliver value faster
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-simba-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our Forward Deployed Engineers work alongside your team to scope, build, and launch production-ready agents — reducing time to deployment and ensuring measurable business impact.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Why Enterprise AI is Hard */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Why enterprise AI is hard</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {challenges.map((c, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{c.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{c.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Partnership Model */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">A partnership, not a project</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {partnership.map((p, i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-simba-gray-600 leading-relaxed">{p.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {process.map((p) => (
            <div key={p.step} className="flex gap-6">
              <div className="shrink-0 h-12 w-12 rounded-full bg-simba-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">{p.step}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-simba-gray-600 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to accelerate your AI deployment?</h2>
          <p className="text-lg text-simba-gray-600 mb-8 max-w-2xl mx-auto">
            Talk to our team about how Forward Deployed Engineers can help you go from concept to production in weeks, not months.
          </p>
          <Button href="/contact" size="lg">Contact Us</Button>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="bg-simba-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <Accordion items={faqItems} />
        </div>
      </SectionWrapper>
    </>
  );
}
