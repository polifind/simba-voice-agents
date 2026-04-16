'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FolderPlusIcon,
  PlusIcon,
  InformationCircleIcon,
  XMarkIcon,
  PhoneIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type Agent = { agent_id: string; name: string };
type Test = { id: string; name: string; type: string; agentId: string; createdAt: string };

export function TestsPageClient({ agents }: { agents: Agent[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [tests, setTests] = useState<Test[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const { toast, showToast, dismiss } = useToast();

  // Create test form state
  const [testTab, setTestTab] = useState(0);
  const [testName, setTestName] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [expectedMessage, setExpectedMessage] = useState('');
  const [successExamples, setSuccessExamples] = useState<string[]>([]);
  const [failureExamples, setFailureExamples] = useState<string[]>([]);
  const [toolName, setToolName] = useState('');
  const [toolParams, setToolParams] = useState('');
  const [scenarioDesc, setScenarioDesc] = useState('');
  const [numTurns, setNumTurns] = useState('5');
  const [folderName, setFolderName] = useState('');

  const filtered = tests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const resetForm = () => {
    setTestName('');
    setSelectedAgent('');
    setExpectedMessage('');
    setSuccessExamples([]);
    setFailureExamples([]);
    setToolName('');
    setToolParams('');
    setScenarioDesc('');
    setNumTurns('5');
    setTestTab(0);
  };

  const handleCreate = () => {
    if (!testName.trim()) return;
    const types = ['next-reply', 'tool-invocation', 'simulation'];
    setTests((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: testName,
        type: types[testTab],
        agentId: selectedAgent,
        createdAt: new Date().toISOString(),
      },
    ]);
    showToast('Test created successfully');
    setShowCreateModal(false);
    resetForm();
  };

  const tabs = ['Next reply test', 'Tool invocation test', 'Simulation test'];

  const inputCls =
    'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Tests</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFolderModal(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-simba-gray-200 text-sm font-semibold text-simba-gray-700 hover:bg-simba-gray-50"
          >
            <FolderPlusIcon className="h-4 w-4" />
            Create Folder
          </button>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800"
          >
            <PlusIcon className="h-4 w-4" />
            Create a test
          </button>
        </div>
      </div>

      {showBanner && (
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3">
          <InformationCircleIcon className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900 flex-1">
            Agent testing is now live. Create tests based on existing or hypothetical conversations
            and run them anytime to ensure quality of agent actions.
          </p>
          <button type="button" onClick={() => setShowBanner(false)} className="text-blue-400 hover:text-blue-600">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-4 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400"
        />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4">
              <PhoneIcon />
            </div>
            <div className="text-sm font-semibold text-simba-black">No tests found</div>
            <div className="mt-1 text-sm text-simba-gray-500">
              You have not created any tests yet.
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1 rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800"
              >
                Create your first test
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm text-simba-gray-600 hover:text-simba-black"
              >
                <PlayIcon className="h-4 w-4" />
                Learn how
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white divide-y divide-simba-gray-100">
            {filtered.map((t) => (
              <div key={t.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-simba-black">{t.name}</div>
                  <div className="text-xs text-simba-gray-500 mt-0.5">
                    {t.type} &middot; {new Date(t.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className="text-xs rounded-full bg-simba-gray-100 text-simba-gray-600 px-2 py-0.5">
                  {t.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Test Modal */}
      <Modal open={showCreateModal} onClose={() => { setShowCreateModal(false); resetForm(); }} title="Create a test" size="lg">
        <div className="flex gap-6">
          {/* Left: form */}
          <div className="flex-1 min-w-0">
            <div className="flex gap-1 border-b border-simba-gray-200 mb-4">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTestTab(i)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    testTab === i
                      ? 'border-simba-black text-simba-black'
                      : 'border-transparent text-simba-gray-500 hover:text-simba-gray-700'
                  }`}
                >
                  {tab}
                  {i === 2 && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-simba-gray-100 text-simba-gray-600">
                      Alpha
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-simba-black mb-1">Test name</label>
                <input
                  type="text"
                  placeholder="Your test name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-simba-black mb-1">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select an agent</option>
                  {agents.map((a) => (
                    <option key={a.agent_id} value={a.agent_id}>{a.name}</option>
                  ))}
                </select>
              </div>

              {testTab === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-simba-black mb-1">
                      Describe expected next message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the ideal response or behavior the agent should exhibit to pass this test (e.g., provides a correct answer, uses a specific tone, includes key information)."
                      value={expectedMessage}
                      onChange={(e) => setExpectedMessage(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-simba-black">Success Examples (optional)</label>
                      <button type="button" onClick={() => setSuccessExamples([...successExamples, ''])} className="text-xs font-medium text-simba-gray-600 hover:text-simba-black flex items-center gap-1">
                        <PlusIcon className="h-3 w-3" /> Add Example
                      </button>
                    </div>
                    {successExamples.map((ex, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={ex}
                          onChange={(e) => { const n = [...successExamples]; n[i] = e.target.value; setSuccessExamples(n); }}
                          placeholder="Example success response"
                          className={`${inputCls} flex-1`}
                        />
                        <button type="button" onClick={() => setSuccessExamples(successExamples.filter((_, j) => j !== i))} className="text-simba-gray-400 hover:text-red-500">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-simba-black">Failure Examples (optional)</label>
                      <button type="button" onClick={() => setFailureExamples([...failureExamples, ''])} className="text-xs font-medium text-simba-gray-600 hover:text-simba-black flex items-center gap-1">
                        <PlusIcon className="h-3 w-3" /> Add Example
                      </button>
                    </div>
                    {failureExamples.map((ex, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={ex}
                          onChange={(e) => { const n = [...failureExamples]; n[i] = e.target.value; setFailureExamples(n); }}
                          placeholder="Example failure response"
                          className={`${inputCls} flex-1`}
                        />
                        <button type="button" onClick={() => setFailureExamples(failureExamples.filter((_, j) => j !== i))} className="text-simba-gray-400 hover:text-red-500">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {testTab === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-simba-black mb-1">Expected tool name</label>
                    <input type="text" placeholder="e.g. get_weather" value={toolName} onChange={(e) => setToolName(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-simba-black mb-1">Expected parameters (JSON)</label>
                    <textarea rows={4} placeholder='{"location": "New York"}' value={toolParams} onChange={(e) => setToolParams(e.target.value)} className={`${inputCls} font-mono`} />
                  </div>
                </>
              )}

              {testTab === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-simba-black mb-1">Scenario description</label>
                    <textarea rows={4} placeholder="Describe the scenario for the simulation test..." value={scenarioDesc} onChange={(e) => setScenarioDesc(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-simba-black mb-1">Number of turns</label>
                    <input type="number" min="1" max="50" value={numTurns} onChange={(e) => setNumTurns(e.target.value)} className={inputCls} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: agent preview */}
          <div className="w-72 shrink-0 border-l border-simba-gray-200 pl-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-simba-gray-200 flex items-center justify-center text-xs">
                🤖
              </div>
              <span className="text-sm font-semibold text-simba-black">Agent</span>
            </div>
            {selectedAgent ? (
              <div className="rounded-xl bg-simba-gray-50 border border-simba-gray-200 p-3">
                <div className="rounded-lg bg-white border border-simba-gray-200 px-3 py-2 text-sm text-simba-gray-700">
                  Hello, how can I help you today?
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <button type="button" className="p-1 rounded hover:bg-simba-gray-200">
                    <PlusIcon className="h-3.5 w-3.5 text-simba-gray-500" />
                  </button>
                  <button type="button" className="p-1 rounded hover:bg-simba-gray-200">
                    <XMarkIcon className="h-3.5 w-3.5 text-simba-gray-500" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-simba-gray-400">Select an agent to preview</p>
            )}
            <p className="mt-4 text-xs text-simba-gray-500">
              The agent&apos;s response to the last user message will be evaluated against the success criteria using examples provided. Previous messages will be passed as context.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-simba-gray-200 flex items-center justify-between">
          <button type="button" onClick={() => { setShowCreateModal(false); resetForm(); }} className="text-sm font-medium text-simba-gray-600 hover:text-simba-black">
            Back
          </button>
          <div className="flex items-center gap-2">
            <button type="button" className="text-sm font-medium text-simba-gray-600 hover:text-simba-black px-3 py-1.5 rounded-md border border-simba-gray-200">
              Edit as JSON
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!testName.trim()}
              className="inline-flex items-center gap-1 rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Create Folder Modal */}
      <Modal open={showFolderModal} onClose={() => { setShowFolderModal(false); setFolderName(''); }} title="Create folder">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Folder name</label>
            <input type="text" placeholder="My test folder" value={folderName} onChange={(e) => setFolderName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setShowFolderModal(false); setFolderName(''); }} className="text-sm font-medium text-simba-gray-600 hover:text-simba-black px-3 py-2">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { showToast('Folder created'); setShowFolderModal(false); setFolderName(''); }}
              disabled={!folderName.trim()}
              className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
