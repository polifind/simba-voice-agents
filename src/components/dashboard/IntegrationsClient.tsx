'use client';

import { useState } from 'react';
import {
  PhoneIcon,
  BoltIcon,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  CloudIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { Toast, useToast } from './Toast';

const INTEGRATIONS = [
  { id: 'twilio', name: 'Twilio', desc: 'Connect your Twilio account for phone number management and calling.', icon: <PhoneIcon className="h-5 w-5" />, thirdParty: true },
  { id: 'make', name: 'Make', desc: 'Automate workflows with Make (formerly Integromat).', icon: <BoltIcon className="h-5 w-5" />, thirdParty: true },
  { id: 'zapier', name: 'Zapier', desc: 'Connect to thousands of apps with Zapier automations.', icon: <Squares2X2Icon className="h-5 w-5" />, thirdParty: true },
  { id: 'slack', name: 'Slack', desc: 'Send notifications and updates to Slack channels.', icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, thirdParty: true },
  { id: 'hubspot', name: 'HubSpot', desc: 'Sync contacts and conversations with HubSpot CRM.', icon: <BuildingOfficeIcon className="h-5 w-5" />, thirdParty: true },
  { id: 'salesforce', name: 'Salesforce', desc: 'Enterprise CRM integration for Salesforce.', icon: <CloudIcon className="h-5 w-5" />, thirdParty: true },
  { id: 'webhook', name: 'Webhook', desc: 'Custom webhook integrations for any service.', icon: <BoltIcon className="h-5 w-5" />, thirdParty: false },
  { id: 'restapi', name: 'REST API', desc: 'Direct REST API access for custom integrations.', icon: <CodeBracketIcon className="h-5 w-5" />, thirdParty: false },
];

export function IntegrationsClient() {
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const { toast, showToast, dismiss } = useToast();

  const toggleConnect = (id: string, thirdParty: boolean) => {
    if (connected.has(id)) {
      setConnected((prev) => { const n = new Set(prev); n.delete(id); return n; });
      showToast(`${INTEGRATIONS.find((i) => i.id === id)?.name} disconnected`);
    } else if (thirdParty) {
      showToast(`${INTEGRATIONS.find((i) => i.id === id)?.name} requires third-party account setup.`, 'error');
    } else {
      setConnected((prev) => new Set(prev).add(id));
      showToast(`${INTEGRATIONS.find((i) => i.id === id)?.name} connected`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Integrations</h1>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-simba-gray-100 text-simba-gray-700">Alpha</span>
      </div>
      <p className="mt-1 text-sm text-simba-gray-600">Connect third-party services to extend your agents&apos; capabilities.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((int) => {
          const isConnected = connected.has(int.id);
          return (
            <div key={int.id} className="rounded-xl border border-simba-gray-200 bg-white p-5 flex flex-col">
              <div className="h-10 w-10 rounded-lg bg-simba-gray-100 flex items-center justify-center text-simba-gray-600 mb-3">
                {int.icon}
              </div>
              <div className="text-sm font-semibold text-simba-black">{int.name}</div>
              <p className="mt-1 text-xs text-simba-gray-500 flex-1">{int.desc}</p>
              <button
                type="button"
                onClick={() => toggleConnect(int.id, int.thirdParty)}
                className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isConnected
                    ? 'border border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
                    : 'border border-simba-gray-200 text-simba-gray-800 hover:bg-simba-gray-50'
                }`}
              >
                {isConnected ? 'Connected' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
