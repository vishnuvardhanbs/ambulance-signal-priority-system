import React, { useState } from 'react';
import { Settings, Bell, Shield, User, Cpu, MapPin, Radio, FileText } from 'lucide-react';
import './pages.css';

const SettingsPage = () => {
    const [toggles, setToggles] = useState({
        autoDispatch: true,
        priorityRouting: true,
        policeCoord: true,
        realTimeTracking: true,
        emergencyAlerts: true,
        routeChanges: false,
        systemStatus: true,
        dailyReports: false,
        twoFactor: true,
    });

    const toggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div>
            <div className="page-header">
                <h2>Settings</h2>
                <p>Configure system preferences and operator settings</p>
            </div>

            <div className="settings-grid">
                {/* System Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon red">
                            <Cpu size={20} />
                        </div>
                        <div>
                            <div className="settings-card-title">System Settings</div>
                            <div className="settings-card-subtitle">Core system configuration</div>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Auto-dispatch</h4>
                            <p>Automatically assign ambulances</p>
                        </div>
                        <button className={`toggle ${toggles.autoDispatch ? 'off' : ''}`} onClick={() => toggle('autoDispatch')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Priority routing</h4>
                            <p>Enable traffic signal control</p>
                        </div>
                        <button className={`toggle ${toggles.priorityRouting ? 'on' : ''}`} onClick={() => toggle('priorityRouting')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Police coordination</h4>
                            <p>Auto-alert police units</p>
                        </div>
                        <button className={`toggle ${toggles.policeCoord ? 'on' : ''}`} onClick={() => toggle('policeCoord')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Real-time tracking</h4>
                            <p>GPS location updates</p>
                        </div>
                        <button className={`toggle ${toggles.realTimeTracking ? 'on' : ''}`} onClick={() => toggle('realTimeTracking')} />
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon blue">
                            <Bell size={20} />
                        </div>
                        <div>
                            <div className="settings-card-title">Notification Settings</div>
                            <div className="settings-card-subtitle">Alert preferences</div>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Emergency alerts</h4>
                            <p>High priority notifications</p>
                        </div>
                        <button className={`toggle ${toggles.emergencyAlerts ? 'on' : ''}`} onClick={() => toggle('emergencyAlerts')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Route changes</h4>
                            <p>Traffic and route updates</p>
                        </div>
                        <button className={`toggle ${toggles.routeChanges ? 'on' : ''}`} onClick={() => toggle('routeChanges')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>System status</h4>
                            <p>System health notifications</p>
                        </div>
                        <button className={`toggle ${toggles.systemStatus ? 'off' : ''}`} onClick={() => toggle('systemStatus')} />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Daily reports</h4>
                            <p>End-of-day summaries</p>
                        </div>
                        <button className={`toggle ${toggles.dailyReports ? 'on' : ''}`} onClick={() => toggle('dailyReports')} />
                    </div>
                </div>

                {/* Security Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon green">
                            <Shield size={20} />
                        </div>
                        <div>
                            <div className="settings-card-title">Security Settings</div>
                            <div className="settings-card-subtitle">Access and authentication</div>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Two-factor authentication</h4>
                            <p>Extra security layer</p>
                        </div>
                        <button className={`toggle ${toggles.twoFactor ? 'off' : ''}`} onClick={() => toggle('twoFactor')} />
                    </div>
                </div>

                {/* Operator Profile */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon purple">
                            <User size={20} />
                        </div>
                        <div>
                            <div className="settings-card-title">Operator Profile</div>
                            <div className="settings-card-subtitle">Personal information</div>
                        </div>
                    </div>
                    <div className="profile-field">
                        <label>Name</label>
                        <span>Sarah Mitchell</span>
                    </div>
                    <div className="profile-field">
                        <label>Operator ID</label>
                        <span>#047</span>
                    </div>
                    <div className="profile-field">
                        <label>Role</label>
                        <span>Senior Dispatch Operator</span>
                    </div>
                    <div className="profile-field">
                        <label>Shift</label>
                        <span>Day Shift (6:00 AM – 6:00 PM)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
