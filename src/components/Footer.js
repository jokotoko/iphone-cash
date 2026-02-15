import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.logoIcon}>
                                <path d="M17 2H7C4.2 2 2 4.2 2 7V17C2 19.8 4.2 22 7 22H17C19.8 22 22 19.8 22 17V7C22 4.2 19.8 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            iPhoneCash.io
                        </div>
                        <p className={styles.tagline}>
                            Twoje zaufane miejsce do sprzedaży sprzętu Apple.
                            Szybko, bezpiecznie i w najlepszej cenie.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>Firma</h4>
                            <Link href="/about" className={styles.link}>O nas</Link>
                            <Link href="/contact" className={styles.link}>Kontakt</Link>
                            <Link href="/careers" className={styles.link}>Kariera</Link>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>Wsparcie</h4>
                            <Link href="/how-it-works" className={styles.link}>Jak to działa</Link>
                            <Link href="/pricing" className={styles.link}>Cennik</Link>
                            <Link href="/faq" className={styles.link}>FAQ</Link>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>Prawne</h4>
                            <Link href="/terms" className={styles.link}>Regulamin</Link>
                            <Link href="/privacy" className={styles.link}>Polityka Prywatności</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        © {currentYear} iPhoneCash.io. Wszelkie prawa zastrzeżone.<br />
                        Nie jesteśmy powiązani z firmą Apple Inc.
                    </div>

                    <div className={styles.partners}>
                        <span className={styles.partner}>DHL</span>
                        <span className={styles.partner}>InPost</span>
                        <span className={styles.partner}>Przelewy24</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
