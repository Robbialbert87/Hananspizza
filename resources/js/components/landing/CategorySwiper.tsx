import React from 'react';
import { Link } from '@inertiajs/react';

const categories = [
    { key: 'all', label: 'All', icon: '🍕', count: 0 },
    { key: 'pizza', label: 'Pizza', icon: '🍕', count: 0 },
    { key: 'minuman', label: 'Minuman', icon: '🥤', count: 0 },
    { key: 'snack', label: 'Snack', icon: '🍟', count: 0 },
    { key: 'dessert', label: 'Dessert', icon: '🍰', count: 0 },
];

interface Props {
    active: string;
    onChange: (key: string) => void;
    counts: Record<string, number>;
}

export default function CategorySwiper({ active, onChange, counts }: Props) {
    return (
        <div className="categories-swiper">
            {categories.map(cat => (
                <button
                    key={cat.key}
                    onClick={() => onChange(cat.key)}
                    className={`cat-card ${active === cat.key ? 'active' : ''}`}
                >
                    <div className="cat-icon">{cat.icon}</div>
                    <div className="cat-name">{cat.label}</div>
                    <div className="cat-count">{counts[cat.key] || 0} Menu</div>
                </button>
            ))}
        </div>
    );
}
