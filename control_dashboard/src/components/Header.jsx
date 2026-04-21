import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({ title, user, onLogout }) => {
    const [time, setTime] = React.useState(new Date());
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const dateStr = time.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const timeStr = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-title">{title}</h1>
                <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span className="status-text">12 Active Emergencies</span>
                </div>
            </div>

            <div className="header-right">
                <div className="header-datetime">
                    <span className="header-date">{dateStr}</span>
                    <span className="header-time">{timeStr}</span>
                </div>

                <div className="system-status">
                    <div className="dot"></div>
                    <span>System Online</span>
                </div>

                <button className="notif-btn">
                    <Bell size={18} />
                    <span className="notif-badge">3</span>
                </button>

                <div className="operator-info" ref={dropdownRef}>
                    <button
                        className="operator-btn"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <div className="operator-details">
                            <span className="operator-label">Operator</span>
                            <span className="operator-name">{user?.id || '#047'} {user?.name?.split(' ')[1] || 'Mitchell'}</span>
                        </div>
                        <div className="operator-avatar">
                            <User size={18} />
                        </div>
                        <ChevronDown size={14} className={`chevron ${showProfile ? 'open' : ''}`} />
                    </button>

                    {showProfile && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-header">
                                <div className="profile-dropdown-avatar">
                                    <User size={22} />
                                </div>
                                <div>
                                    <p className="profile-dropdown-name">{user?.name || 'Sarah Mitchell'}</p>
                                    <p className="profile-dropdown-role">{user?.role || 'Operator'}</p>
                                </div>
                            </div>
                            <div className="profile-dropdown-divider"></div>
                            <div className="profile-dropdown-item">
                                <User size={15} />
                                <span>Operator ID: {user?.id || '#047'}</span>
                            </div>
                            <div className="profile-dropdown-item">
                                <Settings size={15} />
                                <span>Account Settings</span>
                            </div>
                            <div className="profile-dropdown-divider"></div>
                            <button className="profile-dropdown-logout" onClick={onLogout}>
                                <LogOut size={15} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
