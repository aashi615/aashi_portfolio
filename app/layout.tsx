import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aashi Garg — Backend + AI Engineer',
  description: 'Portfolio of Aashi Garg, a Backend + AI Engineer building scalable APIs, agentic AI systems, distributed workflows and cloud-native infrastructure.',
  openGraph: { title: 'Aashi Garg — Backend + AI Engineer', description: 'Building intelligent systems for the real world.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>; }
