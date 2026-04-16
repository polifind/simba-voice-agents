'use client';

import { useState } from 'react';
import {
  GlobeAltIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
  FolderPlusIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { ActionCard } from './ActionCard';
import { FilterChips } from './FilterChips';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type Doc = { id: string; name: string; type?: string };

const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

export function KnowledgeBaseClient({ docs: initialDocs }: { docs: Doc[] }) {
  const [docs, setDocs] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<'url' | 'files' | 'text' | 'folder' | null>(null);
  const { toast, showToast, dismiss } = useToast();

  // Form state
  const [urlInput, setUrlInput] = useState('');
  const [urlName, setUrlName] = useState('');
  const [textName, setTextName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [folderName, setFolderName] = useState('');

  const filtered = docs.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const close = () => setActiveModal(null);

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-simba-black">Knowledge Base</h1>
          <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-simba-gray-700">RAG Storage: <span className="font-semibold text-simba-black">0 B</span> / 104.9 MB</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ActionCard icon={<GlobeAltIcon />} label="Add URL" onClick={() => setActiveModal('url')} />
        <ActionCard icon={<DocumentArrowUpIcon />} label="Add Files" onClick={() => setActiveModal('files')} />
        <ActionCard icon={<DocumentTextIcon />} label="Create Text" onClick={() => setActiveModal('text')} />
        <ActionCard icon={<FolderPlusIcon />} label="Create Folder" onClick={() => setActiveModal('folder')} />
      </div>

      <div className="mt-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search Knowledge Base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Type', 'Creator']} activeFilters={activeFilters} onToggle={(l) => setActiveFilters((prev) => { const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n; })} />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><BookOpenIcon /></div>
            <div className="text-sm font-semibold text-simba-black">No documents found</div>
            <div className="mt-1 text-sm text-simba-gray-500">You don&apos;t have any documents yet.</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden divide-y divide-simba-gray-100">
            {filtered.map((doc) => (
              <div key={doc.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <DocumentTextIcon className="h-4 w-4 text-simba-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-simba-black truncate">{doc.name || 'Untitled'}</span>
                </div>
                <span className="text-xs text-simba-gray-500 flex-shrink-0">{doc.type ?? ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add URL Modal */}
      <Modal open={activeModal === 'url'} onClose={close} title="Add URL">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">URL</label>
            <input type="url" placeholder="https://example.com/page" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Name (optional)</label>
            <input type="text" placeholder="My document" value={urlName} onChange={(e) => setUrlName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => {
              if (!urlInput.trim()) return;
              setDocs((prev) => [...prev, { id: crypto.randomUUID(), name: urlName || urlInput, type: 'url' }]);
              showToast('URL added successfully');
              setUrlInput(''); setUrlName(''); close();
            }} disabled={!urlInput.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Add
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Files Modal */}
      <Modal open={activeModal === 'files'} onClose={close} title="Add Files">
        <div className="rounded-xl border-2 border-dashed border-simba-gray-300 bg-simba-gray-50 py-16 px-6 flex flex-col items-center text-center">
          <DocumentArrowUpIcon className="h-10 w-10 text-simba-gray-400 mb-3" />
          <p className="text-sm font-medium text-simba-black">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-simba-gray-500">PDF, TXT, DOCX, HTML up to 25MB</p>
        </div>
        <p className="mt-3 text-xs text-simba-gray-500 text-center">File upload requires server-side processing. This feature will be available once the backend integration is complete.</p>
      </Modal>

      {/* Create Text Modal */}
      <Modal open={activeModal === 'text'} onClose={close} title="Create Text Document">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Document Name</label>
            <input type="text" placeholder="My document" value={textName} onChange={(e) => setTextName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Content</label>
            <textarea rows={8} placeholder="Enter your document content..." value={textContent} onChange={(e) => setTextContent(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => {
              if (!textName.trim()) return;
              setDocs((prev) => [...prev, { id: crypto.randomUUID(), name: textName, type: 'text' }]);
              showToast('Document created');
              setTextName(''); setTextContent(''); close();
            }} disabled={!textName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Create Folder Modal */}
      <Modal open={activeModal === 'folder'} onClose={close} title="Create Folder">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">Folder Name</label>
            <input type="text" placeholder="My folder" value={folderName} onChange={(e) => setFolderName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={close} className="text-sm font-medium text-simba-gray-600 hover:text-simba-black px-3 py-2">Cancel</button>
            <button type="button" onClick={() => { showToast('Folder created'); setFolderName(''); close(); }} disabled={!folderName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
