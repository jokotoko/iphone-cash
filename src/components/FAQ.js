'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
    const faqs = [
        {
            question: 'Kiedy otrzymam zapłatę?',
            answer: 'Płatność zlecamy w ciągu 1-4 dni roboczych od momentu, gdy telefon trafi do naszego centrum serwisowego i zostanie zweryfikowany. Pieniądze powinny pojawić się na Twoim koncie wkrótce potem.'
        },
        {
            question: 'Jak przygotować telefon do wysyłki?',
            answer: 'Przed wysyłką usuń wszystkie dane z telefonu, wyloguj się z iCloud (wiem, że to ważne!) i wyłącz funkcję "Znajdź mój iPhone". Następnie bezpiecznie zapakuj urządzenie.'
        },
        {
            question: 'Czy muszę wysłać ładowarkę i akcesoria?',
            answer: 'Nie, potrzebujemy tylko samego urządzenia. Ładowarki, kable i słuchawki możesz zachować dla siebie lub oddać do recyklingu.'
        },
        {
            question: 'Co jeśli stan telefonu różni się od deklarowanego?',
            answer: 'Jeśli nasza ocena będzie różnić się od Twojej, wyślemy Ci nową ofertę cenową na maila. Możesz ją zaakceptować lub odrzucić - w takim przypadku odeślemy telefon do Ciebie za darmo.'
        },
        {
            question: 'Cennik - ile dostanę za mój telefon?',
            answer: 'Wycena zależy od modelu i stanu wizualnego. Skorzystaj z naszej wyszukiwarki na górze strony, aby zobaczyć aktualną ofertę dla Twojego modelu.'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Najczęściej zadawane pytania</h2>
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.item}>
            <button
                className={styles.questionButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.questionText}>{question}</span>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            <div
                className={styles.answerWrapper}
                style={{ maxHeight: isOpen ? '200px' : '0' }}
            >
                <div className={styles.answer}>{answer}</div>
            </div>
        </div>
    );
}
