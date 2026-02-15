'use client';

import { useRef, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from './ModelCarousel.module.css';

export default function ModelCarousel() {
    const scrollRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [models, setModels] = useState([]);
    const animationRef = useRef(null);

    // Fetch models on mount
    useEffect(() => {
        const fetchModels = async () => {
            const { data } = await supabase
                .from('models')
                .select('*')
                .order('sort_order', { ascending: true });
            if (data) setModels(data);
        };
        fetchModels();
    }, []);

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
        <section id="models" className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Wybierz swój model</h2>

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
                        {models.map((model) => (
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
