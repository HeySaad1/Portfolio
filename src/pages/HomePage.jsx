import { useState, useEffect } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { Link } from 'react-router-dom';
import toptalSymbol from '../assets/toptal-symbol.svg';
import upworkLogo from '../assets/upwork.svg';
import arrowUpRight from '../assets/arrow-up-right.svg';
import logoGartner from '../assets/trusted/logo-gartner.svg';
import logoPsychPlus from '../assets/trusted/logo-psychplus.svg';
import logoToptal from '../assets/trusted/logo-toptal.svg';
import logoShakeShack from '../assets/trusted/logo-shakeshack.svg';
import artGartner from '../assets/trusted/art-gartner.png';
import artPsychPlus from '../assets/trusted/art-psychplus.png';
import artToptal from '../assets/trusted/art-toptal.png';
import artShakeShack from '../assets/trusted/art-shakeshack.png';
import caseFood from '../assets/case-food.png';
import caseAdvisory from '../assets/case-advisory.png';
import caseConstruction from '../assets/case-construction.png';
import caseDriving from '../assets/case-driving.png';
import caseNoCode from '../assets/case-nocode.png';
import casePolitical from '../assets/case-political.png';
import flagCa from '../assets/flags/ca.svg';
import flagUs from '../assets/flags/us.svg';

const FLAGS = {
  ca: { src: flagCa, label: 'Canada' },
  us: { src: flagUs, label: 'United States' },
};

/* Trusted-by carousel (Figma 90:1147 — four variants behind the four dots).
   Logo box sizes are Figma's; psychplus.svg is exported upside down, hence flip. */
const TRUSTED = [
  { name: 'Gartner', logo: logoGartner, w: 70.588, h: 16, art: artGartner },
  { name: 'Toptal', logo: logoToptal, w: 58.537, h: 16, art: artToptal },
  { name: 'Shake Shack', logo: logoShakeShack, w: 107.463, h: 24, art: artShakeShack },
  { name: 'PsychPlus', logo: logoPsychPlus, w: 95.238, h: 13.333, art: artPsychPlus, flip: true },
];

const ROTATE_MS = 4000;

/* Content width: 1184px of content inside 128px gutters at 1440px, shrinking
   to a 24px gutter on small screens. Used by every section on the page. */
const SHELL = {
  width: 'min(1184px, 100% - 2 * clamp(24px, 8.9vw, 128px))',
  marginInline: 'auto',
};

/* The hero indents "Malik", the tagline and the platform pill by one 128px step. */
const HERO_INDENT = 'clamp(0px, 8.9vw, 128px)';

