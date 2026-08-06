import { useState, useRef, useEffect } from 'react';

// ─── BOLT WIDGET ──────────────────────────────────────────────────────────────
function BoltWidget() {
  const boltRef  = useRef(null);
  const glowRef  = useRef(null);
  const numRef   = useRef(null);
  const tagRef   = useRef(null);
  const subRef   = useRef(null);
  const timerRef = useRef(null);

  function zap() {
    const svg = boltRef.current;
    if (!svg) return;
    svg.style.animation = 'none';
    void svg.offsetWidth;
    svg.style.animation = 'bolt-zap 0.45s ease-out';
    svg.querySelectorAll('.spark').forEach(s => {
      s.classList.remove('spark-active');
      void s.offsetWidth;
      s.classList.add('spark-active');
    });
    setTimeout(() => svg.querySelectorAll('.spark').forEach(s => s.classList.remove('spark-active')), 500);
  }

  function handleEnter() {
    const g = glowRef.current, n = numRef.current, t = tagRef.current, s = subRef.current;
    if (g) { g.style.opacity = '0.35'; g.style.transform = 'scale(1.2)'; g.style.animation = 'glow-pulse 1s ease-in-out infinite'; }
    if (t) { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; }
    if (s) { s.style.color = '#C65D3B'; s.style.opacity = '0.9'; }
    if (n) n.style.color = '#C65D3B';
    zap();
    timerRef.current = setInterval(zap, 1800);
  }

  function handleLeave() {
    clearInterval(timerRef.current);
    const g = glowRef.current, n = numRef.current, t = tagRef.current, s = subRef.current, svg = boltRef.current;
    if (g) { g.style.animation = 'none'; g.style.opacity = '0'; g.style.transform = 'scale(0.75)'; }
    if (t) { t.style.opacity = '0'; t.style.transform = 'translateX(8px)'; }
    if (s) { s.style.color = ''; s.style.opacity = ''; }
    if (n) n.style.color = '#1F1F1F';
    if (svg) svg.style.animation = 'none';
  }

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 16, maxWidth: 320, cursor: 'default', userSelect: 'none' }}
    >
      <div style={{ position: 'relative', flexShrink: 0, marginTop: 4 }}>
        <div ref={glowRef} style={{
          position: 'absolute', width: 32, height: 44, borderRadius: '50%',
          filter: 'blur(8px)', background: '#FFC233', opacity: 0, transform: 'scale(0.75)',
          transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
        <svg ref={boltRef} width="32" height="44" viewBox="0 0 32 44" fill="none"
          style={{ position: 'relative', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <path d="M20 2 L8 24 L15 24 L12 42 L26 18 L18 18 Z" stroke="#C65D3B" strokeWidth="1.3" fill="#FFC233" fillOpacity="0.25" strokeLinejoin="round" />
          <path d="M19 6 L11 22 L16 22 L14 36 L23 20 L17 20 Z" fill="#C65D3B" fillOpacity="0.15" />
          <circle cx="4"  cy="10" r="1.2" fill="#FFC233" className="spark" />
          <circle cx="28" cy="8"  r="1"   fill="#FFC233" opacity="0.7" className="spark" />
          <circle cx="27" cy="34" r="1.4" fill="#FFC233" className="spark" />
          <circle cx="3"  cy="30" r="0.9" fill="#C65D3B" opacity="0.5" className="spark" />
          <text x="24" y="16" fontSize="5" fill="#FFC233">✦</text>
        </svg>
      </div>
      <div>
        <p className="font-typewriter" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#C65D3B', fontWeight: 700, marginBottom: 8 }}>
          Response time
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <span ref={numRef} className="font-typewriter" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: '#1F1F1F', transition: 'color 0.25s ease' }}>48</span>
          <span className="font-typewriter" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(31,31,31,0.6)' }}>hours</span>
          <span ref={tagRef} className="font-typewriter" style={{ fontSize: 10, color: '#C65D3B', opacity: 0, transform: 'translateX(8px)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}>max</span>
        </div>
        <p ref={subRef} style={{ fontStyle: 'italic', fontSize: 14, color: 'rgba(31,31,31,0.5)', lineHeight: 1.4, transition: 'color 0.25s ease, opacity 0.25s ease' }}>
          Usually much faster ✦
        </p>
      </div>
    </div>
  );
}

// ─── INPUT GROUP ──────────────────────────────────────────────────────────────
function InputGroup({ label, type = 'text', placeholder, value, onChange, autoFocus }) {
  return (
    <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label className="font-typewriter" style={{
        fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em',
        color: 'rgba(31,31,31,0.5)', transition: 'color 0.25s ease, transform 0.25s ease', display: 'block',
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="input-underline"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 24, color: '#1F1F1F', padding: '8px 0' }}
      />
    </div>
  );
}

// ─── RADIO PILL ───────────────────────────────────────────────────────────────
function RadioPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        padding: '8px 24px', borderRadius: 999,
        border: `1px solid ${checked ? '#C65D3B' : '#D1D1C9'}`,
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18,
        background: checked ? '#C65D3B' : 'transparent',
        color: checked ? 'white' : '#1F1F1F', cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={e => { if (!checked) e.currentTarget.style.borderColor = '#C65D3B'; e.currentTarget.style.transform = 'scale(1.04)'; }}
      onMouseLeave={e => { if (!checked) e.currentTarget.style.borderColor = '#D1D1C9'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {label}
    </button>
  );
}

// ─── CONFETTI DATA ────────────────────────────────────────────────────────────
const STATIC_CONFETTI = [
  { bg: '#FFC233', left: '10%', top: '20%', delay: '0s' },
  { bg: '#C65D3B', left: '85%', top: '15%', delay: '1s',   width: 6,  height: 10 },
  { bg: '#FFC233', left: '90%', top: '60%', delay: '2s',   borderRadius: '50%' },
  { bg: '#C65D3B', left: '5%',  top: '75%', delay: '1.5s' },
];

const BURST_CONFETTI = [
  { bg: '#FFC233', left: '20%', top: '30%', delay: '0s' },
  { bg: '#C65D3B', left: '35%', top: '20%', delay: '0.3s', width: 6,  height: 10 },
  { bg: '#FFC233', left: '55%', top: '25%', delay: '0.6s', borderRadius: '50%' },
  { bg: '#C65D3B', left: '75%', top: '15%', delay: '0.9s' },
  { bg: '#FFC233', left: '85%', top: '40%', delay: '1.2s', width: 12, height: 4 },
  { bg: '#C65D3B', left: '10%', top: '45%', delay: '0.2s' },
  { bg: '#FFC233', left: '45%', top: '10%', delay: '0.5s' },
  { bg: '#C65D3B', left: '65%', top: '35%', delay: '0.8s' },
];

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
export default function ContactPage({ onNavigate, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (submitted) {
      requestAnimationFrame(() => requestAnimationFrame(() => setOverlayVisible(true)));
    }
  }, [submitted]);

  function closeSuccess() {
    setOverlayVisible(false);
    setTimeout(() => { setSubmitted(false); onClose(); }, 600);
  }

  return (
    <>
      {/* ── MAIN CONTACT VIEW ─────────────────────────────────────────────── */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', animation: 'contact-enter 0.5s ease forwards' }}>

        {/* Header — S monogram + close */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          backgroundColor: 'rgba(244,241,234,0.9)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(209,209,201,0.5)',
          padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="monogram" onClick={() => onNavigate('home')}
            style={{ width: 40, height: 40, border: '1px solid currentColor', borderRadius: '50%' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20 }}>S</span>
            <span className="monogram-tooltip">🏠 Home</span>
          </div>
          <button onClick={onClose} className="contact-close-btn" title="Close">×</button>
        </header>

        {/* Main */}
        <main style={{ flex: 1, position: 'relative', padding: '80px 48px' }}>
          {/* Floating confetti */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {STATIC_CONFETTI.map((c, i) => (
              <div key={i} className="confetti-static" style={{
                background: c.bg, left: c.left, top: c.top, animationDelay: c.delay,
                ...(c.width        && { width: c.width }),
                ...(c.height       && { height: c.height }),
                ...(c.borderRadius && { borderRadius: c.borderRadius }),
              }} />
            ))}
          </div>

          <div style={{ maxWidth: 768, margin: '0 auto', position: 'relative', zIndex: 10 }}>
            {/* Heading */}
            <div style={{ marginBottom: 64 }}>
              <h1 style={{ fontSize: 'clamp(48px,6vw,72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>
                Let's start <span style={{ fontStyle: 'italic', color: '#C65D3B' }}>something.</span>
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 24, color: 'rgba(31,31,31,0.6)' }}>
                Tell me about your vision, and we'll find the rhythm together.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                <InputGroup label="Name / Studio"  placeholder="Who are you?"           value={form.name}    onChange={v => setForm(f => ({ ...f, name: v }))} autoFocus />
                <InputGroup label="Email Address"  type="email" placeholder="Where can I reach you?" value={form.email}   onChange={v => setForm(f => ({ ...f, email: v }))} />
              </div>

              {/* Project type */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <label className="font-typewriter" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  Project Type
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {['Branding', 'Web Design', 'Art Direction', 'Other'].map(t => (
                    <RadioPill key={t} label={t} checked={form.type === t} onChange={() => setForm(f => ({ ...f, type: t }))} />
                  ))}
                </div>
              </div>

              {/* Inquiry */}
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label className="font-typewriter" style={{
                  fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em',
                  color: 'rgba(31,31,31,0.5)', transition: 'color 0.25s ease, transform 0.25s ease', display: 'block',
                }}>
                  The Inquiry
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the threads of your project..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="input-underline"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 24, color: '#1F1F1F', padding: '8px 0', resize: 'none' }}
                />
              </div>

              {/* Bottom row */}
              <div style={{ paddingTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
                <BoltWidget />
                <button type="submit" className="send-btn">
                  Send Message
                  <span className="send-arrow" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textTransform: 'none', fontSize: 18, opacity: 0.6 }}>→</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* ── SUCCESS OVERLAY ───────────────────────────────────────────────────── */}
      {submitted && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: '#F4F1EA', display: 'flex', flexDirection: 'column',
          opacity: overlayVisible ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          {/* Burst confetti */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {BURST_CONFETTI.map((c, i) => (
              <div key={i} className="confetti-burst" style={{
                background: c.bg, left: c.left, top: c.top, animationDelay: c.delay,
                ...(c.width        && { width: c.width }),
                ...(c.height       && { height: c.height }),
                ...(c.borderRadius && { borderRadius: c.borderRadius }),
              }} />
            ))}
          </div>

          {/* Success header */}
          <header style={{
            position: 'sticky', top: 0, zIndex: 50,
            backgroundColor: 'rgba(244,241,234,0.9)', backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(209,209,201,0.5)',
            padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="monogram" onClick={() => onNavigate('home')}
              style={{ width: 40, height: 40, border: '1px solid currentColor', borderRadius: '50%' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20 }}>S</span>
              <span className="monogram-tooltip">🏠 Home</span>
            </div>
            <button onClick={closeSuccess} className="contact-close-btn" title="Close">×</button>
          </header>

          {/* Success body */}
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, position: 'relative' }}>
            <div style={{ maxWidth: 448, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, position: 'relative', zIndex: 10 }}>
              {/* Spinning ring + S */}
              <div style={{ position: 'relative', width: 128, height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="animate-spin-slow" style={{ position: 'absolute', inset: 0, border: '2px dashed #D1D1C9', borderRadius: '50%' }} />
                <div style={{ width: 128, height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(31,31,31,0.1)', backgroundColor: '#F4F1EA', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 48 }}>S</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h2 style={{ fontSize: 'clamp(40px,5vw,60px)', fontWeight: 300, lineHeight: 1.1 }}>
                  Message <span style={{ fontStyle: 'italic', color: '#C65D3B' }}>Received.</span>
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, color: 'rgba(31,31,31,0.7)', lineHeight: 1.6 }}>
                  "Thank you for reaching out. I've received your inquiry and look forward to weaving our creative threads together very soon."
                </p>
              </div>

              <button onClick={closeSuccess} className="send-btn">
                Back to Work
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textTransform: 'none', fontSize: 18, opacity: 0.6 }}>→</span>
              </button>

              <div style={{ paddingTop: 48, borderTop: '1px solid rgba(209,209,201,0.3)', width: '100%' }}>
                <p className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.3 }}>
                  Confirmation ID: SM-2025-S77
                </p>
              </div>
            </div>
          </main>

          {/* Success footer */}
          <footer style={{ padding: '48px', borderTop: '1px solid rgba(209,209,201,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, opacity: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 48, height: 48, border: '1px dashed rgba(31,31,31,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-typewriter" style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>© 25</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20 }}>hello@saadmalik.studio</p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {['Twitter', 'Dribbble', 'LinkedIn'].map(s => (
                <span key={s} className="font-typewriter" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s}</span>
              ))}
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
