import type { Metadata } from 'next';
import './globals.css';

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://dale-tincho.vercel.app');

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
        url: '/og.jpg',
        width: 1200,
        height: 675,
        alt: 'Nuestra historia · De Blue a nuestra familia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestra historia · Amorcito',
    description: 'De Blue a nuestra familia, y a todo lo que todavía nos queda por vivir.',
    images: ['/og.jpg'],
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
