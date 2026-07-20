import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const faqs = [
    { q: 'Berapa lama pengiriman pizza?', a: 'Pengiriman pizza biasanya memakan waktu 30-45 menit tergantung jarak dan kondisi lalu lintas. Untuk area dalam kota, rata-rata 30 menit.' },
    { q: 'Apakah bisa pesan untuk acara atau pesta?', a: 'Tentu bisa! Kami menyediakan paket katering untuk acara dan pesta. Hubungi kami minimal 2 hari sebelum acara untuk pemesanan dalam jumlah besar.' },
    { q: 'Bahan apa saja yang digunakan?', a: 'Kami menggunakan bahan-bahan segar dan berkualitas tinggi. Tepung impor, keju mozzarella asli, sayuran segar harian, dan daging pilihan.' },
    { q: 'Apakah ada menu untuk vegetarian?', a: 'Ya, kami memiliki beberapa pilihan pizza vegetarian seperti Margherita, Cheese Lovers, dan Veggie Supreme yang menggunakan topping sayuran segar.' },
    { q: 'Bagaimana cara memesan?', a: 'Anda bisa memesan melalui website kami, WhatsApp, atau langsung datang ke outlet terdekat. Untuk pengiriman, tersedia di GoFood, GrabFood, dan ShopeeFood.' },
    { q: 'Apakah bisa custom topping?', a: 'Bisa! Anda bisa menambahkan atau mengurangi topping sesuai selera. Hubungi kami untuk pemesanan custom.' },
    { q: 'Metode pembayaran apa yang diterima?', a: 'Kami menerima pembayaran tunai, kartu kredit/debit, QRIS, GoPay, OVO, Dana, dan transfer bank.' },
    { q: 'Apakah ada program loyalitas?', a: 'Ya! Kami memiliki program Bojess Points di setiap pembelian. Kumpulkan poin dan tukarkan dengan diskon atau menu gratis.' },
];

export default function PublicFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="font-['Poppins',sans-serif] text-[#333] leading-relaxed" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Head title="FAQ - Hanan's Pizza" />
            <Navbar />

            <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ color: '#f7a928', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Pertanyaan Umum</p>
                        <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                            FAQ <span style={{ color: '#f7a928' }}>Hanan's Pizza</span>
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #f7a928, #e59a1f)', margin: '16px auto 0', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.3s' }}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    style={{
                                        width: '100%', padding: '20px 24px', border: 'none', background: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                                        textAlign: 'left', fontSize: '1rem', fontWeight: '600', color: '#111',
                                    }}
                                >
                                    <span>{faq.q}</span>
                                    <span style={{
                                        color: '#f7a928', transition: 'transform 0.3s', flexShrink: 0, fontSize: '0.8rem',
                                        display: 'inline-block',
                                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}>▼</span>
                                </button>
                                <div style={{
                                    maxHeight: openIndex === i ? '200px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease',
                                }}>
                                    <p style={{ padding: '0 24px 20px', fontSize: '0.95rem', color: '#666', lineHeight: '1.7', margin: 0 }}>
                                        {faq.a}
                                    </p>
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
