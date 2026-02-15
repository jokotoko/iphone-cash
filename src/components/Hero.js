'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={`${styles.content} animate-fade-in-up`}>
                    <h1 className={styles.title}>
                        Zaufały nam miliony. <br />
                        Sprzedaż stała się prosta.
                    </h1>
                    <p className={`${styles.subtitle} delay-100`}>
                        Daj swojemu staremu telefonowi nową historię z partnerem, któremu możesz zaufać.
                        Najlepsze ceny i błyskawiczna wypłata.
                    </p>

                    <ul className={`${styles.usps} delay-200`}>
                        <li className={styles.uspItem}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#222C9B" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                </svg>
                            </div>
                            <span className={styles.uspText}>Darmowa wysyłka</span>
                        </li>
                        <li className={styles.uspItem}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#222C9B" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                </svg>
                            </div>
                            <span className={styles.uspText}>Bezpieczne dane</span>
                        </li>
                        <li className={styles.uspItem}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#222C9B" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                                </svg>
                            </div>
                            <span className={styles.uspText}>Szybka płatność</span>
                        </li>
                    </ul>

                    <div className={`${styles.ctaWrapper} delay-300`}>
                        <Link href="/wycena" className={styles.ctaButton}>
                            Sprzedaj teraz
                        </Link>
                    </div>
                </div>

                <div className={`${styles.imageContainer} animate-slide-in-right`}>
                    <div className={styles.blob} />
                    <img
                        src="/hero-iphone.png.png"
                        alt="iPhone 15 Pro"
                        className={styles.heroImage}
                        style={{ borderRadius: '24px' }}
                    />
                </div>
            </div>
        </section>
    );
}
