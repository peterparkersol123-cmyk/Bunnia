import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const CONTRACT_ADDRESS = 'EVhXjmCHKVQ43ycTp1AL8uRWgmAbKsyHeT4ikD6ypump';
const PUMP_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
const DEXSCREENER_URL = `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`;
const X_URL = 'https://x.com/i/communities/2020192258524320242';

const GREEN = '#39ff14';
const GREEN_DIM = 'rgba(57,255,20,0.15)';
const GREEN_BORDER = 'rgba(57,255,20,0.25)';
const BG = '#060a06';

// ── Scanline overlay ──
function Scanlines() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
    }} />
  );
}

// ── Floating particles ──
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${p.alpha})`;
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
      height: 68, padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(6,10,6,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid ${GREEN_BORDER}` : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo.jpeg" alt="BUNNIA" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800,
          color: GREEN, letterSpacing: '-0.5px',
        }}>BUNNIA</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: BG,
          background: GREEN, borderRadius: 4, padding: '2px 6px', marginLeft: 2,
        }}>$BUNNIA</span>
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {['Evidence', 'Tokenomics', 'Community'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} style={{
            color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, transition: 'color 0.2s',
          }}>{s}</a>
        ))}
        <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '9px 22px', background: GREEN, color: BG,
          borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none',
          boxShadow: `0 0 18px rgba(57,255,20,0.35)`,
        }}>Buy $BUNNIA</a>
      </div>

      <button onClick={() => setMenuOpen(m => !m)} className="mobile-menu-btn" style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 22, height: 2, background: GREEN, marginBottom: i < 2 ? 5 : 0,
            transition: 'all 0.3s',
            transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0,
          background: 'rgba(6,10,6,0.98)', backdropFilter: 'blur(20px)',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20,
          borderBottom: `1px solid ${GREEN_BORDER}`,
        }}>
          {['Evidence', 'Tokenomics', 'Community'].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 18, fontWeight: 500 }}>
              {s}
            </a>
          ))}
          <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            style={{
              padding: '14px 24px', background: GREEN, color: BG,
              borderRadius: 8, fontWeight: 800, fontSize: 16, textDecoration: 'none', textAlign: 'center',
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
    }}>
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', marginBottom: 40, animation: 'float 5s ease-in-out infinite' }}>
        <img src="/logo.jpeg" alt="BUNNIA" style={{
          width: 200, height: 200, borderRadius: '50%', objectFit: 'cover',
          filter: `drop-shadow(0 0 50px rgba(57,255,20,0.45))`,
          border: `2px solid ${GREEN_BORDER}`,
        }} />
        <div style={{
          position: 'absolute', bottom: -4, right: -4,
          background: GREEN, color: BG, borderRadius: 20,
          fontSize: 11, fontWeight: 800, padding: '4px 10px',
          fontFamily: 'monospace', letterSpacing: '1px',
        }}>ON SOLANA</div>
      </div>

      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(56px, 10vw, 110px)',
        fontWeight: 900, textAlign: 'center', lineHeight: 0.95,
        marginBottom: 16, letterSpacing: '-3px',
        color: '#fff',
        textShadow: `0 0 60px rgba(57,255,20,0.3)`,
      }}>
        BUNNIA
      </h1>

      <p style={{
        fontSize: 'clamp(13px, 2vw, 17px)',
        color: 'rgba(57,255,20,0.6)',
        fontFamily: 'monospace', letterSpacing: '4px',
        textTransform: 'uppercase', marginBottom: 12, textAlign: 'center',
      }}>
        SPOTTED ON SOLANA
      </p>

      <p style={{
        fontSize: 'clamp(15px, 1.8vw, 18px)',
        color: 'rgba(255,255,255,0.55)',
        maxWidth: 520, textAlign: 'center', lineHeight: 1.7, marginBottom: 40,
      }}>
        It has a mugshot. It trades at 3am. It blew up the kitchen.
        Nobody knows how it got here — but the cameras caught everything.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
        <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '15px 38px', background: GREEN, color: BG,
          borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: 'none',
          boxShadow: `0 0 28px rgba(57,255,20,0.35)`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>Buy on Pump.fun</a>
        <a href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer" style={{
          padding: '15px 38px', background: 'transparent', color: GREEN,
          border: `1px solid ${GREEN_BORDER}`, borderRadius: 12, fontWeight: 600,
          fontSize: 16, textDecoration: 'none', transition: 'all 0.2s',
        }}>DexScreener</a>
      </div>

      <div onClick={copy} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 18px',
        background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`,
        borderRadius: 10, cursor: 'pointer', maxWidth: '90vw',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(57,255,20,0.5)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>CA:</span>
        <span style={{ fontSize: 'clamp(10px,1.4vw,13px)', fontFamily: 'monospace', color: 'rgba(255,255,255,0.65)', wordBreak: 'break-all' }}>{CONTRACT_ADDRESS}</span>
        <span style={{ fontSize: 12, color: copied ? '#fff' : GREEN, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
          {copied ? 'COPIED' : 'COPY'}
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── Evidence / meme gallery ──
const EVIDENCE = [
  { src: '/mugshot.jpg', label: 'EXHIBIT A', caption: 'BUNNIA — Booking #578391206', sub: 'Charges: Existing too hard on-chain' },
  { src: '/cam-basement.jpg', label: 'CAM 04 — 03:45:12', caption: 'Spotted in the basement', sub: 'No explanation given' },
  { src: '/cam-trading.jpg', label: 'CAM 03 — 03:17 AM', caption: 'Has been monitoring the charts', sub: 'Has not slept' },
  { src: '/cam-kitchen.jpg', label: 'CAM 02 — UNKNOWN', caption: 'Kitchen incident', sub: 'Investigators still piecing it together' },
  { src: '/gta.jpg', label: 'RECOVERED FILE', caption: '"AH SHIT, HERE WE GO AGAIN"', sub: "Bunnia's World. On Solana." },
  { src: '/cam-park.jpg', label: 'CAM 07 — 03:17 AM', caption: 'Caught outside at 3am', sub: 'Pepe coin hovering overhead' },
  { src: '/cam-office.jpg', label: 'CAM 01 — CLASSIFIED', caption: 'Working late. Again.', sub: 'Nobody hired it' },
];

function Evidence() {
  return (
    <section id="evidence" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          display: 'inline-block', fontFamily: 'monospace', fontSize: 11,
          color: GREEN, letterSpacing: '4px', textTransform: 'uppercase',
          border: `1px solid ${GREEN_BORDER}`, padding: '4px 14px', borderRadius: 4, marginBottom: 20,
        }}>CLASSIFIED FOOTAGE</div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1,
          color: '#fff',
        }}>
          The <span style={{ color: GREEN }}>Evidence</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 12, fontSize: 15 }}>
          Security footage recovered from multiple locations. Bunnia was present at all of them.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {EVIDENCE.map((e, i) => (
          <div key={i} style={{
            background: '#0a120a',
            border: `1px solid ${GREEN_BORDER}`,
            borderRadius: 12,
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={ev => {
              (ev.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (ev.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(57,255,20,0.12)`;
            }}
            onMouseLeave={ev => {
              (ev.currentTarget as HTMLDivElement).style.transform = 'none';
              (ev.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative' }}>
              <img src={e.src} alt={e.caption} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '1/1' }} />
              <div style={{
                position: 'absolute', top: 10, left: 10,
                background: 'rgba(6,10,6,0.8)', backdropFilter: 'blur(4px)',
                border: `1px solid ${GREEN_BORDER}`, borderRadius: 4,
                padding: '3px 8px',
                fontFamily: 'monospace', fontSize: 10, color: GREEN, letterSpacing: '1px',
              }}>{e.label}</div>
            </div>
            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{e.caption}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{e.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Tokenomics ──
function Tokenomics() {
  const stats = [
    { label: 'Network', value: 'Solana', sub: 'Fast. Cheap. Unhinged.' },
    { label: 'Platform', value: 'Pump.fun', sub: 'Fair launch. No presale.' },
    { label: 'Supply', value: '1,000,000,000', sub: '1 billion $BUNNIA' },
    { label: 'Tax', value: '0 / 0', sub: 'No buy tax. No sell tax.' },
  ];

  return (
    <section id="tokenomics" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block', fontFamily: 'monospace', fontSize: 11,
          color: GREEN, letterSpacing: '4px', textTransform: 'uppercase',
          border: `1px solid ${GREEN_BORDER}`, padding: '4px 14px', borderRadius: 4, marginBottom: 20,
        }}>ON-CHAIN INTEL</div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, color: '#fff' }}>
          Token<span style={{ color: GREEN }}>omics</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`,
            borderRadius: 16, padding: '32px 24px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(57,255,20,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>{s.label}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, color: GREEN, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 40, padding: '28px 32px',
        background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, borderRadius: 16,
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(57,255,20,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>CONTRACT ADDRESS</div>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(11px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.65)', wordBreak: 'break-all' }}>{CONTRACT_ADDRESS}</div>
        </div>
        <a href={`https://solscan.io/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" style={{
          padding: '10px 20px', border: `1px solid ${GREEN_BORDER}`, borderRadius: 8,
          color: GREEN, textDecoration: 'none', fontFamily: 'monospace', fontSize: 13, fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>View on Solscan</a>
      </div>
    </section>
  );
}

