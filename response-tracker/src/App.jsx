import React, { useState } from 'react';
import './index.css';

function App() {
  const [testing, setTesting] = useState(false);
  const [success, setSuccess] = useState(false);

  const testEmail = async () => {
    setTesting(true);
    try {
      await fetch("https://formspree.io/f/xvgopvje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: "gumaothalive@gmail.com",
          subject: "🧪 Test Notification",
          message: "This is a test notification from your Response Dashboard! If you see this, it works. 🎉"
        })
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      alert("Failed to send test email.");
    }
    setTesting(false);
  };

  return (
    <div className="dashboard-card">
      <div className="status-badge">Mission Control</div>
      <h1>Project Ovayo</h1>
      <p>Your interactive invitation is ready to be sent.</p>

      <div style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        Live Invitation Link:
      </div>
      <div className="link-box">
        https://qick12.github.io/Ovayo/
      </div>

      <button 
        className="btn-test" 
        onClick={testEmail}
        disabled={testing}
      >
        {success ? "✅ Test Sent!" : testing ? "Sending..." : "Send Test Notification ✉️"}
      </button>

      <div className="footer-note">
        When she clicks <strong>YES</strong>, an instant email will be sent to:<br/>
        <span style={{ color: '#94a3b8' }}>gumaothalive@gmail.com</span>
      </div>
    </div>
  );
}

export default App;
