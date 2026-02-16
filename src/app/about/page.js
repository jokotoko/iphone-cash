import styles from './about.module.css';

export const metadata = {
    title: 'O nas | iPhoneCash.io',
    description: 'Poznaj zespół iPhoneCash.io. Dowiedz się dlaczego warto nam zaufać i jak wygląda nasz proces skupu iPhone\'ów.',
};

export default function AboutPage() {
    return (
        <main className={styles.section}>
            <div className={styles.container}>

                {/* Hero Section */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>Dajemy drugie życie Twoim urządzeniom</h1>
                    <p className={styles.subtitle}>
                        Jesteśmy zespołem pasjonatów technologii, którzy wierzą, że sprzedaż używanego telefonu powinna być prosta, bezpieczna i uczciwa.
                    </p>
                </div>

                {/* Values Grid */}
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <span className={styles.icon}>⚡</span>
                        <h3 className={styles.cardTitle}>Szybkość</h3>
                        <p className={styles.cardText}>
                            Szanujemy Twój czas. Wycena w 30 sekund, darmowy kurier i przelew w 24h od weryfikacji. Bez zbędnych formalności.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>🛡️</span>
                        <h3 className={styles.cardTitle}>Bezpieczeństwo</h3>
                        <p className={styles.cardText}>
                            Każde urządzenie jest profesjonalnie czyszczone z danych. Jesteśmy zarejestrowaną polską firmą, działającą legalnie i transparentnie.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>♻️</span>
                        <h3 className={styles.cardTitle}>Ekologia</h3>
                        <p className={styles.cardText}>
                            Odkupując Twój telefon, wprowadzamy go ponownie do obiegu. Działamy w duchu Zero Waste, redukując elektrośmieci.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className={styles.storySection}>
                    <div className={styles.storyContent}>
                        <h2 className={styles.heading}>Nasza Misja</h2>
                        <p className={styles.text}>
                            iPhoneCash.io powstało z frustracji. Sprzedaż telefonu na portalach ogłoszeniowych to często udręka – negocjacje, oszuści, marnowanie czasu. W komisach ceny bywają rażąco niskie.
                        </p>
                        <p className={styles.text}>
                            Stworzyliśmy alternatywę. Chcemy, abyś mógł sprzedać swój iPhone w cenie rynkowej, nie wychodząc z domu, z gwarancją bezpieczeństwa. Wierzymy w technologię cyrkularną – Twój "stary" telefon dla kogoś innego może być wymarzonym nowym urządzeniem.
                        </p>
                    </div>
                    <div className={styles.storyImage}>
                        🏢
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    <div>
                        <span className={styles.statNumber}>5000+</span>
                        <span className={styles.statLabel}>Skupionych iPhone'ów</span>
                    </div>
                    <div>
                        <span className={styles.statNumber}>24h</span>
                        <span className={styles.statLabel}>Średni czas wypłaty</span>
                    </div>
                    <div>
                        <span className={styles.statNumber}>99%</span>
                        <span className={styles.statLabel}>Zadowolonych klientów</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
