import Header from '../components/Header';
import Hero from '../components/Hero';
import ModelCarousel from '../components/ModelCarousel';


import Steps from '../components/Steps';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import Trust from '../components/Trust';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      {/* Spacer for fixed header */}
      <div style={{ height: '64px' }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "iPhoneCash.io",
            "url": "https://iphonecash.io",
            "logo": "https://iphonecash.io/logo.png",
            "sameAs": [
              "https://www.facebook.com/iphonecash",
              "https://www.instagram.com/iphonecash"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+48-123-456-789",
              "contactType": "customer service",
              "areaServed": "PL",
              "availableLanguage": "Polish"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Skup iPhone",
            "provider": {
              "@type": "Organization",
              "name": "iPhoneCash.io"
            },
            "serviceType": "Electronics Buyback",
            "areaServed": "PL",
            "description": "Profesjonalny skup telefonów Apple iPhone. Wycena online, darmowa wysyłka i szybka płatność."
          })
        }}
      />

      <Hero />
      <Trust />
      <ModelCarousel />
      <Steps />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}
