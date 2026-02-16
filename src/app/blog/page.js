import Link from 'next/link';
import styles from './blog.module.css';
import { blogPosts } from '../../lib/blogPosts';

export const metadata = {
    title: 'Blog i Poradniki | iPhoneCash.io',
    description: 'Porady ekspertów: jak sprzedać iPhone, jak przygotować telefon do wysyłki, aktualności ze świata Apple.',
};

export default function BlogPage() {
    return (
        <main className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Blog i Poradniki</h1>
                    <p className={styles.subtitle}>
                        Wiedza w pigułce. Dowiedz się, jak dbać o sprzęt Apple i jak na nim zarobić.
                    </p>
                </div>

                <div className={styles.grid}>
                    {blogPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                            {/* Placeholder for image - using standard div in dev */}
                            <div className={styles.cardImage} style={{ background: `linear-gradient(45deg, #222C9B, #888)` }} />

                            <div className={styles.cardContent}>
                                <span className={styles.cardDate}>{post.date}</span>
                                <h2 className={styles.cardTitle}>{post.title}</h2>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <span className={styles.readMore}>
                                    Czytaj dalej
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
