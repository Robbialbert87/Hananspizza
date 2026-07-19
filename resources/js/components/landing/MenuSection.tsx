import React, { useState } from 'react';

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

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'pizza', label: 'Pizza' },
        { key: 'minuman', label: 'Minuman' },
        { key: 'snack', label: 'Snack' },
        { key: 'dessert', label: 'Dessert' },
    ];

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
        <section id="menu" className="menu-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">What&apos;s Cooking</p>
                    <h2 className="section-title">Our Delicious <span>Menu</span></h2>
                    <div className="sline"></div>
                </div>

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

                <div className="menu-grid">
                    {filteredItems.map((item) => (
                        <div className="mcard" key={item.id}>
                            <div className="mimg">
                                {getImageSrc(item) ? (
                                    <img src={getImageSrc(item)!} alt={item.name} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-pizza-slice" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                    </div>
                                )}
                                {item.badge && (
                                    <div className={`mbdg ${item.badge}`}>
                                        <i className="fas fa-star"></i> {badgeLabels[item.badge] || item.badge}
                                    </div>
                                )}
                                <div className="mhrt" onClick={(e) => toggleLike(item.id, e)}>
                                    <i className={liked.includes(item.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
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
                                            <i className="fas fa-star"></i>
                                            <span> ({item.reviews})</span>
                                        </div>
                                    </div>
                                    <button className="madd" title="Pesan Sekarang">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <i className="fas fa-search" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}></i>
                        Tidak ada menu dalam kategori ini.
                    </div>
                )}

                <div className="view-all-container">
                    <a href="#menu" className="btn-red"><i className="fas fa-th-large"></i> View Full Menu</a>
                </div>
            </div>
        </section>
    );
}
