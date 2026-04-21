import React from 'react';
import {
    LayoutDashboard,
    Ambulance,
    AlertCircle,
    ShieldAlert,
    History,
    Settings,
    LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activePage, onPageChange, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
        { id: 'ambulances', icon: Ambulance, label: 'Live Ambulances' },
        { id: 'emergencies', icon: AlertCircle, label: 'Emergency Requests' },
        { id: 'police', icon: ShieldAlert, label: 'Police Alerts' },
        { id: 'history', icon: History, label: 'Trip History' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">A</div>
                <div className="logo-text">
                    <span className="logo-title">AMPTS</span>
                    <span className="logo-version">v2.4.1</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => onPageChange(item.id)}
                    >
                        <item.icon size={20} className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout" onClick={onLogout}>
                    <LogOut size={20} className="nav-icon" />
                    <span className="nav-label">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
