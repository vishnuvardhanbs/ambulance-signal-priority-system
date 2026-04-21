import React from 'react';
import { MapPin, User } from 'lucide-react';
import './pages.css';

const ambulancesData = [
    { id: 'A12', status: 'Active', driver: 'Rao', location: 'Uppal' },
    { id: 'A07', status: 'Active', driver: 'Mohan', location: 'JBS' },
    { id: 'A03', status: 'Active', driver: 'Michael', location: 'Stadium' },
    { id: 'A15', status: 'Standby', driver: 'Kumar', location: 'Raidurg' },
    { id: 'A21', status: 'Active', driver: 'Krishna', location: 'Madhapur' },
    { id: 'A08', status: 'Standby', driver: 'Ram', location: 'Secunderabad' },
];

const AmbulancesPage = () => {
    return (
        <div>
            <div className="page-header">
                <h2>Live Ambulances</h2>
                <p>Real-time tracking of all ambulance units</p>
            </div>

            <div className="cards-grid">
                {ambulancesData.map((amb) => (
                    <div className="item-card" key={amb.id}>
                        <div className="item-card-header">
                            <span className="item-card-id">{amb.id}</span>
                            <span className={`badge ${amb.status === 'Active' ? 'badge-green' : 'badge-blue'}`}>
                                {amb.status}
                            </span>
                        </div>
                        <div className="item-card-details">
                            <div className="item-detail">
                                <User size={14} />
                                <span>{amb.driver}</span>
                            </div>
                            <div className="item-detail">
                                <MapPin size={14} />
                                <span>{amb.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmbulancesPage;

