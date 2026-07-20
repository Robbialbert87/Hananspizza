import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price: number;
    old_price: number;
    image: string | null;
    badge: string | null;
    rating: number;
    reviews: number;
    is_active: boolean;
}

interface HeroBanner {
    id: number;
    image: string;
    title: string | null;
    subtitle: string | null;
    button_text: string | null;
    button_link: string | null;
    is_active: boolean;
    sort_order: number;
}

const defaultBg = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop';

const getBannerSrc = (banner: HeroBanner) => {
    if (!banner.image) return defaultBg;
    if (banner.image.startsWith('http')) return banner.image;
    return `/storage/${banner.image}`;
};

export default function HeroSection({ featuredItems = [], heroBanner }: { featuredItems?: MenuItem[]; heroBanner?: HeroBanner | null }) {
    const [search, setSearch] = useState('');

    const getImageSrc = (item: MenuItem) => {
        if (!item.image) return null;
        if (item.image.startsWith('http')) return item.image;
        return `/storage/${item.image}`;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            window.location.href = `/menu?search=${encodeURIComponent(search.trim())}`;
        }
    };

    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = swiperRef.current;
        if (!el || window.innerWidth >= 769) return;
        const interval = setInterval(() => {
            const card = el.querySelector('.featured-card') as HTMLElement | null;
            if (!card) return;
            const cardWidth = card.offsetWidth + 12;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const bannerImg = heroBanner ? getBannerSrc(heroBanner) : defaultBg;

    return (
        <>
            {/* Mobile Hero — full-section background covering banner + search */}
            <section className="hero-ombe md:hidden">
                <div className="hero-full-bg">
                    <img src={bannerImg} alt="" />
                </div>
                <div className="hero-full-overlay" />

                <div className="relative z-10">
                    <div className="hero-banner-header">
                        {heroBanner ? (
                            <>
                                {heroBanner.subtitle && (
                                    <p className="hero-banner-subtitle">{heroBanner.subtitle}</p>
                                )}
                                {heroBanner.title && (
                                    <h2 className="hero-banner-title">{heroBanner.title}</h2>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="hero-banner-subtitle">Fresh from our oven to you</p>
                                <h2 className="hero-banner-title">Hanan's Pizza</h2>
                            </>
                        )}
                    </div>

                    <div className="container">
                        <div className="hero-search">
                            <form onSubmit={handleSearch} className="search-wrap">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Cari menu favoritmu..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </form>
                        </div>

                        <div ref={swiperRef} className="featured-swiper">
                            {featuredItems.length === 0 ? (
                                <>
                                    <Link href="/menu" className="featured-card">
                                        <div className="fc-img">
                                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop" alt="Pizza" />
                                        </div>
                                        <div className="fc-body">
                                            <div className="fc-name">Classic Pizza</div>
                                            <div className="fc-price">Rp 45.000</div>
                                        </div>
                                    </Link>
                                    <Link href="/menu" className="featured-card">
                                        <div className="fc-img">
                                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop" alt="Pizza" />
                                        </div>
                                        <div className="fc-body">
                                            <div className="fc-name">Pepperoni Pizza</div>
                                            <div className="fc-price">Rp 55.000</div>
                                        </div>
                                    </Link>
                                    <Link href="/menu" className="featured-card">
                                        <div className="fc-img">
                                            <img src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=300&auto=format&fit=crop" alt="Pizza" />
                                        </div>
                                        <div className="fc-body">
                                            <div className="fc-name">Minuman Segar</div>
                                            <div className="fc-price">Rp 15.000</div>
                                        </div>
                                    </Link>
                                    <Link href="/menu" className="featured-card">
                                        <div className="fc-img">
                                            <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=300&auto=format&fit=crop" alt="Pizza" />
                                        </div>
                                        <div className="fc-body">
                                            <div className="fc-name">Dessert Manis</div>
                                            <div className="fc-price">Rp 25.000</div>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                featuredItems.slice(0, 8).map(item => (
                                    <Link key={item.id} href={`/menu/${item.id}`} className="featured-card">
                                        <div className="fc-img">
                                            {getImageSrc(item) ? (
                                                <img src={getImageSrc(item)!} alt={item.name} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🍕</div>
                                            )}
                                        </div>
                                        <div className="fc-body">
                                            <div className="fc-name">{item.name}</div>
                                            <div className="fc-price">
                                                {formatPrice(item.price)}
                                                {item.old_price > 0 && <del>{formatPrice(item.old_price)}</del>}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Desktop Hero — uses banner background */}
            <section className="hero hidden md:block" style={heroBanner ? {
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            } : {}}>
                {heroBanner && <div className="hero-desktop-overlay" />}
                <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-text">
                        {heroBanner ? (
                            <>
                                {heroBanner.subtitle && (
                                    <p className="hero-subtitle">{heroBanner.subtitle}</p>
                                )}
                                {heroBanner.title && (
                                    <h1 className="hero-title">{heroBanner.title}</h1>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="hero-subtitle">Fresh from our oven to you</p>
                                <h1 className="hero-title">FRESH PIZZA <span>EVERY DAY</span></h1>
                                <p className="hero-desc">Dibuat setiap hari dengan bahan pilihan terbaik dan dipanggang sempurna untuk rasa yang luar biasa.</p>
                                <div className="hero-buttons">
                                    <Link href="/menu" className="btn-primary">LIHAT MENU</Link>
                                    <Link href="/menu?category=pizza" className="btn-outline">PESAN SEKARANG</Link>
                                </div>
                                <div className="hero-features">
                                    <div className="feature-item">
                                        <div className="feature-icon">🌟</div>
                                        <div className="feature-text">
                                            <h4>BAHAN PREMIUM</h4>
                                            <p>Berkualitas & Segar</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon">🔥</div>
                                        <div className="feature-text">
                                            <h4>FRESH FROM OVEN</h4>
                                            <p>Dibuat setiap pesanan</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon">🚚</div>
                                        <div className="feature-text">
                                            <h4>FAST DELIVERY</h4>
                                            <p>Pengiriman cepat</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {!heroBanner && (
                        <div className="hero-image">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" alt="Delicious Pizza" />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
