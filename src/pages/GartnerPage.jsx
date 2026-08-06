import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import gartnerLogomark from '../assets/case-gartner/gartner-logomark.svg';
import heroShot from '../assets/case-advisory.png';
import personaShot from '../assets/case-gartner/image-3-1-9-5-9.png';
import avatarSaad from '../assets/case-gartner/ellipse-6.png';
import avatarVpDesign from '../assets/case-gartner/ellipse-7.png';
import avatarHeadCx from '../assets/case-gartner/ellipse-8.png';
import avatarDirProduct from '../assets/case-gartner/ellipse-9.png';
import avatarCxStrategy from '../assets/case-gartner/ellipse-1-0.png';
import avatarResearcher from '../assets/case-gartner/ellipse-1-1.png';
import avatarEngLead from '../assets/case-gartner/ellipse-1-2.png';
import homePage from '../assets/case-gartner/home-page-1.png';
import execFastStart from '../assets/case-gartner/executive-fast-start-1.png';
import vendorBriefing from '../assets/case-gartner/vendor-breifing-1.png';
import inquiryCall from '../assets/case-gartner/schedule-your-inquiry-1.png';
import engagementModal from '../assets/case-gartner/current-engagement-model-1.png';
import coreElements from '../assets/case-gartner/experience-core-elements-data-1.png';
import journeyMap from '../assets/case-gartner/image-3-1-9-6-0.png';
import infoArchitecture from '../assets/case-gartner/ia-1-1.png';
import existingPortal from '../assets/case-gartner/image-3-1-9-7-9.png';
import oppsSlideA from '../assets/case-gartner/image-31998-da7ae1.png';
import oppsSlideB from '../assets/case-gartner/image-32001-79bb6b.png';
import compStructures from '../assets/case-gartner/image-3-1-9-6-7.png';
import compSalesforce from '../assets/case-gartner/image-3-1-9-7-0.png';
import compAsana from '../assets/case-gartner/image-3-1-9-7-1.png';
import compLinear from '../assets/case-gartner/image-3-1-9-7-2.png';
import compHubspot from '../assets/case-gartner/image-3-1-9-7-3.png';
import compInsights from '../assets/case-gartner/image-3-1-9-7-4.png';
import engagementRedesign from '../assets/case-gartner/image-3-1-9-7-5.png';
import newInfoModel from '../assets/case-gartner/image-3-1-9-7-6.png';
import keyProblemLifecycle from '../assets/case-gartner/image-3-1-9-7-7.png';
import designPrinciplesShot from '../assets/case-gartner/image-3-1-9-7-8.png';
import explorationOverview from '../assets/case-gartner/exploration-112-5476.png';
import explorationConversation from '../assets/case-gartner/exploration-112-5461.png';
/* §10 feature screens. Each feature is a small carousel; swap any single import
   below to change that slide. Counts: 1 / 3 / 6 / 6 / 2. */
import overview1 from '../assets/case-gartner/image-3-1-9-9-2.png';

import focusAreas1 from '../assets/case-gartner/feature-02.png';
import focusAreas2 from '../assets/case-gartner/image-3-1-9-9-1.png';
import focusAreas3 from '../assets/case-gartner/image-3-1-9-9-3.png';

import newRequest1 from '../assets/case-gartner/feature-03.png';
import newRequest2 from '../assets/case-gartner/image-3-1-9-9-4.png';
import newRequest3 from '../assets/case-gartner/image-3-1-9-9-5.png';
import newRequest4 from '../assets/case-gartner/image-3-1-9-9-6.png';
import newRequest5 from '../assets/case-gartner/image-3-1-9-9-7.png';
import newRequest6 from '../assets/case-gartner/image-3-1-9-9-9.png';

import discussions1 from '../assets/case-gartner/feature-04.png';
import discussions2 from '../assets/case-gartner/image-3-2-0-0-0.png';
import discussions3 from '../assets/case-gartner/image-3-2-0-0-2.png';
import discussions4 from '../assets/case-gartner/image-3-2-0-0-3.png';
import discussions5 from '../assets/case-gartner/image-3-2-0-0-4.png';
import discussions6 from '../assets/case-gartner/image-3-2-0-0-5.png';

