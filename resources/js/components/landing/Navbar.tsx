import React, { useEffect, useRef, useState } from 'react';

const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/menu', label: 'MENU' },
    { href: '/promo', label: 'PROMO' },
    { href: '/about', label: 'TENTANG KAMI' },
    { href: '/outlet', label: 'OUTLET' },
    { href: '/reviews', label: 'REVIEW' },
    { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
    const [activePath, setActivePath] = useState('/');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActivePath(window.location.pathname);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navBg = scrolled
        ? 'linear-gradient(135deg, rgba(247,169,40,0.85), rgba(229,154,31,0.85))'
        : '#111111';

    const navBorder = scrolled
        ? '1px solid rgba(247,169,40,0.3)'
        : '1px solid rgba(255,255,255,0.15)';

    const linkColor = (isActive: boolean) => {
        if (isActive) return scrolled ? '#fff' : '#f7a928';
        return scrolled ? '#111' : '#ffffff';
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, padding: '12px 16px 0' }}>
            <nav
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    borderRadius: menuOpen ? '24px' : '50px',
                    border: navBorder,
                    background: navBg,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: scrolled ? '0 8px 32px rgba(247,169,40,0.35)' : 'none',
                    padding: '12px 20px',
                    transition: 'all 0.4s ease, border-radius 0.3s ease',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 140px' }}>
                        <a href="/" style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold', textDecoration: 'none', gap: 8, whiteSpace: 'nowrap' }}>
                            <img src="https://img.icons8.com/color/48/000000/pizza.png" alt="" style={{ height: 32 }} />
                            Hanan's Pizza
                        </a>
                    </div>

                    <ul className="nav-links-list" style={{
                        display: 'flex',
                        gap: 24,
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        {navItems.map(item => (
                            <li key={item.href}>
                                <a href={item.href} style={{
                                    color: linkColor(activePath === item.href),
                                    textDecoration: 'none',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    position: 'relative',
                                    paddingBottom: 4,
                                    transition: 'color 0.3s',
                                }}>
                                    {item.label}
                                    <span style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: activePath === item.href ? '100%' : '0%',
                                        height: 2,
                                        backgroundColor: scrolled ? '#fff' : '#f7a928',
                                        transition: 'width 0.3s ease',
                                        borderRadius: 1,
                                    }} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 140px', justifyContent: 'flex-end' }}>
                        <a href="/menu" className="pesan-btn" style={{
                            background: scrolled ? '#111' : '#f7a928',
                            color: scrolled ? '#fff' : '#111',
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        </a>

                        <button
                            className="hamburger-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 38,
                                height: 38,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.3s',
                            }}
                            aria-label="Toggle menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#111' : '#fff'} strokeWidth="2.5" strokeLinecap="round">
                                {menuOpen ? (
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className="mobile-collapse"
                    style={{
                        maxHeight: menuOpen ? '500px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        paddingTop: 16,
                        marginTop: 16,
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        {navItems.map(item => {
                            const isActive = activePath === item.href;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    style={{
                                        color: isActive ? (scrolled ? '#fff' : '#f7a928') : 'rgba(255,255,255,0.85)',
                                        textDecoration: 'none',
                                        fontSize: 14,
                                        fontWeight: isActive ? 700 : 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        padding: '12px 16px',
                                        borderRadius: 12,
                                        background: isActive ? 'rgba(247,169,40,0.12)' : 'transparent',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        {item.label}
                                        {isActive && (
                                            <span style={{
                                                position: 'absolute',
                                                bottom: -2,
                                                left: 0,
                                                width: '100%',
                                                height: 2,
                                                backgroundColor: scrolled ? '#fff' : '#f7a928',
                                                borderRadius: 1,
                                            }} />
                                        )}
                                    </div>
                                </a>
                            );
                        })}
                        <a
                            href="/menu"
                            onClick={closeMenu}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                background: 'linear-gradient(135deg, #f7a928, #e59a1f)',
                                color: '#111',
                                padding: '12px 24px',
                                borderRadius: 50,
                                fontWeight: 700,
                                fontSize: 13,
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                marginTop: 8,
                            }}
                        >
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
