import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const CONTRACT_ADDRESS = 'EVhXjmCHKVQ43ycTp1AL8uRWgmAbKsyHeT4ikD6ypump';
const PUMP_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
const DEXSCREENER_URL = `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`;
const X_URL = 'https://x.com/i/communities/2020192258524320242';
const TIKTOK_URL = 'https://www.tiktok.com/@bunnybunniebunnybunnie/video/7640198441376746774';

const GREEN = '#4ade80';
const GREEN_DARK = '#16a34a';
const GREEN_LIGHT = '#bbf7d0';
const GREEN_PALE = '#f0fdf4';
const GREEN_BORDER = 'rgba(74,222,128,0.35)';
const TEXT = '#14532d';
const TEXT_SOFT = '#4b7a5e';
const WHITE = '#ffffff';

// ── Floating bunny particles ──
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; shape: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.3 + 0.05,
        shape: Math.floor(Math.random() * 3),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 1,
    }} />
  );
}

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 68, padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(240,253,244,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${GREEN_BORDER}` : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo.jpeg" alt="BUNNIA" style={{
          width: 38, height: 38, borderRadius: '50%', objectFit: 'cover',
          border: `2px solid ${GREEN_BORDER}`,
        }} />
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800,
          color: GREEN_DARK, letterSpacing: '-0.5px',
        }}>bunnia</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: WHITE,
          background: GREEN, borderRadius: 20, padding: '2px 8px',
        }}>$BUNNIA</span>
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {[['Evidence', '#evidence'], ['Tokenomics', '#tokenomics'], ['Community', '#community']].map(([label, href]) => (
          <a key={label} href={href} style={{
            color: TEXT_SOFT, textDecoration: 'none',
            fontSize: 14, fontWeight: 600, transition: 'color 0.2s',
          }}>{label}</a>
        ))}
        <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '9px 22px',
          background: `linear-gradient(135deg, ${GREEN}, #22c55e)`,
          color: WHITE, borderRadius: 999, fontWeight: 700, fontSize: 14,
          textDecoration: 'none', boxShadow: `0 4px 16px rgba(74,222,128,0.35)`,
        }}>Buy $BUNNIA</a>
      </div>

      <button onClick={() => setMenuOpen(m => !m)} className="mobile-menu-btn" style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 22, height: 2.5, background: GREEN_DARK, marginBottom: i < 2 ? 5 : 0,
            borderRadius: 2, transition: 'all 0.3s',
            transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0,
          background: 'rgba(240,253,244,0.98)', backdropFilter: 'blur(20px)',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20,
          borderBottom: `1px solid ${GREEN_BORDER}`,
        }}>
          {[['Evidence', '#evidence'], ['Tokenomics', '#tokenomics'], ['Community', '#community']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ color: TEXT, textDecoration: 'none', fontSize: 18, fontWeight: 600 }}>
              {label}
            </a>
          ))}
          <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            style={{
              padding: '14px 24px', background: GREEN, color: WHITE,
              borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none', textAlign: 'center',
            }}>Buy $BUNNIA</a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──
