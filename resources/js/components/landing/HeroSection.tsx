import React from 'react';

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <p className="hero-subtitle">Fresh from our oven to you</p>
                    <h1 className="hero-title">FRESH PIZZA <span>EVERY DAY</span></h1>
                    <p className="hero-desc">Dibuat setiap hari dengan bahan pilihan terbaik dan dipanggang sempurna untuk rasa yang luar biasa.</p>
                    <div className="hero-buttons">
                        <a href="#" className="btn-primary">LIHAT MENU</a>
                        <a href="#" className="btn-outline">PESAN SEKARANG</a>
                    </div>
                    <div className="hero-features">
                        <div className="feature-item">
                            <div className="feature-icon">🌟</div>
                            <div className="feature-text">
                                <h4>BAHAN PREMIUM</h4>
                                <p>Berkualitas & Segar</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔥</div>
                            <div className="feature-text">
                                <h4>FRESH FROM OVEN</h4>
                                <p>Dibuat setiap pesanan</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🚚</div>
                            <div className="feature-text">
                                <h4>FAST DELIVERY</h4>
                                <p>Pengiriman cepat</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" alt="Delicious Pizza" />
                </div>
            </div>
        </section>
    );
}
