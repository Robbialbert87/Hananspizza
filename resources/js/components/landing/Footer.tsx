import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <a href="/" className="footer-logo">
                            <img src="https://img.icons8.com/color/48/000000/pizza.png" alt="Logo" />
                            Hanan's Pizza
                        </a>
                        <p className="footer-desc">Pizza lezat dengan bahan terbaik dan dibuat setiap hari untuk memberikan pengalaman terbaik.</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">📷</a>
                            <a href="#" className="social-icon">📘</a>
                            <a href="#" className="social-icon">🐦</a>
                            <a href="#" className="social-icon">🎵</a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="footer-heading">MENU</h4>
                        <ul className="footer-links">
                            <li><a href="/menu">Pizza</a></li>
                            <li><a href="/menu">Minuman</a></li>
                            <li><a href="/menu">Snack</a></li>
                            <li><a href="/menu">Dessert</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="footer-heading">INFORMASI</h4>
                        <ul className="footer-links">
                            <li><a href="/about">Tentang Kami</a></li>
                            <li><a href="/promo">Promo</a></li>
                            <li><a href="/outlet">Outlet</a></li>
                            <li><a href="#">Karir</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="footer-heading">BANTUAN</h4>
                        <ul className="footer-links">
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/faq">Cara Pemesanan</a></li>
                            <li><a href="#">Kebijakan Privasi</a></li>
                            <li><a href="#">Syarat & Ketentuan</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="footer-heading">OUTLET KAMI</h4>
                        <div className="contact-item">
                            <span>📍</span>
                            <span>Jl. Pizza No. 123, Jakarta Selatan</span>
                        </div>
                        <div className="contact-item">
                            <span>📞</span>
                            <span>0812-3456-7890</span>
                        </div>
                        <div className="contact-item">
                            <span>🕒</span>
                            <span>10.00 - 22.00 WIB</span>
                        </div>
                        <a href="#" className="map-btn">LIHAT DI MAPS</a>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    &copy; 2024 Hanan's Pizza. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