import keyProblems1 from '../assets/case-gartner/feature-05.png';
import keyProblems2 from '../assets/case-gartner/image-3-2-0-0-6.png';
import Lightbox from '../components/Lightbox';
import { SECTIONS, JUMP_NAV } from './gartnerSections';

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
  { term: 'Role', value: 'Lead Product Designer' },
  { term: 'Status', value: 'Beta Testing', badge: true },
  { term: 'Audiences', value: 'C-Suite Executives' },
  { term: 'Tools', value: 'Figma, FigJam' },
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
   thumbnail strip beneath. Clicking opens the gallery, which never auto-plays. */
function FigureCarousel({ items, caption, aspect = '462 / 293' }) {
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
              <img src={item.src} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {caption && <figcaption>{caption}</figcaption>}
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

/* Bordered card with the image on top and a caption bar beneath. `fit` mirrors
   Figma: persona-style art is contained, screenshots are cropped from the top.
   Passing `onOpen` turns the card into a button for the click-to-open figures. */
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

/* Titled group of figure cards, laid out 2-up like Figma's 464 + 24 + 464 = 952. */
function FigureGroup({ title, children }) {
  return (
    <div className="cs-figure-group">
      {title && <h3>{title}</h3>}
      <div className="cs-figure-grid">{children}</div>
    </div>
  );
}

const TEAM = [
  { name: 'Saad Malik', role: 'Lead Product Designer', avatar: avatarSaad, self: true },
  { name: 'VP of Design', avatar: avatarVpDesign },
  { name: 'Head of CX', avatar: avatarHeadCx },
  { name: 'Director of Product', avatar: avatarDirProduct },
  { name: 'Head of CX Strategy', avatar: avatarCxStrategy },
  { name: 'UX Researcher', avatar: avatarResearcher },
  { name: 'Engineering Lead', avatar: avatarEngLead },
];

const STATS = [
  { value: '7%', caption: 'of engagements ran through the portal' },
  { value: '93%', caption: 'stayed in email and calls' },
  { value: '$75K+', caption: 'typical engagement, per year' },
];

/* 1 — Understanding the problem. Two columns: a lead-in line beside the argument. */
function UnderstandingTheProblem() {
  return (
    <Section>
      <div className="cs-split">
        <h2 className="cs-lead">On paper, everything a client needed already existed.</h2>
        <div className="cs-split-body">
          <p>
            Gartner already offered a broad ecosystem of advisory services. More than 88,000
            enterprise clients could schedule analyst inquiries, read research, request vendor
            briefings, and work with over 2,200 experts across hundreds of technology domains.
          </p>
          <p className="cs-emphasis">
            And yet the client portal wasn&rsquo;t where that work actually happened.
          </p>
          <div className="cs-stats">
            {STATS.map(({ value, caption }) => (
              <div key={value} className="cs-stat">
                <strong>{value}</strong>
                <span>{caption}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* 2 — My role. */
function MyRole() {
  return (
    <Section>
      <h2 className="cs-heading">The Team</h2>
      <p className="cs-body">
        I was the lead UX and product designer on a team of seven. I owned the design end to
        end: information architecture, flows, prototype, and the visual system. I worked closely
        with a UX researcher on discovery and synthesis, and with product, CX, and engineering
        leads to shape and pressure-test the direction.
      </p>
      <ul className="cs-team">
        {TEAM.map(({ name, role, avatar, self }) => (
          <li key={name} className={self ? 'is-self' : undefined}>
            <img src={avatar} alt="" aria-hidden="true" width={20} height={20} />
            <span>
              {name}
              {role && <span className="cs-team-role">{` · ${role}`}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* 3 — Who is it for. */
function WhoIsItFor() {
  return (
    <Section>
      <h2 className="cs-heading">Target Audience</h2>
      <p className="cs-body">
        CIOs and senior tech leaders running months-long initiatives: cloud migrations, security
        overhauls, vendor consolidation.
      </p>
      <FigureCard
        src={personaShot}
        alt="Persona sheet for the senior technology leader"
        caption="User Persona"
      />
    </Section>
  );
}

const DISCOVERY_PROBLEMS = [
  'Reducing cloud costs',
  'Modernizing security',
  'Evaluating technology vendors',
  'Planning AI adoption',
];

const DISCOVERY_INSIGHTS = [
  {
    n: '01',
    title: 'Status was hard to see',
    body: "Clients could have active work underway with no clear answer to what's happening now, what's blocked, or what comes next.",
    response: 'Surface active discussions, upcoming meetings, actions, and open problems on the workspace overview.',
  },
  {
    n: '02',
    title: 'History was fragmented',
    body: "Past calls, recommendations, and expert interactions existed, but they didn't build on one another.",
    response: 'Keep discussions, recommendations, and problems attached to the focus area they belong to.',
  },
  {
    n: '03',
    title: 'New requests started from scratch',
    body: "A client's next question usually related to work that already happened, yet a new request behaved like a blank slate.",
    response: 'Let new inquiries inherit the focus area, problem, past discussion, attachments, and timing.',
  },
];

const EXISTING_EXPERIENCE = [
  { src: homePage, caption: 'Home' },
  { src: execFastStart, caption: 'Executive FastStart' },
  { src: vendorBriefing, caption: 'Vendor Briefing Form' },
  { src: inquiryCall, caption: 'Inquiry Call Form' },
];

/* 4 — Discovery. */
function Discovery() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Clients don&rsquo;t think in services. They think in problems.
      </h2>
      <p className="cs-body">
        The first few weeks were spent with CIOs, executive partners, analysts, and internal
        stakeholders, mapping how advisory work actually unfolds over time. One pattern came up
        again and again: clients rarely talked about Gartner&rsquo;s services. They talked about
        the work they were trying to get done.
      </p>
      <ul className="cs-bullets">
        {DISCOVERY_PROBLEMS.map(item => <li key={item}>{item}</li>)}
      </ul>
      <p className="cs-body">
        Those business problems naturally pulled them through different services. A client might
        start with research, move into an analyst inquiry, schedule a vendor briefing, get a
        recommendation, then pick the discussion back up weeks later. To the client it felt like
        one continuous piece of work. Inside the product, it became a series of separate
        experiences.
      </p>

      <div className="cs-insights">
        {DISCOVERY_INSIGHTS.map(({ n, title, body, response }) => (
          <article key={n} className="cs-insight">
            <span className="cs-insight-n">{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <span className="cs-insight-label">Design response</span>
            <p className="cs-insight-response">{response}</p>
          </article>
        ))}
      </div>

      <FigureGroup title="The existing experience">
        {EXISTING_EXPERIENCE.map(({ src, caption }) => (
          <FigureCard key={caption} src={src} alt={caption} caption={caption} fit="cover-top" />
        ))}
      </FigureGroup>

      <FigureGroup title="The existing engagement modal">
        <FigureCard src={engagementModal} alt="Existing engagement modal" caption="Existing Engagement Modal" fit="cover-top" />
        <FigureCard src={coreElements} alt="Core elements data" caption="Existing Experience Core Elements Data" fit="cover-top" />
      </FigureGroup>
      <p className="cs-body">
        The way a client kicked off an engagement showed the problem in miniature. Every request
        began cold, with no memory of the work it related to. Open it to see the old flow next to
        the redesign.
      </p>

      <FigureGroup title="The relationship before Workspace">
        <FigureCard src={journeyMap} alt="Existing journey map" caption="Existing Journey Map" fit="cover-top" />
        <FigureCard src={infoArchitecture} alt="Existing information architecture" caption="Existing Information Architecture" fit="cover-top" />
      </FigureGroup>
      <p className="cs-body">
        Mapped across a full engagement, the work moved cleanly from a client problem to a call, a
        recommendation, and a follow-up. Then a new interaction would start, and the story had to
        be rebuilt from scratch. That rebuild, the context gap at the end, was the moment the
        relationship stopped feeling continuous.
      </p>
    </Section>
  );
}

/* 5 — What research revealed. */
function WhatResearchRevealed() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Not a lack of information. A lack of connection.</h2>
      <p className="cs-body">
        As journey maps, and existing workflows came together, another pattern was hard to ignore.
        Most services already solved a clear need on their own. The trouble showed up when clients
        moved between them. Research, recommendations, vendor briefings, meeting history, and
        follow-ups all stayed tied to the service that created them, rather than the business
        problem they supported.
      </p>
      <p className="cs-body">
        Every interaction produced something useful, but very little carried into the next step.
        Clients repeated context they&rsquo;d already shared. Analysts rebuilt earlier
        conversations before they could move forward. Recommendations got harder to revisit as the
        work evolved. The issue wasn&rsquo;t missing information. It was how that information was
        structured across the advisory journey.
      </p>

      <div className="cs-figure-grid">
        {/* Figma clips a 410×700 render inside a 462×363 box, centred, 10.71px down. */}
        {/* src is passed for the viewer; children still render the cropped placement. */}
        <FigureCard
          src={existingPortal}
          alt="The existing portal"
          caption="Existing portal - Where work fell between services."
          aspect="462 / 363"
          fit="crop"
        >
          <img
            className="cs-crop-img"
            src={existingPortal}
            alt="The existing portal"
            loading="lazy"
            style={{ width: '88.74%', top: '2.95%' }}
          />
        </FigureCard>
        <FigureCarousel
          caption="Key Opportunities and Insights"
          items={[
            { src: oppsSlideA, alt: 'Disconnected client interactions, and recommendations that are difficult to rediscover' },
            { src: oppsSlideB, alt: 'Further opportunity and insight boards' },
          ]}
        />
      </div>

      <blockquote className="cs-quote">
        How can information stay connected as clients move across Gartner&rsquo;s ecosystem?
      </blockquote>
      <p className="cs-body cs-body-tight">
        The opportunity wasn&rsquo;t another workflow. It was a better information architecture.
      </p>
    </Section>
  );
}

const COMPETITORS = [
  { src: compSalesforce, caption: 'Salesforce - Organized around the account.' },
  { src: compAsana, caption: 'ASANA - Organized around the project.' },
  { src: compLinear, caption: 'Linear - Organized around the project.' },
  { src: compHubspot, caption: 'Hubspot - Everything around the customer.' },
];

/* 6 — Looking beyond advisory. First of the two click-to-open figure sets. */
function LookingBeyondAdvisory() {

  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Everyone good at this organizes around something that persists.
      </h2>
      <p className="cs-body">
        Competitive reviews showed how other advisory products handled similar work, but most
        followed the same service-based structure. So the search for a better way to organize
        information went past Gartner&rsquo;s competitors, to Salesforce, Asana, Linear, HubSpot,
        Jira, Monday, and ClickUp.
      </p>
      <p className="cs-body">
        None solved the same business problem, but each solved something structurally similar.
        They organized work around a thing that persisted over time, a customer, a project, a
        goal, with everything else accumulating around that object. The useful part wasn&rsquo;t
        the interface patterns. It was the underlying information model, and how it preserved
        context as work evolved.
      </p>

      <FigureGroup title="Competitor Analysis for Information Structures">
        <FigureCard
          src={compStructures}
          alt="Competitor analysis for information structures"
          caption="Competitor Analysis"
          fit="cover-top"
        />
      </FigureGroup>

      <p className="cs-hint">Platforms I reviewed, click to open</p>
      <FigureGroup title="Competitor Analysis">
        {COMPETITORS.map(item => (
          <FigureCard
            key={item.caption}
            src={item.src}
            alt={item.caption}
            caption={item.caption}
            fit="cover-top"
          />
        ))}
      </FigureGroup>

      <FigureGroup title="Insights">
        <FigureCard src={compInsights} alt="Competitor analysis insights" fit="cover-top" />
      </FigureGroup>

    </Section>
  );
}

/* 7 — The new engagement model. */
function NewEngagementModel() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        What if the client&rsquo;s objective was the thing everything connected to?
      </h2>
      <p className="cs-body">
        One idea kept returning through workshops and concept exploration: instead of organizing
        around Gartner&rsquo;s services, organize around the work the client is actually trying to
        accomplish. That became the foundation for Workspace.
      </p>
      <p className="cs-body">
        Each Workspace represents an ongoing business objective. Inside it, Focus Areas organize
        related work, and discussions, recommendations, research, expert engagements, resources,
        and decisions all stay connected, regardless of which Gartner service created them. The
        goal was never to replace the services. It was to connect them through a shared context.
      </p>

      <div className="cs-figure-grid">
        <FigureCard
          src={engagementRedesign}
          alt="Engagement model redesign"
          caption="Engagement Model Redesign"
          fit="cover-top"
        />
        <FigureCard
          src={newInfoModel}
          alt="New information model"
          caption="New Information Model"
          fit="cover-top"
        />
      </div>

      <FigureGroup title="Introduced Key Problems">
        <FigureCard
          src={keyProblemLifecycle}
          alt="The lifecycle of a Key Problem"
          caption="The lifecycle of a Key Problem"
          fit="cover-top"
        />
      </FigureGroup>
    </Section>
  );
}

const PRINCIPLES = [
  'Preserve context.',
  'Organize around business problems.',
  'Connect every interaction.',
  'Support executive decisions.',
];

/* 8 — Design principles. Content complete. */
function DesignPrinciples() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Four principles guided every decision.</h2>
      <ol className="cs-numbered">
        {PRINCIPLES.map(p => <li key={p}>{p}</li>)}
      </ol>
      <FigureGroup>
        <FigureCard
          src={designPrinciplesShot}
          alt="The four design principles"
          caption="Design Principles"
          fit="cover-top"
        />
      </FigureGroup>
    </Section>
  );
}

/* 9 — Explorations. Second of the two click-to-open figure sets. The second card
   has no caption bar in Figma, so it renders without one. */
function Explorations() {
  const cards = [
    { src: explorationOverview, caption: 'Overview - Early overview' },
    { src: explorationConversation, caption: null, alt: 'Conversation exploration' },
  ];

  return (
    <Section>
      <h2 className="cs-heading cs-measure">The version I didn&rsquo;t build was the tell.</h2>
      <p className="cs-body">
        Several directions came before the final experience. Some leaned heavily into
        AI-generated recommendations and conversational guidance. The idea resonated with
        stakeholders, but validating it properly would have meant building significant AI
        capabilities first.
      </p>
      <p className="cs-body">
        Rather than make that the foundation, I shifted focus to the more immediate problem:
        helping people preserve context as work moved between services. That simplified the
        experience, and it left a stronger platform for AI later.
      </p>

      <p className="cs-hint">Explorations, click to open</p>
      <div className="cs-figure-grid">
        {cards.map(card => (
          <FigureCard
            key={card.src}
            src={card.src}
            alt={card.alt ?? card.caption}
            caption={card.caption}
            fit="cover-top"
          />
        ))}
      </div>

    </Section>
  );
}

/* Five feature rows, alternating text/image as in Figma (T-I, I-T, T-I, I-T, T-I). */
const FEATURES = [
  {
    n: '01',
    title: 'Workspace overview',
    body: "The overview answers the practical questions first: what's happening, what needs attention, and what should I come back to? Recent discussions, upcoming meetings, active problems, and recommendations are all visible, without turning the screen into an activity dump.",
    points: [
      'Recent work over historical noise',
      'Clear active states and next actions',
      'Older activity tucked away until you need it',
    ],
    images: [overview1],
  },
  {
    n: '02',
    title: 'Focus Areas',
    body: 'Focus Areas turn a broad objective into a guided body of work. The goal sits at the top, dynamic tabs organize the different dimensions of the problem, and resolved issues can collapse away without erasing the history.',
    points: ['Goal-first structure', 'Tabs the client drives', 'Resolved problems kept as history'],
    images: [focusAreas1, focusAreas2, focusAreas3],
    imageFirst: true,
  },
  {
    n: '03',
    title: 'New request',
    body: "Starting a new inquiry shouldn't mean explaining the whole relationship again. The request flow carries the relevant focus area, key problem, discussion history, attachments, and preferred timeframe forward with it.",
    points: [
      'Context attached before you submit',
      'Structured enough to route',
      'Light enough to feel conversational',
    ],
    images: [newRequest1, newRequest2, newRequest3, newRequest4, newRequest5, newRequest6],
  },
  {
    n: '04',
    title: 'Discussions',
    body: "A discussion is the thread around an interaction, not just a calendar event. Before the call it holds context. During the call it's the way in. Afterward it becomes the home for follow-ups, recommendations, and anything still unresolved.",
    points: [
      'One thread before, during, and after',
      'Recommendations stay attached',
      'Escalate unresolved work into a Key Problem',
    ],
    images: [discussions1, discussions2, discussions3, discussions4, discussions5, discussions6],
    imageFirst: true,
  },
  {
    n: '05',
    title: 'Key Problems & Recommendations',
    body: "Some problems can't be solved in a single call. Key Problems create a durable object that many discussions and recommendations can feed, and Recommendations become something a client can return to, instead of something half-remembered from a meeting.",
    points: [
      'Persistent problem ownership',
      'Many experts can contribute over time',
      'Advice, tools, research, and next actions stay linked',
    ],
    images: [keyProblems1, keyProblems2],
  },
];

/* One feature's screens: cross-fades every 7s, thumbnails when there's more than
   one, and opens that feature's own gallery full screen. */
function FeatureMedia({ n, title, images }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const openLightbox = useLightbox();
  const reducedMotion = usePrefersReducedMotion();
  const many = images.length > 1;

  useEffect(() => {
    if (paused || reducedMotion || !many) return undefined;
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), CAROUSEL_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, many, images.length]);

  const gallery = images.map((src, i) => ({
    src,
    alt: `${title} — screen ${i + 1}`,
    caption: many ? `${n} — ${title} · ${i + 1} of ${images.length}` : `${n} — ${title}`,
  }));

  return (
    <div
      className="cs-feature-media-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <button
        type="button"
        className="cs-feature-media"
        aria-label={`Open ${title} full screen`}
        onClick={() => openLightbox(gallery, index)}
      >
        <span className="cs-feature-stack">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === index ? title : ''}
              loading={n === '01' && i === 0 ? 'eager' : 'lazy'}
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </span>
      </button>

      {many && (
        <div className="cs-feature-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === index ? 'is-selected' : undefined}
              aria-label={`Show ${title} screen ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={src} alt="" aria-hidden="true" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 10 — The product. */
function TheProduct() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        The final experience, built around the client&rsquo;s work.
      </h2>
      <p className="cs-body">
        Rather than asking clients to navigate Gartner&rsquo;s services, the product helps them
        continue the work they&rsquo;re already doing. Five pieces carry that idea.
      </p>

      {FEATURES.map(({ n, title, body, points, images, imageFirst }) => (
        <div key={n} className={`cs-feature${imageFirst ? ' is-reversed' : ''}`}>
          <div className="cs-feature-text">
            <span className="cs-insight-n">{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <ul>
              {points.map(pt => <li key={pt}>{pt}</li>)}
            </ul>
          </div>
          <FeatureMedia n={n} title={title} images={images} />
        </div>
      ))}
    </Section>
  );
}

const OUTCOMES = [
  {
    problem: "Clients lose track of what's active",
    design: 'A workspace overview with current work, attention states, and next actions',
    signal: 'Less effort to understand status',
  },
  {
    problem: 'Every new request starts from zero',
    design: 'An inquiry flow that inherits context, history, attachments, and timing',
    signal: 'Less repeated context before an expert engages',
  },
  {
    problem: 'Advice disappears after the call',
    design: 'Persistent discussions, key problems, and recommendations',
    signal: 'More continuity between interactions',
  },
];

/* 11 — Outcome. */
function Outcome() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What the design delivered.</h2>
      <p className="cs-body">
        This produced a complete product model and a high-fidelity experience for connecting the
        fragmented parts of Gartner&rsquo;s advisory relationship. I don&rsquo;t have verified
        post-launch performance numbers for it, so the outcome below sticks to what the design
        itself set out to do.
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
        One of the biggest takeaways was how much information architecture shapes the whole
        experience. The individual Gartner services already solved clear needs. The hard part was
        getting them to work together as one connected experience.
      </p>
      <p className="cs-body">
        In enterprise products, improving individual workflows isn&rsquo;t always enough. If the
        underlying information model doesn&rsquo;t match how people actually work, even
        well-designed screens can still feel disconnected. Once the structure started reflecting
        how clients approached their work, a lot of the interface decisions got much easier to
        make.
      </p>
    </Section>
  );
}

const SECTION_BODIES = {
  'understanding-the-problem': UnderstandingTheProblem,
  'my-role': MyRole,
  'who-is-it-for': WhoIsItFor,
  discovery: Discovery,
  'what-research-revealed': WhatResearchRevealed,
  'looking-beyond-advisory': LookingBeyondAdvisory,
  'the-new-engagement-model': NewEngagementModel,
  'design-principles': DesignPrinciples,
  explorations: Explorations,
  'the-product': TheProduct,
  outcome: Outcome,
};

function Hero() {
  return (
    <section className="cs-hero">
      <div style={{ ...HERO_SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 40 }}>
      <div className="cs-hero-brand">
      <span
          className="cs-logomark"
          style={{ background: '#3B3431' }}
        >
          <img
            src={gartnerLogomark}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />
        </span>
        <h1 className="cs-title">Gartner</h1>
      </div>

        <p className="cs-hero-intro">
          Gartner had world-class advisory expertise and 88,000 enterprise clients. But only 7%
          of that advisory work happened in the product. I redesigned it around the client&rsquo;s
          actual goals, so the whole relationship lived in one place instead of scattered across
          email and calls.
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
          <img src={heroShot} alt="The redesigned Gartner advisory workspace" />
          <figcaption className="cs-hero-pill">
            Gartner<span> • 2026</span>
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
        {/* Figma nests the nav a further 80px inside the hero pad, so it lines up
            with the section labels at x=244 rather than the hero at 164. */}
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

export default function GartnerPage() {
  const [viewer, setViewer] = useState(null);
  const openLightbox = useCallback((items, startIndex) => setViewer({ items, startIndex }), []);

  return (
    <LightboxContext.Provider value={openLightbox}>
    <main className="cs-page">
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
