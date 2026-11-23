import type { Metadata } from 'next';
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luxury VIP Number Market - Exclusive Mobile Numbers',
  description: "India's premier marketplace for rare, auspicious & royal VIP mobile numbers. Instant transfer with 100% legal ownership.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col items-center bg-[#EDE9E1] transition-all duration-300">
        {children}
      </body>
    </html>
  );
}
