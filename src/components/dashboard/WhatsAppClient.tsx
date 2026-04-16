'use client';

import { useState } from 'react';
import { PlusIcon, ChatBubbleOvalLeftEllipsisIcon, BookOpenIcon, PhoneIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Dropdown } from './Dropdown';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function WhatsAppClient() {
  const [activeModal, setActiveModal] = useState<'manual' | 'business' | null>(null);
  const { toast, showToast, dismiss } = useToast();

  // Manual
  const [manualPhone, setManualPhone] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualDesc, setManualDesc] = useState('');

  // Business API
  const [businessId, setBusinessId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');

  const close = () => setActiveModal(null);

  const importBtn = (
    <button type="button" className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
      <PlusIcon className="h-4 w-4" />
      Import account
    </button>
  );

  const dropdownItems = [
    { label: 'Manual Setup', onClick: () => setActiveModal('manual') },
    { label: 'WhatsApp Business API', onClick: () => setActiveModal('business') },
  ];

  const steps = [
    { icon: <PhoneIcon className="h-5 w-5" />, title: 'Set up a phone number', desc: 'Configure a phone number to receive WhatsApp messages.' },
    { icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, title: 'Connect to WhatsApp', desc: 'Link your phone number to the WhatsApp Business Platform.' },
    { icon: <CheckCircleIcon className="h-5 w-5" />, title: 'Assign an agent', desc: 'Choose which AI agent handles incoming messages.' },
  ];

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-simba-black">WhatsApp accounts</h1>
          <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
        </div>
        <Dropdown trigger={importBtn} items={dropdownItems} />
      </div>

      <div className="mt-6 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
        <div className="h-10 w-10 text-simba-gray-400 mb-4"><ChatBubbleOvalLeftEllipsisIcon /></div>
        <div className="text-sm font-semibold text-simba-black">No WhatsApp accounts</div>
        <div className="mt-1 text-sm text-simba-gray-500">You don&apos;t have any WhatsApp accounts yet.</div>
        <div className="mt-4">
          <Dropdown
            trigger={
              <button type="button" className="inline-flex items-center gap-1 rounded-md border border-simba-gray-200 px-3 py-2 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50">
                <PlusIcon className="h-4 w-4" /> Import account
              </button>
            }
            items={dropdownItems}
          />
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-simba-black mb-4">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-xl border border-simba-gray-200 bg-white p-5">
              <div className="h-8 w-8 rounded-lg bg-simba-gray-100 flex items-center justify-center text-simba-gray-600 mb-3">
                {step.icon}
              </div>
              <div className="text-sm font-semibold text-simba-black">{step.title}</div>
              <p className="mt-1 text-xs text-simba-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Setup Modal */}
      <Modal open={activeModal === 'manual'} onClose={close} title="Manual WhatsApp Setup">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Phone Number</label>
            <input type="tel" placeholder="+1234567890" value={manualPhone} onChange={(e) => setManualPhone(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Display Name</label>
            <input type="text" placeholder="My Business" value={manualName} onChange={(e) => setManualName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Business Description</label>
            <textarea rows={3} placeholder="Describe your business..." value={manualDesc} onChange={(e) => setManualDesc(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { showToast('WhatsApp setup requires Meta Business verification. Please complete setup in the Meta Business Suite.', 'error'); close(); }} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800">
              Import
            </button>
          </div>
        </div>
      </Modal>

      {/* Business API Modal */}
      <Modal open={activeModal === 'business'} onClose={close} title="WhatsApp Business API">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Business ID</label>
            <input type="text" placeholder="Your Meta Business ID" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Permanent Access Token</label>
            <input type="password" placeholder="Your access token" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Phone Number ID</label>
            <input type="text" placeholder="Your WhatsApp phone number ID" value={phoneNumberId} onChange={(e) => setPhoneNumberId(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { showToast('WhatsApp Business API integration requires server-side webhook configuration.', 'error'); close(); }} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800">
              Connect
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
