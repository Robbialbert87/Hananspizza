import React from 'react';

export default function PlatformSection() {
    return (
        <section className="platform-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">Pesan Sekarang</p>
                    <h2 className="section-title">PILIH PLATFORM FAVORITMU</h2>
                    <p>Kami tersedia di berbagai platform untuk kenyamananmu</p>
                </div>
                
                <div className="platform-grid">
                    <div className="platform-card gofood">
                        <div className="platform-icon">🍴</div>
                        <div className="platform-info">
                            <h3>GoFood</h3>
                            <p>Gratis ongkir & promo menarik</p>
                            <a href="#" className="btn-platform">PESAN DI GOFOOD</a>
                        </div>
                    </div>
                    
                    <div className="platform-card grabfood">
                        <div className="platform-icon">🛵</div>
                        <div className="platform-info">
                            <h3>GrabFood</h3>
                            <p>Promo GrabFood tersedia</p>
                            <a href="#" className="btn-platform">PESAN DI GRABFOOD</a>
                        </div>
                    </div>
                    
                    <div className="platform-card shopeefood">
                        <div className="platform-icon">🛍️</div>
                        <div className="platform-info">
                            <h3>ShopeeFood</h3>
                            <p>Voucher ShopeeFood tersedia</p>
                            <a href="#" className="btn-platform">PESAN DI SHOPEEFOOD</a>
                        </div>
                    </div>
                </div>
                
                <p className="platform-note">Kamu akan diarahkan ke aplikasi pilihanmu untuk menyelesaikan pemesanan</p>
            </div>
        </section>
    );
}
