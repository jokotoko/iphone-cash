'use client';

import styles from './Trust.module.css';

const trustItems = [
    {
        id: 1,
        title: 'Gwarancja Ceny',
        description: 'Blokujemy cenę na 14 dni. Jeśli wycenimy telefon niżej, odeślemy go za darmo.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        id: 2,
        title: 'Ekspresowa Wypłata',
        description: 'Przelew zlecamy w ciągu 24h od momentu weryfikacji urządzenia w naszym serwisie.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        )
    },
    {
        id: 3,
        title: 'Eko-Wybór',
        description: 'Dając drugie życie elektronice, redukujesz ilość elektroodpadów i dbasz o planetę.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.413 1.68l-1.225.956a2.25 2.25 0 01-2.433-.053l-.999-.714a2.25 2.25 0 01-.849-2.373l.259-.974a1.875 1.875 0 00-.773-2.02l-1.015-.658a2.25 2.25 0 01-1.01-1.87l.013-.27c.102-2.32 2.348-4.092 4.636-3.805a22.28 22.28 0 0110.34 2.164A22.583 22.583 0 018.88 15.187M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        id: 4,
        title: 'Bezpieczeństwo Danych',
        description: 'Trwale usuwamy wszelkie dane z Twojego telefonu, potwierdzone certyfikatem.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
        )
    }
];

export default function Trust() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Dlaczego iPhoneCash.io?</h2>
                <div className={styles.grid}>
                    {trustItems.map((item) => (
                        <div key={item.id} className={`${styles.card} animate-fade-in`}>
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
