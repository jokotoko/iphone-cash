export default function ContactPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Kontakt</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-body)', marginBottom: '2rem' }}>
                Masz pytania dotyczące wyceny lub statusu swojego zamówienia? Jesteśmy do Twojej dyspozycji.
            </p>

            <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Obsługa Klienta</h3>
                    <p>Email: kontakt@iphonecash.io</p>
                    <p>Telefon: +48 123 456 789</p>
                    <p>Godziny pracy: Pon-Pt 9:00 - 17:00</p>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Adres korespondencyjny</h3>
                    <p>Skup iPhone - Antigravity</p>
                    <p>ul. Technologiczna 1</p>
                    <p>00-000 Warszawa</p>
                </div>
            </div>
        </div>
    );
}
