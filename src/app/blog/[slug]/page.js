import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../blog.module.css';
import { getPostBySlug, blogPosts } from '../../../lib/blogPosts';

// Generate static params for all posts at build time
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params; // Await params in newer Next.js versions
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Artykuł nie znaleziony',
        };
    }

    return {
        title: `${post.title} | Blog iPhoneCash.io`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.section}>
            <div className={styles.container}>
                <Link href="/blog" className={styles.backLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Wróć do listy
                </Link>

                <article className={styles.postArticle}>
                    <header className={styles.postHeader}>
                        <span className={styles.postDate}>{post.date}</span>
                        <h1 className={styles.postTitle}>{post.title}</h1>
                    </header>

                    {/* Placeholder image */}
                    <div className={styles.postImage} style={{ background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)', height: '400px', width: '100%' }}></div>

                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </main>
    );
}
