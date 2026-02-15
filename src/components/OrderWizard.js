'use client';

import { useState, useEffect } from 'react';
import styles from './OrderWizard.module.css';

const steps = [
    { id: 1, title: 'Model iPhone', type: 'select', key: 'model' },
    { id: 2, title: 'Pojemność', type: 'radio', key: 'capacity' },
    { id: 3, title: 'Stan baterii', type: 'input', key: 'battery' },
    { id: 4, title: 'Kontrola sprawności', type: 'checklist', key: 'functional' },
    { id: 5, title: 'Stan wizualny', type: 'complex', key: 'condition' },
];

const screenOptions = [
    {
        id: 'perfect',
        title: 'Jak nowy',
        description: 'Brak najmniejszej ryski. Ekran idealny.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        colorClass: 'emerald'
    },
    {
        id: 'scratched',
        title: 'Porysowany',
        description: 'Widoczne rysy pod światło. Dotyk działa.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-4.5m-1.5 4.5a6.01 6.01 0 01-1.5-4.5m3 15v-5.25m0 0h5.25m-5.25 0h-5.25M3 15l2.25-2.25M3 15l2.25 2.25M3 15h5.25m13.5 0l-2.25-2.25M21 15l-2.25 2.25M21 15h-5.25" />
            </svg>
        ),
        colorClass: 'amber'
    },
    {
        id: 'cracked',
        title: 'Zbita szybka',
        description: 'Pęknięcia, "pajęczynka" lub wylany ekran.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 5.5l-6 6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 9.5l-3.5 3.5" />
            </svg>
        ),
        colorClass: 'red'
    },
];

const bodyOptions = [
    {
        id: 'perfect',
        title: 'Idealna',
        description: 'Brak obić, otarć na ramkach. Jak z pudełka.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.247-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M6.633 10.5v4.171c0 .295.17.563.433.683l1.86.827c.414.184.872.278 1.335.278h1.205M6.633 10.5h1.223c.552 0 1.012.397 1.112.939l.217 1.172c.1.543.661.939 1.213.939h2.15c.68 0 1.174.584 1.112 1.261l-.308 3.555a1.125 1.125 0 01-1.122 1.028h-1.69c-.654 0-1.277-.238-1.764-.67l-2.826-2.51c-.338-.3-.54-.73-.54-1.18V10.5z" />
            </svg>
        ),
        colorClass: 'emerald'
    },
    {
        id: 'dents',
        title: 'Obicia/Otarcia',
        description: 'Widoczne ślady użytkowania na ramkach lub tyle.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
        ),
        colorClass: 'amber'
    },
    {
        id: 'bent',
        title: 'Pęknięta/Wygięta',
        description: 'Zbite plecki, wygięta obudowa lub głębokie rysy.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        ),
        colorClass: 'red'
    },
];

