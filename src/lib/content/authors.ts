export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  photo: string;
  links?: { label: string; href: string }[];
};

export const authors: Author[] = [
  {
    slug: 'cliff-weitzman',
    name: 'Cliff Weitzman',
    role: 'CEO & Co-Founder, Speechify',
    photo: '/authors/cliff-weitzman.jpg',
    shortBio: 'CEO of Speechify. Writes about the future of voice AI and how natural-sounding agents change customer experience.',
    bio: 'Cliff Weitzman is the CEO and co-founder of Speechify, the world\'s leading text-to-speech app. As a Forbes 30 Under 30 honoree, Cliff has spent more than a decade building consumer and enterprise products that make voice technology accessible to everyone. He writes about the future of voice AI, how natural-sounding agents will reshape customer experience, and how teams should think about deploying conversational AI responsibly.',
    links: [
      { label: 'X / Twitter', href: 'https://twitter.com/CliffWeitzman' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cliffweitzman/' },
    ],
  },
  {
    slug: 'tyler-weitzman',
    name: 'Tyler Weitzman',
    role: 'Co-Founder & Head of AI, Speechify',
    photo: '/authors/tyler-weitzman.jpg',
    shortBio: 'Co-founder and Head of AI at Speechify. Writes about the engineering behind real-time voice agents — TTS, STT, latency, and architecture.',
    bio: 'Tyler Weitzman is co-founder and Head of AI at Speechify. He has spent the past decade building the speech-synthesis stack that powers millions of users. Tyler writes about the engineering of real-time conversational systems — text-to-speech, speech recognition, latency budgets, model serving, and the architectural choices that separate prototypes from production-grade voice agents.',
    links: [
      { label: 'X / Twitter', href: 'https://twitter.com/tylerweitzman' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tylerweitzman/' },
    ],
  },
  {
    slug: 'rohan-pavuluri',
    name: 'Rohan Pavuluri',
    role: 'Building SIMBA Voice Agents',
    photo: '/authors/rohan-pavuluri.jpg',
    shortBio: 'Building SIMBA Voice Agents at Speechify. Writes about real-world deployments — support, outbound, receptionists — and what works in practice.',
    bio: 'Rohan Pavuluri builds SIMBA Voice Agents at Speechify. Previously, he founded and led Upsolve, the largest nonprofit in the United States serving low-income Americans through technology. He writes about real-world voice-agent deployments — customer support, outbound sales, AI receptionists — and the practical product, design, and operational lessons that actually move the needle.',
    links: [
      { label: 'X / Twitter', href: 'https://twitter.com/RohanPavuluri' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohanpavuluri/' },
    ],
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