function MonoLabel({ children, style }) {
  return (
    <span className="font-typewriter" style={{
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      ...style,
    }}>
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Hero
   ──────────────────────────────────────────────────────────────────────────── */
/* Toptal / Upwork links inside the hero pill (Figma 8:193, 8:202).
   The exported SVGs carry preserveAspectRatio="none", so each mark needs its true
   width/height — sizing them to the box would stretch them. */
function PlatformLink({ href, icon, iconWidth, iconHeight, boxSize, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="platform-link">
      <span className="platform-icon" style={{ width: boxSize, height: boxSize }}>
        <img src={icon} alt="" aria-hidden="true" style={{ width: iconWidth, height: iconHeight }} />
      </span>
      <span>{label}</span>
      <img src={arrowUpRight} alt="" aria-hidden="true" style={{ width: 16, height: 16 }} />
    </a>
  );
}


/* Cycles through the four Trusted By variants, cross-fading logo and artifact
   together. Pauses on hover/focus so it can't yank content away mid-read. */
function TrustedBy() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = setInterval(
      () => setIndex(i => (i + 1) % TRUSTED.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div
      className="trusted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="trusted-head">
        <MonoLabel style={{ fontSize: 14, letterSpacing: '2.4px', opacity: 0.4, lineHeight: '12px' }}>
          Trusted By
        </MonoLabel>

        <div className="trusted-logos">
          {TRUSTED.map((t, i) => (
            <img
              key={t.name}
              src={t.logo}
              alt={t.name}
              style={{
                width: t.w,
                height: t.h,
                opacity: i === index ? 1 : 0,
                transform: t.flip ? 'scaleY(-1)' : undefined,
              }}
            />
          ))}
        </div>

        <div className="trusted-dots">
          {TRUSTED.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={i === index ? 'is-active' : undefined}
              aria-label={`Show ${t.name}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="trusted-art">
        {TRUSTED.map((t, i) => (
          <img
            key={t.name}
            src={t.art}
            alt=""
            aria-hidden="true"
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ ...SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
      <div className="hero-grid">
        {/* Name, tagline, platform links */}
        <div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(64px, 12.2vw, 176px)',
            lineHeight: 0.8,
            letterSpacing: '-0.025em',
            margin: 0,
          }}>
            Saad<br />
            <span style={{ fontStyle: 'italic', marginLeft: HERO_INDENT }}>Malik</span>
          </h1>

          <p className="font-typewriter" style={{
            fontSize: 16,
            lineHeight: '26px',
            opacity: 0.6,
            maxWidth: 490,
            marginTop: 'clamp(32px, 4vw, 48px)',
            marginLeft: HERO_INDENT,
          }}>
            Designing products that feel human. Trusted by startups and enterprise teams worldwide.
          </p>
          
          <div className="platform-pill" style={{
            marginTop: 'clamp(28px, 3.5vw, 40px)',
            marginLeft: HERO_INDENT,
          }}>
            <PlatformLink
              href="https://www.toptal.com/designers/resume/saad-malik1?preview"
              label="Visit Toptal"
              icon={toptalSymbol}
              iconWidth={17.66}
              iconHeight={25.07}
              boxSize={28}
            />
            <span className="platform-divider" aria-hidden="true" />
            <PlatformLink
              href="https://www.upwork.com/freelancers/meetsaadmalik"
              label="Visit Upwork"
              icon={upworkLogo}
              iconWidth={32}
              iconHeight={32}
              boxSize={32}
            />
          </div>
        </div>

        {/* Trusted-by carousel + isometric artifact */}
        <TrustedBy />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Case studies
   ──────────────────────────────────────────────────────────────────────────── */
/* 24×18 flag chip — hairline rule, soft ring and the overlay sheen from Figma 241:1324. */
function Flag({ code }) {
  const { src, label } = FLAGS[code];
  return (
    <span className="flag" role="img" aria-label={label}>
      <img src={src} alt="" aria-hidden="true" />
      <span className="flag-sheen" aria-hidden="true" />
    </span>
  );
}

function CaseStudyRow({ image, alt, market, country, title, description, hasLink, to }) {
  const [hover, setHover] = useState(hasLink ? false : null);
  const active = hasLink && hover;

  return (
    <article
      className="case-row"
      onMouseEnter={hasLink ? () => setHover(true) : undefined}
      onMouseLeave={hasLink ? () => setHover(false) : undefined}
      style={{ cursor: hasLink ? 'pointer' : 'default' }}
    >
      <div className="case-thumb" style={{
        transform: active ? 'translateY(-6px)' : 'none',
        boxShadow: active
          ? '0 24px 48px -18px rgba(0, 0, 0, 0.22)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
      }}>
        <img src={image} alt={alt} loading="lazy" />
      </div>

      <div>
        <div className="font-typewriter" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          lineHeight: '15px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          {/* Figma dims only the label (241:1340) — the flag chip stays full strength. */}
          <span style={{ opacity: 0.6 }}>{market}</span>
          <Flag code={country} />
        </div>

        <h2 className="font-serif-display" style={{
          fontSize: 'clamp(32px, 3.3vw, 48px)',
          fontWeight: 400,
          lineHeight: 1.25,
          marginTop: 16,
          color: active ? 'var(--color-blue)' : 'var(--color-ink)',
          transition: 'color 0.3s ease',
        }}>
          {title}
        </h2>

        <p className="font-typewriter" style={{
          fontSize: 14,
          lineHeight: '19.5px',
          opacity: 0.6,
          marginTop: 16,
        }}>
          {description}
        </p>

        {hasLink && (() => {
          const label = (
            <>
              View Case
              <span aria-hidden="true" style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease',
                transform: active ? 'translateX(4px)' : 'none',
              }}>→</span>
            </>
          );
          const style = {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            lineHeight: '15px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginTop: 16,
            paddingBottom: 5,
            borderBottom: '1px solid currentColor',
            color: active ? 'var(--color-blue)' : 'var(--color-ink)',
            transition: 'color 0.3s ease',
          };
          // Where a case study actually exists, the link stretches over the whole row
          // so the card is clickable while staying a single target for assistive tech.
          return to
            ? <Link to={to} className="font-typewriter case-link" style={style}>{label}</Link>
            : <span className="font-typewriter" style={style}>{label}</span>;
        })()}
      </div>
    </article>
  );
}

const caseStudies = [
  {
    image: caseAdvisory,
    alt: 'Advisory Workspace dashboard',
    market: 'Enterprise · Research & Advisory',
    country: 'us',
    title: 'Advisory Workspace',
    description: 'A unified workspace for managing research, collaboration, and advisory workflows.',
    hasLink: true,
    to: '/work/gartner',
  },
  {
    image: caseFood,
    alt: 'Food ordering and loyalty app shown on a phone',
    market: 'Enterprise · Restaurant',
    country: 'ca',
    title: 'Ordering Experience',
    description: 'A digital ordering platform focused on faster checkout, loyalty, and customer retention.',
    hasLink: true,
    to: '/work/shake-shack',
  },
  {
    image: caseConstruction,
    alt: 'Construction management platform dashboard',
    market: 'Startup · Construction Management',
    country: 'us',
    title: 'Construction Management',
    description: 'Managing projects, reporting, and field operations through one unified platform.',
    hasLink: true,
    to: '/work/zonepillar',
  },
  {
    image: caseDriving,
    alt: 'Driving education platform landing page',
    market: 'Startup · Ed-Tech',
    country: 'ca',
    title: 'Driving School',
    description: 'Connecting students, instructors, and driving school in one modern experience.',
    hasLink: true,
    to: '/work/kruzee',
  },
  {
    image: casePolitical,
    alt: 'Political alignment survey interface',
    market: 'Startup · Political Platform',
    country: 'us',
    title: 'Political Alignment',
    description: 'Helping people understand where they stand through unbiased political comparisons.',
    hasLink: true,
    to: '/work/upvote',
  },
  {
    image: caseNoCode,
    alt: 'No-code AI workflow automation platform',
    market: 'Startup · AI Automation',
    country: 'us',
    title: 'Coming Soon.',
    description: 'Visual workflows that let teams automate repetitive work without code.',
    hasLink: false,
  },
];

function CaseStudies() {
  return (
    <section style={{ ...SHELL, paddingBottom: 'clamp(56px, 7vw, 96px)' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 16,
        borderBottom: '1px solid var(--color-warm-gray)',
      }}>
        <span className="dot-pulse" style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: 'var(--color-blue)',
        }} />
        <MonoLabel style={{ fontSize: 14, letterSpacing: '1.1px', opacity: 0.7 }}>
          Selected Case Studies
        </MonoLabel>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(56px, 6vw, 64px)',
        marginTop: 'clamp(48px, 6vw, 64px)',
      }}>
        {caseStudies.map(c => (
          <CaseStudyRow key={c.title} {...c} />
        ))}
      </div>

     {/*
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(48px, 6vw, 64px)' }}>
        <button className="font-typewriter view-designs">
          View Designs
          <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>→</span>
        </button>
      </div>
      */}
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: 'Read CV', href: 'https://talent.toptal.com/resume/designers/saad-malik1' },
  { label: 'Behance', href: 'www.behance.net/meetsaadmalik' },
  { label: 'Dribbble', href: 'https://dribbble.com/meet-saad-malik/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/meetsaadmalik/' },
];

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(209, 209, 201, 0.5)' }}>
      <div style={{
        ...SHELL,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 32,
        paddingBlock: 'clamp(40px, 5vw, 64px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="font-typewriter" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px dashed rgba(31, 31, 31, 0.2)',
            fontSize: 9,
            lineHeight: '12px',
            letterSpacing: '0.08em',
            opacity: 0.7,
          }}>
            © 26
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(28px, 3vw, 36px)',
            lineHeight: 1,
          }}>
            Saad Malik
          </span>
        </div>

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 3vw, 40px)' }}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="footer-link"
              {...(href === '#'
                ? { onClick: e => e.preventDefault() }
                : { target: '_blank', rel: 'noreferrer' })}
            >
              <MonoLabel style={{ fontSize: 12, letterSpacing: '0.1em' }}>{label}</MonoLabel>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main style={{ flex: 1 }}>
      <Hero />
      <CaseStudies />
      <Footer />
    </main>
  );
}
