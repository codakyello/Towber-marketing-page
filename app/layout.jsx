import { Geist_Mono, Inter, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'Towber — Roadside help, on the way',
  description:
    'Towber — On-demand roadside assistance and automotive marketplace for Lagos. Verified providers, transparent pricing, in-app escrow.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
