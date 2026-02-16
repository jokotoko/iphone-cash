'use client';

import styles from './RecentPurchases.module.css';

const transactions = [
    {
        id: 1,
        model: 'iPhone 14 Pro Max',
        capacity: '256GB',
        condition: 'Idealny',
        price: '3 850 zł',
        location: 'Warszawa',
        time: '2 godz. temu',
        statusColor: 'perfect'
    },
    {
        id: 2,
        model: 'iPhone 13',
        capacity: '128GB',
        condition: 'Zbita szybka',
        price: '1 100 zł',
        location: 'Kraków',
        time: '4 godz. temu',
        statusColor: 'damaged'
    },
    {
        id: 3,
        model: 'iPhone 15 Pro',
        capacity: '128GB',
        condition: 'Dobry',
        price: '3 200 zł',
        location: 'Gdańsk',
        time: '5 godz. temu',
        statusColor: 'good'
    },
    {
        id: 4,
        model: 'iPhone 12',
        capacity: '64GB',
        condition: 'Idealny',
        price: '1 250 zł',
        location: 'Wrocław',
        time: 'Dzisiaj',
        statusColor: 'perfect'
    },
    {
        id: 5,
        model: 'iPhone 14',
        capacity: '128GB',
        condition: 'Dobry',
        price: '1 900 zł',
        location: 'Poznań',
        time: 'Wczoraj',
        statusColor: 'good'
    },
    {
        id: 6,
        model: 'iPhone 13 Pro',
        capacity: '256GB',
        condition: 'Idealny',
        price: '2 600 zł',
        location: 'Łódź',
        time: 'Wczoraj',
        statusColor: 'perfect'
    }
];

export default function RecentPurchases() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Ostatnio kupione urządzenia</h2>
            <p className={styles.subtitle}>
                Dołącz do tysięcy zadowolonych klientów, którzy sprzedali nam swój telefon bez wychodzenia z domu.
            </p>

            <div className={styles.grid}>
                {transactions.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.header}>
                            <div>
                                <h3 className={styles.model}>{item.model}</h3>
                                <span style={{ fontSize: '0.85rem', color: '#666' }}>{item.capacity}</span>
                            </div>
                            <span className={styles.time}>{item.time}</span>
                        </div>

                        <div className={styles.locationWrapper}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {item.location}
                        </div>

                        <div className={styles.details}>
                            <div className={styles.condition}>
                                <div className={`${styles.dot} ${styles[item.statusColor]}`}></div>
                                {item.condition}
                            </div>
                            <span className={styles.price}>{item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
