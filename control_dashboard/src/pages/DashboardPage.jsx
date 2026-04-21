import React from 'react';
import {
    Ambulance, Navigation, TrafficCone, TrendingDown, ShieldAlert,
    Activity, ArrowUpRight, ArrowDownRight, MapPin, Radio, Phone
} from 'lucide-react';
import './pages.css';

const DashboardPage = ({ emergencies, ambulances, onNavigate }) => {
    const unassignedCount = emergencies.filter(e => e.status === 'Unassigned').length;
    const activeTripsCount = emergencies.filter(e => e.status === 'In Progress' || e.status === 'Assigned').length;
    const criticalCount = emergencies.filter(e => e.priority === 'Critical').length;

    const stats = [
        {
            icon: Ambulance, label: 'Active Ambulances',
            value: ambulances.filter(a => a.status !== 'Standby').length.toString(),
            trend: '+5', trendDir: 'up', color: 'red',
            subs: [
                { dot: '#22C55E', text: `${ambulances.filter(a => a.status === 'Available').length} available` },
                { dot: '#F59E0B', text: `${ambulances.filter(a => a.status === 'Dispatched').length} dispatched` }
            ]
        },
        {
            icon: Radio, label: 'Emergency Requests',
            value: unassignedCount.toString(),
            trend: unassignedCount > 0 ? '+New' : 'Cleared',
            trendDir: unassignedCount > 0 ? 'up' : 'down',
            color: 'blue',
            subs: [
                { dot: '#EF4444', text: `${criticalCount} critical` },
                { dot: '#3B82F6', text: `${unassignedCount} awaiting` }
            ],
            onClick: () => onNavigate('emergencies')
        },
        {
            icon: ShieldAlert, label: 'Police Alerts Active', value: '8', trend: '+1', trendDir: 'up', color: 'amber',
            subs: [{ dot: '#22C55E', text: '5 confirmed' }]
        },
    ];

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Dashboard Overview</h2>
                    <p>Real-time system overview and key performance metrics</p>
                </div>
                <button className="receive-call-btn" onClick={() => onNavigate('emergencies')}>
                    <Phone size={16} />
                    Receive New Call
                </button>
            </div>

            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div
                        className="stat-card"
                        key={i}
                        onClick={s.onClick}
                        style={{ cursor: s.onClick ? 'pointer' : 'default' }}
                    >
                        <div className="stat-card-header">
                            <div className={`stat-icon ${s.color}`}>
                                <s.icon size={18} />
                            </div>
                            <span className={`stat-trend ${s.trendDir}`}>
                                {s.trendDir === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {s.trend}
                            </span>
                        </div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                        {s.subs && (
                            <div className="stat-sub">
                                {s.subs.map((sub, j) => (
                                    <div className="stat-sub-item" key={j}>
                                        <div className="dot" style={{ background: sub.dot }}></div>
                                        {sub.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="map-placeholder">
                <div className="map-header">
                    <h3>Live City Map</h3>
                    <div className="map-legend">
                        <div className="legend-item">
                            <div className="legend-dot" style={{ background: '#EF4444' }}></div>
                            Ambulance
                        </div>
                        <div className="legend-item">
                            <div className="legend-dot" style={{ background: '#3B82F6' }}></div>
                            Hospital
                        </div>
                        <div className="legend-item">
                            <div className="legend-dot" style={{ background: '#22C55E' }}></div>
                            Signal Clear
                        </div>
                        <div className="legend-item">
                            <div className="legend-dot" style={{ background: '#A855F7' }}></div>
                            Police
                        </div>
                    </div>
                </div>
                <div className="map-content">
                    <MapPin size={40} color="var(--text-muted)" />
                    <div className="map-route-card">
                        <div className="map-route-title">
                            <Activity size={14} />
                            Active Emergency Route
                        </div>
                        <p className="map-route-detail">Ambulance A12 → City General Hospital</p>
                        <p className="map-route-sub">ETA: 4 minutes • 3 signals cleared</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
