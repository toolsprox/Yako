'use client';

import { useState } from 'react';
import { Users, TrendingUp, MapPin, Search, Target, Monitor, Share2, MousePointer2 } from 'lucide-react';

export default function AdminIntelligenceClient({ initialVisitors, initialSessions }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Derived metrics
  const totalVisitors = initialVisitors.length;
  const totalSessions = initialSessions.length;
  const avgDuration = totalSessions > 0 ? Math.round(initialSessions.reduce((acc, s) => acc + s.duration_seconds, 0) / totalSessions) : 0;
  
  // High Intent Visitors (Score > 30)
  const highIntentCount = initialVisitors.filter(v => v.lead_score > 30).length;

  // Traffic Source breakdown
  const sources = initialSessions.reduce((acc, s) => {
    const src = s.traffic_source || 'Direct';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  const filteredVisitors = initialVisitors.filter(v => 
    v.id.includes(searchTerm) || 
    (v.primary_interest && v.primary_interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statCardStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const getScoreColor = (score) => {
    if (score > 80) return '#ef4444'; // Red hot
    if (score > 30) return '#eab308'; // Warm
    return '#3b82f6'; // Cold
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="font-script" style={{ fontSize: '3rem' }}>Customer Intelligence</h1>
        <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
          Microsoft Clarity Integration Active
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'overview' ? '#fff' : '#A1A1AA', fontWeight: activeTab === 'overview' ? 600 : 400, paddingBottom: '1rem', borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1rem' }}>
          Overview
        </button>
        <button onClick={() => setActiveTab('visitors')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'visitors' ? '#fff' : '#A1A1AA', fontWeight: activeTab === 'visitors' ? 600 : 400, paddingBottom: '1rem', borderBottom: activeTab === 'visitors' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1rem' }}>
          Visitor CRM & Lead Scores
        </button>
        <button onClick={() => setActiveTab('marketing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'marketing' ? '#fff' : '#A1A1AA', fontWeight: activeTab === 'marketing' ? 600 : 400, paddingBottom: '1rem', borderBottom: activeTab === 'marketing' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1rem' }}>
          Marketing Attribution
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={statCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1AA' }}>
                <Users size={18} /> Unique Visitors
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600 }}>{totalVisitors}</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1AA' }}>
                <TrendingUp size={18} /> Total Sessions
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600 }}>{totalSessions}</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1AA' }}>
                <Monitor size={18} /> Avg. Session Time
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600 }}>{avgDuration}s</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1AA' }}>
                <Target size={18} /> High Intent Leads
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--primary)' }}>{highIntentCount}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass" style={{ padding: '30px' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><MousePointer2 size={20} /> Visual Heatmaps</h3>
              <p style={{ color: '#A1A1AA', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                We have integrated Microsoft Clarity into the platform. It is currently silently recording all visitor mouse movements, scroll depth, and clicks.
              </p>
              <a href="https://clarity.microsoft.com" target="_blank" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Open Clarity Dashboard
              </a>
            </div>
            <div className="glass" style={{ padding: '30px' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Share2 size={20} /> Top Traffic Sources</h3>
              {Object.entries(sources).sort((a,b) => b[1]-a[1]).map(([source, count], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>{source}</span>
                  <span style={{ fontWeight: 600 }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visitors CRM Tab */}
      {activeTab === 'visitors' && (
        <div className="glass" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>Visitor CRM Directory</h3>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: '#A1A1AA' }} />
              <input 
                type="text" 
                placeholder="Search by ID or Interest..." 
                className="glass-input" 
                style={{ paddingLeft: '35px', width: '300px' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#A1A1AA', fontSize: '0.9rem' }}>
                <th style={{ padding: '12px' }}>Visitor ID (Masked)</th>
                <th style={{ padding: '12px' }}>First Visit</th>
                <th style={{ padding: '12px' }}>Device / OS</th>
                <th style={{ padding: '12px' }}>Primary Interest</th>
                <th style={{ padding: '12px' }}>Lead Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace' }}>...{v.id.substring(24)}</td>
                  <td style={{ padding: '16px 12px' }}>{new Date(v.first_visit_date).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {v.device_type === 'Mobile' ? '📱' : '💻'} {v.os}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    {v.primary_interest ? (
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{v.primary_interest}</span>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: getScoreColor(v.lead_score) }}></div>
                      {v.lead_score}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVisitors.length === 0 && (
                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#A1A1AA' }}>No visitors tracked yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Marketing Tab */}
      {activeTab === 'marketing' && (
        <div className="glass" style={{ padding: '30px', textAlign: 'center', color: '#A1A1AA' }}>
          <MapPin size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>Marketing Attribution & Geotargeting</h3>
          <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
            As traffic begins flowing through campaigns with UTM parameters (e.g., ?utm_source=instagram), this dashboard will populate with Campaign ROI and exact distance distributions from Pinner.
          </p>
        </div>
      )}

    </div>
  );
}
