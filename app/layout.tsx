import type { Metadata } from 'next';
import './globals.css';

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://nuestra-historia-13102016.alanmat08.chatgpt.site');

export const metadata: Metadata = {
  title: 'Nuestra historia · Amorcito',
  description:
    'Un recorrido por nuestra historia, desde aquella noche en Blue hasta todo lo que todavía nos queda por vivir.',
  metadataBase: new URL(siteOrigin),
  openGraph: {
    title: 'Nuestra historia · Amorcito',
    description: 'De Blue a nuestra familia, y a todo lo que todavía nos queda por vivir.',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/og.png',
        width: 2048,
        height: 1152,
        alt: 'Nuestra historia · De Blue a nuestra familia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestra historia · Amorcito',
    description: 'De Blue a nuestra familia, y a todo lo que todavía nos queda por vivir.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

