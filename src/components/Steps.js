'use client';

import styles from './Steps.module.css';

const steps = [
    {
        id: 1,
        title: 'Wybierz model',
        description: 'Wypełnij krótki formularz o stanie telefonu. Zajmie to mniej niż minutę.',
        image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-1.jpg?v=13604f91'
    },
    {
        id: 2,
        title: 'Darmowa wysyłka',
        description: 'Wyślemy Ci opłaconą etykietę lub kuriera. Zapakuj bezpiecznie telefon.',
        image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-2.jpg?v=13604f91'
    },
    {
        id: 3,
        title: 'Szybka wypłata',
        description: 'Pieniądze na koncie w ciągu 24-48h od sprawdzenia telefonu przez nasz serwis.',
        image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-3.jpg?v=13604f91'
        // Using a similar placeholder, ideally would be unique per step
    }
];

export default function Steps() {
    return (
        <section id="how-it-works" className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Jak to działa?</h2>

                <div className={styles.grid}>
                    {steps.map((step) => (
                        <div key={step.id} className={`${styles.card} animate-fade-in-up delay-${step.id * 100}`}>
                            <div className={styles.imageWrapper}>
                                <div className={styles.placeholderImage} style={{ backgroundImage: `url(${step.image})` }} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.stepNumber}>{step.id}</div>
                                <h3 className={styles.title}>{step.title}</h3>
                                <p className={styles.description}>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
