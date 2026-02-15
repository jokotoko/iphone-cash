import Steps from '../../components/Steps';

export default function HowItWorksPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1d1d1f', textAlign: 'center' }}>
                Jak to działa?
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Proces sprzedaży w iPhoneCash.io jest tak prosty, że zajmie Ci tylko 3 minuty.
                Zobacz, jak zamienić swój telefon na gotówkę w kilku krokach.
            </p>
            <Steps />
        </div>
    );
}
