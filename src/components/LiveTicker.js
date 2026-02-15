import styles from './LiveTicker.module.css';

const payouts = [
    { name: 'Michał z Warszawy', amount: '3 200 zł', device: 'iPhone 15 Pro' },
    { name: 'Anna z Krakowa', amount: '2 850 zł', device: 'iPhone 14 Pro Max' },
    { name: 'Piotr z Gdańska', amount: '4 100 zł', device: 'iPhone 16' },
    { name: 'Kasia z Wrocławia', amount: '1 900 zł', device: 'iPhone 13' },
    { name: 'Tomasz z Poznania', amount: '3 050 zł', device: 'iPhone 15' },
    { name: 'Magda z Łodzi', amount: '2 400 zł', device: 'iPhone 14 Plus' },
    // Duplicate for seamless loop
    { name: 'Michał z Warszawy', amount: '3 200 zł', device: 'iPhone 15 Pro' },
    { name: 'Anna z Krakowa', amount: '2 850 zł', device: 'iPhone 14 Pro Max' },
    { name: 'Piotr z Gdańska', amount: '4 100 zł', device: 'iPhone 16' },
    { name: 'Kasia z Wrocławia', amount: '1 900 zł', device: 'iPhone 13' },
    { name: 'Tomasz z Poznania', amount: '3 050 zł', device: 'iPhone 15' },
    { name: 'Magda z Łodzi', amount: '2 400 zł', device: 'iPhone 14 Plus' },
];

export default function LiveTicker() {
    return (
        <div className={styles.tickerContainer}>
            <div className={styles.tickerTrack}>
                {payouts.map((payout, index) => (
                    <div key={index} className={styles.tickerItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>
                            <strong>{payout.name}</strong> otrzymał(a) <strong>{payout.amount}</strong> za {payout.device}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
