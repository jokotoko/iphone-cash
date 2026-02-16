import Hero from '../components/Hero';
import LiveTicker from '../components/LiveTicker';
import ModelCarousel from '../components/ModelCarousel';
import Steps from '../components/Steps';
import Reviews from '../components/Reviews';
import Trust from '../components/Trust';
import FAQ from '../components/FAQ';
import ValueDropCalculator from '../components/ValueDropCalculator';
import RecentPurchases from '../components/RecentPurchases';

export default function Home() {
  return (
    <main>

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
      <LiveTicker />
      <Trust />
      <ModelCarousel />
      <ValueDropCalculator />
      <Steps />
      <RecentPurchases />
      <Reviews />
      <FAQ />
    </main>
  );
}
