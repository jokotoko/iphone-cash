'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ValueDropCalculator.module.css';

const dropRates = {
    'iPhone 16 Pro Max': 120,
    'iPhone 16 Pro': 110,
    'iPhone 16': 90,
    'iPhone 15 Pro Max': 80,
    'iPhone 15 Pro': 70,
    'iPhone 15': 50,
    'iPhone 14 Pro Max': 50,
    'iPhone 14 Pro': 45,
    'iPhone 14': 35,
    'iPhone 13': 30,
    'iPhone 12': 25,
    'iPhone 11': 20,
};

export default function ValueDropCalculator() {
    const [selectedModel, setSelectedModel] = useState('iPhone 14');

    const monthlyDrop = dropRates[selectedModel] || 30;
    const threeMonthDrop = monthlyDrop * 3;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Czas to pieniądz.<br />Dosłownie.</h2>
                    <p className={styles.description}>
                        Smartfony tracą na wartości każdego dnia. Premiera nowego modelu, nasycenie rynku czy zwykłe zużycie baterii obniżają cenę Twojego iPhone'a.
                    </p>
                    <p className={styles.description}>
                        Nie czekaj, aż Twój telefon straci kolejne kilkaset złotych. Sprzedaj go teraz i zamroź cenę na 14 dni.
                    </p>
                </div>

                <div className={styles.calculator}>
                    <div className={styles.selectGroup}>
                        <label className={styles.label}>Wybierz swój model:</label>
                        <select
                            className={styles.select}
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            {Object.keys(dropRates).map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.result}>
                        <span className={styles.lossLabel}>Jeśli poczekasz 3 miesiące, stracisz ok.:</span>
                        <span className={styles.lossAmount}>-{threeMonthDrop} zł</span>
                        <Link href="/wycena" className={styles.ctaButton}>
                            Sprzedaj teraz i zyskaj
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
