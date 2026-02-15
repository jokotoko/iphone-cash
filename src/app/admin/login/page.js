'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Nieprawidłowe hasło');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#F8FAFC',
            fontFamily: 'var(--font-lato)'
        }}>
            <form onSubmit={handleLogin} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-poppins)'
                }}>Panel Administratora</h1>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Hasło"
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />

                {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

                <button type="submit" style={{
                    padding: '0.75rem',
                    backgroundColor: '#1E293B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>
                    Zaloguj
                </button>
            </form>
        </div>
    );
}
