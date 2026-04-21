import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import './pages.css';

const historyData = [
    { id: 'TR-4501', ambulance: 'A12', origin: 'MG Road', destination: 'General Hospital', duration: '14 min', distance: '8.2 km', signals: 5, date: 'Today, 3:45 PM', status: 'Completed' },
    { id: 'TR-4500', ambulance: 'A07', origin: 'LB Nagar', destination: 'St. Johns Hospital', duration: '18 min', distance: '12.1 km', signals: 7, date: 'Today, 2:30 PM', status: 'Completed' },
    { id: 'TR-4499', ambulance: 'A03', origin: 'Nampally', destination: 'KIMS Hospital', duration: '11 min', distance: '6.5 km', signals: 3, date: 'Today, 1:15 PM', status: 'Completed' },
    { id: 'TR-4498', ambulance: 'A15', origin: 'KPHB', destination: 'Apollo Hospital', duration: '22 min', distance: '15.3 km', signals: 9, date: 'Today, 11:00 AM', status: 'Completed' },
    { id: 'TR-4497', ambulance: 'A21', origin: 'Assembly', destination: 'AIG Hospital', duration: '16 min', distance: '9.8 km', signals: 6, date: 'Yesterday, 8:30 PM', status: 'Completed' },
    { id: 'TR-4496', ambulance: 'A08', origin: 'Ameerpet', destination: 'Care Hospital', duration: '25 min', distance: '18.2 km', signals: 11, date: 'Yesterday, 6:15 PM', status: 'Completed' },
];

const HistoryPage = () => {
    return (
        <div>
            <div className="page-header">
                <h2>Trip History</h2>
                <p>Historical data and records of all ambulance missions</p>
            </div>

            <div className="search-filter-bar">
                <div className="search-wrapper">
                    <Search size={16} />
                    <input type="text" className="search-input" placeholder="Search by trip ID, ambulance, or destination..." />
                </div>
                <button className="filter-btn">
                    <Filter size={14} />
                    Filter
                </button>
                <button className="filter-btn">
                    <Calendar size={14} />
                    Date Range
                </button>
            </div>

            <div className="section-card">
                <div className="section-card-header">
                    <h3>Recent Trips</h3>
                    <span className="card-badge">{historyData.length} records</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Trip ID</th>
                            <th>Ambulance</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Duration</th>
                            <th>Distance</th>
                            <th>Signals</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((trip) => (
                            <tr key={trip.id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{trip.id}</td>
                                <td style={{ fontWeight: 600 }}>{trip.ambulance}</td>
                                <td>{trip.origin}</td>
                                <td>{trip.destination}</td>
                                <td>{trip.duration}</td>
                                <td>{trip.distance}</td>
                                <td>{trip.signals}</td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{trip.date}</td>
                                <td><span className="badge badge-green">{trip.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryPage;