function Hero() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 80px', position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Soft radial bg blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '8%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(134,239,172,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: '50%',
      }} />

      {/* Mascot */}
      <div style={{
        position: 'relative', marginBottom: 36,
        animation: 'float 5s ease-in-out infinite',
      }}>
        <div style={{
          width: 220, height: 220, borderRadius: '50%',
          background: `linear-gradient(135deg, ${GREEN_LIGHT}, #dcfce7)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 12px 48px rgba(74,222,128,0.3), 0 0 0 6px rgba(74,222,128,0.1)`,
        }}>
          <img src="/logo.jpeg" alt="BUNNIA" style={{
            width: 200, height: 200, borderRadius: '50%', objectFit: 'cover',
          }} />
        </div>
        <div style={{
          position: 'absolute', bottom: 8, right: -8,
          background: GREEN, color: WHITE, borderRadius: 20,
          fontSize: 12, fontWeight: 800, padding: '5px 12px',
          boxShadow: '0 4px 12px rgba(74,222,128,0.4)',
        }}>on solana ✨</div>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: GREEN_PALE, border: `1px solid ${GREEN_BORDER}`,
        borderRadius: 999, padding: '6px 16px', marginBottom: 20,
        fontSize: 13, color: GREEN_DARK, fontWeight: 600,
      }}>
        🐰 the chonkiest coin on solana
      </div>

      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(60px, 11vw, 120px)',
        fontWeight: 900, lineHeight: 0.95, marginBottom: 20,
        letterSpacing: '-4px', color: TEXT,
      }}>
        bunnia
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: TEXT_SOFT, maxWidth: 500, lineHeight: 1.7, marginBottom: 40,
        fontWeight: 500,
      }}>
        it has a mugshot. it trades at 3am. it blew up the kitchen.
        it's on solana. we don't know why. just buy it.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
        <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '16px 40px',
          background: `linear-gradient(135deg, ${GREEN}, #22c55e)`,
          color: WHITE, borderRadius: 999, fontWeight: 800, fontSize: 17,
          textDecoration: 'none',
          boxShadow: `0 8px 28px rgba(74,222,128,0.4)`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>Buy on Pump.fun 🚀</a>
        <a href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '16px 40px', background: WHITE, color: GREEN_DARK,
          border: `2px solid ${GREEN_BORDER}`, borderRadius: 999,
          fontWeight: 700, fontSize: 17, textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(74,222,128,0.15)',
          transition: 'all 0.2s',
        }}>Chart 📈</a>
      </div>

      <div onClick={copy} style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '12px 20px',
        background: WHITE, border: `2px solid ${GREEN_BORDER}`,
        borderRadius: 16, cursor: 'pointer', maxWidth: '90vw',
        boxShadow: '0 4px 16px rgba(74,222,128,0.1)',
        transition: 'all 0.2s',
      }}>
        <span style={{ fontSize: 11, color: TEXT_SOFT, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>CA</span>
        <span style={{ width: 1, height: 16, background: GREEN_BORDER, display: 'block' }} />
        <span style={{ fontSize: 'clamp(10px,1.3vw,13px)', fontFamily: 'monospace', color: TEXT_SOFT, wordBreak: 'break-all' }}>{CONTRACT_ADDRESS}</span>
        <span style={{
          fontSize: 12, color: copied ? GREEN_DARK : GREEN, fontWeight: 800, whiteSpace: 'nowrap',
          background: copied ? GREEN_LIGHT : GREEN_PALE, padding: '3px 10px', borderRadius: 999,
        }}>
          {copied ? 'copied!' : 'copy'}
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── Evidence ──
const EVIDENCE = [
  { src: '/mugshot.jpg', tag: 'Exhibit A', caption: 'Booking #578391206', sub: 'Charges: existing too hard on-chain' },
  { src: '/cam-basement.jpg', tag: 'CAM 04 — 03:45', caption: 'Spotted in the basement', sub: 'No explanation given' },
  { src: '/cam-trading.jpg', tag: 'CAM 03 — 03:17AM', caption: 'Monitoring the charts', sub: 'Has not slept. Will not sleep.' },
  { src: '/cam-kitchen.jpg', tag: 'Kitchen incident', caption: 'We don\'t know what happened', sub: 'Investigators are still confused' },
  { src: '/gta.jpg', tag: 'Recovered file', caption: '"ah shit, here we go again"', sub: "bunnia's world. on solana." },
  { src: '/cam-park.jpg', tag: 'CAM 07 — 03:17AM', caption: 'Outside at 3am. Again.', sub: 'Pepe coin spotted overhead' },
  { src: '/cam-office.jpg', tag: 'CAM 01 — Classified', caption: 'Working late at the office', sub: "nobody hired it. it just showed up." },
];

function Evidence() {
  return (
    <section id="evidence" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: GREEN_PALE, border: `1px solid ${GREEN_BORDER}`,
          borderRadius: 999, padding: '6px 16px', marginBottom: 20,
          fontSize: 13, color: GREEN_DARK, fontWeight: 600,
        }}>📁 classified footage</div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
          color: TEXT, lineHeight: 1.1, marginBottom: 12,
        }}>
          the <span style={{ color: GREEN_DARK }}>evidence</span> 🔍
        </h2>
        <p style={{ color: TEXT_SOFT, fontSize: 16, maxWidth: 400, margin: '0 auto' }}>
          cameras caught everything. bunnia was present at every scene.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {EVIDENCE.map((e, i) => (
          <div key={i} style={{
            background: WHITE,
            border: `2px solid ${GREEN_BORDER}`,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(74,222,128,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={ev => {
              (ev.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
              (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(74,222,128,0.2)';
            }}
            onMouseLeave={ev => {
              (ev.currentTarget as HTMLDivElement).style.transform = 'none';
              (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(74,222,128,0.08)';
            }}
          >
            <div style={{ position: 'relative' }}>
              <img src={e.src} alt={e.caption} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '1/1' }} />
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                border: `1px solid ${GREEN_BORDER}`, borderRadius: 999,
                padding: '4px 12px',
                fontSize: 11, color: GREEN_DARK, fontWeight: 700, letterSpacing: '0.5px',
              }}>{e.tag}</div>
            </div>
            <div style={{ padding: '16px 20px 20px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 4 }}>{e.caption}</div>
              <div style={{ fontSize: 13, color: TEXT_SOFT }}>{e.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Tokenomics ──
function Tokenomics() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { emoji: '⛓️', label: 'Network', value: 'Solana', sub: 'Fast. Cheap. Cute.' },
    { emoji: '🚀', label: 'Platform', value: 'Pump.fun', sub: 'Fair launch. No presale.' },
    { emoji: '🐰', label: 'Supply', value: '1,000,000,000', sub: '1 billion $BUNNIA' },
    { emoji: '0️⃣', label: 'Tax', value: '0 / 0', sub: 'No buy or sell tax.' },
  ];

  return (
    <section id="tokenomics" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: GREEN_PALE, border: `1px solid ${GREEN_BORDER}`,
          borderRadius: 999, padding: '6px 16px', marginBottom: 20,
          fontSize: 13, color: GREEN_DARK, fontWeight: 600,
        }}>📊 on-chain intel</div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: TEXT,
        }}>
          token<span style={{ color: GREEN_DARK }}>omics</span> ✨
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: WHITE, border: `2px solid ${GREEN_BORDER}`,
            borderRadius: 24, padding: '32px 24px', textAlign: 'center',
            boxShadow: '0 4px 16px rgba(74,222,128,0.08)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{s.emoji}</div>
            <div style={{ fontSize: 11, color: TEXT_SOFT, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 800, color: TEXT, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: TEXT_SOFT }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div onClick={copy} style={{
        padding: '24px 28px',
        background: WHITE, border: `2px solid ${GREEN_BORDER}`, borderRadius: 20,
        cursor: 'pointer', boxShadow: '0 4px 16px rgba(74,222,128,0.08)',
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        transition: 'box-shadow 0.2s',
      }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 11, color: TEXT_SOFT, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Contract Address</div>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(10px,1.2vw,13px)', color: TEXT_SOFT, wordBreak: 'break-all' }}>{CONTRACT_ADDRESS}</div>
        </div>
        <div style={{
          background: copied ? GREEN_LIGHT : GREEN_PALE, color: GREEN_DARK,
          border: `1px solid ${GREEN_BORDER}`, borderRadius: 999,
          padding: '8px 18px', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
          transition: 'all 0.2s',
        }}>{copied ? 'copied! 🎉' : 'copy'}</div>
      </div>
    </section>
  );
}

// ── Community ──
function Community() {
  const links = [
    { href: PUMP_URL, label: 'Buy on Pump.fun 🚀', primary: true },
    { href: DEXSCREENER_URL, label: 'Chart 📈', primary: false },
    { href: X_URL, label: 'X Community 🐦', primary: false },
    { href: TIKTOK_URL, label: 'TikTok 🎵', primary: false },
  ];

  return (
    <section id="community" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        background: `linear-gradient(135deg, ${GREEN_PALE}, #dcfce7)`,
        border: `2px solid ${GREEN_BORDER}`, borderRadius: 32,
        padding: 'clamp(40px, 6vw, 72px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 48, alignItems: 'center',
        boxShadow: '0 8px 40px rgba(74,222,128,0.12)',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: WHITE, border: `1px solid ${GREEN_BORDER}`,
            borderRadius: 999, padding: '6px 16px', marginBottom: 24,
            fontSize: 13, color: GREEN_DARK, fontWeight: 600,
          }}>🐰 join the operation</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: 16, color: TEXT,
          }}>
            the bunny is<br /><span style={{ color: GREEN_DARK }}>already watching.</span>
          </h2>
          <p style={{ fontSize: 16, color: TEXT_SOFT, lineHeight: 1.8, marginBottom: 32 }}>
            spotted on pump.fun. trading since 3am. cameras can't explain it.
            neither can we. just buy the token. 🌿
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                padding: '12px 24px',
                background: l.primary ? `linear-gradient(135deg, ${GREEN}, #22c55e)` : WHITE,
                color: l.primary ? WHITE : GREEN_DARK,
                border: l.primary ? 'none' : `2px solid ${GREEN_BORDER}`,
                borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none',
                boxShadow: l.primary ? '0 4px 16px rgba(74,222,128,0.35)' : '0 2px 8px rgba(74,222,128,0.1)',
                transition: 'all 0.2s',
              }}>{l.label}</a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            width: 'min(380px, 100%)',
          }}>
            <img src="/mugshot.jpg" alt="Bunnia mugshot" style={{
              width: '100%', borderRadius: 24,
              boxShadow: '0 16px 48px rgba(74,222,128,0.2)',
              border: `3px solid ${WHITE}`,
            }} />
            <div style={{
              position: 'absolute', bottom: -12, right: -12,
              background: WHITE, border: `2px solid ${GREEN_BORDER}`,
              borderRadius: 16, padding: '10px 16px',
              fontSize: 13, fontWeight: 700, color: TEXT,
              boxShadow: '0 8px 24px rgba(74,222,128,0.15)',
            }}>Booking #578391206 🐾</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      borderTop: `2px solid ${GREEN_BORDER}`,
      padding: '56px 24px',
      maxWidth: 1100, margin: '0 auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <img src="/logo.jpeg" alt="BUNNIA" style={{
          width: 56, height: 56, borderRadius: '50%', objectFit: 'cover',
          border: `3px solid ${GREEN_BORDER}`,
          boxShadow: '0 4px 16px rgba(74,222,128,0.2)',
        }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: TEXT }}>
          bunnia <span style={{ color: GREEN_DARK }}>($BUNNIA)</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            [PUMP_URL, 'Pump.fun'],
            [DEXSCREENER_URL, 'DexScreener'],
            [`https://solscan.io/token/${CONTRACT_ADDRESS}`, 'Solscan'],
            [X_URL, 'X Community'],
            [TIKTOK_URL, 'TikTok'],
          ].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: TEXT_SOFT, textDecoration: 'none', fontWeight: 500 }}>{label}</a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'rgba(74,222,128,0.5)', fontFamily: 'monospace' }}>
          $BUNNIA is a meme coin. not financial advice. 🐰
        </p>
      </div>
    </footer>
  );
}

// ── Global styles ──
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        background: #f0fdf4;
        color: ${TEXT};
        font-family: 'Inter', -apple-system, sans-serif;
        overflow-x: hidden;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-16px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }

      a:hover { opacity: 0.85; }

      @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .mobile-menu-btn { display: block !important; }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #f0fdf4; }
      ::-webkit-scrollbar-thumb { background: ${GREEN_BORDER}; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: ${GREEN}; }

      ::selection { background: rgba(74,222,128,0.3); color: ${TEXT}; }
    `}</style>
  );
}

// ── App ──
function App() {
  return (
    <>
      <GlobalStyles />
      <Particles />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Nav />
        <Hero />
        <Evidence />
        <Tokenomics />
        <Community />
        <Footer />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
