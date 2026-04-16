'use client';

import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type Agent = { agent_id: string; name: string };
type BatchCall = { id: string; name: string; agentName: string; count: number; status: string; createdAt: string };

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function OutboundClient({ agents }: { agents: Agent[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [batchCalls, setBatchCalls] = useState<BatchCall[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { toast, showToast, dismiss } = useToast();

  // Form
  const [batchName, setBatchName] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [sendImmediate, setSendImmediate] = useState(true);

  const filtered = batchCalls.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = () => {
    if (!batchName.trim() || !selectedAgent) return;
    const lines = phoneNumbers.split('\n').filter((l) => l.trim());
    const agent = agents.find((a) => a.agent_id === selectedAgent);
    setBatchCalls((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: batchName,
        agentName: agent?.name ?? 'Unknown',
        count: lines.length,
        status: 'Scheduled',
        createdAt: new Date().toISOString(),
      },
    ]);
    showToast('Batch call created');
    setBatchName(''); setSelectedAgent(''); setPhoneNumbers(''); setShowModal(false);
  };

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Batch Calling</h1>
        <button type="button" onClick={() => setShowModal(true)} className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
          <PlusIcon className="h-4 w-4" />
          Create a batch call
        </button>
      </div>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input type="text" placeholder="Search Batch Calls..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue" />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><PhoneIcon /></div>
            <div className="text-sm font-semibold text-simba-black">No batch calls found</div>
            <div className="mt-1 text-sm text-simba-gray-500">You have not created any batch calls yet.</div>
            <button type="button" onClick={() => setShowModal(true)} className="mt-4 inline-flex items-center gap-1 rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800">
              Create your first batch call
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-5 gap-4 px-5 py-2.5 text-xs font-medium text-simba-gray-500 uppercase tracking-wider border-b border-simba-gray-100">
              <div>Name</div><div>Agent</div><div>Numbers</div><div>Status</div><div>Created</div>
            </div>
            {filtered.map((b) => (
              <div key={b.id} className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-simba-gray-100 last:border-0">
                <div className="text-sm font-medium text-simba-black">{b.name}</div>
                <div className="text-sm text-simba-gray-600">{b.agentName}</div>
                <div className="text-sm text-simba-gray-600">{b.count}</div>
                <div><span className="text-xs rounded-full bg-yellow-100 text-yellow-800 px-2 py-0.5">{b.status}</span></div>
                <div className="text-sm text-simba-gray-500">{new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Batch Call">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Batch Name</label>
            <input type="text" placeholder="My batch call" value={batchName} onChange={(e) => setBatchName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Agent</label>
            <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} className={inputCls}>
              <option value="">Select an agent</option>
              {agents.map((a) => (
                <option key={a.agent_id} value={a.agent_id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Phone Numbers</label>
            <textarea rows={5} placeholder={"Paste phone numbers, one per line:\n+1234567890\n+0987654321"} value={phoneNumbers} onChange={(e) => setPhoneNumbers(e.target.value)} className={`${inputCls} font-mono`} />
            <p className="mt-1 text-xs text-simba-gray-500">{phoneNumbers.split('\n').filter((l) => l.trim()).length} numbers entered</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="sendImmediate" checked={sendImmediate} onChange={(e) => setSendImmediate(e.target.checked)} className="rounded border-simba-gray-300" />
            <label htmlFor="sendImmediate" className="text-sm text-simba-gray-700">Send immediately</label>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCreate} disabled={!batchName.trim() || !selectedAgent} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
