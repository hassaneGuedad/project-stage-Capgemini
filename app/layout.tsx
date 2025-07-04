import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartProjectBuilder - Créez des projets web avec l\'IA',
  description: 'Plateforme de génération de projets web utilisant l\'intelligence artificielle pour créer des applications complètes et optimisées.',
  keywords: 'AI, développement web, génération de code, Next.js, React, intelligence artificielle',
  authors: [{ name: 'SmartProjectBuilder Team' }],
  openGraph: {
    title: 'SmartProjectBuilder - Créez des projets web avec l\'IA',
    description: 'Transformez vos idées en applications web complètes grâce à l\'intelligence artificielle.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}