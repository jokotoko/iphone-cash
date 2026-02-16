'use client';

import { useState } from 'react';
import styles from './status.module.css';

export default function StatusPage() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null);

    const checkStatus = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            const response = await fetch('/api/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Nie znaleziono zamówienia');
            }

            setOrder(data.order);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusLabel = (status) => {
        const statuses = {
            'new': 'Nowe',
            'received': 'Otrzymano urządzenie',
            'verified': 'Zweryfikowano',
            'paid': 'Wypłacono',
            'cancelled': 'Anulowano',
            'return': 'Zwrot'
        };
        return statuses[status] || status;
    };

    return (
        <main className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sprawdź Status Zlecenia</h1>
                    <p className={styles.subtitle}>
                        Wpisz numer zamówienia (ID) oraz adres email, aby sprawdzić na jakim etapie jest Twoja sprzedaż.
                    </p>

                    {!order ? (
                        <form onSubmit={checkStatus} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="orderId" className={styles.label}>Numer Zamówienia</label>
                                <input
                                    type="text"
                                    id="orderId"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="np. 123e4567-e89b..."
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Adres Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="twoj@email.com"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.button} disabled={loading}>
                                {loading ? 'Sprawdzanie...' : 'Sprawdź Status'}
                            </button>

                            {error && <div className={styles.error}>{error}</div>}
                        </form>
                    ) : (
                        <div className={styles.result}>
                            <div className={styles.statusHeader}>
                                <span className={styles.statusLabel}>Aktualny Status</span>
                                <span className={styles.statusValue}>{getStatusLabel(order.status)}</span>
                            </div>

                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Model</span>
                                <span className={styles.detailValue}>{order.model} {order.capacity}</span>
                            </div>

                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Cena</span>
                                <span className={styles.detailValue}>{order.price} zł</span>
                            </div>

                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Data utworzenia</span>
                                <span className={styles.detailValue}>{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>

                            <button onClick={() => setOrder(null)} className={styles.refreshButton}>
                                Sprawdź inne zamówienie
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
