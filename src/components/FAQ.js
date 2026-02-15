'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "Kiedy otrzymam pieniądze za sprzedany telefon?",
        answer: "Płatności realizujemy zazwyczaj w ciągu 24 godzin od momentu otrzymania i zweryfikowania urządzenia w naszym serwisie. W przypadku przelewu bankowego środki powinny pojawić się na Twoim koncie w kolejnym dniu roboczym."
    },
    {
        question: "Jak przygotować iPhone'a do wysyłki?",
        answer: "Przed wysyłką koniecznie wyloguj się z iCloud (Znajdź mój iPhone), usuń dane osobiste i przywróć ustawienia fabryczne. Telefon zapakuj w bezpieczne pudełko (najlepiej oryginalne) i zabezpiecz folią bąbelkową."
    },
    {
        question: "Kto pokrywa koszt wysyłki?",
        answer: "My! Generujemy dla Ciebie darmową etykietę kurierską lub kod nadania w Paczkomacie. Ty nie ponosisz żadnych kosztów wysyłki."
    },
    {
        question: "Co jeśli stan telefonu różni się od zadeklarowanego?",
        answer: "Jeśli podczas weryfikacji stwierdzimy różnice (np. głębsze rysy niż w opisie), skontaktujemy się z Tobą z nową propozycją wyceny. Możesz ją zaakceptować lub odrzucić – wtedy odeślemy telefon na nasz koszt."
    },
    {
        question: "Czy skupujecie uszkodzone telefony?",
        answer: "Tak, skupujemy również uszkodzone iPhone'y (np. ze zbitym ekranem czy uszkodzoną obudową), o ile są one uwzględnione w naszym formularzu wyceny. Nie skupujemy telefonów zablokowanych, kradzionych lub całkowicie martwych (nie włączających się)."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Często zadawane pytania</h2>
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <button
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={activeIndex === index}
                        >
                            <div className={styles.question}>
                                {faq.question}
                                <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
                            </div>
                            <div
                                className={styles.answer}
                                style={{ maxHeight: activeIndex === index ? '200px' : '0' }}
                            >
                                <p>{faq.answer}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section >
    );
}
