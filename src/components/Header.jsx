import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import avatar from '../assets/avatar-color.png';
import chevronRight from '../assets/chevron-right.svg';
import CityClock from './CityClock';

const MONOGRAM_MESSAGES = [
  '👋 hey there',
  '✨ you found me',
  '☕ grab a coffee',
  '🌙 nice to see you',
  '🎨 lets create',
  '💫 welcome back',
  '🐚 come on in',
];

/* Case-study pages add a trail after the monogram: Home / <label> <suffix>. */
function Breadcrumb({ label, suffix }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-home">Home</Link>
      <img src={chevronRight} alt="" aria-hidden="true" width={16} height={16} />
      <span className="breadcrumb-current" aria-current="page">{label}</span>
      {suffix && <span className="breadcrumb-suffix">{suffix}</span>}
    </nav>
  );
}

export default function Header({ breadcrumb, clock }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  function cycleMessage() {
    setMsgIndex(i => (i + 1) % MONOGRAM_MESSAGES.length);
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 92,
      backgroundColor: 'rgba(244, 241, 234, 0.9)',
      backdropFilter: 'blur(2px)',
      /* Hairline as an inset shadow, not a border: a border would consume 1px of the
         92px border-box height and land both children on a blurry half-pixel. */
      boxShadow: 'inset 0 -1px 0 rgba(209, 209, 201, 0.5)',
      padding: '24px clamp(24px, 8.9vw, 128px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
        {/* Monogram — greyscale portrait that turns full colour on hover */}
        <button
          type="button"
          className="monogram"
          aria-label="Saad Malik — home"
          onClick={() => navigate('/')}
          onMouseLeave={cycleMessage}
        >
          <img src={avatar} alt="" aria-hidden="true" />
          <span className="monogram-tooltip">{MONOGRAM_MESSAGES[msgIndex]}</span>
        </button>

        {breadcrumb && <Breadcrumb {...breadcrumb} />}
        {clock && (
          <>
            <span className="header-rule" aria-hidden="true" />
            <CityClock />
          </>
        )}
      </div>

      {/*
      <button
        onClick={() => navigate('/contact')}
        className="font-typewriter contact-cta"
        style={{
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#FFFFFF',
          background: 'var(--color-blue)',
          border: '1px solid var(--color-blue)',
          borderRadius: 4,
          height: 40,
          padding: '0 24px',
          display: 'inline-flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        Contact Me
      </button>
      */}
    </header>
  );
}
