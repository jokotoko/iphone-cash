import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://iphonecash.io'),
  title: {
    template: '%s | iPhoneCash.io',
    default: "iPhoneCash.io | Sprzedaj iPhone'a w 24h - Najlepszy Skup Apple",
  },
  description: "Najlepszy skup iPhone'ów w Polsce. Wycena w 30 sekund, darmowy kurier InPost, gotówka na koncie w 24h. Sprawdź ile wart jest Twój telefon!",
  keywords: ["skup iphone", "sprzedaj iphone", "skup apple", "wycena iphone", "iphone cena", "skup telefonów"],
  authors: [{ name: 'iPhoneCash Team' }],
  creator: 'iPhoneCash.io',
  publisher: 'iPhoneCash.io',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "iPhoneCash.io | Sprzedaj iPhone'a Szybko i Bezpiecznie",
    description: "Zamień swój stary telefon na gotówkę. Darmowa wysyłka, szybka weryfikacja i natychmiastowa wypłata. Sprawdź teraz!",
    url: 'https://iphonecash.io',
    siteName: 'iPhoneCash.io',
    images: [
      {
        url: '/og-image.jpg', // Ensure you have this image in public folder
        width: 1200,
        height: 630,
        alt: 'iPhoneCash.io - Skup iPhone',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "iPhoneCash.io | Skup iPhone'ów Online",
    description: "Wyceń i sprzedaj swojego iPhone'a w 3 minuty. Gotówka w 24h.",
    images: ['/twitter-image.jpg'], // Ensure you have this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`${poppins.variable} ${lato.variable}`}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}
