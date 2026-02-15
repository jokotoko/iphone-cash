'use client';

import styles from '../app/admin/Admin.module.css';
import { useState } from 'react';

export default function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
    if (!order) return null;

    const { customer_info, details } = order;
    const [updating, setUpdating] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        await onUpdateStatus(order.id, newStatus);
        setUpdating(false);
        onClose();
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
