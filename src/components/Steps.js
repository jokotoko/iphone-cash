'use client';

import styles from './Steps.module.css';

export default function Steps() {
    const steps = [
        {
            id: 1,
            title: 'Wybierz model i uzyskaj wycenę',
            description: 'Zaznacz model i stan swojego iPhone’a, aby poznać jego wartość.',
            image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-1.jpg?v=13604f91' // Using Swappie placeholder or similar
        },
        {
            id: 2,
            title: 'Wyślij za darmo',
            description: 'Otrzymasz od nas etykietę wysyłkową. Spakuj telefon i wyślij go bezpłatnie.',
            image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-2.jpg?v=13604f91'
        },
        {
            id: 3,
            title: 'Odbierz gotówkę',
            description: 'Po weryfikacji stanu telefonu przelejemy pieniądze na Twoje konto w ciągu 1-3 dni.',
            image: 'https://assets.swappie.com/cdn-cgi/image/width=600,fit=cover,format=auto/sell-step-3.jpg?v=13604f91'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Jak to działa?</h2>

                <div className={styles.grid}>
                    {steps.map((step) => (
                        <div key={step.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {/* Placeholder for real images. In prod use next/image */}
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
