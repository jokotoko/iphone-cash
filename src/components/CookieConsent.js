'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h3>Szanujemy Twoją prywatność 🍪</h3>
                    <p>
                        Używamy plików cookies, aby zapewnić Ci najlepsze doświadczenie na naszej stronie,
                        analizować ruch i personalizować treści. Możesz zaakceptować wszystkie pliki cookies
                        lub zarządzać swoimi preferencjami. Więcej informacji znajdziesz w naszej
                        <Link href="/privacy-policy" className={styles.link}> Polityce Prywatności</Link>.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button onClick={handleDecline} className={styles.declineBtn}>
                        Odrzuć
                    </button>
                    <button onClick={handleAccept} className={styles.acceptBtn}>
                        Akceptuję
                    </button>
                </div>
            </div>
        </div>
    );
}
