import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

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

export default function MenuSection({ menuItems }: { menuItems: MenuItem[] }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [liked, setLiked] = useState<number[]>([]);

    const allFilters = [
        { key: 'all', label: 'All' },
        { key: 'pizza', label: 'Pizza' },
        { key: 'minuman', label: 'Minuman' },
        { key: 'snack', label: 'Snack' },
        { key: 'dessert', label: 'Dessert' },
    ];

    const categoryCounts: Record<string, number> = {
        all: menuItems.length,
        pizza: menuItems.filter(i => i.category === 'pizza').length,
        minuman: menuItems.filter(i => i.category === 'minuman').length,
        snack: menuItems.filter(i => i.category === 'snack').length,
        dessert: menuItems.filter(i => i.category === 'dessert').length,
    };

    const filters = allFilters.filter(
        f => f.key === 'all' || categoryCounts[f.key] > 0
    );

    const filteredItems = activeFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeFilter);

    const displayedItems = filteredItems.slice(0, 4);

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
        <section id="menu" className="menu-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">What&apos;s Cooking</p>
                    <h2 className="section-title">Our Delicious <span>Menu</span></h2>
                    <div className="sline"></div>
                </div>

                {/* Category tabs */}
                <div className="menu-tabs">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            className={`tab-btn ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="menu-grid menu-grid-animate">
                    {displayedItems.map((item, i) => (
                        <Link key={item.id} href={`/menu/${item.id}`} className="mcard" style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="mimg">
                                {getImageSrc(item) ? (
                                    <img src={getImageSrc(item)!} alt={item.name} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: '#fef0dc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🍕</div>
                                )}
                                {item.badge && (
                                    <div className={`mbdg ${item.badge}`}>
                                        <span>★</span> {badgeLabels[item.badge] || item.badge}
                                    </div>
                                )}
                                <div className="mhrt" onClick={(e) => toggleLike(item.id, e)}>
                                    <span style={{ fontSize: '0.85rem' }}>{liked.includes(item.id) ? '❤️' : '🤍'}</span>
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
                                            <span>★</span>
                                            <span> ({item.reviews})</span>
                                        </div>
                                    </div>
                                    <button className="madd" title="Pesan Sekarang">+</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {displayedItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
                        Tidak ada menu dalam kategori ini.
                    </div>
                )}

                <div className="view-all-container">
                    <Link href="/menu" className="btn-red"><span>📋</span> View Full Menu</Link>
                </div>
            </div>
        </section>
    );
}
