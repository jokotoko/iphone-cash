import Link from 'next/link';
import ModelCarousel from '../../components/ModelCarousel';

export default function PricingPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>
                Cennik Skupu iPhone
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                Poniżej znajdziesz orientacyjne ceny skupu dla popularnych modeli.
                Pamiętaj, że ostateczna kwota zależy od stanu technicznego i wizualnego Twojego urządzenia.
            </p>

            <ModelCarousel />

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link
                    href="/wycena"
                    style={{
                        padding: '1rem 2rem',
                        backgroundColor: '#0071e3',
                        color: 'white',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}
                >
                    Sprawdź dokładną wycenę dla swojego modelu
                </Link>
            </div>
        </div>
    );
}
