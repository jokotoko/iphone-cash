'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import PricingManager from '../../components/PricingManager';
import OrderDetailsModal from '../../components/OrderDetailsModal';
import styles from './Admin.module.css';

export default function AdminPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'pricing'
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Refresh orders locally
            setOrders(orders.map(o =>
                o.id === orderId ? { ...o, status: newStatus } : o
            ));

            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Nie udało się zaktualizować statusu.');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus);

    const StatusBadge = ({ status }) => {
        const getStatusClass = () => {
            switch (status) {
                case 'new': return styles.statusNew;
                case 'received': return styles.statusReceived;
                case 'verified': return styles.statusVerified;
                case 'paid': return styles.statusPaid;
                case 'cancelled': return styles.statusCancelled;
                default: return styles.statusNew;
            }
        };

        const getStatusLabel = () => {
            switch (status) {
                case 'new': return 'Nowe';
                case 'received': return 'Odebrano';
                case 'verified': return 'Zweryfikowano';
                case 'paid': return 'Wypłacono';
                case 'cancelled': return 'Anulowano';
                default: return status;
            }
        };

        return (
            <span className={`${styles.statusBadge} ${getStatusClass()}`}>
                {getStatusLabel()}
            </span>
        );
    };

    if (loading) return <div className={styles.container} style={{ textAlign: 'center' }}>Ładowanie...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Panel Administratora</h1>
                <div className={styles.actions}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#666' }}>← Strona główna</Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Wyloguj
                    </button>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Zamówienia ({orders.length})
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'pricing' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('pricing')}
                >
                    Cennik
                </button>
            </div>

            {activeTab === 'orders' ? (
                <>
                    <div className={styles.filters}>
                        {/* ... existing filters ... */}
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            Wszystkie
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'new' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('new')}
                        >
                            Nowe
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'received' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('received')}
                        >
                            Odebrane
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'verified' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('verified')}
                        >
                            Zweryfikowane
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'paid' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('paid')}
                        >
                            Wypłacone
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filterStatus === 'cancelled' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus('cancelled')}
                        >
                            Anulowane
                        </button>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Data</th>
                                    <th className={styles.th}>Klient</th>
                                    <th className={styles.th}>Urządzenie</th>
                                    <th className={styles.th}>Kwota</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className={styles.td}>
                                            {new Date(order.created_at).toLocaleDateString('pl-PL')}
                                            <div style={{ fontSize: '12px', color: '#999' }}>
                                                {new Date(order.created_at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className={styles.td}>
                                            <div style={{ fontWeight: '500' }}>{order.customer_info?.name}</div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{order.customer_info?.phone}</div>
                                        </td>
                                        <td className={styles.td}>
                                            <div>{order.model}</div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{order.capacity} • {order.details?.battery}% bat.</div>
                                        </td>
                                        <td className={styles.td} style={{ fontWeight: '600' }}>
                                            {order.price} zł
                                        </td>
                                        <td className={styles.td}>
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className={styles.td}>
                                            <button
                                                className={styles.detailsBtn}
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Szczegóły / Zmień status
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#666' }}>
                                            Brak zamówień w tym statusie.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <PricingManager />
            )}

            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={updateOrderStatus}
                />
            )}
        </div>
    );
}

