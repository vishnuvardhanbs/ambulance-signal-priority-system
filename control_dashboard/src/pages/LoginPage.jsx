import React, { useState } from 'react';
import { Ambulance, Lock, User, Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            onLogin({
                name: 'Sarah Mitchell',
                id: '#047',
                role: 'Senior Dispatch Operator',
                email: email,
            });
        }, 800);
    };

    return (
        <div className="login-page">
            <div className="login-bg-effects"></div>
            <div className="login-card">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <Ambulance size={28} />
                    </div>
                    <h1 className="login-logo-title">AMPTS</h1>
                    <p className="login-logo-subtitle">Ambulance Management & Priority Traffic System</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-heading">Welcome back</h2>
                    <p className="login-subheading">Sign in to access the control center</p>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="login-field">
                        <label htmlFor="email">Email / Operator ID</label>
                        <div className="login-input-wrapper">
                            <User size={16} />
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter your email or operator ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <div className="login-input-wrapper">
                            <Lock size={16} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="login-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-submit" disabled={loading}>
                        {loading ? (
                            <span className="login-spinner"></span>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <p className="login-footer-text">
                        AMPTS Control Center v2.4.1
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
