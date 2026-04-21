import React, { useState } from 'react';
import { AlertCircle, Clock, Phone, ArrowUpRight, MapPin, Ambulance, Navigation, CheckCircle, X } from 'lucide-react';
import './pages.css';

export const availableAmbulances = [
    { id: 'A12', status: 'Active', driver: 'Rao', location: 'Uppal' },
    { id: 'A07', status: 'Active', driver: 'Mohan', location: 'JBS' },
    { id: 'A03', status: 'Active', driver: 'Michael', location: 'Stadium' },
    { id: 'A15', status: 'Standby', driver: 'Kumar', location: 'Raidurg' },
    { id: 'A21', status: 'Active', driver: 'Krishna', location: 'Madhapur' },
    { id: 'A08', status: 'Standby', driver: 'Ram', location: 'Secunderabad' },
];

export const initialEmergencies = [
    { id: 'EM-1024', caller: 'Rahul ', location: 'ECIL', lat: 12.972, lng: 77.613, priority: 'Critical', status: 'Unassigned', unit: '-', time: '2 min ago' },
    { id: 'EM-1023', caller: 'Priya', location: 'Whitefields', lat: 12.955, lng: 77.600, priority: 'High', status: 'Unassigned', unit: '-', time: '5 min ago' },
    { id: 'EM-1022', caller: 'Amit', location: 'DLF', lat: 12.935, lng: 77.615, priority: 'Medium', status: 'Assigned', unit: 'A03', time: '8 min ago' },
    { id: 'EM-1021', caller: 'Sneha ', location: 'BHEL', lat: 12.912, lng: 77.638, priority: 'High', status: 'In Progress', unit: 'A15', time: '12 min ago' },
    { id: 'EM-1020', caller: 'Vikram ', location: 'Whitefield', lat: 12.970, lng: 77.750, priority: 'Critical', status: 'In Progress', unit: 'A21', time: '15 min ago' },
    { id: 'EM-1019', caller: 'Meera', location: 'Indiranagar', lat: 12.978, lng: 77.640, priority: 'Low', status: 'Completed', unit: 'A08', time: '20 min ago' },
];

