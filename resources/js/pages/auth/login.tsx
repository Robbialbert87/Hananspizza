import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { useState } from 'react';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    const [showPw, setShowPw] = useState(false);

    return (
        <>
            <Head title="Sign In" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="ombe-auth-form"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="ombe-input-group">
                            <span className="ombe-input-icon">📧</span>
                            <input
                                type="email"
                                name="email"
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="Email address"
                            />
                        </div>
                        <InputError message={errors.email} />

                        <div className="ombe-input-group">
                            <span className="ombe-input-icon">🔒</span>
                            <input
                                type={showPw ? 'text' : 'password'}
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="toggle-pw"
                                onClick={() => setShowPw(p => !p)}
                                tabIndex={-1}
                            >
                                {showPw ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <InputError message={errors.password} />

                        <label className="ombe-checkbox">
                            <input type="checkbox" name="remember" />
                            <span>Remember me</span>
                        </label>

                        <button type="submit" disabled={processing} className="ombe-btn">
                            {processing && '⏳ '}
                            Sign In
                        </button>

                        {status && (
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4ade80', marginTop: '8px' }}>
                                {status}
                            </p>
                        )}
                    </>
                )}
            </Form>


        </>
    );
}

Login.layout = {
    title: 'Sign In',
    description: 'Welcome back! Sign in to continue',
};
