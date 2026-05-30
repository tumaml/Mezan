import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mezan.app'),
  title: {
    default: 'Mezan — See your whole organization, clearly',
    template: '%s · Mezan',
  },
  description:
    'Mezan is the org-intelligence platform that turns your headcount, roles, and reporting lines into a living, interactive map your whole company can trust.',
  keywords: [
    'org chart',
    'organization design',
    'people operations',
    'workforce planning',
    'team structure',
    'headcount',
  ],
  authors: [{ name: 'Mezan' }],
  openGraph: {
    title: 'Mezan — See your whole organization, clearly',
    description:
      'The org-intelligence platform that turns headcount, roles, and reporting lines into a living, interactive map.',
    url: 'https://mezan.app',
    siteName: 'Mezan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezan — See your whole organization, clearly',
    description:
      'The org-intelligence platform that turns headcount, roles, and reporting lines into a living, interactive map.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[#08080c] text-zinc-200">{children}</body>
    </html>
  );
}
