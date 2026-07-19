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
                        <i className="fas fa-arrow-left" style={{ fontSize: '0.8rem' }}></i>
                        Kembali ke Menu
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
                        {imgSrc && (
                            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
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
                                        <i key={i} className={`fas fa-star${i < Math.round(menuItem.rating) ? '' : ' fa-regular'}`} style={{ marginRight: 2 }}></i>
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

                            <div style={{ display: 'flex', gap: 12 }}>
                                <a href="#" style={{ background: 'linear-gradient(135deg, #f7a928, #e59a1f)', color: '#111', border: 'none', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'transform 0.3s', boxShadow: '0 8px 24px rgba(247,169,40,0.35)' }}
                                   onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                   onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <i className="fas fa-shopping-cart"></i> Pesan Sekarang
                                </a>
                                <button style={{ background: '#fff', border: '2px solid #eee', padding: '14px 24px', borderRadius: 50, fontWeight: 600, fontSize: '0.95rem', color: '#666', cursor: 'pointer', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#f7a928'; e.currentTarget.style.color = '#f7a928'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#666'; }}>
                                    <i className="far fa-heart"></i> Favorite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
