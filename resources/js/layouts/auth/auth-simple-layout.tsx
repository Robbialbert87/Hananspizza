import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="pizza-auth-layout">
            <style>{`
                .pizza-auth-layout {
                    min-height: 100vh;
                    display: flex;
                    background: #111111;
                    font-family: 'Poppins', sans-serif;
                    overflow: hidden;
                }

                .pizza-auth-left {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    min-height: 100vh;
                }

                .pizza-auth-left-bg {
                    position: absolute;
                    inset: 0;
                    background: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop') center/cover;
                    filter: brightness(0.3);
                }

                .pizza-auth-left-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 40px;
                    animation: fadeInLeft 0.8s ease;
                }

                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .pizza-auth-left-content h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.1;
                    margin-bottom: 16px;
                }

                .pizza-auth-left-content h1 span {
                    color: #f7a928;
                }

                .pizza-auth-left-content p {
                    color: rgba(255,255,255,0.7);
                    font-size: 1rem;
                    line-height: 1.8;
                    max-width: 400px;
                    margin: 0 auto 30px;
                }

                .pizza-auth-left-features {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 40px;
                }

                .pizza-auth-feature {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .pizza-auth-feature-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(247, 169, 40, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                    animation: float 3s ease-in-out infinite;
                }

                .pizza-auth-feature:nth-child(2) .pizza-auth-feature-icon {
                    animation-delay: 0.5s;
                }

                .pizza-auth-feature:nth-child(3) .pizza-auth-feature-icon {
                    animation-delay: 1s;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                .pizza-auth-feature span {
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .pizza-auth-right {
                    width: 480px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #1a1a1a;
                    padding: 40px;
                    position: relative;
                    animation: fadeInRight 0.8s ease;
                }

                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .pizza-auth-form-container {
                    width: 100%;
                    max-width: 360px;
                }

                .pizza-auth-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 32px;
                }

                .pizza-auth-logo-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f7a928, #e59a1f);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 24px rgba(247, 169, 40, 0.35);
                }

                .pizza-auth-logo-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: #fff;
                }

                .pizza-auth-logo-text span {
                    color: #f7a928;
                }

                .pizza-auth-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #fff;
                    text-align: center;
                    margin-bottom: 8px;
                }

                .pizza-auth-desc {
                    color: rgba(255,255,255,0.5);
                    text-align: center;
                    font-size: 0.88rem;
                    margin-bottom: 32px;
                }

                .pizza-auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .pizza-auth-form .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .pizza-auth-form label {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .pizza-auth-form input[type="email"],
                .pizza-auth-form input[type="password"],
                .pizza-auth-form input[type="text"] {
                    width: 100%;
                    padding: 14px 18px;
                    background: rgba(255,255,255,0.06);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.95rem;
                    font-family: 'Poppins', sans-serif;
                    outline: none;
                    transition: all 0.3s;
                }

                .pizza-auth-form input:focus {
                    border-color: #f7a928;
                    box-shadow: 0 0 0 3px rgba(247, 169, 40, 0.15);
                }

                .pizza-auth-form input::placeholder {
                    color: rgba(255,255,255,0.3);
                }

                .pizza-auth-submit {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #f7a928, #e59a1f);
                    border: none;
                    border-radius: 12px;
                    color: #111;
                    font-size: 1rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 8px 24px rgba(247, 169, 40, 0.35);
                }

                .pizza-auth-submit:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(247, 169, 40, 0.45);
                }

                .pizza-auth-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .pizza-auth-links {
                    text-align: center;
                    margin-top: 24px;
                }

                .pizza-auth-links a {
                    color: #f7a928;
                    font-size: 0.88rem;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .pizza-auth-links a:hover {
                    color: #e59a1f;
                    text-decoration: underline;
                }

                .pizza-auth-divider {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 4px 0;
                }

                .pizza-auth-divider::before,
                .pizza-auth-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                .pizza-auth-divider span {
                    color: rgba(255,255,255,0.4);
                    font-size: 0.8rem;
                }

                .pizza-auth-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .pizza-auth-checkbox input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    accent-color: #f7a928;
                    cursor: pointer;
                }

                .pizza-auth-checkbox span {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.85rem;
                }

                .pizza-auth-footer {
                    position: absolute;
                    bottom: 24px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: rgba(255,255,255,0.3);
                    font-size: 0.75rem;
                }

                @media (max-width: 900px) {
                    .pizza-auth-left {
                        display: none;
                    }
                    .pizza-auth-right {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="pizza-auth-left">
                <div className="pizza-auth-left-bg" />
                <div className="pizza-auth-left-content">
                    <h1>
                        Hanan's <span>Pizza</span>
                    </h1>
                    <p>Pizza lezat dengan bahan terbaik, dibuat setiap hari untuk pengalaman terbaik.</p>
                    <div className="pizza-auth-left-features">
                        <div className="pizza-auth-feature">
                            <div className="pizza-auth-feature-icon">🍕</div>
                            <span>Fresh Pizza</span>
                        </div>
                        <div className="pizza-auth-feature">
                            <div className="pizza-auth-feature-icon">⚡</div>
                            <span>Fast Delivery</span>
                        </div>
                        <div className="pizza-auth-feature">
                            <div className="pizza-auth-feature-icon">⭐</div>
                            <span>Best Quality</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pizza-auth-right">
                <div className="pizza-auth-form-container">
                    <div className="pizza-auth-logo">
                        <div className="pizza-auth-logo-icon">
                            <AppLogoIcon className="size-7 fill-current text-white" />
                        </div>
                        <div className="pizza-auth-logo-text">
                            Hanan's <span>Pizza</span>
                        </div>
                    </div>

                    {children}

                    <div className="pizza-auth-footer">
                        &copy; 2024 Hanan's Pizza. All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
