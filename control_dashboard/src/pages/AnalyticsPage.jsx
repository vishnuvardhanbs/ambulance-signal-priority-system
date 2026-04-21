import React from 'react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Line, LineChart
} from 'recharts';
import { TrendingUp, Clock, Zap, Target, ArrowUpRight } from 'lucide-react';
import './pages.css';

const weeklyData = [
    { day: 'Mon', trips: 32, responseTime: 4.2, efficiency: 88 },
    { day: 'Tue', trips: 28, responseTime: 3.8, efficiency: 91 },
    { day: 'Wed', trips: 35, responseTime: 4.5, efficiency: 85 },
    { day: 'Thu', trips: 40, responseTime: 3.5, efficiency: 93 },
    { day: 'Fri', trips: 38, responseTime: 3.9, efficiency: 90 },
    { day: 'Sat', trips: 25, responseTime: 3.2, efficiency: 95 },
    { day: 'Sun', trips: 20, responseTime: 3.0, efficiency: 96 },
];

const hourlyData = [
    { hour: '6AM', incidents: 3 }, { hour: '7AM', incidents: 5 },
    { hour: '8AM', incidents: 8 }, { hour: '9AM', incidents: 12 },
    { hour: '10AM', incidents: 10 }, { hour: '11AM', incidents: 7 },
    { hour: '12PM', incidents: 9 }, { hour: '1PM', incidents: 11 },
    { hour: '2PM', incidents: 8 }, { hour: '3PM', incidents: 6 },
    { hour: '4PM', incidents: 10 }, { hour: '5PM', incidents: 14 },
    { hour: '6PM', incidents: 12 }, { hour: '7PM', incidents: 9 },
    { hour: '8PM', incidents: 7 }, { hour: '9PM', incidents: 5 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#131826',
                border: '1px solid #1e2740',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '12px',
            }}>
                <p style={{ color: '#94A3B8', marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, fontWeight: 600 }}>
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AnalyticsPage = () => {
    return (
        <div>
            <div className="page-header">
                <h2>Analytics</h2>
                <p>Performance metrics and system efficiency trends</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon green"><TrendingUp size={18} /></div>
                        <span className="stat-trend up"><ArrowUpRight size={12} />+12%</span>
                    </div>
                    <div className="stat-value">218</div>
                    <div className="stat-label">Total Trips This Week</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon blue"><Clock size={18} /></div>
                    </div>
                    <div className="stat-value">3.7m</div>
                    <div className="stat-label">Avg. Response Time</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon purple"><Zap size={18} /></div>
                    </div>
                    <div className="stat-value">91%</div>
                    <div className="stat-label">System Efficiency</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-icon amber"><Target size={18} /></div>
                    </div>
                    <div className="stat-value">97%</div>
                    <div className="stat-label">Signal Success Rate</div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Weekly Performance Overview</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="tripGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2740" />
                            <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                            <YAxis stroke="#64748B" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="trips"
                                stroke="#3B82F6"
                                fill="url(#tripGradient)"
                                strokeWidth={2}
                                name="Trips"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Hourly Incident Distribution</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2740" />
                            <XAxis dataKey="hour" stroke="#64748B" fontSize={11} />
                            <YAxis stroke="#64748B" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="incidents"
                                fill="#A855F7"
                                radius={[4, 4, 0, 0]}
                                name="Incidents"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Response Time & Efficiency Trend</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2740" />
                            <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                            <YAxis yAxisId="left" stroke="#64748B" fontSize={12} />
                            <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="responseTime"
                                stroke="#EF4444"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#EF4444' }}
                                name="Response Time (min)"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="efficiency"
                                stroke="#22C55E"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#22C55E' }}
                                name="Efficiency (%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Daily Trip Volume</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={weeklyData}>
                            <defs>
                                <linearGradient id="savedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2740" />
                            <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                            <YAxis stroke="#64748B" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="trips"
                                fill="url(#savedGradient)"
                                radius={[4, 4, 0, 0]}
                                name="Trips"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
