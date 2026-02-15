export default function CareersPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1d1d1f' }}>Kariera</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333', marginBottom: '2rem' }}>
                Dołącz do zespołu iPhoneCash.io i pomóż nam rewolucjonizować rynek wtórny elektroniki!
            </p>

            <div style={{ padding: '2rem', backgroundColor: '#f5f5f7', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Aktualnie brak otwartych rekrutacji</h3>
                <p>
                    W tej chwili nasz zespół jest kompletny. Zajrzyj tutaj ponownie wkrótce lub wyślij nam swoje CV
                    na adres <a href="mailto:kariera@iphonecash.io" style={{ color: '#0071e3', textDecoration: 'underline' }}>kariera@iphonecash.io</a>,
                    a odezwiemy się, gdy pojawi się odpowiednie stanowisko.
                </p>
            </div>
        </div>
    );
}
