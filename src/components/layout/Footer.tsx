'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SimbaLogoWhite } from '@/components/brand/SimbaLogo';

// Routes where the marketing footer should NOT render
const APP_ROUTES = ['/dashboard', '/login', '/signup'];

const footerLinks = {
  'Platform': [
    { name: 'Product Overview', href: '/' },
    { name: 'Integrations', href: '/agents/integrations' },
    { name: 'Trust & Reliability', href: '/agents/trust-and-reliability' },
    { name: 'Forward Deployed Engineers', href: '/agents/forward-deployed-engineers' },
    { name: 'SIMBA Agents for Support', href: '/agents/support' },
  ],
  'Industries': [
    { name: 'Telecommunications', href: '/agents/telecommunications' },
    { name: 'Financial Services', href: '/agents/financial-services' },
    { name: 'Healthcare', href: '/agents/healthcare' },
    { name: 'Technology', href: '/agents/technology' },
    { name: 'Retail & E-commerce', href: '/agents/retail-ecommerce' },
    { name: 'Government', href: '/agents/government' },
  ],
  'Use Cases': [
    { name: 'Customer Support', href: '/support' },
    { name: 'Lead Qualification', href: '/lead-qualification' },
    { name: 'Outbound Agents', href: '/outbound-agents' },
    { name: 'AI Receptionist', href: '/ai-virtual-receptionist' },
  ],
  'Resources': [
    { name: 'Resources Hub', href: '/resources' },
    { name: 'All Articles', href: '/resources/all' },
    { name: 'Voice AI Fundamentals', href: '/resources/topic/voice-ai-fundamentals' },
    { name: 'Customer Support Automation', href: '/resources/topic/customer-support' },
    { name: 'Contact Sales', href: '/contact' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (APP_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))) {
    return null;
  }
  return (
    <footer className="bg-simba-black text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The most realistic voice AI platform</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Talk to Sales
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-simba-blue px-6 py-3 text-base font-semibold text-white hover:bg-simba-blue-dark transition-colors shadow-lg shadow-simba-blue/25"
            >
              Create an AI Agent
            </Link>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SimbaLogoWhite />
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} SIMBA Voice Agents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
