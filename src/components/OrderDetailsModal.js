'use client';

import styles from '../app/admin/Admin.module.css';
import { useState } from 'react';

export default function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
    const [updating, setUpdating] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState(false);
    const [labelError, setLabelError] = useState(null);

    if (!order) return null;

    const { customer_info, details } = order;

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        await onUpdateStatus(order.id, newStatus);
        setUpdating(false);
        onClose();
    };

    const generateLabel = async () => {
        setLoadingLabel(true);
        setLabelError(null);
        try {
            const res = await fetch('/api/inpost/create-label', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: order.id })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Błąd generowania');

            // Refresh parent state (hacky but works for now without full reload)
            window.location.reload();

        } catch (err) {
            setLabelError(err.message);
        } finally {
            setLoadingLabel(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Szczegóły zamówienia #{order.id}</h2>
                    <div className={styles.statusBadge} style={{ marginTop: '8px' }}>
                        {order.status}
                    </div>
                </div>

                {/* Status Selection */}
                <div className={styles.modalSection} style={{ background: '#f5f5f7', padding: '16px', borderRadius: '8px' }}>
                    <h3 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Zmień status</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => handleStatusChange('new')}
                            disabled={order.status === 'new' || updating}
                            className={styles.actionBtn}
                            style={{ background: '#E3F2FD', color: '#1565C0', border: '1px solid #BBDEFB' }}
                        >
                            Nowe
                        </button>
                        <button
                            onClick={() => handleStatusChange('received')}
                            disabled={order.status === 'received' || updating}
                            className={styles.actionBtn}
                            style={{ background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2' }}
                        >
                            Odebrano
                        </button>
                        <button
                            onClick={() => handleStatusChange('verified')}
                            disabled={order.status === 'verified' || updating}
                            className={styles.actionBtn}
                            style={{ background: '#F3E5F5', color: '#7B1FA2', border: '1px solid #E1BEE7' }}
                        >
                            Zweryfikowano
                        </button>
                        <button
                            onClick={() => handleStatusChange('paid')}
                            disabled={order.status === 'paid' || updating}
                            className={styles.actionBtn}
                            style={{ background: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9' }}
                        >
                            Wypłacono
                        </button>
                        <button
                            onClick={() => handleStatusChange('cancelled')}
                            disabled={order.status === 'cancelled' || updating}
                            className={styles.actionBtn}
                            style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' }}
                        >
                            Anulowano
                        </button>
                    </div>
                </div>

                <div className={styles.modalSection}>
                    <h3 className={styles.sectionTitle}>Urządzenie</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Model:</span>
                            <span className={styles.value}>{order.model}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Pamięć:</span>
                            <span className={styles.value}>{order.capacity}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Stan:</span>
                            <span className={styles.value}>{order.visual_condition || 'Brak danych'}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Bateria:</span>
                            <span className={styles.value}>{details?.battery}%</span>
                        </div>
                    </div>
                    <div className={styles.priceHighlight}>
                        Wycena: {order.price} zł
                    </div>
                </div>

                <div className={styles.modalSection}>
                    <h3 className={styles.sectionTitle}>Dane Klienta</h3>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Imię i nazwisko:</span>
                        <span className={styles.value}>{customer_info?.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Email:</span>
                        <span className={styles.value}>{customer_info?.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Telefon:</span>
                        <span className={styles.value}>{customer_info?.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Adres:</span>
                        <span className={styles.value}>
                            {customer_info?.address}, {customer_info?.zip} {customer_info?.city}
                        </span>
                    </div>
                </div>

                <div className={styles.modalSection}>
                    <h3 className={styles.sectionTitle}>Płatność i Dostawa</h3>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Metoda płatności:</span>
                        <span className={styles.value}>{customer_info?.payoutMethod === 'bank' ? 'Przelew bankowy' : 'BLIK'}</span>
                    </div>
                    {customer_info?.payoutMethod === 'bank' ? (
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Numer konta:</span>
                            <span className={styles.value} style={{ fontFamily: 'monospace' }}>
                                {customer_info?.bankAccount}
                            </span>
                        </div>
                    ) : (
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Numer BLIK:</span>
                            <span className={styles.value}>{customer_info?.blikPhone}</span>
                        </div>
                    )}
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Metoda wysyłki:</span>
                        <span className={styles.value}>Kurier (Etykieta)</span>
                    </div>

                    {/* InPost Integration */}
                    <div style={{ marginTop: '24px', padding: '16px', border: '1px dashed #ccc', borderRadius: '8px', background: '#fff' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem' }}>Etykieta InPost</h4>
                        {order.tracking_number ? (
                            <div>
                                <div style={{ color: '#2E7D32', fontWeight: 'bold', marginBottom: '8px' }}>
                                    ✓ Etykieta wygenerowana
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>
                                    Nr śledzenia: <strong>{order.tracking_number}</strong>
                                </div>
                                <a
                                    href={`https://inpost.pl/sledzenie-przesylek?number=${order.tracking_number}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'inline-block', marginTop: '8px', color: '#1565C0', textDecoration: 'none', fontSize: '0.9rem' }}
                                >
                                    Śledź przesyłkę →
                                </a>
                            </div>
                        ) : (
                            <div>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
                                    Wygeneruj etykietę, aby zamówić kuriera/paczkomat dla klienta.
                                </p>
                                <button
                                    onClick={generateLabel}
                                    disabled={loadingLabel}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#FFC107',
                                        color: '#333',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        opacity: loadingLabel ? 0.7 : 1
                                    }}
                                >
                                    {loadingLabel ? 'Generowanie...' : 'Generuj Etykietę InPost'}
                                </button>
                                {labelError && (
                                    <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '8px' }}>
                                        Błąd: {labelError}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '32px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '12px 24px',
                            background: '#F3F4F6',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            flex: 1
                        }}
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
}
