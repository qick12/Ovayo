import React, { useState, useEffect } from 'react';
import './index.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [yesCount, setYesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    setLoading(true);
    const { count, error } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
      .eq('response', 'YES');
    
    if (!error) setYesCount(count || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchResponses();
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('public:responses')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, () => {
        fetchResponses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="dashboard-card">
      <div className="status-badge">Live Monitor</div>
      <h1>Project Ovayo</h1>
      <p>Tracking your interactive invitation status.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', flex: 1 }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>YES RESPONSES</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ec4899' }}>
            {loading ? "..." : yesCount}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        Live Invitation Link:
      </div>
      <div className="link-box">
        https://qick12.github.io/Ovayo/
      </div>

      <button className="btn-test" onClick={fetchResponses}>
        Refresh Status 🔄
      </button>

      <div className="footer-note">
        When she clicks <strong>YES</strong>, this counter will update instantly and you will receive an email.
      </div>
    </div>
  );
}

export default App;
