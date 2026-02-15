import styles from './Trust.module.css';

export default function Trust() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={`${styles.card} animate-scale-in`}>
                        <div className={styles.iconWrapper} style={{ background: 'rgba(0, 217, 225, 0.1)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D9E1" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Gwarancja Ceny</h3>
                            <p className={styles.description}>
                                Jeśli znajdziesz lepszą ofertę u konkurencji, postaramy się ją przebić. Jesteśmy pewni naszych stawek.
                            </p>
                        </div>
                    </div>

                    <div className={`${styles.card} animate-scale-in delay-200`}>
                        <div className={styles.iconWrapper} style={{ background: 'rgba(0, 186, 124, 0.1)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00BA7C" strokeWidth="2">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                            </svg>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Eko Odpowiedzialność</h3>
                            <p className={styles.description}>
                                Każdy skupiony iPhone dostaje drugie życie. Działamy zgodnie z ideą Zero Waste, redukując elektrośmieci.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
