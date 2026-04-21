import React from 'react';
import { ShieldAlert, Users, Radio, ArrowUpRight } from 'lucide-react';
import './pages.css';

const PolicePage = () => {
    return (
        <div>
            <div className="page-header">
                <h2>Police Alerts</h2>
                <p>Police escort coordination and zone-based alerts</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon amber"><ShieldAlert size={18} /></div>
                    </div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Active Alerts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon green"><Users size={18} /></div>
                    </div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Units Deployed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon blue"><Radio size={18} /></div>
                    </div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Active Escorts</div>
                </div>
            </div>

            <div className="section-card">
                <div className="section-card-header">
                    <h3>Police Escort Coordination</h3>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Unit ID</th>
                            <th>Officer</th>
                            <th>Zone</th>
                            <th>Ambulance</th>
                            <th>Status</th>
                            <th>ETA</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                                No active police alerts at this time
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PolicePage;
