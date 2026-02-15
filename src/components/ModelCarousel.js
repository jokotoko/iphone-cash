
'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './ModelCarousel.module.css';

const MODELS = [
    { id: '16pm', name: 'iPhone 16 Pro Max' },
    { id: '16p', name: 'iPhone 16 Pro' },
    { id: '16', name: 'iPhone 16' },
    { id: '15pm', name: 'iPhone 15 Pro Max' },
    { id: '15p', name: 'iPhone 15 Pro' },
    { id: '15', name: 'iPhone 15' },
    { id: '14pm', name: 'iPhone 14 Pro Max' },
    { id: '14p', name: 'iPhone 14 Pro' },
    { id: '14', name: 'iPhone 14' },
    { id: '13', name: 'iPhone 13' },
];

export default function ModelCarousel() {
    const scrollRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const animationRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Smooth hover scroll
    useEffect(() => {
        const animate = () => {
            if (scrollRef.current) {
                const { current } = scrollRef;
                // Move 1px per frame - adjust speed here
                current.scrollLeft += 1.5;

                // Infinite loop check
                // Note: accurate infinite scroll often requires duplicating items, 
                // but for simple "reset" behavior:
                if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 1) {
                    current.scrollLeft = 0;
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        if (isHovering) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isHovering]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Przetestowany przez ekspertów. Gotowy dla Państwa.</h2>

                <div
                    className={styles.carouselWrapper}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onTouchStart={() => setIsHovering(true)}
                    onTouchEnd={() => setIsHovering(false)}
                >
                    <button
                        className={`${styles.navButton} ${styles.prev}`}
                        onClick={() => scroll('left')}
                        aria-label="Previous"
                    >
                        ←
                    </button>

                    <div className={styles.carousel} ref={scrollRef}>
                        {MODELS.map((model) => (
                            <div key={model.id} className={styles.card}>
                                <div className={styles.imagePlaceholder}>
                                    <span className={styles.placeholderText}>📱</span>
                                </div>
                                <h3 className={styles.modelName}>{model.name}</h3>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.next}`}
                        onClick={() => scroll('right')}
                        aria-label="Next"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
