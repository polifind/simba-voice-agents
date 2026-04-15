'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SimbaLogo } from '@/components/brand/SimbaLogo';
import { Button } from '@/components/ui/Button';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const industries = [
  { name: 'Telecommunications', href: '/agents/telecommunications' },
  { name: 'Financial Services', href: '/agents/financial-services' },
  { name: 'Healthcare', href: '/agents/healthcare' },
  { name: 'Technology', href: '/agents/technology' },
  { name: 'Retail & E-commerce', href: '/agents/retail-ecommerce' },
  { name: 'Government', href: '/agents/government' },
];

const useCases = [
  { name: 'Customer Support', href: '/support' },
  { name: 'Lead Qualification', href: '/lead-qualification' },
  { name: 'Outbound Agents', href: '/outbound-agents' },
  { name: 'AI Receptionist', href: '/ai-virtual-receptionist' },
];

const about = [
  { name: 'SIMBA Agents for Support', href: '/agents/support' },
  { name: 'Integrations', href: '/agents/integrations' },
  { name: 'Trust & Reliability', href: '/agents/trust-and-reliability' },
  { name: 'Forward Deployed Engineers', href: '/agents/forward-deployed-engineers' },
];

function NavDropdown({ label, items, open, onOpen, onClose }: {
  label: string;
  items: { name: string; href: string }[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-simba-gray-700 hover:text-simba-black rounded-lg hover:bg-simba-gray-50 transition-colors">
        {label}
        <ChevronDownIcon className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="w-64 rounded-xl border border-simba-gray-200 bg-white shadow-2xl py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-simba-gray-700 hover:bg-simba-gray-50 hover:text-simba-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-simba-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <SimbaLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavDropdown
              label="Industries"
              items={industries}
              open={openDropdown === 'industries'}
              onOpen={() => setOpenDropdown('industries')}
              onClose={() => setOpenDropdown(null)}
            />
            <NavDropdown
              label="Use Cases"
              items={useCases}
              open={openDropdown === 'useCases'}
              onOpen={() => setOpenDropdown('useCases')}
              onClose={() => setOpenDropdown(null)}
            />
            <NavDropdown
              label="About"
              items={about}
              open={openDropdown === 'about'}
              onOpen={() => setOpenDropdown('about')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-simba-gray-700 hover:text-simba-black rounded-lg hover:bg-simba-gray-50 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contact" variant="secondary" size="sm">Contact Sales</Button>
            <Button href="/get-started" size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-simba-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <p className="text-xs font-semibold text-simba-gray-400 uppercase tracking-wider">Industries</p>
            {industries.map((item) => (
              <Link key={item.href} href={item.href} className="block py-2 text-sm font-medium text-simba-gray-700" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
            <p className="text-xs font-semibold text-simba-gray-400 uppercase tracking-wider pt-4">Use Cases</p>
            {useCases.map((item) => (
              <Link key={item.href} href={item.href} className="block py-2 text-sm font-medium text-simba-gray-700" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
            <p className="text-xs font-semibold text-simba-gray-400 uppercase tracking-wider pt-4">About</p>
            {about.map((item) => (
              <Link key={item.href} href={item.href} className="block py-2 text-sm font-medium text-simba-gray-700" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/pricing" className="block py-2 text-sm font-medium text-simba-gray-700" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <div className="flex flex-col gap-3 pt-6">
              <Button href="/contact" variant="secondary">Contact Sales</Button>
              <Button href="/get-started">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
