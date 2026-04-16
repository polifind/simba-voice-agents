'use client';

import { useState } from 'react';
import {
  KeyIcon,
  ClipboardDocumentIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  BookOpenIcon,
  LinkIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type ApiKey = { id: string; name: string; key: string; created: string; permissions: string[] };

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

const CODE_EXAMPLES: Record<string, string> = {
  curl: `curl -X GET "https://api.simbavoice.ai/v1/agents" \\
  -H "xi-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  python: `import requests

response = requests.get(
    "https://api.simbavoice.ai/v1/agents",
    headers={"xi-api-key": "YOUR_API_KEY"}
)
print(response.json())`,
  javascript: `const response = await fetch(
  "https://api.simbavoice.ai/v1/agents",
  {
    headers: {
      "xi-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json",
    },
  }
);
const data = await response.json();
console.log(data);`,
};

const DOC_LINKS = [
  { icon: <DocumentTextIcon className="h-5 w-5" />, title: 'API Reference', desc: 'Complete API documentation with endpoints and parameters.' },
  { icon: <BookOpenIcon className="h-5 w-5" />, title: 'SDK Documentation', desc: 'Client libraries for Python, JavaScript, and more.' },
  { icon: <LinkIcon className="h-5 w-5" />, title: 'Webhooks Guide', desc: 'Set up and manage webhook integrations.' },
  { icon: <ShieldCheckIcon className="h-5 w-5" />, title: 'Authentication', desc: 'Learn about API key authentication and security.' },
];

export function DevelopersClient() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast, showToast, dismiss } = useToast();

  // Form
  const [keyName, setKeyName] = useState('');
  const [perms, setPerms] = useState<Set<string>>(new Set(['read']));

  const [codeTab, setCodeTab] = useState<'curl' | 'python' | 'javascript'>('curl');

  const generateKey = () => {
    if (!keyName.trim()) return;
    const key = `sk-simba-${crypto.randomUUID().replace(/-/g, '').slice(0, 32)}`;
    setApiKeys((prev) => [...prev, {
      id: crypto.randomUUID(),
      name: keyName,
      key,
      created: new Date().toISOString(),
      permissions: Array.from(perms),
    }]);
    setVisibleKeys((prev) => new Set(prev).add(key));
    showToast('API key generated. Copy it now — it won\'t be shown again.');
    setKeyName(''); setPerms(new Set(['read'])); setShowModal(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePerm = (p: string) => {
    setPerms((prev) => { const n = new Set(prev); n.has(p) ? n.delete(p) : n.add(p); return n; });
  };

  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-simba-black">Developers</h1>
      <p className="mt-1 text-sm text-simba-gray-600">Manage API keys, view documentation, and explore code examples.</p>

      {/* API Keys */}
      <div className="mt-8 max-w-4xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-simba-black">API Keys</h2>
          <button type="button" onClick={() => setShowModal(true)} className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
            <KeyIcon className="h-4 w-4" />
            Generate API Key
          </button>
        </div>

        {apiKeys.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-12 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><KeyIcon /></div>
            <div className="text-sm font-semibold text-simba-black">No API keys generated yet</div>
            <div className="mt-1 text-sm text-simba-gray-500">Generate an API key to start using the SIMBA API.</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white divide-y divide-simba-gray-100">
            {apiKeys.map((k) => (
              <div key={k.id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-simba-black">{k.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-xs font-mono text-simba-gray-600">
                      {visibleKeys.has(k.key) ? k.key : `sk-simba-${'•'.repeat(24)}`}
                    </code>
                    <button type="button" onClick={() => setVisibleKeys((prev) => { const n = new Set(prev); n.has(k.key) ? n.delete(k.key) : n.add(k.key); return n; })} className="text-simba-gray-400 hover:text-simba-gray-600">
                      {visibleKeys.has(k.key) ? <EyeSlashIcon className="h-3.5 w-3.5" /> : <EyeIcon className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-simba-gray-400 mt-0.5">Created {new Date(k.created).toLocaleDateString()} &middot; {k.permissions.join(', ')}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => copyToClipboard(k.key, k.id)} className="p-1.5 rounded-lg hover:bg-simba-gray-100 text-simba-gray-500" title="Copy">
                    <ClipboardDocumentIcon className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => { setApiKeys((prev) => prev.filter((x) => x.id !== k.id)); showToast('API key revoked'); }} className="p-1.5 rounded-lg hover:bg-red-50 text-simba-gray-500 hover:text-red-500" title="Revoke">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workspace Info */}
      <div className="mt-8 max-w-4xl">
        <h2 className="text-lg font-bold text-simba-black mb-3">Workspace Info</h2>
        <div className="rounded-2xl border border-simba-gray-200 bg-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-simba-gray-500">Workspace Name</div>
              <div className="text-sm font-medium text-simba-black">SimbaAgents</div>
            </div>
            <button type="button" onClick={() => copyToClipboard('SimbaAgents', 'ws-name')} className="p-1.5 rounded-lg hover:bg-simba-gray-100 text-simba-gray-500">
              {copiedId === 'ws-name' ? <span className="text-xs text-green-600">Copied!</span> : <ClipboardDocumentIcon className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-simba-gray-500">Workspace ID</div>
              <code className="text-sm font-mono text-simba-black">ws_simba_demo_01</code>
            </div>
            <button type="button" onClick={() => copyToClipboard('ws_simba_demo_01', 'ws-id')} className="p-1.5 rounded-lg hover:bg-simba-gray-100 text-simba-gray-500">
              {copiedId === 'ws-id' ? <span className="text-xs text-green-600">Copied!</span> : <ClipboardDocumentIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mt-8 max-w-4xl">
        <h2 className="text-lg font-bold text-simba-black mb-3">Quick Start</h2>
        <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
          <div className="flex border-b border-simba-gray-200">
            {(['curl', 'python', 'javascript'] as const).map((tab) => (
              <button key={tab} type="button" onClick={() => setCodeTab(tab)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${codeTab === tab ? 'border-simba-black text-simba-black' : 'border-transparent text-simba-gray-500 hover:text-simba-gray-700'}`}>
                {tab === 'curl' ? 'cURL' : tab === 'python' ? 'Python' : 'JavaScript'}
              </button>
            ))}
          </div>
          <div className="relative">
            <pre className="bg-simba-gray-900 text-simba-gray-100 p-4 text-sm font-mono overflow-x-auto leading-relaxed">
              {CODE_EXAMPLES[codeTab]}
            </pre>
            <button type="button" onClick={() => { copyToClipboard(CODE_EXAMPLES[codeTab], 'code'); showToast('Code copied to clipboard'); }} className="absolute top-2 right-2 p-1.5 rounded-lg bg-simba-gray-800 hover:bg-simba-gray-700 text-simba-gray-400">
              <ClipboardDocumentIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="mt-8 max-w-4xl mb-8">
        <h2 className="text-lg font-bold text-simba-black mb-3">Documentation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOC_LINKS.map((link) => (
            <div key={link.title} className="rounded-xl border border-simba-gray-200 bg-white p-4 hover:border-simba-gray-300 hover:bg-simba-gray-50 transition-colors cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-simba-gray-100 flex items-center justify-center text-simba-gray-600 mb-3">
                {link.icon}
              </div>
              <div className="text-sm font-semibold text-simba-black">{link.title}</div>
              <p className="mt-1 text-xs text-simba-gray-500">{link.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Key Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Generate API Key">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Key Name</label>
            <input type="text" placeholder="e.g. Production, Development" value={keyName} onChange={(e) => setKeyName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-2">Permissions</label>
            <div className="space-y-2">
              {['read', 'write', 'admin'].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm text-simba-gray-700">
                  <input type="checkbox" checked={perms.has(p)} onChange={() => togglePerm(p)} className="rounded border-simba-gray-300" />
                  <span className="capitalize">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={generateKey} disabled={!keyName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Generate
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
