import React from 'react';
import { Link } from '@inertiajs/react';

const allCategories = [
    { key: 'all', label: 'All', icon: '🍕' },
    { key: 'pizza', label: 'Pizza', icon: '🍕' },
    { key: 'minuman', label: 'Minuman', icon: '🥤' },
    { key: 'snack', label: 'Snack', icon: '🍟' },
    { key: 'dessert', label: 'Dessert', icon: '🍰' },
];

interface Props {
    active: string;
    onChange: (key: string) => void;
    counts: Record<string, number>;
}

export default function CategorySwiper({ active, onChange, counts }: Props) {
    const categories = allCategories.filter(
        cat => cat.key === 'all' || (counts[cat.key] || 0) > 0
    );

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
