'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function AdminPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Ładowanie...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '700' }}>Panel Administratora</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#666' }}>← Strona główna</Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px',
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Wyloguj
                    </button>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f5f5f7' }}>
                        <tr>
                            <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Data</th>
                            <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Klient</th>
                            <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Model</th>
                            <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Cena</th>
                            <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '16px' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontWeight: '600' }}>{order.customer_info?.name}</div>
                                    <div style={{ fontSize: '12px', color: '#888' }}>{order.customer_info?.email}</div>
                                    <div style={{ fontSize: '12px', color: '#888' }}>{order.customer_info?.phone}</div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div>{order.model} {order.capacity}</div>
                                    <div style={{ fontSize: '12px', color: '#888' }}>Bat: {order.details?.battery}%</div>
                                </td>
                                <td style={{ padding: '16px', fontWeight: '700', color: '#222C9B' }}>
                                    {order.price} zł
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '99px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: order.status === 'new' ? '#E3F2FD' : '#E8F5E9',
                                        color: order.status === 'new' ? '#1565C0' : '#2E7D32'
                                    }}>
                                        {order.status === 'new' ? 'Nowe' : order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
