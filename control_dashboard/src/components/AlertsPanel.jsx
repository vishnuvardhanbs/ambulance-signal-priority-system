import React from 'react';
import {
    ShieldCheck,
    TrafficCone,
    CheckCircle,
    AlertTriangle,
    Ambulance,
    Info,
    MapPin,
    Radio
} from 'lucide-react';
import './AlertsPanel.css';

const AlertsPanel = () => {
    const alerts = [
        {
            id: 1,
            icon: ShieldCheck,
            message: 'Police escort confirmed',
            time: '8s ago',
            color: 'green'
        },
        {
            id: 2,
            icon: TrafficCone,
            message: 'Traffic signal priority granted',
            time: '8s ago',
            color: 'blue'
        },
        {
            id: 3,
            icon: ShieldCheck,
            message: 'Police escort confirmed',
            time: '16s ago',
            color: 'green'
        },
        {
            id: 4,
            icon: ShieldCheck,
            message: 'Police escort confirmed',
            time: '22s ago',
            color: 'green'
        },
        {
            id: 5,
            icon: Ambulance,
            message: 'Ambulance A12 approaching Signal S5',
            time: '30s ago',
            color: 'blue'
        },
        {
            id: 6,
            icon: Info,
            message: 'Police unit acknowledged at Intersection 23',
            time: '32s ago',
            color: 'blue'
        },
        {
            id: 7,
            icon: AlertTriangle,
            message: 'Route congestion detected on Main St',
            time: '1m ago',
            color: 'amber'
        },
        {
            id: 8,
            icon: Radio,
            message: 'Signal S8 cleared — green priority active',
            time: '1m ago',
            color: 'green'
        },
        {
            id: 9,
            icon: CheckCircle,
            message: 'Ambulance trip completed successfully',
            time: '2m ago',
            color: 'green'
        },
        {
            id: 10,
            icon: MapPin,
            message: 'New ambulance deployment initiated',
            time: '3m ago',
            color: 'blue'
        },
    ];

    return (
        <div className="alerts-panel">
            <div className="alerts-header">
                <h3>Live Alerts</h3>
                <span className="live-pill">LIVE</span>
            </div>
            <p className="alerts-subtitle">Real-time system notifications</p>

            <div className="alerts-list">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`alert-card ${alert.color}`}>
                        <div className="alert-icon-container">
                            <alert.icon size={16} />
                        </div>
                        <div className="alert-content">
                            <p className="alert-msg">{alert.message}</p>
                            <span className="alert-time">{alert.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="alerts-footer">
                <button className="view-all-btn">View All Notifications</button>
            </div>
        </div>
    );
};

export default AlertsPanel;
