/**
 * Server-side ElevenLabs API client.
 * NEVER import this from client components — the API key must stay on the server.
 * All client-facing calls go through /api/elevenlabs/* route handlers.
 */

const BASE_URL = 'https://api.elevenlabs.io';

export class ElevenLabsError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

function getApiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error('ELEVENLABS_API_KEY is not set. Add it to .env.local');
  }
  return key;
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

export async function elevenLabsFetch<T = unknown>(
  path: string,
  opts: RequestOptions = {}
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers: {
      'xi-api-key': getApiKey(),
      'Content-Type': 'application/json',
      ...opts.headers,
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: opts.cache,
    next: opts.next,
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  if (!res.ok) {
    throw new ElevenLabsError(
      `ElevenLabs API error ${res.status} on ${path}`,
      res.status,
      json
    );
  }
  return json as T;
}

// ========= Agents =========
export type Agent = {
  agent_id: string;
  name: string;
  created_at_unix_secs?: number;
  access_info?: {
    creator_email?: string;
    creator_name?: string;
  };
  tags?: string[];
};

export async function listAgents(): Promise<{ agents: Agent[] }> {
  return elevenLabsFetch('/v1/convai/agents', {
    next: { revalidate: 10, tags: ['agents'] },
  });
}

export async function getAgent(id: string) {
  return elevenLabsFetch(`/v1/convai/agents/${id}`, {
    next: { revalidate: 10, tags: [`agent:${id}`] },
  });
}

export async function createAgent(input: {
  name: string;
  conversation_config?: Record<string, unknown>;
}) {
  return elevenLabsFetch('/v1/convai/agents/create', {
    method: 'POST',
    body: {
      name: input.name,
      conversation_config: input.conversation_config ?? {},
    },
  });
}

export async function deleteAgent(id: string) {
  return elevenLabsFetch(`/v1/convai/agents/${id}`, { method: 'DELETE' });
}

export async function updateAgent(
  id: string,
  body: Record<string, unknown>
) {
  return elevenLabsFetch(`/v1/convai/agents/${id}`, {
    method: 'PATCH',
    body,
  });
}

// ========= Voices =========
export type Voice = {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
};

export async function listVoices(): Promise<{ voices: Voice[] }> {
  return elevenLabsFetch('/v1/voices', {
    next: { revalidate: 60, tags: ['voices'] },
  });
}

// ========= Conversations =========
export type Conversation = {
  conversation_id: string;
  agent_id: string;
  agent_name?: string;
  start_time_unix_secs?: number;
  call_duration_secs?: number;
  message_count?: number;
  status?: string;
  call_successful?: string;
};

export async function listConversations(): Promise<{
  conversations: Conversation[];
}> {
  return elevenLabsFetch('/v1/convai/conversations', {
    next: { revalidate: 10, tags: ['conversations'] },
  });
}

export async function getConversation(id: string) {
  return elevenLabsFetch<{
    conversation_id: string;
    agent_id: string;
    agent_name?: string;
    status?: string;
    call_successful?: string;
    start_time_unix_secs?: number;
    call_duration_secs?: number;
    message_count?: number;
    transcript?: Array<{
      role: 'agent' | 'user';
      message: string;
      time_in_call_secs?: number;
    }>;
    metadata?: Record<string, unknown>;
    analysis?: {
      call_successful?: string;
      transcript_summary?: string;
    };
  }>(`/v1/convai/conversations/${id}`, {
    cache: 'no-store',
  });
}

// ========= Knowledge Base =========
export type KnowledgeBaseDoc = {
  id: string;
  name: string;
  type?: string;
  created_at_unix_secs?: number;
};

export async function listKnowledgeBase(): Promise<{
  documents: KnowledgeBaseDoc[];
}> {
  return elevenLabsFetch('/v1/convai/knowledge-base', {
    next: { revalidate: 30, tags: ['knowledge-base'] },
  });
}

// ========= Phone Numbers =========
export async function listPhoneNumbers() {
  return elevenLabsFetch('/v1/convai/phone-numbers', {
    next: { revalidate: 30, tags: ['phone-numbers'] },
  });
}

// ========= Tools =========
export async function listTools() {
  return elevenLabsFetch('/v1/convai/tools', {
    next: { revalidate: 30, tags: ['tools'] },
  });
}

// ========= User / subscription info =========
export async function getUserInfo() {
  return elevenLabsFetch('/v1/user', {
    next: { revalidate: 60, tags: ['user'] },
  });
}

// ========= Signed URL for live voice call =========
export async function getSignedUrl(agentId: string): Promise<{ signed_url: string }> {
  return elevenLabsFetch(
    `/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
    { cache: 'no-store' }
  );
}
