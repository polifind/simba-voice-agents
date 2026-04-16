'use client';

import { useState } from 'react';
import { PhoneIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Dropdown } from './Dropdown';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type PhoneRow = { phone_number?: string; id?: string; agent_id?: string; label?: string };

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function PhoneNumbersClient({ phones }: { phones: PhoneRow[] }) {
  const [activeModal, setActiveModal] = useState<'twilio' | 'sip' | null>(null);
  const { toast, showToast, dismiss } = useToast();

  // Twilio form
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [twilioNumber, setTwilioNumber] = useState('');

  // SIP form
  const [sipUri, setSipUri] = useState('');
  const [sipUser, setSipUser] = useState('');
  const [sipPass, setSipPass] = useState('');

  const importBtn = (
    <button type="button" className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
      <PlusIcon className="h-4 w-4" />
      Import number
    </button>
  );

  const dropdownItems = [
    { label: 'From Twilio', onClick: () => setActiveModal('twilio') },
    { label: 'From SIP Trunk', onClick: () => setActiveModal('sip') },
  ];

  const close = () => setActiveModal(null);

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Phone Numbers</h1>
        <Dropdown trigger={importBtn} items={dropdownItems} />
      </div>

      <div className="mt-6">
        {phones.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><PhoneIcon /></div>
            <div className="text-sm font-semibold text-simba-black">No phone numbers</div>
            <div className="mt-1 text-sm text-simba-gray-500">You don&apos;t have any phone numbers yet.</div>
            <div className="mt-4">
              <Dropdown
                trigger={
                  <button type="button" className="inline-flex items-center gap-1 rounded-md border border-simba-gray-200 px-3 py-2 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50">
                    <PlusIcon className="h-4 w-4" /> Import number
                  </button>
                }
                items={dropdownItems}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white divide-y divide-simba-gray-100">
            {phones.map((p, i) => (
              <div key={p.id ?? i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-4 w-4 text-simba-gray-500" />
                  <span className="text-sm font-medium text-simba-black">{p.phone_number ?? p.label ?? 'Unknown'}</span>
                </div>
                <span className="text-xs text-simba-gray-500">{p.agent_id ? `Agent: ${p.agent_id.slice(0, 8)}...` : ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Twilio Modal */}
      <Modal open={activeModal === 'twilio'} onClose={close} title="Import from Twilio">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Account SID</label>
            <input type="text" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" value={twilioSid} onChange={(e) => setTwilioSid(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Auth Token</label>
            <input type="password" placeholder="Your Twilio auth token" value={twilioToken} onChange={(e) => setTwilioToken(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Phone Number</label>
            <input type="tel" placeholder="+1234567890" value={twilioNumber} onChange={(e) => setTwilioNumber(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { showToast('Twilio integration requires account setup. Connect your Twilio account in Integrations first.', 'error'); close(); }} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800">
              Import
            </button>
          </div>
        </div>
      </Modal>

      {/* SIP Trunk Modal */}
      <Modal open={activeModal === 'sip'} onClose={close} title="Import from SIP Trunk">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">SIP URI</label>
            <input type="text" placeholder="sip:user@domain.com" value={sipUri} onChange={(e) => setSipUri(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Username</label>
            <input type="text" value={sipUser} onChange={(e) => setSipUser(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Password</label>
            <input type="password" value={sipPass} onChange={(e) => setSipPass(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { showToast('SIP trunk integration requires additional server configuration.', 'error'); close(); }} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800">
              Import
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
