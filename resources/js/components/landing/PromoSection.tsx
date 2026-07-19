import React from 'react';

interface Promo {
    id: number;
    title: string;
    description: string | null;
    discount: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
}

const promoImages: Record<string, string> = {
    'Buy 1 Get 1 Free': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop',
    'Happy Hour': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop',
    'Paket Keluarga': 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=400&auto=format&fit=crop',
    'Weekend Special': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400&auto=format&fit=crop',
    'Student Discount': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
};

const defaultImage = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop';

export default function PromoSection({ promos }: { promos: Promo[] }) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <section className="promo-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">Promo Spesial Untukmu</p>
                </div>

                {promos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <i className="fas fa-tag" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}></i>
                        Belum ada promo aktif saat ini.
                    </div>
                ) : (
                    <div className="promo-grid">
                        {promos.map((promo) => (
                            <div className="promo-card" key={promo.id}>
                                <div className="promo-content">
                                    <span className="promo-badge">{promo.discount}</span>
                                    <h3 className="promo-title"><span>{promo.title}</span></h3>
                                    <p className="promo-desc">{promo.description}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                                        {formatDate(promo.start_date)} - {formatDate(promo.end_date)}
                                    </p>
                                    <a href="#menu" className="btn-small">PESAN SEKARANG</a>
                                </div>
                                <img src={promoImages[promo.title] || defaultImage} alt={promo.title} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
