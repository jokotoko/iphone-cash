export default function TermsPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1d1d1f' }}>Regulamin Serwisu</h1>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>Ostatnia aktualizacja: 15.02.2026</p>

            <div style={{ lineHeight: '1.8', color: '#333' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '2rem' }}>§1. Postanowienia ogólne</h3>
                <p>1. Niniejszy regulamin określa zasady korzystania z serwisu internetowego iPhoneCash.io.</p>
                <p>2. Właścicielem serwisu jest Skup iPhone - Antigravity z siedzibą w Warszawie przy ul. Technologicznej 1.</p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '2rem' }}>§2. Zasady sprzedaży</h3>
                <p>1. Użytkownik może sprzedać urządzenie marki Apple, korzystając z formularza wyceny dostępnego na stronie.</p>
                <p>2. Wycena przedstawiona na stronie ma charakter orientacyjny i może ulec zmianie po weryfikacji urządzenia przez serwis.</p>
                <p>3. Ostateczna cena sprzedaży jest potwierdzana po fizycznym sprawdzeniu urządzenia.</p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '2rem' }}>§3. Płatności i wysyłka</h3>
                <p>1. Serwis oferuje darmową wysyłkę urządzeń za pośrednictwem firmy kurierskiej lub Paczkomatów InPost.</p>
                <p>2. Płatność za urządzenie następuje przelewem bankowym lub Blikiem w ciągu 24 godzin od zaakceptowania ostatecznej wyceny.</p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '2rem' }}>§4. Reklamacje i zwroty</h3>
                <p>1. W przypadku braku zgody na ostateczną wycenę, urządzenie jest odsyłane do Klienta na koszt Serwisu.</p>
            </div>
        </div>
    );
}
