import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SIMBA Voice Agents',
    short_name: 'SIMBA',
    description:
      'Deploy natural, human-sounding AI voice agents in 70+ languages with low latency.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/simba-mark.png',
        sizes: '460x460',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/simba-mark-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
