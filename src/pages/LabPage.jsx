const experiments = [
  { year: '2024', title: 'Kinetic Type Playground', tag: 'WebGL / Experiment' },
  { year: '2024', title: 'Generative Poster System', tag: 'Creative Code' },
  { year: '2023', title: 'Cursor Studies Vol. 2', tag: 'Motion / CSS' },
  { year: '2023', title: 'Variable Font Explorer', tag: 'Typography' },
  { year: '2022', title: 'Noise & Grain Toolkit', tag: 'Design Tools' },
  { year: '2022', title: 'Brutalist Dashboard Kit', tag: 'UI Kit / Free' },
  { year: '2021', title: 'Sound Visualiser Prototype', tag: 'Web Audio API' },
  { year: '2020', title: 'Analog Interface Studies', tag: 'Skeuomorphic / Retro' },
];

function LabRow({ year, title, tag }) {
  return (
    <a
      href="#"
      onClick={e => e.preventDefault()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px',
        background: '#F4F1EA',
        borderTop: '1px solid #D1D1C9',
        transition: 'background 0.2s, color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1F1F1F'; e.currentTarget.style.color = '#F4F1EA'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#F4F1EA'; e.currentTarget.style.color = 'inherit'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span className="font-typewriter" style={{ fontSize: 10, opacity: 0.3, minWidth: 32 }}>{year}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span className="font-typewriter" style={{ fontSize: 10, opacity: 0.4 }}>{tag}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', opacity: 0.2, fontSize: 18 }}>→</span>
      </div>
    </a>
  );
}

export default function LabPage() {
  return (
    <main>
      <section style={{ padding: '96px 48px 128px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 300, lineHeight: 0.85 }}>
            The <span style={{ fontStyle: 'italic' }}>Lab</span>
          </h2>
          <p className="font-typewriter" style={{ fontSize: 14, opacity: 0.5, marginTop: 16 }}>
            Experiments, side projects, and unfinished ideas — 2018 to now.
          </p>
        </div>

        <div style={{
          border: '1px solid #D1D1C9',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {experiments.map((e, i) => (
            <LabRow key={i} {...e} />
          ))}
        </div>
      </section>
    </main>
  );
}