// ── Community ──
function Community() {
  return (
    <section id="community" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        background: '#0a120a', border: `1px solid ${GREEN_BORDER}`, borderRadius: 24,
        padding: 'clamp(40px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 48, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-block', fontFamily: 'monospace', fontSize: 11,
            color: GREEN, letterSpacing: '4px', textTransform: 'uppercase',
            border: `1px solid ${GREEN_BORDER}`, padding: '4px 14px', borderRadius: 4, marginBottom: 20,
          }}>JOIN THE OPERATION</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: '#fff',
          }}>
            The bunny is<br /><span style={{ color: GREEN }}>already watching.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 36 }}>
            It was spotted on pump.fun. It's been trading since 3am.
            The cameras can't explain it. Neither can we. Buy the token.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '13px 28px', background: GREEN, color: BG,
              borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none',
              boxShadow: `0 0 20px rgba(57,255,20,0.25)`,
            }}>Buy $BUNNIA</a>
            <a href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '13px 28px', background: 'transparent', color: GREEN,
              border: `1px solid ${GREEN_BORDER}`, borderRadius: 10,
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
            }}>Chart</a>
            <a href={X_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '13px 28px', background: 'transparent', color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Community
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/cam-park.jpg" alt="Bunnia in the wild" style={{
            width: '100%', maxWidth: 380, borderRadius: 16,
            filter: `drop-shadow(0 0 30px rgba(57,255,20,0.15))`,
            border: `1px solid ${GREEN_BORDER}`,
          }} />
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer style={{
      borderTop: `1px solid ${GREEN_BORDER}`,
      padding: '56px 24px',
      maxWidth: 1100, margin: '0 auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <img src="/logo.jpeg" alt="BUNNIA" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: GREEN }}>
          BUNNIA ($BUNNIA)
        </div>
        <div onClick={copy} style={{
          padding: '10px 18px', background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`,
          borderRadius: 8, cursor: 'pointer', fontFamily: 'monospace',
          fontSize: 'clamp(10px, 1.3vw, 12px)', color: 'rgba(255,255,255,0.45)', wordBreak: 'break-all', maxWidth: '90vw',
        }}>
          {CONTRACT_ADDRESS}
          <span style={{ marginLeft: 10, color: copied ? '#fff' : GREEN, fontWeight: 700 }}>{copied ? 'COPIED' : 'COPY'}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={PUMP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Pump.fun</a>
          <a href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>DexScreener</a>
          <a href={`https://solscan.io/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Solscan</a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>X Community</a>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontFamily: 'monospace' }}>
          $BUNNIA is a meme coin with no intrinsic value. Not financial advice.
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
        background: ${BG};
        color: #fff;
        font-family: 'Inter', -apple-system, sans-serif;
        overflow-x: hidden;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-14px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-7px); }
      }

      a:hover { opacity: 0.82; }

      @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .mobile-menu-btn { display: block !important; }
      }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: ${BG}; }
      ::-webkit-scrollbar-thumb { background: rgba(57,255,20,0.2); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(57,255,20,0.4); }

      ::selection { background: rgba(57,255,20,0.25); color: #fff; }
    `}</style>
  );
}

// ── App ──
function App() {
  return (
    <>
      <GlobalStyles />
      <Scanlines />
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
