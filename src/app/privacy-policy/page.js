import styles from './privacy.module.css';

export const metadata = {
    title: 'Polityka Prywatności | iPhoneCash.io',
    description: 'Informacje o przetwarzaniu danych osobowych i plikach cookies.',
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Polityka Prywatności</h1>
            <p className={styles.lastUpdated}>Ostatnia aktualizacja: 16.02.2026</p>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Informacje ogólne</h2>
                <div className={styles.content}>
                    <p>
                        Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z usług serwisu iPhoneCash.io.
                    </p>
                    <p>
                        Administratorem danych osobowych jest iPhoneCash.io z siedzibą w Polsce. Wszelkie pytania dotyczące ochrony prywatności prosimy kierować na adres email: kontakt@iphonecash.io.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Jakie dane zbieramy?</h2>
                <div className={styles.content}>
                    <p>W celu realizacji usługi skupu telefonów, zbieramy następujące dane:</p>
                    <ul>
                        <li>Imię i nazwisko</li>
                        <li>Adres email</li>
                        <li>Numer telefonu</li>
                        <li>Adres do wysyłki / odbioru kuriera</li>
                        <li>Numer konta bankowego (do wypłaty środków)</li>
                        <li>Dane urządzenia (model, numer IMEI/Serial - wymagane do weryfikacji legalności)</li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Cel przetwarzania danych</h2>
                <div className={styles.content}>
                    <p>Twoje dane są przetwarzane w celu:</p>
                    <ul>
                        <li>Realizacji umowy kupna-sprzedaży urządzenia.</li>
                        <li>Kontaktu w sprawie weryfikacji zlecenia.</li>
                        <li>Wygenerowania etykiety przewozowej (przekazanie danych firmie kurierskiej InPost/DHL).</li>
                        <li>Realizacji przelewu środków na wskazane konto.</li>
                        <li>Wypełnienia obowiązków prawnych i podatkowych (przechowywanie dokumentacji przez 5 lat).</li>
                        <li>Analizy statystycznej ruchu na stronie (Google Analytics).</li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Pliki Cookies</h2>
                <div className={styles.content}>
                    <p>
                        Serwis korzysta z plików cookies (tzw. "ciasteczka"). Są to niewielkie pliki tekstowe wysyłane przez serwer www i przechowywane przez oprogramowanie komputera przeglądarki.
                    </p>
                    <p>
                        Używamy cookies w celach:
                    </p>
                    <ul>
                        <li>Tworzenia statystyk, które pomagają zrozumieć, w jaki sposób Użytkownicy korzystają ze stron internetowych (Google Analytics).</li>
                        <li>Utrzymania sesji Użytkownika serwisu.</li>
                    </ul>
                    <p>
                        W każdej chwili możesz wyłączyć obsługę plików cookies w ustawieniach swojej przeglądarki.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Bezpieczeństwo danych</h2>
                <div className={styles.content}>
                    <p>
                        Dokładamy wszelkich starań, aby zabezpieczyć Twoje dane przed nieuprawnionym dostępem. Stosujemy szyfrowanie SSL, bezpieczne bazy danych (Supabase) oraz ograniczamy dostęp do danych tylko do upoważnionych pracowników.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Twoje prawa</h2>
                <div className={styles.content}>
                    <p>
                        Zgodnie z RODO, przysługuje Ci prawo do wglądu w swoje dane, ich poprawiania, żądania usunięcia ("prawo do bycia zapomnianym") lub ograniczenia przetwarzania.
                    </p>
                    <p>
                        W celu realizacji tych praw, skontaktuj się z nami mailowo.
                    </p>
                </div>
            </section>
        </main>
    );
}
