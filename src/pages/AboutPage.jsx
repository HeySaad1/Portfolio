function MusicBars() {
  const bars = [
    { h: '40%', dur: '1.2s', delay: '0s' },
    { h: '80%', dur: '1.0s', delay: '0.1s' },
    { h: '55%', dur: '1.4s', delay: '0.2s' },
    { h: '90%', dur: '0.9s', delay: '0.05s' },
    { h: '65%', dur: '1.1s', delay: '0.15s' },
  ];
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
      {bars.map((b, i) => (
        <div key={i} style={{
          width: 4,
          background: 'rgba(255,194,51,0.6)',
          borderRadius: 2,
          animation: `bar1 ${b.dur} ease-in-out infinite ${b.delay}`,
        }} />
      ))}
    </div>
  );
}

export default function AboutPage({ onNavigate }) {
  return (
    <main>
      <section style={{ padding: '96px 48px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>

          {/* Left — portrait placeholder */}
          <div>
            <div style={{
              aspectRatio: '3/4',
              background: '#D1D1C9',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
                <div style={{ width: 128, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ width: 96, height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 4 }} />
              </div>
              <div style={{
                position: 'absolute', top: 24, right: 24,
                width: 32, height: 32,
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="font-typewriter" style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>SM</span>
              </div>
            </div>
            <p className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.3, marginTop: 12, textAlign: 'center' }}>
              Portrait — Replace with yours
            </p>
          </div>

          {/* Right — content */}
          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* Heading + bio */}
            <div>
              <h2 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 300, lineHeight: 0.85, marginBottom: 24 }}>
                About <span style={{ fontStyle: 'italic' }}>Me</span>
              </h2>
              <p className="font-typewriter" style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6 }}>
                I'm a Berlin-based designer and creative engineer with a decade of experience crafting interfaces that move — both literally and emotionally. I believe the best design is invisible until it surprises you.
              </p>
            </div>

            {/* Right Now */}
            <div>
              <p className="font-typewriter" style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4,
                marginBottom: 16, borderBottom: '1px solid #D1D1C9', paddingBottom: 12,
              }}>
                Right Now
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

                {/* Listening */}
                <div style={{
                  background: '#1F1F1F', borderRadius: 12, padding: 16,
                  display: 'flex', flexDirection: 'column', gap: 8,
                  cursor: 'default',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(209,209,201,0.5)' }}>
                    Listening to
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 4, background: '#FFC233',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="4" stroke="#1F1F1F" strokeWidth="1" />
                        <circle cx="5" cy="5" r="1.5" fill="#1F1F1F" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#F4F1EA', fontSize: 14, lineHeight: 1.3 }}>Floating Points</p>
                      <p className="font-typewriter" style={{ fontSize: 9, color: 'rgba(209,209,201,0.4)' }}>Promises</p>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginTop: 4 }} />
                  <MusicBars />
                </div>

                {/* Reading */}
                <div style={{
                  background: '#F4F1EA', border: '1px solid #D1D1C9', borderRadius: 12, padding: 16,
                  display: 'flex', flexDirection: 'column', gap: 8, cursor: 'default',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>Reading</span>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{
                      width: 32, height: 40, background: '#C65D3B', borderRadius: 2, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.6)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, lineHeight: 1.3 }}>The Elements of Typographic Style</p>
                      <p className="font-typewriter" style={{ fontSize: 9, opacity: 0.4, marginTop: 2 }}>Bringhurst</p>
                    </div>
                  </div>
                </div>

                {/* On my desk */}
                <div style={{
                  background: 'rgba(255,194,51,0.2)', border: '1px solid rgba(255,194,51,0.3)', borderRadius: 12, padding: 16,
                  display: 'flex', flexDirection: 'column', gap: 8, cursor: 'default',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5 }}>On my desk</span>
                  <p style={{ fontSize: 14, lineHeight: 1.4 }}>Ember Mobile <span style={{ fontStyle: 'italic', opacity: 0.6 }}>case study</span></p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                    <span className="font-typewriter" style={{ fontSize: 8, background: '#1F1F1F', color: '#F4F1EA', padding: '2px 8px', borderRadius: 999 }}>UX</span>
                    <span className="font-typewriter" style={{ fontSize: 8, border: '1px solid rgba(31,31,31,0.2)', padding: '2px 8px', borderRadius: 999, opacity: 0.6 }}>Motion</span>
                  </div>
                </div>

                {/* Current vibe */}
                <div style={{
                  background: '#C65D3B', borderRadius: 12, padding: 16,
                  display: 'flex', flexDirection: 'column', gap: 8, cursor: 'default',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span className="font-typewriter" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>Current vibe</span>
                  <p style={{ fontStyle: 'italic', color: '#F4F1EA', fontSize: 14, lineHeight: 1.4 }}>
                    "Quiet precision over loud complexity"
                  </p>
                  <p className="font-typewriter" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 'auto' }}>— self-imposed manifesto</p>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <p className="font-typewriter" style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4,
                marginBottom: 16, borderBottom: '1px solid #D1D1C9', paddingBottom: 12,
              }}>
                Capabilities
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['Product Design', 'Motion & Animation', 'Design Systems', 'Creative Engineering', 'UX Research', 'Visual Identity'].map(c => (
                  <div key={c} className="font-typewriter" style={{ fontSize: 12, opacity: 0.7 }}>— {c}</div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <p className="font-typewriter" style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4,
                marginBottom: 24, borderBottom: '1px solid #D1D1C9', paddingBottom: 12,
              }}>
                Experience
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { dot: '#C65D3B', role: 'Senior Designer', company: 'Studio Luft', years: '2022 — Present' },
                  { dot: '#FFC233', role: 'Design Lead', company: 'Forma Labs', years: '2019 — 2022' },
                  { dot: '#D1D1C9', role: 'UI Designer', company: 'Keel Digital', years: '2016 — 2019' },
                ].map((e) => (
                  <div key={e.company} style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.dot, marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 18 }}>
                        {e.role} — <span style={{ fontStyle: 'italic' }}>{e.company}</span>
                      </p>
                      <p className="font-typewriter" style={{ fontSize: 10, opacity: 0.4, letterSpacing: '0.2em' }}>{e.years}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px', borderTop: '1px solid rgba(209,209,201,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, opacity: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 48, height: 48, border: '1px dashed rgba(31,31,31,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-typewriter" style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>© 26</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20 }}>hello@saadmalik.studio</p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {['Twitter', 'Dribbble', 'LinkedIn'].map(s => (
                <span key={s} className="font-typewriter" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s}</span>
              ))}
            </div>
      </footer>
    </main>
  );
}
