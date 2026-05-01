import React, { useState, useEffect } from 'react';
import './index.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {}

function App() {
  const [yesCount, setYesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const fetchResponses = async () => {
    if (!supabase) return;
    setLoading(true);
    const { count, error } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
      .eq('response', 'YES');
    
    if (!error) setYesCount(count || 0);
    setLoading(false);
  };

  useEffect(() => {
    if (!supabase) return;
    fetchResponses();
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

  const testEmail = async () => {
    setTesting(true);
    try {
      await fetch("https://formsubmit.co/ajax/gumaothalive@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "🧪 Dashboard Test Notification",
          message: "This is a test notification! If you see this, your invitation system is working perfectly. 🎉",
          _template: "table"
        })
      });
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    } catch (e) {
      alert("Failed to send test email.");
    }
    setTesting(false);
  };

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

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn-test" onClick={fetchResponses} style={{ background: '#334155' }}>
          Refresh 🔄
        </button>
        <button className="btn-test" onClick={testEmail} disabled={testing}>
          {testSuccess ? "✅ Sent!" : testing ? "..." : "Send Test ✉️"}
        </button>
      </div>

      <div className="footer-note">
        When she clicks <strong>YES</strong>, this counter will update instantly and you will receive an email.
      </div>
    </div>
  );
}

export default App;
