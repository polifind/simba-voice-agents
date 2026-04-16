'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  UserCircleIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
  Squares2X2Icon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  BeakerIcon,
  PhoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUpOnSquareIcon,
  Cog6ToothIcon,
  CodeBracketIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  plusHref?: string;
};

const configure: NavItem[] = [
  { label: 'Agents', href: '/dashboard/agents', icon: UserCircleIcon, plusHref: '/dashboard/agents/new' },
  { label: 'Knowledge Base', href: '/dashboard/knowledge-base', icon: FolderIcon },
  { label: 'Tools', href: '/dashboard/tools', icon: WrenchScrewdriverIcon },
  { label: 'Integrations', href: '/dashboard/integrations', icon: Squares2X2Icon, badge: 'Alpha' },
  { label: 'Voices', href: '/dashboard/voices', icon: SpeakerWaveIcon, plusHref: '/dashboard/voices/new' },
];

const monitor: NavItem[] = [
  { label: 'Conversations', href: '/dashboard/conversations', icon: ChatBubbleLeftRightIcon },
  { label: 'Users', href: '/dashboard/users', icon: UsersIcon },
  { label: 'Tests', href: '/dashboard/tests', icon: BeakerIcon },
];

const deploy: NavItem[] = [
  { label: 'Phone Numbers', href: '/dashboard/phone-numbers', icon: PhoneIcon },
  { label: 'WhatsApp', href: '/dashboard/whatsapp', icon: ChatBubbleOvalLeftEllipsisIcon },
  { label: 'Outbound', href: '/dashboard/outbound', icon: ArrowUpOnSquareIcon },
];

function NavRow({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className={clsx(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          active
            ? 'bg-simba-gray-100 text-simba-black'
            : 'text-simba-gray-600 hover:bg-simba-gray-50 hover:text-simba-black'
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-simba-gray-100 text-simba-gray-700">
            {item.badge}
          </span>
        )}
      </Link>
      {item.plusHref && (
        <Link
          href={item.plusHref}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 rounded flex items-center justify-center hover:bg-simba-gray-200"
          aria-label={`Create new ${item.label}`}
        >
          <PlusIcon className="h-3.5 w-3.5 text-simba-gray-600" />
        </Link>
      )}
    </div>
  );
}

function Section({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div className="mt-4">
      <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-simba-gray-500 mb-1">
        {title}
      </div>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <NavRow
            key={item.href}
            item={item}
            active={pathname === item.href || pathname.startsWith(item.href + '/')}
          />
        ))}
      </nav>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-simba-gray-200 bg-white">
      <div className="px-5 py-5 border-b border-simba-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-simba-blue to-simba-blue-light flex items-center justify-center text-white font-black text-xs">
            S
          </div>
          <span className="font-black text-simba-black">SIMBA</span>
        </Link>
      </div>

      <div className="px-3 py-3">
        <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg border border-simba-gray-200 hover:bg-simba-gray-50 text-left transition-colors">
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-blue-500" />
          <span className="text-sm font-medium flex-1">SimbaAgents</span>
          <ChevronUpDownIcon className="h-4 w-4 text-simba-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <nav>
          <NavRow
            item={{ label: 'Home', href: '/dashboard', icon: HomeIcon }}
            active={pathname === '/dashboard'}
          />
        </nav>

        <Section title="Configure" items={configure} pathname={pathname} />
        <Section title="Monitor" items={monitor} pathname={pathname} />
        <Section title="Deploy" items={deploy} pathname={pathname} />

        <div className="mt-6">
          <NavRow
            item={{ label: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon }}
            active={pathname.startsWith('/dashboard/settings')}
          />
        </div>
      </div>

      <div className="px-3 pb-3 space-y-3 border-t border-simba-gray-100 pt-3">
        <div className="rounded-lg border border-simba-gray-200 p-3">
          <div className="h-8 w-8 rounded-full bg-simba-gray-100 flex items-center justify-center mb-2">
            <PaperAirplaneIcon className="h-4 w-4 text-simba-gray-600 rotate-[-20deg]" />
          </div>
          <div className="text-sm font-semibold text-simba-black">
            Invite team members
          </div>
          <div className="text-xs text-simba-gray-500 mt-1 leading-snug">
            Bring your team in to collaborate and share your creations.
          </div>
        </div>
        <NavRow
          item={{ label: 'Developers', href: '/dashboard/developers', icon: CodeBracketIcon }}
          active={pathname.startsWith('/dashboard/developers')}
        />
      </div>
    </aside>
  );
}
