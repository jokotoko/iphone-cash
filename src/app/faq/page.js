import FAQ from '../../components/FAQ';

export default function FAQPage() {
    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1d1d1f' }}>Centrum Pomocy</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>Najczęściej zadawane pytania</p>
            </div>
            <FAQ />
        </div>
    );
}
