import React from 'react';

export default function ReviewSection() {
    const reviews = [
        { name: 'Rina Melati', rating: 5, text: 'Pizzanya enak banget, keju melimpah dan pengiriman cepat. Pasti repeat order!', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
        { name: 'Andi Pratama', rating: 5, text: 'Adonan lembut, topping banyak, rasanya juara! Recommended 👍', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
        { name: 'Sinta Agustina', rating: 5, text: 'Packaging rapi, pizza masih hangat pas sampai. Suka banget!', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop' }
    ];

    return (
        <section className="review-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">Apa Kata Mereka</p>
                    <h2 className="section-title">Review Pelanggan Kami</h2>
                </div>
                
                <div className="review-grid">
                    {reviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <img src={review.img} alt={review.name} className="reviewer-img" />
                            <div className="review-content">
                                <h4>{review.name}</h4>
                                <div className="stars">{'★'.repeat(review.rating)}</div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
