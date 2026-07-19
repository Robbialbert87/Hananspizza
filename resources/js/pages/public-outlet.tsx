import { Head } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const outlets = [
    { name: "Hanan's Pizza Sudirman", address: 'Jl. Jend. Sudirman No. 123, Jakarta Selatan', phone: '(021) 5551234', hours: '10:00 - 22:00', map: 'https://maps.google.com' },
    { name: "Hanan's Pizza Kelapa Gading", address: 'Jl. Boulevard Raya No. 45, Jakarta Utara', phone: '(021) 5555678', hours: '10:00 - 22:00', map: 'https://maps.google.com' },
    { name: "Hanan's Pizza Bandung", address: 'Jl. Buah Batu No. 78, Bandung', phone: '(022) 5551234', hours: '10:00 - 21:00', map: 'https://maps.google.com' },
    { name: "Hanan's Pizza Surabaya", address: 'Jl. Pemuda No. 56, Surabaya', phone: '(031) 5551234', hours: '10:00 - 21:00', map: 'https://maps.google.com' },
];

export default function PublicOutlet() {
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
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <i className="fas fa-store" style={{ fontSize: '1.1rem', color: '#fff' }}></i>
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{outlet.name}</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <i className="fas fa-map-marker-alt" style={{ color: '#f7a928', marginTop: '3px', width: '16px', textAlign: 'center' }}></i>
                                            <span>{outlet.address}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <i className="fas fa-phone" style={{ color: '#f7a928', width: '16px', textAlign: 'center' }}></i>
                                            <span>{outlet.phone}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                            <i className="fas fa-clock" style={{ color: '#f7a928', width: '16px', textAlign: 'center' }}></i>
                                            <span>{outlet.hours}</span>
                                        </div>
                                    </div>
                                    <a href={outlet.map} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', padding: '10px 20px', background: 'linear-gradient(135deg, #f7a928, #e59a1f)', color: '#000', fontWeight: '600', fontSize: '0.85rem', borderRadius: '10px', textDecoration: 'none' }}>
                                        <i className="fas fa-directions"></i> Lihat di Maps
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
