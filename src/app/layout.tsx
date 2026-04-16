import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://simbavoice.ai'),
  title: {
    default: 'SIMBA Voice Agents - The Conversational AI Agents Platform',
    template: '%s | SIMBA Voice Agents',
  },
  description: 'Deploy natural, human-sounding AI agents in 70+ languages with low latency across voice or chat. Connected to your knowledge base and tools.',
  openGraph: {
    title: 'SIMBA Voice Agents',
    description: 'The Conversational AI Agents Platform',
    url: 'https://simbavoice.ai',
    siteName: 'SIMBA Voice Agents',
    images: [{ url: '/simba-mark-512.png', width: 512, height: 512 }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
