import { Head } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

interface Outlet { id: number; name: string; address: string; phone: string; hours: string; map_link: string | null; }

export default function PublicOutlet({ outlets }: { outlets: Outlet[] }) {
    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="Outlet - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Lokasi Kami</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            Outlet <span style={{ color: '#f7a928' }}>Hanan's Pizza</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {outlets.map((outlet, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                <div style={{ height: '8px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)' }}></div>
                                <div style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem' }}>
                                            🏪
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{outlet.name}</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <span style={{ color: '#f7a928', flexShrink: 0 }}>📍</span>
                                            <span>{outlet.address}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <span style={{ color: '#f7a928' }}>📞</span>
                                            <span>{outlet.phone}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <span style={{ color: '#f7a928' }}>🕒</span>
                                            <span>{outlet.hours}</span>
                                        </div>
                                    </div>
                                    <a href={outlet.map_link || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', padding: '10px 20px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', color: '#000', fontWeight: '600', fontSize: '0.85rem', borderRadius: '10px', textDecoration: 'none' }}>
                                        🗺️ Lihat di Maps
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
