import styles from './Reviews.module.css';

const reviewsData = [
    {
        id: 1,
        name: 'Michał Kowalski',
        initial: 'M',
        date: '2 dni temu',
        text: 'Sprzedaż iPhone\'a 14 Pro przebiegła błyskawicznie. Kurier odebrał telefon następnego dnia, a pieniądze miałem na koncie po 24h od weryfikacji. Polecam!',
        rating: 5
    },
    {
        id: 2,
        name: 'Anna Nowak',
        initial: 'A',
        date: 'Tydzień temu',
        text: 'Bałam się wysyłać telefon kurierem, ale wszystko jest bardzo profesjonalnie zorganizowane. Dostałam lepszą cenę niż w komisie stacjonarnym.',
        rating: 5
    },
    {
        id: 3,
        name: 'Tomasz Wiśniewski',
        initial: 'T',
        date: '2 tygodnie temu',
        text: 'Przejrzysty formularz wyceny, żadnych ukrytych opłat. Telefon miał lekkie ryski, ale cena nie została drastycznie obniżona. Uczciwe podejście.',
        rating: 4
    }
];

export default function Reviews() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Co mówią o nas klienci?</h2>
                <div className={styles.grid}>
                    {reviewsData.map((review) => (
                        <div key={review.id} className={styles.card}>
                            <div className={styles.header}>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{ fill: i < review.rating ? 'currentColor' : 'transparent', stroke: i < review.rating ? 'none' : 'currentColor', opacity: i < review.rating ? 1 : 0.3 }}
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <span className={styles.date}>{review.date}</span>
                            </div>

                            <p className={styles.text}>"{review.text}"</p>

                            <div className={styles.author}>
                                <div className={styles.avatar}>{review.initial}</div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.name}>{review.name}</span>
                                    <span className={styles.verified}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                        Zweryfikowany zakup
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
