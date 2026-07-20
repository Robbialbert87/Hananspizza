import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
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

export default function PublicMenu({ menuItems }: { menuItems: MenuItem[] }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [liked, setLiked] = useState<number[]>([]);

    const allFilters = [
        { key: 'all', label: 'All' },
        { key: 'pizza', label: 'Pizza' },
        { key: 'minuman', label: 'Minuman' },
        { key: 'snack', label: 'Snack' },
        { key: 'dessert', label: 'Dessert' },
    ];

    const countByCategory: Record<string, number> = {
        all: menuItems.length,
        pizza: menuItems.filter(i => i.category === 'pizza').length,
        minuman: menuItems.filter(i => i.category === 'minuman').length,
        snack: menuItems.filter(i => i.category === 'snack').length,
        dessert: menuItems.filter(i => i.category === 'dessert').length,
    };

    const filters = allFilters.map(f => ({
        ...f,
        count: countByCategory[f.key] || 0,
    })).filter(f => f.key === 'all' || f.count > 0);

    const filteredItems = activeFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeFilter);

    const toggleLike = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setLiked(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
    };

    const getImageSrc = (item: MenuItem) => {
        if (!item.image) return null;
        if (item.image.startsWith('http')) return item.image;
        return `/storage/${item.image}`;
    };

    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="Menu - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Our Menu</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            Semua Menu <span style={{ color: '#f7a928' }}>Kami</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {filters.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    border: activeFilter === f.key ? 'none' : '1px solid #ddd',
                                    background: activeFilter === f.key ? 'linear-gradient(135deg, #f7a928, #e59a1f)' : '#fff',
                                    color: activeFilter === f.key ? '#000' : '#555',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                {f.label}
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: activeFilter === f.key ? 'rgba(0,0,0,0.15)' : '#eee',
                                }}>{f.count}</span>
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                        {filteredItems.map((item) => (
                            <a key={item.id} href={`/menu/${item.id}`} className="mcard" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="mimg">
                                    {getImageSrc(item) ? (
                                        <img src={getImageSrc(item)!} alt={item.name} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#ccc' }}>
                                            🍕
                                        </div>
                                    )}
                                    {item.badge && (
                                        <div className={`mbdg ${item.badge}`}>
                                            ★ {badgeLabels[item.badge] || item.badge}
                                        </div>
                                    )}
                                    <div className="mhrt" onClick={(e) => toggleLike(item.id, e)}>
                                        <span style={{ fontSize: '0.9rem' }}>{liked.includes(item.id) ? '❤️' : '🤍'}</span>
                                    </div>
                                </div>
                                <div className="mbody">
                                    <div className="mcat">{categoryLabels[item.category] || item.category}</div>
                                    <div className="mtit">{item.name}</div>
                                    <div className="mdesc">{item.description}</div>
                                    <div className="mfoot">
                                        <div>
                                            <div className="mprice">
                                                {formatPrice(item.price)}
                                                {item.old_price > 0 && <small>{formatPrice(item.old_price)}</small>}
                                            </div>
                                            <div className="mstars">
                                                ★
                                                <span> ({item.reviews})</span>
                                            </div>
                                        </div>
                                        <button className="madd" title="Pesan Sekarang" onClick={(e) => { e.preventDefault(); }}>+</button>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
                            Tidak ada menu dalam kategori ini.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
