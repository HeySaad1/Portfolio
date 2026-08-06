export default function ProjectCard({ number, title, titleItalic, subtitle, bgColor, preview }) {
  return (
    <div className="card-focus" style={{ position: 'relative' }}>
      <a
        href="#"
        onClick={e => e.preventDefault()}
        style={{ display: 'block' }}
      >
        <div
          className="paper-texture"
          style={{
            backgroundColor: bgColor,
            aspectRatio: '4/3',
            borderRadius: 16,
            padding: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {preview}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400 }}>
              {title} <span style={{ fontStyle: 'italic' }}>{titleItalic}</span>
            </h3>
            <p className="font-typewriter" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5, marginTop: 8 }}>
              {subtitle}
            </p>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 24, opacity: 0.2 }}>
            {number}
          </span>
        </div>
      </a>
    </div>
  );
}
