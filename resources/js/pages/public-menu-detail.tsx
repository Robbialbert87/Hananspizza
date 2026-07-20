import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

const categoryLabels: Record<string, string> = {
    pizza: 'Pizza',
    minuman: 'Minuman',
    snack: 'Snack',
    dessert: 'Dessert',
};

const badgeLabels: Record<string, string> = {
    hot: 'Hot',
    new: 'New',
    best: 'Best Seller',
};

const badgeColors: Record<string, string> = {
    hot: '#f6a623',
    new: '#2d6a4f',
    best: '#f7a928',
};

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
    gofood_link: string | null;
    grabfood_link: string | null;
    shopeefood_link: string | null;
    whatsapp_link: string | null;
}

export default function PublicMenuDetail({ menuItem }: { menuItem: MenuItem }) {
    const getImageSrc = (item: MenuItem) => {
        if (!item.image) return null;
        if (item.image.startsWith('http')) return item.image;
        return `/storage/${item.image}`;
    };

    const imgSrc = getImageSrc(menuItem);

    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title={`${menuItem.name} - Hanan's Pizza`} />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <Link
                        href="/menu"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            color: '#666',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            padding: '8px 20px',
                            borderRadius: 50,
                            background: '#fff',
                            border: '1px solid #eee',
                            transition: 'all 0.3s',
                            marginBottom: 32,
                            fontWeight: 500,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#f7a928'; e.currentTarget.style.color = '#f7a928'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#666'; }}
                    >
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>← Kembali ke Menu</span>
                    </Link>

                    <div className="menu-detail-grid">
                        {imgSrc && (
                            <div className="menu-detail-image" style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
                                <img src={imgSrc} alt={menuItem.name} style={{ width: '100%', height: 'auto', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
                            </div>
                        )}

                        <div>
                            {menuItem.badge && (
                                <span style={{ background: badgeColors[menuItem.badge] || '#f7a928', color: '#fff', padding: '4px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>
                                    {badgeLabels[menuItem.badge] || menuItem.badge}
                                </span>
                            )}

                            <p style={{ color: '#f7a928', fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                                {categoryLabels[menuItem.category] || menuItem.category}
                            </p>

                            <h1 style={{ color: '#111', fontSize: '2.2rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: 16, lineHeight: 1.2 }}>
                                {menuItem.name}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                <div style={{ color: '#f7a928', fontSize: '0.95rem' }}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} style={{ color: i < Math.round(menuItem.rating) ? '#f7a928' : '#ddd' }}>★</span>
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#888' }}>({menuItem.reviews} reviews)</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f7a928', fontFamily: "'Playfair Display', serif" }}>
                                    {formatPrice(menuItem.price)}
                                </span>
                                {menuItem.old_price > 0 && (
                                    <span style={{ fontSize: '1.1rem', color: '#aaa', textDecoration: 'line-through' }}>
                                        {formatPrice(menuItem.old_price)}
                                    </span>
                                )}
                            </div>

                            {menuItem.description && (
                                <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.8, marginBottom: 32 }}>
                                    {menuItem.description}
                                </p>
                            )}

                            <div style={{ marginTop: 32 }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Pesan Sekarang via</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {[
                                        { key: 'gofood', label: 'GoFood', icon: '🍔', color: '#00aa13', link: menuItem.gofood_link },
                                        { key: 'grabfood', label: 'GrabFood', icon: '🛵', color: '#00b14f', link: menuItem.grabfood_link },
                                        { key: 'shopeefood', label: 'ShopeeFood', icon: '🛍️', color: '#ee4d2d', link: menuItem.shopeefood_link },
                                        { key: 'whatsapp', label: 'WhatsApp', icon: '💬', color: '#25D366', link: menuItem.whatsapp_link },
                                    ].map(platform => (
                                        platform.link ? (
                                            <a key={platform.key} href={platform.link} target="_blank" rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                                                    borderRadius: 12, background: platform.color, color: '#fff',
                                                    textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem',
                                                    transition: 'transform 0.25s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                                <span style={{ fontSize: '1.2rem' }}>{platform.icon}</span>
                                                <div style={{ lineHeight: 1.3 }}>
                                                    <div>{platform.label}</div>
                                                    <div style={{ fontSize: '0.65rem', fontWeight: 400, opacity: 0.85 }}>Pesan di sini →</div>
                                                </div>
                                            </a>
                                        ) : (
                                            <div key={platform.key}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                                                    borderRadius: 12, background: '#f5f5f5', color: '#ccc',
                                                    fontWeight: 600, fontSize: '0.85rem', cursor: 'not-allowed',
                                                }}>
                                                <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{platform.icon}</span>
                                                <div style={{ lineHeight: 1.3 }}>
                                                    <div style={{ color: '#bbb' }}>{platform.label}</div>
                                                    <div style={{ fontSize: '0.65rem', fontWeight: 400, color: '#d0d0d0' }}>Belum terhubung ke {platform.label}</div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
