'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import OrderDetailsModal from '../../components/OrderDetailsModal';
import styles from './Admin.module.css';

export default function AdminPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching orders:', error);
        else setOrders(data);
        setLoading(false);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating status:', error);
            alert('Błąd podczas aktualizacji statusu.');
        } else {
            // Refresh local state
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
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
                <h1 className={styles.title}>Panel Administratora ({filteredOrders.length})</h1>
                <div className={styles.actions}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#666' }}>← Strona główna</Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Wyloguj
                    </button>
                </div>
            </div>

            <div className={styles.filters}>
                {['all', 'new', 'received', 'verified', 'paid', 'cancelled'].map(status => (
                    <button
                        key={status}
                        className={`${styles.filterBtn} ${filterStatus === status ? styles.filterBtnActive : ''}`}
                        onClick={() => setFilterStatus(status)}
                    >
                        {status === 'all' ? 'Wszystkie' :
                            status === 'new' ? 'Nowe' :
                                status === 'received' ? 'Odebrano' :
                                    status === 'verified' ? 'Zweryfikowano' :
                                        status === 'paid' ? 'Wypłacono' : 'Anulowano'}
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Data</th>
                            <th className={styles.th}>Klient</th>
                            <th className={styles.th}>Model</th>
                            <th className={styles.th}>Cena</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#888' }}>
                                    Brak zamówień w tej kategorii.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td className={styles.td}>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className={styles.td}>
                                        <div style={{ fontWeight: '600' }}>{order.customer_info?.name}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{order.customer_info?.email}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{order.customer_info?.phone}</div>
                                    </td>
                                    <td className={styles.td}>
                                        <div>{order.model} {order.capacity}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>Bat: {order.details?.battery}%</div>
                                    </td>
                                    <td className={styles.td} style={{ fontWeight: '700', color: '#222C9B' }}>
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

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
