'use client';

import { useState } from 'react';
import {
  BoltIcon,
  WrenchScrewdriverIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ActionCard } from './ActionCard';
import { FilterChips } from './FilterChips';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type Tool = { id?: string; tool_id?: string; name?: string; type?: string };

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function ToolsClient({ tools: initialTools }: { tools: Tool[] }) {
  const [tools, setTools] = useState(initialTools);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<'webhook' | 'client' | 'integration' | null>(null);
  const { toast, showToast, dismiss } = useToast();

  // Webhook tool form
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookMethod, setWebhookMethod] = useState('POST');
  const [webhookDesc, setWebhookDesc] = useState('');
  const [webhookHeaders, setWebhookHeaders] = useState<{ key: string; value: string }[]>([]);

  // Client tool form
  const [clientName, setClientName] = useState('');
  const [clientDesc, setClientDesc] = useState('');
  const [clientFnName, setClientFnName] = useState('');
  const [clientParams, setClientParams] = useState('');

  const filtered = tools.filter((t) =>
    (t.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const close = () => setActiveModal(null);

  const integrations = [
    { id: 'twilio', name: 'Twilio', desc: 'Phone and SMS capabilities' },
    { id: 'make', name: 'Make', desc: 'Workflow automation' },
    { id: 'zapier', name: 'Zapier', desc: 'Connect to 5,000+ apps' },
    { id: 'custom', name: 'Custom API', desc: 'Connect any REST API' },
  ];

  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Tools</h1>
        <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionCard icon={<BoltIcon />} label="Add webhook tool" onClick={() => setActiveModal('webhook')} />
        <ActionCard icon={<WrenchScrewdriverIcon />} label="Add client tool" onClick={() => setActiveModal('client')} />
        <ActionCard icon={<Squares2X2Icon />} label="Add Integration tool" onClick={() => setActiveModal('integration')} />
      </div>

      <div className="mt-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue" />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Type', 'Creator']} activeFilters={activeFilters} onToggle={(l) => setActiveFilters((prev) => { const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n; })} />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><WrenchScrewdriverIcon /></div>
            <div className="text-sm font-semibold text-simba-black">No tools found</div>
            <div className="mt-1 text-sm text-simba-gray-500">You don&apos;t have any tools yet.</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden divide-y divide-simba-gray-100">
            {filtered.map((t, i) => (
              <div key={t.id ?? t.tool_id ?? i} className="px-5 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-simba-black">{t.name ?? 'Untitled tool'}</span>
                <span className="text-xs text-simba-gray-500">{t.type ?? ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Webhook Tool Modal */}
      <Modal open={activeModal === 'webhook'} onClose={close} title="Add Webhook Tool">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Tool Name</label>
            <input type="text" placeholder="My webhook tool" value={webhookName} onChange={(e) => setWebhookName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Webhook URL</label>
            <input type="url" placeholder="https://your-server.com/tool" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">HTTP Method</label>
            <select value={webhookMethod} onChange={(e) => setWebhookMethod(e.target.value)} className={inputCls}>
              <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Description</label>
            <textarea rows={2} placeholder="What does this tool do?" value={webhookDesc} onChange={(e) => setWebhookDesc(e.target.value)} className={inputCls} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-simba-black">Headers</label>
              <button type="button" onClick={() => setWebhookHeaders([...webhookHeaders, { key: '', value: '' }])} className="text-xs font-medium text-simba-gray-600 hover:text-simba-black flex items-center gap-1"><PlusIcon className="h-3 w-3" /> Add</button>
            </div>
            {webhookHeaders.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" placeholder="Key" value={h.key} onChange={(e) => { const n = [...webhookHeaders]; n[i] = { ...n[i], key: e.target.value }; setWebhookHeaders(n); }} className={`${inputCls} flex-1`} />
                <input type="text" placeholder="Value" value={h.value} onChange={(e) => { const n = [...webhookHeaders]; n[i] = { ...n[i], value: e.target.value }; setWebhookHeaders(n); }} className={`${inputCls} flex-1`} />
                <button type="button" onClick={() => setWebhookHeaders(webhookHeaders.filter((_, j) => j !== i))} className="text-simba-gray-400 hover:text-red-500"><XMarkIcon className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => {
              if (!webhookName.trim()) return;
              setTools((prev) => [...prev, { id: crypto.randomUUID(), name: webhookName, type: 'webhook' }]);
              showToast('Webhook tool created');
              setWebhookName(''); setWebhookUrl(''); setWebhookDesc(''); setWebhookHeaders([]); close();
            }} disabled={!webhookName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Client Tool Modal */}
      <Modal open={activeModal === 'client'} onClose={close} title="Add Client Tool">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Tool Name</label>
            <input type="text" placeholder="My client tool" value={clientName} onChange={(e) => setClientName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Description</label>
            <textarea rows={2} placeholder="What does this tool do?" value={clientDesc} onChange={(e) => setClientDesc(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Function Name</label>
            <input type="text" placeholder="e.g. getWeather" value={clientFnName} onChange={(e) => setClientFnName(e.target.value)} className={`${inputCls} font-mono`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Parameters (JSON)</label>
            <textarea rows={4} placeholder={'{\n  "location": {\n    "type": "string",\n    "description": "City name"\n  }\n}'} value={clientParams} onChange={(e) => setClientParams(e.target.value)} className={`${inputCls} font-mono`} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => {
              if (!clientName.trim()) return;
              setTools((prev) => [...prev, { id: crypto.randomUUID(), name: clientName, type: 'client' }]);
              showToast('Client tool created');
              setClientName(''); setClientDesc(''); setClientFnName(''); setClientParams(''); close();
            }} disabled={!clientName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Integration Tool Modal */}
      <Modal open={activeModal === 'integration'} onClose={close} title="Add Integration Tool">
        <p className="text-sm text-simba-gray-600 mb-4">Select an integration to connect:</p>
        <div className="grid grid-cols-2 gap-3">
          {integrations.map((int) => (
            <button key={int.id} type="button" onClick={() => { showToast(int.id === 'custom' ? 'Use webhook tools for custom API integrations' : `${int.name} integration requires third-party account setup`, int.id === 'custom' ? 'success' : 'error'); close(); }} className="rounded-xl border border-simba-gray-200 bg-white p-4 text-left hover:border-simba-gray-300 hover:bg-simba-gray-50 transition-colors">
              <div className="text-sm font-semibold text-simba-black">{int.name}</div>
              <div className="mt-1 text-xs text-simba-gray-500">{int.desc}</div>
            </button>
          ))}
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
