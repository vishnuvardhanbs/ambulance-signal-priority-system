import React from 'react';
import { TrafficCone, MapPin, Activity } from 'lucide-react';
import './pages.css';

const signalsData = [
    { id: 'S1', intersection: 'MG Road & 5th Cross', status: 'Green Priority', efficiency: 96, lastCleared: '30s ago' },
    { id: 'S2', intersection: 'Brigade Rd & Church St', status: 'Normal', efficiency: 88, lastCleared: '2m ago' },
    { id: 'S3', intersection: 'Residency Rd & Museum Rd', status: 'Green Priority', efficiency: 94, lastCleared: '45s ago' },
    { id: 'S4', intersection: 'JC Rd & KR Market', status: 'Warning', efficiency: 72, lastCleared: '5m ago' },
    { id: 'S5', intersection: 'Lavelle Rd & Vittal Mallya', status: 'Green Priority', efficiency: 91, lastCleared: '1m ago' },
    { id: 'S6', intersection: 'Cunningham Rd & Palace', status: 'Normal', efficiency: 85, lastCleared: '3m ago' },
    { id: 'S7', intersection: 'Seshadri Rd & Majestic', status: 'Warning', efficiency: 65, lastCleared: '8m ago' },
    { id: 'S8', intersection: 'Hosur Rd & Silk Board', status: 'Green Priority', efficiency: 93, lastCleared: '20s ago' },
];

const SignalsPage = () => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Green Priority': return 'badge-green';
            case 'Warning': return 'badge-amber';
            default: return 'badge-blue';
        }
    };

    const getEfficiencyClass = (eff) => {
        if (eff >= 80) return 'high';
        if (eff >= 60) return 'medium';
        return 'low';
    };

    return (
        <div>
            <div className="page-header">
                <h2>Traffic Signals</h2>
                <p>Smart intersection status and clearing efficiency</p>
            </div>

            <div className="cards-grid">
                {signalsData.map((sig) => (
                    <div className="item-card" key={sig.id}>
                        <div className="item-card-header">
                            <span className="item-card-id">{sig.id}</span>
                            <span className={`badge ${getStatusBadge(sig.status)}`}>{sig.status}</span>
                        </div>
                        <div className="item-card-details">
                            <div className="item-detail">
                                <MapPin size={14} />
                                <span>{sig.intersection}</span>
                            </div>
                            <div className="item-detail">
                                <Activity size={14} />
                                <span>Last cleared: {sig.lastCleared}</span>
                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-label">
                                <span>Clearing Efficiency</span>
                                <span style={{ color: sig.efficiency >= 80 ? 'var(--accent-green)' : sig.efficiency >= 60 ? 'var(--accent-amber)' : 'var(--accent-red)' }}>
                                    {sig.efficiency}%
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className={`progress-fill ${getEfficiencyClass(sig.efficiency)}`}
                                    style={{ width: `${sig.efficiency}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SignalsPage;
