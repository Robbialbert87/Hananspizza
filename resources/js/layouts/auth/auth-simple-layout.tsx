import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="ombe-auth dark">
            <style>{`
                .ombe-auth {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f0f0f;
                    font-family: 'Poppins', sans-serif;
                    padding: 20px;
                }

                .ombe-auth-card {
                    width: 100%;
                    max-width: 400px;
                    background: #1a1a1a;
                    border-radius: 24px;
                    padding: 40px 28px;
                    animation: fadeUp 0.5s ease;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ombe-auth-logo {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .ombe-auth-logo-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f7a928, #e59a1f);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12px;
                    box-shadow: 0 8px 24px rgba(247, 169, 40, 0.35);
                }

                .ombe-auth-logo-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #fff;
                }

                .ombe-auth-logo-text span {
                    color: #f7a928;
                }

                .ombe-auth-header {
                    text-align: center;
                    margin-bottom: 28px;
                }

                .ombe-auth-header h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 6px;
                }

                .ombe-auth-header p {
                    color: rgba(255,255,255,0.45);
                    font-size: 0.85rem;
                }

                .ombe-auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .ombe-input-group {
                    position: relative;
                }

                .ombe-input-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.3);
                    font-size: 1.1rem;
                    pointer-events: none;
                    z-index: 1;
                }

                .ombe-input-group input {
                    width: 100%;
                    padding: 14px 18px 14px 46px;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    color: #fff;
                    font-size: 0.9rem;
                    font-family: 'Poppins', sans-serif;
                    outline: none;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                .ombe-input-group input:focus {
                    border-color: #f7a928;
                    background: rgba(247, 169, 40, 0.05);
                    box-shadow: 0 0 0 3px rgba(247, 169, 40, 0.1);
                }

                .ombe-input-group input::placeholder {
                    color: rgba(255,255,255,0.25);
                }

                .ombe-input-group .toggle-pw {
                    position: absolute;
                    right: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.3);
                    cursor: pointer;
                    padding: 4px;
                    font-size: 1rem;
                }

                .ombe-input-group .toggle-pw:hover {
                    color: rgba(255,255,255,0.6);
                }

                .ombe-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    margin: 4px 0;
                }

                .ombe-checkbox input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    accent-color: #f7a928;
                    cursor: pointer;
                }

                .ombe-checkbox span {
                    color: rgba(255,255,255,0.5);
                    font-size: 0.82rem;
                }

                .ombe-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #f7a928, #e59a1f);
                    border: none;
                    border-radius: 14px;
                    color: #111;
                    font-size: 0.95rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 8px 24px rgba(247, 169, 40, 0.3);
                    margin-top: 4px;
                }

                .ombe-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(247, 169, 40, 0.4);
                }

                .ombe-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .ombe-links {
                    text-align: center;
                    margin-top: 20px;
                }

                .ombe-links a {
                    color: rgba(255,255,255,0.4);
                    font-size: 0.82rem;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .ombe-links a:hover {
                    color: #f7a928;
                }

                .ombe-links .highlight {
                    color: #f7a928;
                    font-weight: 600;
                }

                .ombe-divider {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 8px 0;
                }

                .ombe-divider::before,
                .ombe-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                }

                .ombe-divider span {
                    color: rgba(255,255,255,0.25);
                    font-size: 0.75rem;
                }
            `}</style>

            <div className="ombe-auth-card">
                <div className="ombe-auth-logo">
                    <div className="ombe-auth-logo-icon">
                        <AppLogoIcon className="size-7 fill-current text-white" />
                    </div>
                    <div className="ombe-auth-logo-text">
                        Hanan's <span>Pizza</span>
                    </div>
                </div>

                {title && (
                    <div className="ombe-auth-header">
                        <h2>{title}</h2>
                        {description && <p>{description}</p>}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}
