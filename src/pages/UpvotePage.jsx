import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import upvoteLogomark from '../assets/case-upvote/upvote-logomark.svg';
import heroShot from '../assets/case-political.png';

/* §2 Why this needed to exist — survey-data exports. Figma: 2 + 2. */
import evidence1 from '../assets/case-upvote/evidence/evidence-1.png';
import evidence2 from '../assets/case-upvote/evidence/evidence-2.png';
import evidence3 from '../assets/case-upvote/evidence/evidence-3.png';
import evidence4 from '../assets/case-upvote/evidence/evidence-4.png';

/* §4 From the research — six boards. Figma counts: 4 / 2 / 6 / 4 / 5 / 3. */
import voterPersonas1 from '../assets/case-upvote/research/voter-personas-1.png';
import voterPersonas2 from '../assets/case-upvote/research/voter-personas-2.png';
import voterPersonas3 from '../assets/case-upvote/research/voter-personas-3.png';
import voterPersonas4 from '../assets/case-upvote/research/voter-personas-4.png';

import otherPersonas1 from '../assets/case-upvote/research/partner-personas-1.png';
import otherPersonas2 from '../assets/case-upvote/research/partner-personas-2.png';

import problemChains1 from '../assets/case-upvote/research/problem-statements-1.png';
import problemChains2 from '../assets/case-upvote/research/problem-statements-2.png';
import problemChains3 from '../assets/case-upvote/research/problem-statements-3.png';
import problemChains4 from '../assets/case-upvote/research/problem-statements-4.png';
import problemChains5 from '../assets/case-upvote/research/problem-statements-5.png';
import problemChains6 from '../assets/case-upvote/research/problem-statements-6.png';

import goalsVsObjectives1 from '../assets/case-upvote/research/goals-objectives-1.png';
import goalsVsObjectives2 from '../assets/case-upvote/research/goals-objectives-2.png';
import goalsVsObjectives3 from '../assets/case-upvote/research/goals-objectives-3.png';
import goalsVsObjectives4 from '../assets/case-upvote/research/goals-objectives-4.png';

import journey1 from '../assets/case-upvote/research/voter-journey-1.png';
import journey2 from '../assets/case-upvote/research/voter-journey-2.png';
import journey3 from '../assets/case-upvote/research/voter-journey-3.png';
import journey4 from '../assets/case-upvote/research/voter-journey-4.png';
import journey5 from '../assets/case-upvote/research/voter-journey-5.png';

import prioritisation1 from '../assets/case-upvote/research/page-prioritisation-1.png';
import prioritisation2 from '../assets/case-upvote/research/page-prioritisation-2.png';
import prioritisation3 from '../assets/case-upvote/research/page-prioritisation-3.png';

/* §5 Design — the alignment slider is vector in Figma (90:265), so it is rebuilt
   in CSS. These are its icons and the candidate portraits either side. */
import sliderIcon from '../assets/case-upvote/design/icon-income-inequality.svg';
import compareIcon from '../assets/case-upvote/design/icon-compare.svg';
import chevronIcon from '../assets/case-upvote/design/icon-chevron.svg';
import oppose1 from '../assets/case-upvote/design/candidate-oppose-1.png';
import oppose2 from '../assets/case-upvote/design/candidate-oppose-2.png';
import oppose3 from '../assets/case-upvote/design/candidate-oppose-3.png';
import oppose4 from '../assets/case-upvote/design/candidate-oppose-4.png';
import oppose5 from '../assets/case-upvote/design/candidate-oppose-5.png';
import support1 from '../assets/case-upvote/design/candidate-support-1.png';
import support2 from '../assets/case-upvote/design/candidate-support-2.png';
import support3 from '../assets/case-upvote/design/candidate-support-3.png';
import support4 from '../assets/case-upvote/design/candidate-support-4.png';
import support5 from '../assets/case-upvote/design/candidate-support-5.png';

