'use client';

import styles from './Steps.module.css';

const steps = [
    {
        id: 1,
        title: 'Wybierz model',
        description: 'Wypełnij krótki formularz o stanie telefonu. Zajmie to mniej niż minutę.',
        image: '/images/steps/step-1.svg'
    },
    {
        id: 2,
        title: 'Darmowa wysyłka',
        description: 'Wyślemy Ci opłaconą etykietę lub kuriera. Zapakuj bezpiecznie telefon.',
        image: '/images/steps/step-2.svg'
    },
    {
        id: 3,
        title: 'Szybka wypłata',
        description: 'Pieniądze na koncie w ciągu 24-48h od sprawdzenia telefonu przez nasz serwis.',
        image: '/images/steps/step-3.svg'
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
