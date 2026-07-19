import { Head } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const reviews = [
    { name: 'Rina Melati', rating: 5, text: 'Pizzanya enak banget, keju melimpah dan pengiriman cepat. Pasti repeat order!', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop', date: '2 hari lalu' },
    { name: 'Andi Pratama', rating: 5, text: 'Adonan lembut, topping banyak, rasanya juara! Recommended 👍', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', date: '5 hari lalu' },
    { name: 'Sinta Agustina', rating: 5, text: 'Packaging rapi, pizza masih hangat pas sampai. Suka banget!', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop', date: '1 minggu lalu' },
    { name: 'Budi Santoso', rating: 4, text: 'Meat Lovers-nya juara! Banyak topping dagingnya, harga juga reasonable.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop', date: '1 minggu lalu' },
    { name: 'Dewi Kartika', rating: 5, text: 'Anak-anak suka banget! Cheese Lovers jadi favorit keluarga. 🍕', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', date: '2 minggu lalu' },
    { name: 'Fajar Nugroho', rating: 5, text: 'Pertama kali coba Hawaiian Pizza, ternyata enak! Nanasnya segar.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', date: '2 minggu lalu' },
];

export default function PublicReviews() {
    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="Reviews - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Testimoni</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            Review <span style={{ color: '#f7a928' }}>Pelanggan</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                        {reviews.map((review, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <img src={review.img} alt={review.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111', margin: 0 }}>{review.name}</h4>
                                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{review.date}</span>
                                    </div>
                                </div>
                                <div style={{ color: '#f7a928', fontSize: '0.9rem', marginBottom: '10px' }}>
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', margin: 0 }}>"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