export default function OrderWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [price, setPrice] = useState(3039.00);
    const [selections, setSelections] = useState({
        model: 'iPhone 16 Pro',
        capacity: '256GB',
        battery: '90',
        functional: 'Wszystko działa',
        screen: null, // 'perfect', 'scratched', 'cracked'
        body: null    // 'perfect', 'dents', 'bent'
    });
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        city: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock pricing logic
    useEffect(() => {
        let base = 3500;
        // Model base price adjustments
        if (selections.model === 'iPhone 16') base = 3100;
        if (selections.model === 'iPhone 15 Pro') base = 2800;

        // Capacity adjustments
        if (selections.capacity === '128GB') base -= 200;
        if (selections.capacity === '512GB') base += 200;
        if (selections.capacity === '1TB') base += 400;

        // Battery adjustments
        if (parseInt(selections.battery) < 85) base -= 200;
        if (parseInt(selections.battery) < 80) base -= 300;


        // Condition adjustments (Visual)
        // Adjust for Screen
        if (selections.screen === 'scratched') base *= 0.85;
        if (selections.screen === 'cracked') base *= 0.60;

        // Adjust for Body
        if (selections.body === 'dents') base *= 0.90;
        if (selections.body === 'bent') base *= 0.65;

        // Functional adjustments
        if (selections.functional !== 'Wszystko działa') base -= 300;

        setPrice(base > 0 ? base : 0);
    }, [selections]);

    const handleNext = () => {
        if (currentStep < 6) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selections,
                    price,
                    contact
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert('Wystąpił błąd podczas wysyłania zgłoszenia.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Wystąpił błąd połączenia.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progressPercentage = Math.round((currentStep / 6) * 100);

    if (isSuccess) {
        return (
            <section className={styles.wizardContainer}>
                <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2>Dziękujemy za zgłoszenie!</h2>
                    <p>Skontaktujemy się z Tobą w ciągu 24h w celu potwierdzenia odbioru.</p>
                    <p className={styles.orderSummary}>Szacowana kwota: <strong>{price.toLocaleString('pl-PL')} zł</strong></p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.wizardContainer}>

            {/* LEFT SIDEBAR - SUMMARY */}
            <div className={styles.sidebar}>
                <div className={styles.summaryHeader}>
                    <p className={styles.summaryLabel}>SZACOWANA WARTOŚĆ:</p>
                    <p className={styles.price}>{price.toLocaleString('pl-PL')} zł</p>
                </div>

                <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                        <span className={styles.label}>Model:</span>
                        <span className={styles.value}>{selections.model}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.label}>Pojemność:</span>
                        <span className={styles.value}>{selections.capacity}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.label}>Bateria:</span>
                        <span className={styles.value}>{selections.battery}%</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.label}>Ekran:</span>
                        <span className={styles.value}>
                            {selections.screen ? screenOptions.find(o => o.id === selections.screen)?.title : '-'}
                        </span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.label}>Obudowa:</span>
                        <span className={styles.value}>
                            {selections.body ? bodyOptions.find(o => o.id === selections.body)?.title : '-'}
                        </span>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className={styles.mainContent}>
                {/* Progress Bar */}
                <div className={styles.progressWrapper}>
                    <div className={styles.progressLabels}>
                        <span>KROK {currentStep} Z 6</span>
                        <span>{progressPercentage}%</span>
                    </div>
                    <div className={styles.progressBarBg}>
                        <div
                            className={styles.progressBarFill}
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Dynamic Step Content */}
                <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>
                        {currentStep === 6 ? 'Twoje dane' : steps[currentStep - 1]?.title}
                    </h2>

                    {currentStep < 6 && (
                        <p className={styles.stepHint}>
                            Podpowiedź: Znajdziesz to w Ustawienia → Ogólne → To urządzenie
                        </p>
                    )}

                    <div className={styles.optionsContainer}>
                        {currentStep === 1 && (
                            <select
                                className={styles.selectInput}
                                value={selections.model}
                                onChange={(e) => setSelections({ ...selections, model: e.target.value })}
                            >
                                <option>iPhone 16 Pro</option>
                                <option>iPhone 16</option>
                                <option>iPhone 15 Pro</option>
                                <option>iPhone 15</option>
                                <option>iPhone 14 Pro</option>
                                <option>iPhone 14</option>
                            </select>
                        )}

                        {currentStep === 2 && (
                            <div className={styles.gridOptions}>
                                {['128GB', '256GB', '512GB', '1TB'].map(cap => (
                                    <button
                                        key={cap}
                                        onClick={() => setSelections({ ...selections, capacity: cap })}
                                        className={`${styles.optionButton} ${selections.capacity === cap ? styles.selected : ''}`}
                                    >
                                        {cap}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>Maksymalna pojemność (%)</label>
                                <input
                                    type="number"
                                    min="50"
                                    max="100"
                                    value={selections.battery}
                                    onChange={(e) => setSelections({ ...selections, battery: e.target.value })}
                                    className={styles.textInput}
                                />
                                <span className={styles.unit}>%</span>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className={styles.gridOptions}>
                                {['Wszystko działa', 'Coś nie działa'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setSelections({ ...selections, functional: opt })}
                                        className={`${styles.optionButton} ${selections.functional === opt ? styles.selected : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className={styles.visualStepContainer}>
                                <div className={styles.visualSection}>
                                    <h3 className={styles.visualSectionTitle}>
                                        <span className={styles.stepBadge}>A</span>
                                        Stan Ekranu (Przód)
                                    </h3>
                                    <div className={styles.gridCards}>
                                        {screenOptions.map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelections({ ...selections, screen: option.id })}
                                                className={`${styles.visualCard} ${selections.screen === option.id ? styles.selected : ''} ${styles[option.colorClass]}`}
                                            >
                                                <div className={styles.iconWrapper}>
                                                    {option.icon}
                                                </div>
                                                <h4 className={styles.cardTitle}>{option.title}</h4>
                                                <p className={styles.cardDesc}>{option.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.visualSection}>
                                    <h3 className={styles.visualSectionTitle}>
                                        <span className={styles.stepBadge}>B</span>
                                        Stan Obudowy (Tył i Ramki)
                                    </h3>
                                    <div className={styles.gridCards}>
                                        {bodyOptions.map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelections({ ...selections, body: option.id })}
                                                className={`${styles.visualCard} ${selections.body === option.id ? styles.selected : ''} ${styles[option.colorClass]}`}
                                            >
                                                <div className={styles.iconWrapper}>
                                                    {option.icon}
                                                </div>
                                                <h4 className={styles.cardTitle}>{option.title}</h4>
                                                <p className={styles.cardDesc}>{option.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 6 && (
                            <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name">Imię i Nazwisko</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        className={styles.textInput}
                                        value={contact.name}
                                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                        placeholder="Jan Kowalski"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className={styles.textInput}
                                        value={contact.email}
                                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                        placeholder="jan@example.com"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="phone">Telefon</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        className={styles.textInput}
                                        value={contact.phone}
                                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                        placeholder="123 456 789"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="city">Miasto</label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        autoComplete="address-level2"
                                        className={styles.textInput}
                                        value={contact.city}
                                        onChange={(e) => setContact({ ...contact, city: e.target.value })}
                                        placeholder="Warszawa"
                                    />
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className={styles.navigation}>
                        <button
                            type="button"
                            onClick={handleBack}
                            className={`${styles.backButton} ${currentStep === 1 ? styles.hidden : ''}`}
                        >
                            ← Powrót
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                (currentStep === 5 && (!selections.screen || !selections.body)) ||
                                (currentStep === 6 && (!contact.name || !contact.email || !contact.phone)) ||
                                isSubmitting
                            }
                            className={`${styles.nextButton} ${((currentStep === 5 && (!selections.screen || !selections.body)) ||
                                (currentStep === 6 && (!contact.name || !contact.email || !contact.phone)) ||
                                isSubmitting) ? styles.disabled : ''
                                }`}
                        >
                            {isSubmitting ? 'Wysyłanie...' : (currentStep === 6 ? 'Zatwierdź zgłoszenie' : 'Kontynuuj →')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
