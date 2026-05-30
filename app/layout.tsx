import type { Metadata } from 'next';
import { Inter, Fraunces, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Editorial display serif with optical sizing — used for headlines only.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mezan.app'),
  title: {
    default: 'Mezan — Org clarity, by design',
    template: '%s · Mezan',
  },
  description:
    'Mezan turns your headcount, roles, and reporting lines into a living, accurate map of who does what — and how it all fits together.',
  keywords: ['org chart', 'organization design', 'people operations', 'workforce planning', 'team structure'],
  authors: [{ name: 'Mezan' }],
  openGraph: {
    title: 'Mezan — Org clarity, by design',
    description: 'A living, accurate map of who does what — and how it all fits together.',
    url: 'https://mezan.app',
    siteName: 'Mezan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezan — Org clarity, by design',
    description: 'A living, accurate map of who does what — and how it all fits together.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-paper text-ink">{children}</body>
    </html>
  );
}
