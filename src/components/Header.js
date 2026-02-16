'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
                        <path d="M17 2H7C4.2 2 2 4.2 2 7V17C2 19.8 4.2 22 7 22H17C19.8 22 22 19.8 22 17V7C22 4.2 19.8 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    iPhoneCash.io
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    {/* <div className={styles.navItem}>
                        <Link href="/kup" className={styles.navLink}>Kup</Link> 
                    </div> */}
                    <Link href="/#models" className={styles.navLink}>Sprzedaj</Link>
                    <Link href="/status" className={styles.navLink}>Status</Link>
                    <Link href="/blog" className={styles.navLink}>Blog</Link>
                    <Link href="/#how-it-works" className={styles.navLink}>Jak to działa</Link>
                    <Link href="/#reviews" className={styles.navLink}>Opinie</Link>
                    <Link href="/#faq" className={styles.navLink}>Pomoc</Link>
                </nav>



                {/* Right Actions */}
                <div className={styles.actions}>
                    <ThemeToggle />
                    <button className={styles.iconButton} aria-label="Wybierz kraj">
                        <span className={styles.flagIcon}>🇵🇱</span>
                    </button>
                    <button className={styles.iconButton} aria-label="Koszyk">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H20C21.1 21 22 20.1 22 19V10H4V19C4 20.1 4.9 21 6 21H9" />
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1H4L6.68 14.39C6.88 15.39 7.76 16.11 8.78 16.11H19.4C20.42 16.11 21.3 15.39 21.5 14.39L23 7H6" />
                        </svg>
                    </button>

                    <Link href="/wycena" className={styles.ctaButton}>
                        Sprzedaj
                    </Link>

                    {/* Mobile Toggle */}
                    <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
                        <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`}></span>
                        <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`}></span>
                        <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link href="/#models" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sprzedaj</Link>
                    <Link href="/status" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Status</Link>
                    <Link href="/blog" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Blog</Link>
                    <Link href="/#how-it-works" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Jak to działa</Link>
                    <Link href="/#reviews" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Opinie</Link>
                    <Link href="/#faq" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Pomoc</Link>
                    <div className={styles.mobileDivider}></div>
                    <Link href="/koszyk" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Koszyk</Link>
                    <Link href="/kraj" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Polska (PLN)</Link>
                </nav>
            </div>
        </header>
    );
}
