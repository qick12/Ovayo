import { useState, useEffect, useRef } from 'react';
import './index.css';
import Confetti from 'react-confetti';

const sadMessages = [
  "NO 😅",
  "Pookie please... 😍",
  "Are you positive? 🤔",
  "I will be very sad... 😢",
  "Please??? 🥺",
  "You choose the movie",
  "Just say yes 😭"
];

// High-quality Animated Emojis (Google Noto CDN - 100% stable)
const stickers = [
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.gif", // Initial: Popcorn 🍿
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f605/512.gif", // 1: NO 😅
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif", // 2: Pookie please 😍
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif", // 3: Are you positive? 🤔
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/512.gif", // 4: I will be very sad... 😢
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f97a/512.gif", // 5: Please??? 🥺
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f43b/512.gif", // 6: You choose the movie (Bear 🐻)
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif"  // 7: Just say yes 😭
];

const successSticker = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f970/512.gif"; // Success 🥰

const introSequence = [
  "Hi Ovayo",
  "I built this site for you.",
  "Because asking normally felt too boring.",
  "So I made it official…"
];

function App() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [introStep, setIntroStep]         = useState(0);
  const [showMain, setShowMain]           = useState(false);
  const [noCount, setNoCount]             = useState(0);
  const [yesPressed, setYesPressed]       = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [noBtnPos, setNoBtnPos]           = useState({ left: 0, top: 0 });
  const [win, setWin]                     = useState({ w: window.innerWidth, h: window.innerHeight });
  const audioRef = useRef(null);
  const lastFire = useRef(0);

  useEffect(() => {
    audioRef.current = new Audio('/Meghan Trainor - Dear Future Husband (Official Video).mp3');
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    const onResize = () => setWin({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!hasInteracted || showMain) return;
    if (introStep < introSequence.length) {
      const t = setTimeout(() => setIntroStep(p => p + 1), 3000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowMain(true), 500);
    return () => clearTimeout(t);
  }, [introStep, showMain, hasInteracted]);

  const startApp = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 32;
      audioRef.current.play().catch(() => {});
    }
    setHasInteracted(true);
  };

  const bgIcons = ['💖', '✨', '🎬', '🍿', '❤️', '🎟️', '✨'];
  const BgLayer = () => (
    <div className="background-layer">
      {bgIcons.map((icon, i) => (
        <div key={i} className="bg-icon"
          style={{ left: `${10 + i * 11}%`, '--duration': `${10 + i}s`, '--delay': `${i * 0.8}s` }}>
          {icon}
        </div>
      ))}
    </div>
  );

  /* ── DESKTOP ONLY RESTRICTION ── */
  if (win.w < 768) return (
    <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <BgLayer />
      <div className="main-content">
        <h1 className="question-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Please open this on a PC or Laptop 🖥️
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', opacity: 0.8 }}>
          This special invitation requires a bigger screen to work properly!
        </p>
      </div>
    </div>
  );

  if (!hasInteracted) return (
    <div className="app-container" onClick={startApp} style={{ cursor: 'pointer' }}>
      <BgLayer />
      <h1 className="intro-text" style={{ animation: 'pulse 2s infinite', fontSize: '2.2rem', textAlign: 'center', padding: '0 1rem' }}>
        Tap Anywhere to Open 💌
      </h1>
    </div>
  );

  if (yesPressed) return (
    <div className="app-container">
      <Confetti width={win.w} height={win.h} recycle numberOfPieces={300} gravity={0.15} />
      <div className="main-content">
        <div className="success-container">
          <img src={successSticker} alt="Kisses" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '20px', marginBottom: '1rem', boxShadow: '0 4px 15px rgba(219,39,119,0.3)' }} />
          <h1 className="success-title">Yay! It's a date ❤️</h1>
          <p className="success-subtitle">Movie night loading… 🎬🍿</p>
          <div className="ticket-wrapper">
            <div className="ticket-glow" />
            <div className="ticket-card">
              <div className="ticket-header">
                <span>🎟️</span><span className="ticket-title">VIP Pass</span><span>🎟️</span>
              </div>
              <div className="ticket-divider" />
              <div className="ticket-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#be123c', backgroundColor: '#ffe4e6', padding: '0.5rem', borderRadius: '8px' }}>
                  📅 Next Week Saturday @ 6:00 PM
                </div>
                <p style={{ margin: 0 }}>You choose the movie.<br />I'll handle the snacks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!showMain) return (
    <div className="app-container" onClick={() => setShowMain(true)}>
      <BgLayer />
      <div className="intro-container">
        {introStep < introSequence.length && (
          <h2 key={introStep} className="intro-text">{introSequence[introStep]}</h2>
        )}
      </div>
    </div>
  );

  const yesBtnSize   = Math.min(1 + noCount * 0.12, 1.6);
  const currentNoMsg = sadMessages[Math.min(noCount, sadMessages.length - 1)];
  const yesText      = noCount > 5 ? "Okay fine, say YES ❤️" : "YES ❤️";

  const BTN_H  = 52;
  const MARGIN = 20;
  const SAFE_W = 300; // Use a safe maximum width for boundary calculations

  const moveNo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const now = Date.now();
    if (now - lastFire.current < 400) return; // Prevent double-fire or instant max-out
    lastFire.current = now;

    const maxLeft = win.w - SAFE_W - MARGIN;
    const maxTop  = win.h - BTN_H - MARGIN;

    let newLeft, newTop;
    // Keep trying until we get a spot away from center
    do {
      newLeft = MARGIN + Math.random() * maxLeft;
      newTop  = MARGIN + Math.random() * maxTop;
    } while (
      newLeft > win.w * 0.25 && newLeft < win.w * 0.75 &&
      newTop  > win.h * 0.35 && newTop  < win.h * 0.65
    );

    setNoBtnPos({ left: newLeft, top: newTop });
    setNoCount(p => p + 1);
  };

  const currentSticker = stickers[Math.min(noCount, stickers.length - 1)];

  return (
    <div className="app-container">
      <BgLayer />

      <div className="main-content">
        <img 
          src={currentSticker} 
          alt="Cute reaction" 
          style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem', boxShadow: '0 4px 15px rgba(219,39,119,0.2)' }} 
        />
        <h1 className="question-text">
          Will you go on a movie date with me? <span className="icon-pulse">🎬🍿</span>
        </h1>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '1rem 0 3rem' }}>
          <button
            className="btn-yes"
            onClick={() => setYesPressed(true)}
            style={{
              transform: `scale(${yesBtnSize})`,
              transformOrigin: 'center center',
            }}
          >
            {yesText}
          </button>

          {/* INITIAL NO BUTTON - Sits side-by-side until the first interaction */}
          {noCount === 0 && (
            <button
              className="btn-no"
              onClick={moveNo}
              onTouchStart={moveNo}
              onMouseEnter={moveNo}
              style={{ minWidth: '160px', maxWidth: 'none', width: 'max-content', padding: '0.8rem 2rem', textAlign: 'center', whiteSpace: 'nowrap' }}
            >
              {currentNoMsg}
            </button>
          )}
        </div>
      </div>

      {/* ESCAPED NO BUTTON - Lives in full-screen overlay */}
      {noCount > 0 && noBtnPos && (
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}>
          <button
            className="btn-no"
            onClick={moveNo}
            onTouchStart={moveNo}
            onMouseEnter={moveNo}
            style={{
              position: 'absolute',
              left: noBtnPos.left,
              top: noBtnPos.top,
              minWidth: '160px',
              maxWidth: 'none',
              width: 'max-content',
              padding: '0.8rem 2rem',
              transition: 'left 0.3s ease, top 0.3s ease',
              pointerEvents: 'all',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {currentNoMsg}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
