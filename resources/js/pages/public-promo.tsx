import { Head } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

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
    'Buy 1 Get 1 Free': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop',
    'Happy Hour': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop',
    'Paket Keluarga': 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=600&auto=format&fit=crop',
    'Weekend Special': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop',
    'Student Discount': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
};
const defaultImage = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop';

const formatDate = (date: string) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function PublicPromo({ promos }: { promos: Promo[] }) {
    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="Promo - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Promo Spesial</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            Promo <span style={{ color: '#f7a928' }}>Hari Ini</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    {promos.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
                            <i className="fas fa-tag" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}></i>
                            Belum ada promo aktif saat ini.
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                            {promos.map((promo) => (
                                <div key={promo.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                        <img src={promoImages[promo.title] || defaultImage} alt={promo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7))' }}></div>
                                        <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                                            <span style={{ background: '#f7a928', color: '#000', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>{promo.discount}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{promo.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>{promo.description}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#999' }}>
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>{formatDate(promo.start_date)} - {formatDate(promo.end_date)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
