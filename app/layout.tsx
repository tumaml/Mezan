import type { Metadata } from 'next';
import { Space_Grotesk, Anton, Space_Mono } from 'next/font/google';
import './globals.css';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mezan.app'),
  title: {
    default: 'MEZAN — See everyone. Move fast.',
    template: '%s · MEZAN',
  },
  description:
    'Mezan is the org chart that fights back. Drag your people into place, watch the lines snap, and finally see how the whole company actually fits together.',
  keywords: ['org chart', 'organization design', 'people operations', 'workforce planning', 'team structure'],
  authors: [{ name: 'Mezan' }],
  openGraph: {
    title: 'MEZAN — See everyone. Move fast.',
    description: 'The org chart that fights back. Drag your people into place and watch the lines snap.',
    url: 'https://mezan.app',
    siteName: 'Mezan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEZAN — See everyone. Move fast.',
    description: 'The org chart that fights back.',
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
      className={`${grotesk.variable} ${anton.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bone text-ink">{children}</body>
    </html>
  );
}
