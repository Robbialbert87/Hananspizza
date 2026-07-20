import { Head } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function PublicAbout() {
    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="Tentang Kami - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Tentang Kami</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            Cerita <span style={{ color: '#f7a928' }}>Hanan's Pizza</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px' }}>
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.4rem' }}>
                                🍕
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', marginBottom: '12px' }}>Visi Kami</h3>
                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.7' }}>
                                Menjadi pilihan utama pizza terbaik di Indonesia dengan bahan-bahan berkualitas tinggi dan rasa yang autentik.
                            </p>
                        </div>
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.4rem' }}>
                                ❤️
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', marginBottom: '12px' }}>Misi Kami</h3>
                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.7' }}>
                                Menyajikan pizza dengan cinta, menggunakan bahan segar lokal, dan memberikan pengalaman kuliner yang tak terlupakan.
                            </p>
                        </div>
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.4rem' }}>
                                🏆
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', marginBottom: '12px' }}>Janji Kami</h3>
                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.7' }}>
                                Kualitas terbaik di setiap gigitan. Jika Anda tidak puas, kami akan buat ulang pesanan Anda tanpa biaya tambahan.
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
                        {[
                            { num: '2019', label: 'Berdiri', icon: '📅' },
                            { num: '50K+', label: 'Pelanggan', icon: '👥' },
                            { num: '15+', label: 'Varian Menu', icon: '🍕' },
                            { num: '4.8', label: 'Rating', icon: '⭐' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{stat.icon}</div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#111', fontFamily: "'Playfair Display', serif" }}>{stat.num}</div>
                                <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
