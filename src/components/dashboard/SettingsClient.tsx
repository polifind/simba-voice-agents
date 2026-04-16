'use client';

import { useState } from 'react';
import { CheckCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type ModalType = 'webhook' | 'secret' | 'auth' | 'postCallWebhook' | null;

const CARDS = [
  { key: 'webhook' as const, title: 'Conversation Initiation Client Data Webhook', description: 'Configure the webhook that will be called when a new Twilio phone call or SIP trunk call conversation begins.', action: 'Add webhook' },
  { key: 'secret' as const, title: 'Workspace Secrets', description: 'Create and manage secure secrets that can be accessed across your workspace.', action: 'Add secret' },
  { key: 'auth' as const, title: 'Workspace Auth Connections', description: 'Create and manage authentication connections that can be used across your workspace tools.', action: 'Add Auth' },
  { key: 'postCallWebhook' as const, title: 'Post-Call Webhook', description: 'Select the webhook that will be called when a conversation ends. Webhooks can be managed in the settings page.', action: 'Create Webhook' },
];

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function SettingsClient() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { toast, showToast, dismiss } = useToast();

  // Webhook form
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookMethod, setWebhookMethod] = useState('POST');
  const [webhookHeaders, setWebhookHeaders] = useState<{ key: string; value: string }[]>([]);

  // Secrets
  const [secrets, setSecrets] = useState<{ key: string; value: string }[]>([]);
  const [secretKey, setSecretKey] = useState('');
  const [secretValue, setSecretValue] = useState('');
  const [showSecretValue, setShowSecretValue] = useState(false);

  // Auth
  const [authName, setAuthName] = useState('');
  const [authType, setAuthType] = useState('oauth2');
  const [authClientId, setAuthClientId] = useState('');
  const [authClientSecret, setAuthClientSecret] = useState('');
  const [authApiKey, setAuthApiKey] = useState('');
  const [authToken, setAuthToken] = useState('');

  // Post-call webhook
  const [postUrl, setPostUrl] = useState('');
  const [postHeaders, setPostHeaders] = useState<{ key: string; value: string }[]>([]);

  const close = () => setActiveModal(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">SimbaAgents Settings</h1>
        <CheckCircleIcon className="h-5 w-5 text-simba-gray-400" />
      </div>
      <p className="mt-1 text-sm text-simba-gray-600">Configure workspace-wide settings for SimbaAgents</p>

      <div className="mt-8 space-y-4 max-w-4xl">
        {CARDS.map((card) => (
          <div key={card.key} className="rounded-2xl border border-simba-gray-200 bg-white p-6 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-simba-black">{card.title}</div>
              <p className="mt-1 text-sm text-simba-gray-600 leading-relaxed">{card.description}</p>
            </div>
            <button type="button" onClick={() => setActiveModal(card.key)} className="flex-shrink-0 inline-flex items-center h-9 px-4 rounded-md border border-simba-gray-200 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50 whitespace-nowrap">
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* Webhook Modal */}
      <Modal open={activeModal === 'webhook'} onClose={close} title="Conversation Initiation Webhook">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Webhook URL</label>
            <input type="url" placeholder="https://your-server.com/webhook" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">HTTP Method</label>
            <select value={webhookMethod} onChange={(e) => setWebhookMethod(e.target.value)} className={inputCls}>
              <option>GET</option>
              <option>POST</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-simba-black">Headers</label>
              <button type="button" onClick={() => setWebhookHeaders([...webhookHeaders, { key: '', value: '' }])} className="text-xs font-medium text-simba-gray-600 hover:text-simba-black flex items-center gap-1">
                <PlusIcon className="h-3 w-3" /> Add Header
              </button>
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
            <button type="button" onClick={() => { if (!webhookUrl.trim()) return; showToast('Webhook saved successfully'); close(); }} disabled={!webhookUrl.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Secrets Modal */}
      <Modal open={activeModal === 'secret'} onClose={close} title="Workspace Secrets">
        <div className="space-y-4">
          {secrets.length > 0 && (
            <div className="rounded-xl border border-simba-gray-200 divide-y divide-simba-gray-100">
              {secrets.map((s, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-simba-black">{s.key}</span>
                  <span className="text-xs text-simba-gray-400 font-mono">••••••••</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input type="text" placeholder="Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} className={`${inputCls} flex-1`} />
            <div className="relative flex-1">
              <input type={showSecretValue ? 'text' : 'password'} placeholder="Value" value={secretValue} onChange={(e) => setSecretValue(e.target.value)} className={`${inputCls} pr-16`} />
              <button type="button" onClick={() => setShowSecretValue(!showSecretValue)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-simba-gray-500 hover:text-simba-black">
                {showSecretValue ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { if (!secretKey.trim() || !secretValue.trim()) return; setSecrets([...secrets, { key: secretKey, value: secretValue }]); setSecretKey(''); setSecretValue(''); showToast('Secret added'); }} disabled={!secretKey.trim() || !secretValue.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Add Secret
            </button>
          </div>
        </div>
      </Modal>

      {/* Auth Connections Modal */}
      <Modal open={activeModal === 'auth'} onClose={close} title="Auth Connection">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Connection Name</label>
            <input type="text" placeholder="My Auth Connection" value={authName} onChange={(e) => setAuthName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Auth Type</label>
            <select value={authType} onChange={(e) => setAuthType(e.target.value)} className={inputCls}>
              <option value="oauth2">OAuth 2.0</option>
              <option value="apikey">API Key</option>
              <option value="bearer">Bearer Token</option>
            </select>
          </div>
          {authType === 'oauth2' && (
            <>
              <div>
                <label className="block text-sm font-medium text-simba-black mb-1">Client ID</label>
                <input type="text" value={authClientId} onChange={(e) => setAuthClientId(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-simba-black mb-1">Client Secret</label>
                <input type="password" value={authClientSecret} onChange={(e) => setAuthClientSecret(e.target.value)} className={inputCls} />
              </div>
            </>
          )}
          {authType === 'apikey' && (
            <div>
              <label className="block text-sm font-medium text-simba-black mb-1">API Key</label>
              <input type="password" value={authApiKey} onChange={(e) => setAuthApiKey(e.target.value)} className={inputCls} />
            </div>
          )}
          {authType === 'bearer' && (
            <div>
              <label className="block text-sm font-medium text-simba-black mb-1">Token</label>
              <input type="password" value={authToken} onChange={(e) => setAuthToken(e.target.value)} className={inputCls} />
            </div>
          )}
          <div className="flex justify-end">
            <button type="button" onClick={() => { if (!authName.trim()) return; showToast('Auth connection saved'); close(); }} disabled={!authName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Post-Call Webhook Modal */}
      <Modal open={activeModal === 'postCallWebhook'} onClose={close} title="Post-Call Webhook">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Webhook URL</label>
            <input type="url" placeholder="https://your-server.com/post-call" value={postUrl} onChange={(e) => setPostUrl(e.target.value)} className={inputCls} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-simba-black">Headers</label>
              <button type="button" onClick={() => setPostHeaders([...postHeaders, { key: '', value: '' }])} className="text-xs font-medium text-simba-gray-600 hover:text-simba-black flex items-center gap-1">
                <PlusIcon className="h-3 w-3" /> Add Header
              </button>
            </div>
            {postHeaders.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" placeholder="Key" value={h.key} onChange={(e) => { const n = [...postHeaders]; n[i] = { ...n[i], key: e.target.value }; setPostHeaders(n); }} className={`${inputCls} flex-1`} />
                <input type="text" placeholder="Value" value={h.value} onChange={(e) => { const n = [...postHeaders]; n[i] = { ...n[i], value: e.target.value }; setPostHeaders(n); }} className={`${inputCls} flex-1`} />
                <button type="button" onClick={() => setPostHeaders(postHeaders.filter((_, j) => j !== i))} className="text-simba-gray-400 hover:text-red-500"><XMarkIcon className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { if (!postUrl.trim()) return; showToast('Webhook saved successfully'); close(); }} disabled={!postUrl.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