/* §7 The work — product screens */
import resultScreen from '../assets/case-upvote/work/result-archetype.png';
import surveyEntry from '../assets/case-upvote/work/survey-entry.png';
import surveyQuestion from '../assets/case-upvote/work/survey-question.png';
import resultTopics from '../assets/case-upvote/work/result-topics.png';
import candidateDetail from '../assets/case-upvote/work/candidate-detail.png';

import mobileEntry from '../assets/case-upvote/work/mobile-entry.png';
import mobileMatching from '../assets/case-upvote/work/mobile-candidate-matching.png';
import mobileUnlock from '../assets/case-upvote/work/mobile-unlock-profiles.png';
import mobileParty from '../assets/case-upvote/work/mobile-party-alignment.png';

import Lightbox from '../components/Lightbox';
import { SECTIONS, JUMP_NAV } from './upvoteSections';

/* Case-study content column: 952px inside 244px gutters at 1440, collapsing to a
   24px gutter on small screens. The hero sits in a wider 1112px frame (164px pad). */
const COLUMN = {
  width: 'min(952px, 100% - 2 * clamp(24px, 17vw, 244px))',
  marginInline: 'auto',
};

const HERO_SHELL = {
  width: 'min(1112px, 100% - 2 * clamp(24px, 11.4vw, 164px))',
  marginInline: 'auto',
};

const META = [
  { term: 'Role', value: 'Solo Product designer' },
  { term: 'Status', value: 'Shipped · Raised $1.5M', badge: true },
  { term: 'Audiences', value: 'Voters, politicians, non-profits' },
  { term: 'Tools', value: 'Figma' },
];

/* Highlights whichever nav target is currently nearest the top of the viewport.
   Uses scroll position rather than IntersectionObserver so the very top of the
   page reliably resolves to "Overview". */
function useActiveSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Must sit just below .cs-section-label's 172px scroll-margin-top, or a
      // section jumped to via the nav lands at 172 and never counts as reached.
      const probe = 185;
      let current = 0;
      JUMP_NAV.forEach(({ target }, i) => {
        if (!target) return;
        const el = document.getElementById(target);
        if (el && el.getBoundingClientRect().top <= probe) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
}

/* Every figure on the page can open the viewer, so the open handler lives at the
   page root rather than being threaded through Section / FigureGroup. */
const LightboxContext = createContext(() => {});
const useLightbox = () => useContext(LightboxContext);

const CAROUSEL_MS = 7000;

/* A figure card whose media cycles through several images every 7s, with a
   thumbnail strip beneath. Clicking opens the gallery, which never auto-plays.
   `children` renders below the caption bar — used by the evidence cards. */
function FigureCarousel({ items, caption, aspect = '462 / 293', children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const openLightbox = useLightbox();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion || items.length < 2) return undefined;
    const timer = setInterval(() => setIndex(i => (i + 1) % items.length), CAROUSEL_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, items.length]);

  return (
    <figure
      className="cs-figure-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <button
        type="button"
        className="cs-figure-open"
        aria-label={`Open ${caption ?? 'image'} full screen`}
        onClick={() => openLightbox(items, index)}
      >
        <div className="cs-figure-card-media is-carousel" style={{ aspectRatio: aspect }}>
          {items.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={i === index ? (item.alt ?? item.caption ?? '') : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </div>
      </button>

      {items.length > 1 && (
        <div className="cs-thumb-strip">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={i === index ? 'is-selected' : undefined}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={item.src} alt="" aria-hidden="true" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {caption && <figcaption>{caption}</figcaption>}
      {children}
    </figure>
  );
}

function SectionLabel({ id, label }) {
  return (
    <div className="cs-section-label" id={id}>
      <span>{label}</span>
    </div>
  );
}

/* Every content section sits in the 952 column with the same vertical rhythm. */
function Section({ children }) {
  return (
    <section className="cs-section">
      <div style={COLUMN}>{children}</div>
    </section>
  );
}

/* Bordered card with the image on top and a caption bar beneath. */
function FigureCard({ src, alt, caption, width = 464, fit = 'contain', aspect, children }) {
  const openLightbox = useLightbox();
  const media = (
    <div
      className={`cs-figure-card-media is-${fit}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {children ?? <img src={src} alt={alt} loading="lazy" />}
    </div>
  );

  return (
    <figure className="cs-figure-card" style={{ maxWidth: width }}>
      {src ? (
        <button
          type="button"
          className="cs-figure-open"
          aria-label={`Open ${caption ?? alt ?? 'image'} full screen`}
          onClick={() => openLightbox([{ src, alt, caption }], 0)}
        >
          {media}
        </button>
      ) : media}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* Titled group of figure cards. `columns` switches the grid: 2-up is the default
   952 = 464 + 24 + 464, 4-up carries the mobile screens. */
function FigureGroup({ title, columns = 2, children }) {
  const modifier = columns === 4 ? ' is-4up' : columns === 3 ? ' is-3up' : '';
  return (
    <div className="cs-figure-group">
      {title && <h3>{title}</h3>}
      <div className={`cs-figure-grid${modifier}`}>{children}</div>
    </div>
  );
}

/* 1 — Context. */
function Context() {
  return (
    <Section>
      <div className="cs-split">
        <h2 className="cs-lead">
          A calm tool for a <em>heated</em> subject.
        </h2>
        <div className="cs-split-body">
          <p>
            Upvote is a <a href="#the-work">Political Alignment Survey</a>. You answer a set of
            questions across topics like the economy, the environment and civil rights, and you
            get back a clear read on where you stand: an archetype, a party, a breakdown by issue,
            and a percentage match to real candidates.
          </p>
          <p>
            The catch is that in a product like this, almost any choice can look like bias. The
            order the options come in. Which side is coloured red. How a question is worded. Whose
            photo is bigger. In an election year people read for that, and they&rsquo;re right to.
            The moment the result feels rigged, the tool is worthless, because a result you
            don&rsquo;t trust isn&rsquo;t worth anything.
          </p>
          <p>
            It also had to work for three groups who want different things.{' '}
            <a href="#the-research">Voters</a> want a fair read.{' '}
            <a href="#the-research">Politicians</a> and{' '}
            <a href="#the-research">non-profits</a> want the data that read produces. So the voter
            side had to stay clean and even-handed, while still feeding the people who needed the
            aggregate.
          </p>
        </div>
      </div>
    </Section>
  );
}

const EVIDENCE = [
  {
    images: [evidence1, evidence2],
    finding: 'Politics is more polarised and more distrusted than ever, and it is getting harder to tell where reliable information ends and spin begins.',
    so: 'neutrality had to be provable in the interface itself, not claimed in the copy.',
  },
  {
    images: [evidence3, evidence4],
    finding: 'Most voters find it genuinely hard to name where they stand and to compare that honestly against the candidates on offer.',
    so: 'the result had to give a clear, specific placement, not a vague left-or-right label.',
  },
];

/* 2 — Why this needed to exist. Survey data with the conclusion attached, so the
   finding and the "so" it produced can't drift apart. */
function WhyThisNeededToExist() {
  return (
    <Section>
      <div className="cs-figure-grid">
        {EVIDENCE.map(({ images, finding, so }) => (
          <FigureCarousel
            key={finding}
            items={images.map((src, i) => ({ src, alt: `Survey data, chart ${i + 1}` }))}
          >
            <div className="up-evidence">
              <p>{finding}</p>
              <p><span className="up-so">So</span> {so}</p>
            </div>
          </FigureCarousel>
        ))}
      </div>
    </Section>
  );
}

const RESEARCH_INSIGHTS = [
  {
    title: 'Voters want an objective read, free of partisan noise.',
    body: 'Across profiles the same goal surfaced: an unbiased analysis of their own beliefs to navigate a partisan landscape, from a source they can trust.',
    response: 'Neutrality treated as the core requirement, enforced in the instrument rather than promised in the copy.',
  },
  {
    title: 'They want nuance beyond the two-party split.',
    body: 'Voters wanted to see how their views align across many candidates and issues, not be sorted into left or right and left there.',
    response: 'A per-subtopic alignment view and a 12-archetype system, so the result is a spectrum, not a binary.',
  },
  {
    title: 'Three audiences, opposing needs.',
    body: 'Voters need the read to feel neutral; politicians and non-profits need the aggregate data it produces to guide outreach.',
    response: 'A voter-first survey and result flow, with a separate partner path so the data use never leaks into the voter experience.',
  },
];

/* 3 — The research. Same insight card as Gartner, without the numbers: these are
   three findings, not three steps, so numbering them would imply an order. */
function TheResearch() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Who this is for, and what they distrust</h2>
      <p className="cs-body">
        The work started from personas and problem statements across all three audiences: five
        voter profiles (an independent small-business owner, a college student questioning his
        upbringing, a retired teacher who has lost trust in her usual sources, a time-poor
        analyst, and more), a politician persona, and a non-profit leader. Their stated goals
        pointed at one recurring need.
      </p>

      <div className="cs-insights">
        {RESEARCH_INSIGHTS.map(({ title, body, response }) => (
          <article key={title} className="cs-insight">
            <h3>{title}</h3>
            <p>{body}</p>
            <span className="cs-insight-label">Design response</span>
            <p className="cs-insight-response">{response}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* Counts verified against Figma 90:187 — 4 / 2 / 6 / 4 / 5 / 3. */
const RESEARCH_BOARDS = [
  {
    caption: 'Five voter personas, each with goals and frustrations behind the neutrality need.',
    images: [voterPersonas1, voterPersonas2, voterPersonas3, voterPersonas4],
  },
  {
    caption: 'The two other audiences: a politician and a non-profit leader who want the aggregate data.',
    images: [otherPersonas1, otherPersonas2],
  },
  {
    caption: 'Problem-statement chains: is, trying to, but, because, which makes them feel.',
    images: [problemChains1, problemChains2, problemChains3, problemChains4, problemChains5, problemChains6],
  },
  {
    caption: 'User goals held against business objectives, kept as two separate perspectives.',
    images: [goalsVsObjectives1, goalsVsObjectives2, goalsVsObjectives3, goalsVsObjectives4],
  },
  {
    caption: 'The voter journey, from discovery to the detailed alignment result.',
    images: [journey1, journey2, journey3, journey4, journey5],
  },
  {
    caption: 'Page and feature prioritisation, tied back to specific personas and problem statements.',
    images: [prioritisation1, prioritisation2, prioritisation3],
  },
];

/* 4 — From the research. */
function FromTheResearch() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">How I got there</h2>
      <p className="cs-body">
        The full research set ran deep. Rather than reproduce all of it, these are the pieces that
        most changed the design.
      </p>

      <div className="cs-figure-grid">
        {RESEARCH_BOARDS.map(({ caption, images }) => (
          <FigureCarousel
            key={caption}
            caption={caption}
            items={images.map((src, i) => ({
              src,
              alt: images.length > 1 ? `${caption} — board ${i + 1}` : caption,
              caption: images.length > 1
                ? `${caption} · ${i + 1} of ${images.length}`
                : caption,
            }))}
          />
        ))}
      </div>

      <p className="up-note">
        <strong>Grounded in.</strong> Upvote research set: voter, politician and non-profit
        personas; per-persona problem statements; user-goals and business-objectives maps; user
        stories; feature and page prioritisation; voter and partner journey maps; task flows.
      </p>
    </Section>
  );
}

const BIAS_DECISIONS = [
  {
    risk: 'A leading scale or loaded phrasing',
    decision: 'Every question is framed on a symmetric fully-support to fully-oppose scale, with five options plus Other, so no answer sits in a privileged position.',
  },
  {
    risk: 'Archetype names that flatter or judge',
    decision: 'Twelve even-handed archetypes. Nobody is the extremist or the sensible one; each name is a role, not a verdict.',
  },
  {
    risk: "Partisan colour reading as the app's opinion",
    decision: 'The interface speaks in a non-partisan brown and gold. Red and blue appear only as data: a party logo, a candidate, or the agree-oppose slider, never as the design’s own voice.',
  },
  {
    risk: 'A single left-or-right label flattening nuance',
    decision: 'Results break down per subtopic on an Opposes to Supports slider, so you see exactly where you and each candidate land, issue by issue.',
  },
];

/* Names and colours read from Figma 90:322, not eyedropped. */
const ARCHETYPES = [
  { name: 'Justice Trailblazer', color: '#FFBB6C' },
  { name: 'Equality Guardian', color: '#8FCCF9' },
  { name: 'Freedom Pioneer', color: '#FD8C8C' },
  { name: 'Market Mavericks', color: '#ECE770' },
  { name: 'Heritage Keeper', color: '#CADCE9' },
  { name: 'Balanced Diplomat', color: '#91EBCA' },
  { name: 'Silent Observer', color: '#EBCEBE' },
  { name: 'Green Guardian', color: '#BAF084' },
  { name: 'Quiet Questioner', color: '#F29ACF' },
  { name: 'Humanity Harbinger', color: '#C8AAFA' },
  { name: 'Patriot Protector', color: '#FFC19F' },
  { name: 'Solution Seeker', color: '#FFF6F1' },
];

const OPPOSE_FACES = [oppose1, oppose2, oppose3, oppose4, oppose5];
const SUPPORT_FACES = [support1, support2, support3, support4, support5];

/* The alignment slider, rebuilt rather than screenshotted: Figma 90:265 is a
   vector "Input form", and this is the one element that has to demonstrate the
   neutrality claim rather than assert it. The track is centre-anchored on "You",
   with oppose running left in red and support right in green. */
function AlignmentSlider() {
  return (
    <div className="up-slider-card">
      <img src={sliderIcon} alt="" aria-hidden="true" width={76} height={76} />

      <div className="up-slider-main">
        <div className="up-slider-title">
          <h3>Income Inequality</h3>
          <span className="up-compare">
            <img src={compareIcon} alt="" aria-hidden="true" width={16} height={16} />
            Compare
          </span>
        </div>

        <p className="up-slider-desc">
          The signature element. Your position sits between two brackets on a symmetric scale, and
          a candidate&rsquo;s position can be laid over the same track. Agreement is the only thing
          colour encodes here.
        </p>
        <span className="up-readmore">
          Read More
          <img src={chevronIcon} alt="" aria-hidden="true" width={19} height={19} />
        </span>

        <div
          className="up-slider-track"
          role="img"
          aria-label="Symmetric alignment scale centred on your position: 12 percent toward least support, 64 percent toward most support"
        >
          <span className="up-slider-half is-oppose">
            <span className="up-slider-marker"><em>12%</em></span>
            <span className="up-slider-fill" />
          </span>
          <span className="up-slider-centre"><span>You</span></span>
          <span className="up-slider-half is-support">
            <span className="up-slider-fill" />
            <span className="up-slider-marker"><em>64%</em></span>
          </span>
        </div>

        <div className="up-slider-ends">
          <span>Least Support</span>
          <span>Most Support</span>
        </div>

        <div className="up-slider-faces">
          <div>
            {OPPOSE_FACES.map((src, i) => (
              <img key={src} src={src} alt={i === 0 ? 'Candidates at the least-support end' : ''} loading="lazy" />
            ))}
          </div>
          <div>
            {SUPPORT_FACES.map((src, i) => (
              <img key={src} src={src} alt={i === 0 ? 'Candidates at the most-support end' : ''} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5 — Design. */
function Design() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Where the thumb comes off the scale</h2>
      <p className="cs-body">
        Neutrality here is not vagueness. The result is specific and honest: it names your party
        and matches you to real candidates. What stays neutral is everything that could tilt the
        answer before you give it. These are small decisions individually. Together they are the
        product.
      </p>

      <div className="up-bias">
        <div className="up-bias-head">
          <span>What could bias the result</span>
          <span>The decision</span>
        </div>
        {BIAS_DECISIONS.map(({ risk, decision }) => (
          <div key={risk} className="up-bias-row">
            <p>{risk}</p>
            <p>{decision}</p>
          </div>
        ))}
      </div>

      <AlignmentSlider />

      <div className="up-archetypes">
        <h3>Twelve archetypes, no winners</h3>
        <p>
          Each result names an archetype in its own colour. The set is deliberately even: a spread
          of roles across the spectrum, none framed as more reasonable than the next.
        </p>
        <div className="up-archetype-grid">
          {ARCHETYPES.map(({ name, color }) => (
            <div key={name} className="up-archetype">
              <span>You are the</span>
              <strong style={{ color }}>{name}</strong>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* Hex values read from Figma 90:376. */
const CORE_PALETTE = [
  { name: 'Charcoal brown', role: 'Ground · unaligned', swatch: '#362F2D' },
  { name: 'Civic gold', role: 'The one action', swatch: '#E9C873' },
  { name: 'Cream', role: 'Calm, readable text', swatch: '#DFD4C5' },
  { name: 'Red / green', role: 'Data only, never voice', swatch: ['#9B3525', '#1F6E39'] },
];

/* The extended palette is the twelve archetype colours, in the same order. */
const EXTENDED_PALETTE = ARCHETYPES.map(a => a.color);

/* 6 — Branding. */
function Branding() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">The palette is the argument</h2>
      <p className="cs-body">
        The biggest branding trap for a political tool is looking partisan, so the identity had to
        carry the neutrality claim before a single word did. The whole system is built on a warm
        charcoal brown and a muted gold. Brown reads as earthy, institutional and unaligned, where
        navy skews establishment and red skews right. Gold reads as civic and considered, the
        register of a ballot or a seal, without belonging to any party. Cream text on the dark
        ground keeps a heavy subject calm and trustworthy rather than urgent or campaign-like.
      </p>
      <p className="cs-body">
        Colour is then withheld everywhere it might editorialise. Gold marks the one action worth
        taking. Blue appears only on interactive controls inside the survey, the radios and the
        Next button, where it means &ldquo;this is where you act,&rdquo; not &ldquo;this is a
        side.&rdquo; Red and green live only on the alignment slider and the highest and lowest
        scores, where they measure agreement. Partisan colour only ever shows up as data.
      </p>
      <p className="cs-body">
        Typography does the same work. A rounded, friendly grotesque carries the headlines, which
        lowers the barrier and keeps a tense topic approachable. A plain neutral face handles the
        body, which signals objectivity over persuasion. The sum of it says calm, trustworthy,
        non-partisan, for everyone, which is the exact promise the product has to make and the
        exact thing a red-or-blue identity would have broken.
      </p>

      <div className="up-swatches">
        {CORE_PALETTE.map(({ name, role, swatch }) => (
          <div key={name} className="up-swatch">
            <span
              className="up-swatch-chip"
              style={Array.isArray(swatch)
                ? { background: `linear-gradient(90deg, ${swatch[0]} 50%, ${swatch[1]} 50%)` }
                : { background: swatch }}
            />
            <strong>{name}</strong>
            <span className="up-swatch-role">{role}</span>
          </div>
        ))}
      </div>

      <figure className="cs-figure-card up-palette">
        <div className="up-palette-strip">
          {EXTENDED_PALETTE.map(hex => (
            <span key={hex} style={{ background: hex }} />
          ))}
        </div>
        <figcaption>
          <strong>Extended Color Palette</strong>
          <span>Archetype colours</span>
        </figcaption>
      </figure>
    </Section>
  );
}

const RESULT_CALLOUTS = [
  { n: '1', title: 'Named, not judged', body: 'Your archetype leads in its own colour. It is a role, not a verdict.' },
  { n: '2', title: 'Honest match', body: 'A real party logo and candidate photo with a percentage. The tool commits to an answer.' },
  { n: '3', title: 'Highest and lowest', body: 'Green for your strongest theme, red for your weakest. Colour as data, not opinion.' },
];

const DESKTOP_SCREENS = [
  { src: surveyEntry, caption: 'Survey entry — the calm dark hero and a single gold call to action.' },
  { src: surveyQuestion, caption: 'A question on the symmetric fully-support to fully-oppose scale, grouped by theme.' },
  { src: resultTopics, caption: 'Results broken down by topic, each on its own alignment slider.' },
  { src: candidateDetail, caption: 'Candidate by topic and subtopic, each on its own alignment slider with a Compare action.' },
];

const MOBILE_SCREENS = [
  { src: mobileEntry, caption: 'Mobile entry, the same single gold action.' },
  { src: mobileMatching, caption: 'Candidate matching, free and premium tiers.' },
  { src: mobileUnlock, caption: 'The premium upgrade, kept out of the result itself.' },
  { src: mobileParty, caption: 'Overall party alignment as a share, not a verdict.' },
];

/* 7 — The work. */
function TheWork() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">From a one-minute survey to an honest read</h2>
      <p className="cs-body">
        The flow moves from an inviting entry, through symmetric questions grouped by theme, to a
        result screen that is specific without being pushy.
      </p>

      <FigureCard
        src={resultScreen}
        alt="The result screen, naming the archetype and the candidate match"
        width={952}
        fit="cover-top"
      />

      <div className="up-callouts">
        {RESULT_CALLOUTS.map(({ n, title, body }) => (
          <div key={n} className="up-callout">
            <span className="up-callout-n">{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <FigureGroup>
        {DESKTOP_SCREENS.map(({ src, caption }) => (
          <FigureCard key={caption} src={src} alt={caption} caption={caption} fit="cover-top" />
        ))}
      </FigureGroup>

      <FigureGroup columns={4}>
        {MOBILE_SCREENS.map(({ src, caption }) => (
          <FigureCard
            key={caption}
            src={src}
            alt={caption}
            caption={caption}
            width={220}
            fit="cover-top"
            aspect="225 / 481"
          />
        ))}
      </FigureGroup>
    </Section>
  );
}

const OUTCOMES = [
  {
    problem: 'A political topic feels heavy to start',
    design: 'Calm, focused entry screen with a single clear action',
    signal: 'Survey completion',
  },
  {
    problem: 'A biased-feeling result loses trust',
    design: 'Symmetric scale, neutral presentation, transparent output',
    signal: 'Result trust and sharing',
  },
  {
    problem: 'Left vs. right hides real nuance',
    design: 'Topic-level sliders and 12 archetypes',
    signal: 'Result exploration and comparison use',
  },
];

/* 8 — Outcome. */
function Outcome() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What it moved</h2>
      <p className="cs-body">
        UpVote shipped and went on to raise $1.5M. The work covered here focused on the consumer
        alignment product, helping people understand where they stand politically and compare
        their views with parties and candidates in a way that felt clear, balanced, and credible.
      </p>
      <p className="cs-body">
        The company later shifted its focus toward lobbying. This case study covers the consumer
        product as it was designed and launched.
      </p>
      <p className="cs-body">
        For us, success wasn&rsquo;t just getting people to start the survey. It was whether they
        finished it, trusted the result, and found it useful enough to explore further.
      </p>

      <div className="cs-outcomes">
        {OUTCOMES.map(({ problem, design, signal }) => (
          <div key={problem} className="cs-outcome-row">
            <div><span>Problem</span><p>{problem}</p></div>
            <span className="cs-outcome-arrow" aria-hidden="true">→</span>
            <div><span>Design</span><p>{design}</p></div>
            <span className="cs-outcome-arrow" aria-hidden="true">→</span>
            <div><span>Success signal</span><p>{signal}</p></div>
          </div>
        ))}
      </div>

      <h3 className="cs-heading cs-looking-back">Looking back</h3>
      <p className="cs-body">
        The biggest lesson was that neutrality doesn&rsquo;t mean avoiding an answer. UpVote still
        needed to tell people where they stood, including how their views compared with parties
        and candidates. The important part was making sure the interface itself wasn&rsquo;t
        pushing them toward a particular result.
      </p>
      <p className="cs-body">
        Once that became clear, a lot of the design came down to restraint. Colour, wording,
        ordering, and even how results were visualised had to help people understand the result
        without quietly influencing it.
      </p>
    </Section>
  );
}

const SECTION_BODIES = {
  context: Context,
  'why-this-needed-to-exist': WhyThisNeededToExist,
  'the-research': TheResearch,
  'from-the-research': FromTheResearch,
  design: Design,
  branding: Branding,
  'the-work': TheWork,
  outcome: Outcome,
};

function Hero() {
  return (
    <section className="cs-hero">
      <div style={{ ...HERO_SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 40 }}>
        <div className="cs-hero-brand">
          <span className="cs-logomark">
            <img src={upvoteLogomark} alt="" aria-hidden="true" width={46} height={48} />
          </span>
          <h1 className="cs-title">Upvote</h1>
        </div>

        <p className="cs-hero-intro">
          The Upvote Political Alignment Survey gives voters a clear picture of where they align
          politically during the 2024 U.S. election. My job was making sure the experience stayed
          neutral, so it never felt like it was pushing users toward a particular outcome.
        </p>

        <dl className="cs-meta">
          {META.map(({ term, value, badge }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{badge ? <span className="cs-badge">{value}</span> : value}</dd>
            </div>
          ))}
        </dl>

        <hr className="cs-hero-rule" />

        <figure className="cs-hero-figure">
          <img src={heroShot} alt="The Upvote Political Alignment Survey" />
          <figcaption className="cs-hero-pill">
            Upvote<span> • 2023</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* Rendered as a sibling of the hero, not inside it: a sticky element is bounded
   by its parent, so nested in the hero it would unstick as soon as the hero
   scrolled past. */
function JumpNav() {
  const active = useActiveSection();

  return (
    <nav className="cs-jump" aria-label="Sections">
      <div style={HERO_SHELL}>
        <ul>
          {JUMP_NAV.map(({ label, target }, i) => (
            <li key={label} className={i === active ? 'is-active' : undefined}>
              <a
                href={target ? `#${target}` : '#top'}
                onClick={e => {
                  e.preventDefault();
                  const el = target ? document.getElementById(target) : null;
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  const links = [
    { label: 'Read CV', href: 'https://talent.toptal.com/resume/designers/saad-malik1' },
    { label: 'Behance', href: 'www.behance.net/meetsaadmalik' },
    { label: 'Dribbble', href: 'https://dribbble.com/meet-saad-malik/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/meetsaadmalik/' },
  ];

  return (
    <footer className="cs-footer">
      <div style={COLUMN}>
        <div className="cs-footer-inner">
          <div className="cs-footer-mark">
            <span className="font-typewriter">© 26</span>
            <span className="cs-footer-name">Saad Malik</span>
          </div>
          <nav>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="footer-link"
                {...(href === '#'
                  ? { onClick: e => e.preventDefault() }
                  : { target: '_blank', rel: 'noreferrer' })}
              >
                <span className="font-typewriter">{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function UpvotePage() {
  const [viewer, setViewer] = useState(null);
  const openLightbox = useCallback((items, startIndex) => setViewer({ items, startIndex }), []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      <main className="cs-page is-upvote">
        <Hero />
        <JumpNav />
        {SECTIONS.map(section => {
          const Body = SECTION_BODIES[section.id];
          return (
            <div key={section.id}>
              <SectionLabel {...section} />
              {Body && <Body />}
            </div>
          );
        })}
        <Footer />
      </main>

      {viewer && (
        <Lightbox
          items={viewer.items}
          startIndex={viewer.startIndex}
          onClose={() => setViewer(null)}
        />
      )}
    </LightboxContext.Provider>
  );
}