const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const EmergenciesPage = ({ emergencies, setEmergencies, ambulances, setAmbulances }) => {
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [assignmentSuccess, setAssignmentSuccess] = useState(null);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [newCall, setNewCall] = useState({ caller: '', phone: '', location: '', condition: '' });

    const conditionToPriority = {
        'Cardiac Arrest': 'Critical',
        'Severe Accident': 'Critical',
        'Breathing Difficulty': 'Critical',
        'Fracture': 'High',
        'Burns': 'Medium',
        'Bleeding': 'High',
        'Fever': 'Low',
        'Minor Injury': 'Low',
        'General Checkup': 'Low'
    };

    const handleCallSubmit = (e) => {
        e.preventDefault();
        const priority = conditionToPriority[newCall.condition] || 'Medium';
        const id = `EM-${1025 + emergencies.length}`;

        const freshEmergency = {
            id,
            caller: newCall.caller,
            location: newCall.location,
            lat: 12.97 + (Math.random() * 0.1 - 0.05), // Mock tracking
            lng: 77.63 + (Math.random() * 0.1 - 0.05),
            priority,
            status: 'Unassigned',
            unit: '-',
            time: 'Just now'
        };

        setEmergencies([freshEmergency, ...emergencies]);
        setIsCallModalOpen(false);
        setNewCall({ caller: '', phone: '', location: '', condition: '' });
    };

    const getPriorityBadge = (p) => {
        switch (p) {
            case 'Critical': return 'badge-red';
            case 'High': return 'badge-amber';
            case 'Medium': return 'badge-blue';
            default: return 'badge-green';
        }
    };

    const getStatusBadge = (s) => {
        switch (s) {
            case 'Unassigned': return 'badge-red';
            case 'In Progress': return 'badge-blue';
            case 'Assigned': return 'badge-amber';
            case 'Completed': return 'badge-green';
            default: return 'badge-purple';
        }
    };

    const getNearestAmbulances = (emergency) => {
        const freeAmbs = ambulances.filter(a => a.status === 'Available');
        return freeAmbs
            .map(a => ({
                ...a,
                distance: calculateDistance(emergency.lat, emergency.lng, a.lat, a.lng),
                eta: Math.round(calculateDistance(emergency.lat, emergency.lng, a.lat, a.lng) / 0.5),
            }))
            .sort((a, b) => a.distance - b.distance);
    };

    const handleAssign = (emergencyId, ambulanceId) => {
        setEmergencies(prev => prev.map(em =>
            em.id === emergencyId ? { ...em, status: 'Assigned', unit: ambulanceId } : em
        ));
        setAmbulances(prev => prev.map(a =>
            a.id === ambulanceId ? { ...a, status: 'Dispatched' } : a
        ));
        setAssignmentSuccess({ emergencyId, ambulanceId });
        setTimeout(() => {
            setAssignmentSuccess(null);
            setSelectedEmergency(null);
        }, 2500);
    };

    const unassignedCount = emergencies.filter(e => e.status === 'Unassigned').length;
    const inProgressCount = emergencies.filter(e => e.status === 'In Progress' || e.status === 'Assigned').length;

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Emergency Requests</h2>
                    <p>Manage and track all incoming emergency calls</p>
                </div>
                <button className="receive-call-btn" onClick={() => setIsCallModalOpen(true)}>
                    <Phone size={16} />
                    Receive Call
                </button>
            </div>

            {isCallModalOpen && (
                <div className="call-modal-overlay">
                    <div className="call-modal">
                        <div className="call-modal-header">
                            <h3><Phone size={18} /> Emergency Call Intake</h3>
                            <button className="close-btn" onClick={() => setIsCallModalOpen(false)}><X size={18} /></button>
                        </div>
                        <form className="call-form" onSubmit={handleCallSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Caller Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={newCall.caller}
                                        onChange={e => setNewCall({ ...newCall, caller: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 XXXXX XXXXX"
                                        value={newCall.phone}
                                        onChange={e => setNewCall({ ...newCall, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location / Landmark</label>
                                <div className="input-with-icon">
                                    <MapPin size={16} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter exact location"
                                        value={newCall.location}
                                        onChange={e => setNewCall({ ...newCall, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Medical Condition</label>
                                <select
                                    required
                                    value={newCall.condition}
                                    onChange={e => setNewCall({ ...newCall, condition: e.target.value })}
                                >
                                    <option value="">Select Condition</option>
                                    {Object.keys(conditionToPriority).map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            {newCall.condition && (
                                <div className={`priority-preview ${conditionToPriority[newCall.condition].toLowerCase()}`}>
                                    Auto-categorized Priority: <strong>{conditionToPriority[newCall.condition]}</strong>
                                </div>
                            )}
                            <button type="submit" className="submit-call-btn">
                                Create Emergency Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon red"><Phone size={18} /></div>
                        <span className="stat-trend up"><ArrowUpRight size={12} />+3</span>
                    </div>
                    <div className="stat-value">{emergencies.length}</div>
                    <div className="stat-label">Total Requests Today</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon amber"><AlertCircle size={18} /></div>
                    </div>
                    <div className="stat-value">{unassignedCount}</div>
                    <div className="stat-label">Awaiting Assignment</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon blue"><Clock size={18} /></div>
                    </div>
                    <div className="stat-value">{inProgressCount}</div>
                    <div className="stat-label">Active Responses</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon green"><Ambulance size={18} /></div>
                    </div>
                    <div className="stat-value">{ambulances.filter(a => a.status === 'Available').length}</div>
                    <div className="stat-label">Ambulances Available</div>
                </div>
            </div>

            {/* Assignment Success Toast */}
            {assignmentSuccess && (
                <div className="assignment-toast">
                    <CheckCircle size={18} />
                    <span>
                        Ambulance <strong>{assignmentSuccess.ambulanceId}</strong> assigned to <strong>{assignmentSuccess.emergencyId}</strong> successfully
                    </span>
                </div>
            )}

            {/* Assign Ambulance Section */}
            <div className="section-card" style={{ marginBottom: 24 }}>
                <div className="section-card-header">
                    <h3>🚑 Assign Ambulance</h3>
                    <span className="card-badge" style={{ color: unassignedCount > 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                        {unassignedCount > 0 ? `${unassignedCount} awaiting` : 'All assigned'}
                    </span>
                </div>

                {unassignedCount === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                        <CheckCircle size={32} style={{ marginBottom: 8, color: 'var(--accent-green)' }} />
                        <p>All emergencies have been assigned an ambulance</p>
                    </div>
                ) : (
                    <div className="assign-grid">
                        {/* Unassigned emergency cards */}
                        <div className="assign-emergencies">
                            <p className="assign-section-label">Select an emergency to assign:</p>
                            {emergencies.filter(e => e.status === 'Unassigned').map(em => (
                                <div
                                    key={em.id}
                                    className={`assign-emergency-card ${selectedEmergency?.id === em.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedEmergency(em)}
                                >
                                    <div className="assign-card-top">
                                        <span className="assign-card-id">{em.id}</span>
                                        <span className={`badge ${getPriorityBadge(em.priority)}`}>{em.priority}</span>
                                    </div>
                                    <div className="assign-card-info">
                                        <span><strong>{em.caller}</strong></span>
                                        <span className="assign-card-loc">
                                            <MapPin size={12} /> {em.location}
                                        </span>
                                        <span className="assign-card-time">{em.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Nearest ambulances */}
                        <div className="assign-ambulances">
                            {selectedEmergency ? (
                                <>
                                    <div className="assign-section-label-row">
                                        <p className="assign-section-label">
                                            Nearest ambulances to <strong>{selectedEmergency.id}</strong>:
                                        </p>
                                        <button className="assign-close-btn" onClick={() => setSelectedEmergency(null)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="assign-amb-list">
                                        {getNearestAmbulances(selectedEmergency).map((amb, idx) => (
                                            <div key={amb.id} className={`assign-amb-card ${idx === 0 ? 'recommended' : ''}`}>
                                                <div className="assign-amb-left">
                                                    <div className="assign-amb-rank">
                                                        {idx === 0 && <span className="recommend-tag">Nearest</span>}
                                                    </div>
                                                    <div className="assign-amb-info">
                                                        <span className="assign-amb-id">{amb.id}</span>
                                                        <span className="assign-amb-driver">{amb.driver}</span>
                                                        <span className="assign-amb-loc">
                                                            <MapPin size={11} /> {amb.location}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="assign-amb-right">
                                                    <div className="assign-amb-metrics">
                                                        <span className="assign-amb-distance">
                                                            <Navigation size={12} /> {amb.distance.toFixed(1)} km
                                                        </span>
                                                        <span className="assign-amb-eta">
                                                            <Clock size={12} /> ~{amb.eta} min ETA
                                                        </span>
                                                    </div>
                                                    <button
                                                        className="assign-btn"
                                                        onClick={() => handleAssign(selectedEmergency.id, amb.id)}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="assign-placeholder">
                                    <Ambulance size={36} />
                                    <p>Select an emergency from the left to view nearest available ambulances</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Full request table */}
            <div className="section-card">
                <div className="section-card-header">
                    <h3>All Emergency Requests</h3>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Caller</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Unit</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emergencies.map((em) => (
                            <tr key={em.id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{em.id}</td>
                                <td>{em.caller}</td>
                                <td>{em.location}</td>
                                <td><span className={`badge ${getPriorityBadge(em.priority)}`}>{em.priority}</span></td>
                                <td><span className={`badge ${getStatusBadge(em.status)}`}>{em.status}</span></td>
                                <td style={{ fontWeight: 600 }}>{em.unit}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{em.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmergenciesPage;
