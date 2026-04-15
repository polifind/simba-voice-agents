'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      company: data.get('company'),
      phone: data.get('phone'),
      jobTitle: data.get('jobTitle'),
      agentCount: data.get('agentCount'),
      useCase: data.get('useCase'),
      message: data.get('message'),
    };

    try {
      // Send via mailto link as a simple solution
      const subject = encodeURIComponent(`SIMBA Voice Agents - Lead: ${body.firstName} ${body.lastName} at ${body.company}`);
      const emailBody = encodeURIComponent(
        `New lead from SIMBA Voice Agents website:\n\n` +
        `Name: ${body.firstName} ${body.lastName}\n` +
        `Email: ${body.email}\n` +
        `Company: ${body.company}\n` +
        `Phone: ${body.phone || 'Not provided'}\n` +
        `Job Title: ${body.jobTitle || 'Not provided'}\n` +
        `Expected Agent Volume: ${body.agentCount || 'Not provided'}\n` +
        `Use Case: ${body.useCase || 'Not provided'}\n` +
        `Message: ${body.message || 'Not provided'}\n`
      );

      // Use a hidden iframe approach to send email via formsubmit.co
      // This sends directly to rohan@speechify.com
      const formData = new FormData();
      formData.append('_subject', `SIMBA Lead: ${body.firstName} ${body.lastName} at ${body.company}`);
      formData.append('name', `${body.firstName} ${body.lastName}`);
      formData.append('email', String(body.email));
      formData.append('company', String(body.company));
      formData.append('phone', String(body.phone || ''));
      formData.append('jobTitle', String(body.jobTitle || ''));
      formData.append('agentCount', String(body.agentCount || ''));
      formData.append('useCase', String(body.useCase || ''));
      formData.append('message', String(body.message || ''));
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      await fetch('https://formsubmit.co/ajax/rohan@speechify.com', {
        method: 'POST',
        body: formData,
      });

      setSubmitted(true);
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent(`SIMBA Voice Agents Inquiry from ${body.firstName} ${body.lastName}`);
      const mailBody = encodeURIComponent(
        `Name: ${body.firstName} ${body.lastName}\nEmail: ${body.email}\nCompany: ${body.company}\nPhone: ${body.phone}\nJob Title: ${body.jobTitle}\nUse Case: ${body.useCase}\nMessage: ${body.message}`
      );
      window.open(`mailto:rohan@speechify.com?subject=${subject}&body=${mailBody}`, '_blank');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="pt-24 pb-32 bg-white">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank you for reaching out!</h1>
          <p className="text-lg text-simba-gray-600 mb-8">
            Our team will be in touch within 24 hours. In the meantime, feel free to explore our platform.
          </p>
          <Button href="/">Back to Home</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 pb-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="pt-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-simba-black leading-[1.1]">
              Talk to our sales team
            </h1>
            <p className="mt-6 text-lg text-simba-gray-600 leading-relaxed">
              Learn how SIMBA Voice Agents can transform your customer conversations. Our team will help you find the right solution for your use case.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="font-bold text-simba-black mb-2">Enterprise ready</h3>
                <p className="text-simba-gray-600">SOC 2 Type II and ISO 27001 certified with enterprise-grade security, custom deployments, and dedicated support.</p>
              </div>
              <div>
                <h3 className="font-bold text-simba-black mb-2">Custom pricing</h3>
                <p className="text-simba-gray-600">Volume discounts, annual plans, and custom pricing for high-volume deployments. Pay only for what you use.</p>
              </div>
              <div>
                <h3 className="font-bold text-simba-black mb-2">Forward Deployed Engineers</h3>
                <p className="text-simba-gray-600">Our team works alongside yours to scope, build, and launch production-ready agents in weeks.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-simba-gray-200 bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">First name *</label>
                  <input
                    name="firstName"
                    required
                    className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Last name *</label>
                  <input
                    name="lastName"
                    required
                    className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Work email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Company *</label>
                <input
                  name="company"
                  required
                  className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Job title</label>
                  <input
                    name="jobTitle"
                    className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Expected monthly agent minutes</label>
                <select
                  name="agentCount"
                  className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                >
                  <option value="">Select...</option>
                  <option value="< 1,000">Less than 1,000</option>
                  <option value="1,000 - 10,000">1,000 - 10,000</option>
                  <option value="10,000 - 100,000">10,000 - 100,000</option>
                  <option value="100,000+">100,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Primary use case</label>
                <select
                  name="useCase"
                  className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Lead Qualification">Lead Qualification</option>
                  <option value="Outbound Sales">Outbound Sales</option>
                  <option value="AI Receptionist">AI Receptionist</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Telecom">Telecommunications</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-gray-700 mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full rounded-xl border border-simba-gray-300 px-4 py-3 text-sm focus:border-simba-blue focus:ring-2 focus:ring-simba-blue/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-simba-blue text-white py-3.5 text-base font-semibold hover:bg-simba-blue-dark transition-colors shadow-lg shadow-simba-blue/25 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              <p className="text-xs text-simba-gray-400 text-center">
                By submitting, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
