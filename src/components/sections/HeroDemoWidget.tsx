'use client';

import { useCallback, useEffect, useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { ConversationProvider, useConversation } from '@elevenlabs/react';

type Mode = 'voice' | 'chat' | 'call';

type ChatMsg = {
  id: number;
  role: 'agent' | 'user';
  text: string;
};

const INITIAL_MESSAGES: ChatMsg[] = [
  { id: 1, role: 'agent', text: 'Hi! I\'m SIMBA, your AI voice agent. Ask me anything — I can help with support, scheduling, orders, and more.' },
];

// Simple rule-based responder so the demo feels real without an API.
function generateReply(input: string): string {
  const q = input.toLowerCase().trim();

  if (!q) return 'Could you say that again?';

  if (/^(hi|hey|hello|yo|sup|howdy)/.test(q)) {
    return 'Hey there! What can I help you with today?';
  }
  if (/price|pricing|cost|how much|plan/.test(q)) {
    return 'Our plans start at $0 for up to 100 free minutes. Paid plans start at $0.50 / agent / month, with voice usage from $0.008 per minute. Want me to walk you through the tiers?';
  }
  if (/language|translate|multi/.test(q)) {
    return 'I speak 70+ languages natively, including English, Spanish, French, Japanese, Hindi, Arabic, and Portuguese — all with sub-second latency.';
  }
  if (/integrat|salesforce|zendesk|twilio|stripe|hubspot|crm/.test(q)) {
    return 'Yes! SIMBA connects to Salesforce, Zendesk, Twilio, Stripe, HubSpot, and 40+ more tools. I can also call any REST API or webhook directly mid-conversation.';
  }
  if (/latency|fast|slow|speed/.test(q)) {
    return 'Sub-second response time. I use streaming TTS and global edge deployment so conversations feel natural, with proper turn-taking.';
  }
  if (/voice|clone|sound/.test(q)) {
    return 'Choose from 10,000+ professional voices, or clone your own brand voice from a short audio sample. You fully control tone, style, and personality.';
  }
  if (/hipaa|gdpr|compliance|secur|soc|iso|privacy/.test(q)) {
    return 'SIMBA is SOC 2 Type II and ISO 27001 certified. Data is encrypted in transit and at rest, with role-based access and full audit logs.';
  }
  if (/demo|try|test/.test(q)) {
    return 'You\'re talking to me right now! For a deeper demo, click "Talk to Sales" — our team will walk you through a custom agent built for your use case.';
  }
  if (/support|help|issue|problem|ticket/.test(q)) {
    return 'I can resolve most support tickets autonomously — password resets, order lookups, refunds, escalations. I hand off to a human only when truly needed, with full conversation context.';
  }
  if (/lead|qualif|sales|outbound/.test(q)) {
    return 'I can qualify inbound leads with natural conversations, score them against your ICP, and book meetings on your calendar — all in one call.';
  }
  if (/appointment|book|schedule|calendar|reschedul/.test(q)) {
    return 'I handle scheduling end-to-end — checking availability, booking, sending confirmations, and handling reschedules across Google Calendar, Outlook, and more.';
  }
  if (/how do you|what can you|what do you/.test(q)) {
    return 'I can take calls, answer chats, qualify leads, book appointments, resolve support tickets, update your CRM, and trigger workflows in your existing tools — all end-to-end.';
  }
  if (/bye|thank|thanks|cool|awesome|great/.test(q)) {
    return 'You\'re welcome! Ready when you need me.';
  }

  return 'That\'s a great question. For specifics tailored to your use case, click "Talk to Sales" above — or ask me about pricing, integrations, languages, or how I handle support.';
}

// ============================================================================
// Voice mode — real ElevenLabs conversation
// ============================================================================
function VoiceMode() {
  // The useConversation hook requires a ConversationProvider in its tree.
  return (
    <ConversationProvider>
      <VoiceModeInner />
    </ConversationProvider>
  );
}

function VoiceModeInner() {
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const conversation = useConversation({
    onError: (err) => {
      console.error('[ElevenLabs] error', err);
      setError('Something went wrong. Please try again.');
    },
  });

  const status = conversation.status; // 'disconnected' | 'connecting' | 'connected'
  const isActive = status === 'connected';
  const isConnecting = status === 'connecting' || starting;
  const isSpeaking = conversation.isSpeaking;

  const start = useCallback(async () => {
    setError(null);
    setStarting(true);
    try {
      // Ask for mic permission up-front so a denial shows a clear error.
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch('/api/elevenlabs/signed-url', { cache: 'no-store' });
      if (!res.ok) throw new Error(`signed-url ${res.status}`);
      const { signed_url } = await res.json();
      if (!signed_url) throw new Error('No signed URL returned');

      await conversation.startSession({ signedUrl: signed_url, connectionType: 'websocket' });
    } catch (err) {
      console.error('[VoiceMode] failed to start', err);
      const msg = err instanceof Error ? err.message : 'Unable to start conversation';
      setError(
        msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('denied')
          ? 'Microphone access denied. Enable mic permissions and try again.'
          : 'Could not connect. Please try again.'
      );
    } finally {
      setStarting(false);
    }
  }, [conversation]);

  const stop = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error('[VoiceMode] failed to end', err);
    }
  }, [conversation]);

  // Safety: make sure we end the session if the component unmounts mid-call.
  useEffect(() => {
    return () => {
      if (conversation.status === 'connected') {
        conversation.endSession().catch(() => {});
      }
    };
    // Intentionally only cleanup on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = isConnecting
    ? 'Connecting…'
    : isActive
      ? isSpeaking
        ? 'SIMBA is speaking…'
        : 'Listening — start talking'
      : 'Tap the orb to talk';

  const handleClick = () => {
    if (isActive) stop();
    else if (!isConnecting) start();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <button
        type="button"
        onClick={handleClick}
        disabled={isConnecting}
        aria-label={isActive ? 'End voice conversation' : 'Start voice conversation'}
        className={clsx(
          'relative h-36 w-36 rounded-full transition-transform',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-simba-blue/40',
          !isConnecting && 'hover:scale-105 active:scale-95',
          isConnecting && 'cursor-wait'
        )}
      >
        {/* Main orb */}
        <span
          className={clsx(
            'absolute inset-0 rounded-full bg-gradient-to-br from-simba-blue to-simba-blue-light',
            isActive && isSpeaking && 'animate-pulse',
            !isActive && !isConnecting && 'opacity-80',
            isActive && !isSpeaking && 'opacity-90'
          )}
        />
        {/* Outer glow */}
        <span
          className={clsx(
            'absolute -inset-2 rounded-full bg-gradient-to-tr from-simba-blue/50 to-transparent blur-xl',
            isActive && isSpeaking ? 'opacity-100 animate-pulse' : 'opacity-60'
          )}
        />
        {/* Listening ring */}
        {isActive && !isSpeaking && (
          <>
            <span className="absolute -inset-1 rounded-full border-2 border-simba-blue/60 animate-ping" />
            <span className="absolute -inset-3 rounded-full border border-simba-blue/30 animate-ping" style={{ animationDelay: '400ms' }} />
          </>
        )}
        {/* Icon */}
        <span className="absolute inset-0 flex items-center justify-center text-white">
          {isActive ? (
            // Stop icon
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-10 w-10">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : isConnecting ? (
            // Loader
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 animate-spin">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40 20" strokeLinecap="round" />
            </svg>
          ) : (
            // Mic icon
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-10 w-10">
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
              <path d="M19 11a7 7 0 0 1-14 0h2a5 5 0 0 0 10 0h2Z" />
              <path d="M11 18h2v3h-2z" />
            </svg>
          )}
        </span>
      </button>

      <div className="text-center min-h-[2rem]">
        <div className="text-sm font-semibold text-simba-gray-900">{label}</div>
        {error && (
          <div className="mt-1 text-xs text-red-600">{error}</div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main widget
// ============================================================================
export function HeroDemoWidget() {
  const [mode, setMode] = useState<Mode>('voice');

  // Chat state
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-scroll to latest message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMsg = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const replyText = generateReply(trimmed);
    // Simulate realistic response timing based on reply length
    const delay = Math.min(400 + replyText.length * 12, 1800);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'agent', text: replyText },
      ]);
      setTyping(false);
    }, delay);
  };

  const tabs: { id: Mode; label: string }[] = [
    { id: 'voice', label: 'Voice' },
    { id: 'chat', label: 'Chat' },
    { id: 'call', label: 'Call Agent' },
  ];

  return (
    <div className="relative">
      <div className="rounded-3xl bg-gradient-to-br from-simba-gray-50 to-simba-gray-100 border border-simba-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              aria-pressed={mode === tab.id}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                mode === tab.id
                  ? 'bg-simba-blue text-white'
                  : 'bg-simba-gray-200 text-simba-gray-600 hover:bg-simba-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={clsx('flex items-center justify-center', mode === 'chat' ? 'py-2' : 'py-10', 'min-h-[340px]')}>
          {mode === 'voice' && <VoiceMode />}

          {mode === 'chat' && (
            <div className="w-full flex flex-col gap-3">
              <div
                ref={scrollRef}
                className="w-full rounded-2xl bg-white border border-simba-gray-200 p-4 h-[280px] overflow-y-auto space-y-3"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={clsx(
                      'flex',
                      m.role === 'agent' ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div
                      className={clsx(
                        'rounded-2xl px-4 py-2.5 text-sm max-w-[85%] leading-snug',
                        m.role === 'agent'
                          ? 'bg-simba-gray-100 text-simba-gray-900 rounded-bl-sm'
                          : 'bg-simba-blue text-white rounded-br-sm'
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-simba-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-simba-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-simba-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-simba-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing, integrations, languages…"
                  className="flex-1 rounded-full border border-simba-gray-300 bg-white px-4 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="rounded-full bg-simba-blue text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-simba-blue/90 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {mode === 'call' && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-simba-blue to-simba-blue-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-12 w-12">
                    <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                  </svg>
                </div>
                <span className="absolute top-0 right-0 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
                </span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-simba-gray-900">Calling agent…</div>
                <div className="text-xs text-simba-gray-500 mt-1">+1 (415) 555-0199</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-simba-gray-500 mt-4">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Agent ready
          </span>
          <span>70+ languages</span>
          <span>Sub-second latency</span>
        </div>
      </div>
    </div>
  );
}
