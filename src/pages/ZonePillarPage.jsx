import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import zonepillarLogomark from '../assets/case-zonepillar/zonepillar-logomark.svg';
import heroShot from '../assets/case-construction.png';

/* §2 Research */
import painPoints from '../assets/case-zonepillar/research/user-pain-points.png';
import businessObjectives from '../assets/case-zonepillar/research/business-objectives.png';

/* §3 Personas */
import personaAdmin from '../assets/case-zonepillar/personas/persona-admin.png';
import personaManager from '../assets/case-zonepillar/personas/persona-manager.png';
import personaLaborer from '../assets/case-zonepillar/personas/persona-laborer.png';

/* §4 Problem statements and user stories */
import problemAdmin from '../assets/case-zonepillar/problems/problem-statement-1.png';
import problemManager from '../assets/case-zonepillar/problems/problem-statement-2.png';
import problemLaborer from '../assets/case-zonepillar/problems/problem-statement-3.png';
import storiesAdmin from '../assets/case-zonepillar/problems/user-stories-admin.png';
import storiesManager from '../assets/case-zonepillar/problems/user-stories-manager.png';
import storiesLaborer from '../assets/case-zonepillar/problems/user-stories-laborer.png';

/* §5 Structure — mental models */
import mentalPortal from '../assets/case-zonepillar/structure/mental-models-portal.png';
import mentalMobile from '../assets/case-zonepillar/structure/mental-models-mobile.png';

/* §6 Information architecture */
import iaPortal from '../assets/case-zonepillar/structure/ia-portal.png';
import iaMobile from '../assets/case-zonepillar/structure/ia-mobile.png';

/* §7 Wireframes. Each card is a small carousel; swap any single import below
   to change that slide. Counts: 3 / 3 / 5 / 4 / 3 / 4 / 3 / 3 / 3 / 4 / 1. */
import wfDash1 from '../assets/case-zonepillar/wireframes/dashboard-1.png';
import wfDash2 from '../assets/case-zonepillar/wireframes/dashboard-2.png';
import wfDash3 from '../assets/case-zonepillar/wireframes/dashboard-3.png';

import wfProjects1 from '../assets/case-zonepillar/wireframes/all-projects-1.png';
import wfProjects2 from '../assets/case-zonepillar/wireframes/all-projects-2.png';
import wfProjects3 from '../assets/case-zonepillar/wireframes/all-projects-3.png';

import wfOverview1 from '../assets/case-zonepillar/wireframes/project-overview-1.png';
import wfOverview2 from '../assets/case-zonepillar/wireframes/project-overview-2.png';
import wfOverview3 from '../assets/case-zonepillar/wireframes/project-overview-3.png';
import wfOverview4 from '../assets/case-zonepillar/wireframes/project-overview-4.png';
import wfOverview5 from '../assets/case-zonepillar/wireframes/project-overview-5.png';

import wfTeam1 from '../assets/case-zonepillar/wireframes/team-messages-1.png';
import wfTeam2 from '../assets/case-zonepillar/wireframes/team-messages-2.png';
import wfTeam3 from '../assets/case-zonepillar/wireframes/team-messages-3.png';
import wfTeam4 from '../assets/case-zonepillar/wireframes/team-messages-4.png';

import wfRfi1 from '../assets/case-zonepillar/wireframes/rfi-records-1.png';
import wfRfi2 from '../assets/case-zonepillar/wireframes/rfi-records-2.png';
import wfRfi3 from '../assets/case-zonepillar/wireframes/rfi-records-3.png';

import wfOrders1 from '../assets/case-zonepillar/wireframes/change-orders-1.png';
import wfOrders2 from '../assets/case-zonepillar/wireframes/change-orders-2.png';
import wfOrders3 from '../assets/case-zonepillar/wireframes/change-orders-3.png';
import wfOrders4 from '../assets/case-zonepillar/wireframes/change-orders-4.png';

import wfPlans1 from '../assets/case-zonepillar/wireframes/plans-viewer-1.png';
import wfPlans2 from '../assets/case-zonepillar/wireframes/plans-viewer-2.png';
import wfPlans3 from '../assets/case-zonepillar/wireframes/plans-viewer-3.png';

import wfProfile1 from '../assets/case-zonepillar/wireframes/settings-profile-1.png';
import wfProfile2 from '../assets/case-zonepillar/wireframes/settings-profile-2.png';
import wfProfile3 from '../assets/case-zonepillar/wireframes/settings-profile-3.png';

import wfNotif1 from '../assets/case-zonepillar/wireframes/settings-notifications-1.png';
import wfNotif2 from '../assets/case-zonepillar/wireframes/settings-notifications-2.png';
import wfNotif3 from '../assets/case-zonepillar/wireframes/settings-notifications-3.png';

import wfPrivacy1 from '../assets/case-zonepillar/wireframes/settings-privacy-1.png';
import wfPrivacy2 from '../assets/case-zonepillar/wireframes/settings-privacy-2.png';
import wfPrivacy3 from '../assets/case-zonepillar/wireframes/settings-privacy-3.png';
import wfPrivacy4 from '../assets/case-zonepillar/wireframes/settings-privacy-4.png';

import wfMobile1 from '../assets/case-zonepillar/wireframes/laborer-mobile-set-1.png';

/* §8 Hi-fi. Same eleven screens, same order, in colour. */
import hfDash1 from '../assets/case-zonepillar/hifi/dashboard-1.png';
import hfDash2 from '../assets/case-zonepillar/hifi/dashboard-2.png';
import hfDash3 from '../assets/case-zonepillar/hifi/dashboard-3.png';

import hfProjects1 from '../assets/case-zonepillar/hifi/all-projects-1.png';
import hfProjects2 from '../assets/case-zonepillar/hifi/all-projects-2.png';
import hfProjects3 from '../assets/case-zonepillar/hifi/all-projects-3.png';

import hfOverview1 from '../assets/case-zonepillar/hifi/project-overview-1.png';
import hfOverview2 from '../assets/case-zonepillar/hifi/project-overview-2.png';
import hfOverview3 from '../assets/case-zonepillar/hifi/project-overview-3.png';
import hfOverview4 from '../assets/case-zonepillar/hifi/project-overview-4.png';
import hfOverview5 from '../assets/case-zonepillar/hifi/project-overview-5.png';

import hfTeam1 from '../assets/case-zonepillar/hifi/team-messages-1.png';
import hfTeam2 from '../assets/case-zonepillar/hifi/team-messages-2.png';
import hfTeam3 from '../assets/case-zonepillar/hifi/team-messages-3.png';
import hfTeam4 from '../assets/case-zonepillar/hifi/team-messages-4.png';

import hfRfi1 from '../assets/case-zonepillar/hifi/rfi-records-1.png';
import hfRfi2 from '../assets/case-zonepillar/hifi/rfi-records-2.png';
import hfRfi3 from '../assets/case-zonepillar/hifi/rfi-records-3.png';

import hfOrders1 from '../assets/case-zonepillar/hifi/change-orders-1.png';
import hfOrders2 from '../assets/case-zonepillar/hifi/change-orders-2.png';
import hfOrders3 from '../assets/case-zonepillar/hifi/change-orders-3.png';
import hfOrders4 from '../assets/case-zonepillar/hifi/change-orders-4.png';

import hfPlans1 from '../assets/case-zonepillar/hifi/plans-viewer-1.png';
import hfPlans2 from '../assets/case-zonepillar/hifi/plans-viewer-2.png';
import hfPlans3 from '../assets/case-zonepillar/hifi/plans-viewer-3.png';

import hfProfile1 from '../assets/case-zonepillar/hifi/settings-profile-1.png';
import hfProfile2 from '../assets/case-zonepillar/hifi/settings-profile-2.png';
import hfProfile3 from '../assets/case-zonepillar/hifi/settings-profile-3.png';

import hfNotif1 from '../assets/case-zonepillar/hifi/settings-notifications-1.png';
import hfNotif2 from '../assets/case-zonepillar/hifi/settings-notifications-2.png';
import hfNotif3 from '../assets/case-zonepillar/hifi/settings-notifications-3.png';

import hfPrivacy1 from '../assets/case-zonepillar/hifi/settings-privacy-1.png';
import hfPrivacy2 from '../assets/case-zonepillar/hifi/settings-privacy-2.png';
import hfPrivacy3 from '../assets/case-zonepillar/hifi/settings-privacy-3.png';
import hfPrivacy4 from '../assets/case-zonepillar/hifi/settings-privacy-4.png';

import hfMobile1 from '../assets/case-zonepillar/hifi/laborer-mobile-set-1.png';

/* §9 Design system — both boards are vector-built in Figma, exported as renders. */
import dsComponentsA from '../assets/case-zonepillar/system/components-1.png';
import dsComponentsB from '../assets/case-zonepillar/system/components-2.png';

import Lightbox from '../components/Lightbox';
import { SECTIONS, JUMP_NAV } from './zonepillarSections';

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
  { term: 'Status', value: 'Shipped', badge: true },
  { term: 'Scope', value: 'Web portal, laborer app, brand, system kit' },
  { term: 'Platform', value: 'Web, iOS, Android' },
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
              <img src={item.src} alt="" aria-hidden="true" loading="lazy" />
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

/* Titled group of figure cards, laid out 2-up like Figma's 464 + 24 + 464 = 952.
   `columns={3}` switches to the 3-up variant used by the problem statements. */
function FigureGroup({ title, columns = 2, children }) {
  return (
    <div className="cs-figure-group">
      {title && <h3>{title}</h3>}
      <div className={`cs-figure-grid${columns === 3 ? ' is-3up' : ''}`}>{children}</div>
    </div>
  );
}

/* Shared by §7 and §8: same screens, same order, wireframe or hi-fi source. */
function ScreenSets({ sets }) {
  return sets.map(({ group, cards }) => (
    <FigureGroup key={group} title={group}>
      {cards.map(({ caption, images }) => (
        <FigureCarousel
          key={caption}
          caption={caption}
          items={images.map((src, i) => ({
            src,
            alt: images.length > 1 ? `${caption} — screen ${i + 1}` : caption,
            caption: images.length > 1
              ? `${caption} · ${i + 1} of ${images.length}`
              : caption,
          }))}
        />
      ))}
    </FigureGroup>
  ));
}

/* 1 — The constraint. Single column, like every other section on this case: the
   two-column split is a Gartner device and isn't used here. */
function TheConstraint() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        The tools construction has weren&rsquo;t built for a job site.
      </h2>
      <p className="cs-body">
        The tools that exist come in two kinds. Office software, which is confusing on a site and
        useless without signal. Or enterprise platforms, too heavy and too expensive for the small
        and mid-sized contractors who need them most.
      </p>
      <p className="cs-body">
        So work runs on outdated systems and a stack of apps that don&rsquo;t talk to each other.
        Accountability lives in phone calls. Proof of finished work sits in someone&rsquo;s camera
        roll. ZonePillar puts all of it on one platform: tasks, documents, chat, photo proof, and
        progress, with the whole thing working offline. The web app runs the operation. The mobile
        apps put assignments and proof in the crew&rsquo;s pocket.
      </p>
      <p className="cs-body">
        The hard part was the spread. An administrator, a site manager, and a laborer have
        completely different days, and all three had to live on one system that still felt like
        one thing. Plus one rule that shaped everything: a job site can&rsquo;t be trusted to have
        internet.
      </p>
    </Section>
  );
}

/* 2 — Research. */
function Research() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Why the current tools fail contractors, and what the business needed instead.
      </h2>
      <p className="cs-body">
        I started with the people the product serves and what their current setup costs them, then
        set that against the business goals from the stakeholder docs. The board below maps each
        problem to how ZonePillar answers it, in the contractor&rsquo;s own words.
      </p>

      <FigureGroup>
        <FigureCard
          src={painPoints}
          alt="User pain points board"
          caption="Pain points, framed as problem &rarr; how we solve it &rarr; differentiators"
          fit="cover-top"
        />
      </FigureGroup>

      <p className="cs-body">
        Five business objectives anchored every decision that came after. They came out of the
        stakeholder meetings: simplify project management, make accountability visible, improve
        collaboration, support real reporting, and give field workers a mobile app that actually
        works.
      </p>

      <FigureGroup>
        <FigureCard
          src={businessObjectives}
          alt="Vision statement and key goals board"
          caption="Vision Statement and Key Goals"
          fit="cover-top"
        />
      </FigureGroup>
    </Section>
  );
}

const PERSONAS = [
  { src: personaAdmin, caption: 'Michael Reed - Construction Ops Administrator' },
  { src: personaManager, caption: 'Sarah Boesen - Construction Site Manager' },
  { src: personaLaborer, caption: 'Mike Veret - Construction Laborer' },
];

/* 3 — Personas. */
function Personas() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Three roles, three completely different days.</h2>
      <p className="cs-body">
        Everything hangs on serving all three at once, and they want different things. The admin
        wants oversight across every project. The site manager wants real-time control of the
        crew. The laborer just wants to get a task, prove it&rsquo;s done, and get back to work.
        Each persona lays out the goals and frustrations the design had to answer.
      </p>

      <FigureGroup>
        {PERSONAS.map(({ src, caption }) => (
          <FigureCard key={caption} src={src} alt={caption} caption={caption} fit="cover-top" />
        ))}
      </FigureGroup>
    </Section>
  );
}

const PROBLEM_STATEMENTS = [
  { src: problemAdmin, caption: 'Michael - Fragmented tools' },
  { src: problemManager, caption: 'Sarah - No live updates' },
  { src: problemLaborer, caption: 'Mike - Cut off on site' },
];

const USER_STORIES = [
  { src: storiesAdmin, caption: 'Michael - Construction Ops Administrator' },
  { src: storiesManager, caption: 'Sarah - Construction Site Manager' },
  { src: storiesLaborer, caption: 'Mike - Construction Laborer' },
];

/* 4 — Problem statements. */
function ProblemStatements() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">The same failure, from three angles.</h2>
      <p className="cs-body">
        Each persona turned into a problem statement: who they are, what they&rsquo;re trying to
        do, what&rsquo;s in the way, and how it feels. Together they pin down what the product had
        to fix. An admin buried in disconnected tools. A manager with no live picture of the site.
        A laborer cut off from clear instructions and feedback.
      </p>

      <FigureGroup columns={3}>
        {PROBLEM_STATEMENTS.map(({ src, caption }) => (
          <FigureCard
            key={caption}
            src={src}
            alt={caption}
            caption={caption}
            width={302}
            fit="cover-top"
          />
        ))}
      </FigureGroup>

      <p className="cs-body">
        From there I wrote user stories, grouped by role, so every screen later traced back to
        something a real user had said they needed.
      </p>

      <FigureGroup>
        {USER_STORIES.map(({ src, caption }) => (
          <FigureCard key={caption} src={src} alt={caption} caption={caption} fit="cover-top" />
        ))}
      </FigureGroup>
    </Section>
  );
}

/* 5 — Structure. */
function Structure() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        What each role expects to find, and what ships first.
      </h2>
      <p className="cs-body">
        Before any screens, I went section by section and mapped what users expect, how they
        behave, and what they&rsquo;re after, then set priorities with the business. Only laborers
        get a mobile app, they&rsquo;re the ones in the field, so I mapped the web portal in full
        and the laborer app down to the few things it actually needs.
      </p>

      <blockquote className="cs-quote">
        The web portal carries the full depth. The one mobile app is deliberately small for only
        laborers on a job site.
      </blockquote>

      <div className="cs-figure-grid">
        <FigureCard
          src={mentalPortal}
          alt="Mental models for the construction management portal"
          caption="Construction Management Portal - Full operations"
          fit="cover-top"
        />
        <FigureCard
          src={mentalMobile}
          alt="Mental models for the laborer mobile app"
          caption="Laborer Mobile App - Tasks &amp; proof"
          fit="cover-top"
        />
      </div>
    </Section>
  );
}

/* 6 — Information architecture. */
function InformationArchitecture() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">One platform, two scoped maps.</h2>
      <p className="cs-body">
        Every role gets the same platform, but only their slice of it. The web portal holds the
        full depth: projects with tasks, team, documents, and a calendar, where admins and
        managers do their work. The one mobile app belongs to laborers, and it&rsquo;s stripped
        right down: their tasks, and a photo upload to prove the work is done. Nothing else,
        because on site, nothing else is what keeps it usable.
      </p>

      <div className="cs-figure-grid">
        <FigureCard
          src={iaPortal}
          alt="Information architecture for the construction management portal"
          caption="IA - Construction Management Portal"
          fit="cover-top"
        />
        <FigureCard
          src={iaMobile}
          alt="Information architecture for the laborer mobile app"
          caption="IA - Laborer Mobile App"
          fit="cover-top"
        />
      </div>
    </Section>
  );
}

const WIREFRAME_SETS = [
  {
    group: 'Dashboards',
    cards: [
      { caption: 'Admin dashboard - the whole operation in one view.', images: [wfDash1, wfDash2, wfDash3] },
    ],
  },
  {
    group: 'Projects',
    cards: [
      { caption: 'All Projects', images: [wfProjects1, wfProjects2, wfProjects3] },
      { caption: 'Project details - Overview and Tasks', images: [wfOverview1, wfOverview2, wfOverview3, wfOverview4, wfOverview5] },
      { caption: 'Project details - Team Directory and Messages', images: [wfTeam1, wfTeam2, wfTeam3, wfTeam4] },
      { caption: 'Project details - RFI Records (External & Internal Users)', images: [wfRfi1, wfRfi2, wfRfi3] },
      { caption: 'Project details - Change Orders, & Purchase Orders (P.O Details)', images: [wfOrders1, wfOrders2, wfOrders3, wfOrders4] },
      { caption: 'Project details - Plans and PDF Viewer', images: [wfPlans1, wfPlans2, wfPlans3] },
    ],
  },
  {
    group: 'Settings',
    cards: [
      { caption: 'Profile and Contact Info', images: [wfProfile1, wfProfile2, wfProfile3] },
      { caption: 'Notification Preferences and Methods', images: [wfNotif1, wfNotif2, wfNotif3] },
      { caption: 'Privacy and Security Settings', images: [wfPrivacy1, wfPrivacy2, wfPrivacy3, wfPrivacy4] },
      { caption: 'And many more screens', images: [wfMobile1] },
    ],
  },
];
/* 7 — Wireframes. */
function Wireframes() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Structure before polish, on the two screens that carry the product.
      </h2>
      <p className="cs-body">
        With the architecture settled, I wireframed the web portal end to end to lock layout and
        hierarchy before any visual design. Two screens do most of the work. The{' '}
        <strong>dashboard</strong> is the admin&rsquo;s morning: projects with live progress, a
        timeline of task submissions, and recent activity, all answerable at a glance.
      </p>
      <p className="cs-body">
        The <strong>project overview</strong> is where construction-specific thinking shows up.
        RFI records, orders, plans, and task rows that carry photo proof and a completion count
        like <em>2/4</em>, because on a build a task is rarely all-or-nothing.
      </p>

      <ScreenSets sets={WIREFRAME_SETS} />

      <p className="cs-body">
        Inside a project, tasks can be read three ways, a Kanban board, a list with an
        approve/approved column, and a timeline, so a manager reviews work the way that fits the
        moment. Messaging, team, and documents live in the same project shell.
      </p>
    </Section>
  );
}

const HIFI_SETS = [
  {
    group: 'Dashboards',
    cards: [
      { caption: 'Admin dashboards - the whole operation in one view.', images: [hfDash1, hfDash2, hfDash3] },
    ],
  },
  {
    group: 'Projects',
    cards: [
      { caption: 'All Projects', images: [hfProjects1, hfProjects2, hfProjects3] },
      { caption: 'Project details - Overview and Tasks', images: [hfOverview1, hfOverview2, hfOverview3, hfOverview4, hfOverview5] },
      { caption: 'Project details - Team Directory and Messages', images: [hfTeam1, hfTeam2, hfTeam3, hfTeam4] },
      { caption: 'Project details - RFI Records (External & Internal Users)', images: [hfRfi1, hfRfi2, hfRfi3] },
      { caption: 'Project details - Change Orders, & Purchase Orders (P.O Details)', images: [hfOrders1, hfOrders2, hfOrders3, hfOrders4] },
      { caption: 'Project details - Plans and PDF Viewer', images: [hfPlans1, hfPlans2, hfPlans3] },
    ],
  },
  {
    group: 'Settings',
    cards: [
      { caption: 'Profile and Contact Info', images: [hfProfile1, hfProfile2, hfProfile3] },
      { caption: 'Notification Preferences and Methods', images: [hfNotif1, hfNotif2, hfNotif3] },
      { caption: 'Privacy and Security Settings', images: [hfPrivacy1, hfPrivacy2, hfPrivacy3, hfPrivacy4] },
      { caption: 'And many more screens', images: [hfMobile1] },
    ],
  },
];
/* 8 — Hi-fi designs. */
function HiFiDesigns() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">The wireframes, made real.</h2>
      <p className="cs-body">
        The same structure carried into high fidelity across the web portal and the laborer app,
        applied colour, type, and the component set, with the construction details intact: photo
        proof on task rows, the approve/approved review flow, RFI records, and the offline state
        the field crew depends on.
      </p>
      <p className="cs-body">
        <strong>Web portal.</strong> The two anchors from the wireframes carried into full colour
        first, the admin dashboard and the project overview, so the highest-traffic screens set
        the visual language.
      </p>

      <ScreenSets sets={HIFI_SETS} />
    </Section>
  );
}

/* 9 — Design system. */
function DesignSystem() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Built from reusable parts, handed off as a spec.</h2>
      <p className="cs-body">
        Everything in the web portal and the laborer app comes out of one set of components.
        Nothing gets redrawn screen by screen.
      </p>
      <p className="cs-body">
        <strong>Foundations.</strong> Colours are grouped by job, not by hue. Brand colours stay
        separate from the status ones, so in progress, in review, approved and pending each get
        their own, with a text colour that reads clearly on top. Every size in the type scale has
        a purpose, and all the spacing comes off one base unit.
      </p>
      <p className="cs-body">
        Radius runs 4 to 24 with <code>radius-8</code> on inputs and buttons and{' '}
        <code>radius-full</code> on chips, so a chip never reads as a button. Motion is four
        durations: 100ms hover, 200ms status change, 300ms panels, 400ms screen transitions. The
        1440 grid has expanded and collapsed sidebar states.
      </p>
      <p className="cs-body">
        Align UI was the base hi-fi kit, updated where ZonePillar needed it. Icons are Remix Icon,
        chosen for how clearly they read at small sizes, with line and fill versions of every icon
        on one 24px grid.
      </p>

      <p className="cs-hint">Foundations and components, click to open</p>
      <FigureGroup>
        <FigureCard
          src={dsComponentsA}
          alt="Component board: buttons and table rows"
          caption="Nothing is drawn in just its default state. Buttons cover every type, style, state and size. Table rows cover density, priority and selection."
          width={952}
          fit="cover-top"
        />
        <FigureCard
          src={dsComponentsB}
          alt="Component board: filters, upload areas and image upload"
          caption="More of the system: filters, upload areas, image upload and the filter footer. Upload cards handle uploading, completed and failed. Failed uploads happen a lot on site, so that one needed a way back rather than just a red border."
          width={952}
          fit="cover-top"
        />
      </FigureGroup>
    </Section>
  );
}

const OUTCOMES = [
  {
    problem: 'No centralized view of progress',
    design: 'Role-scoped dashboards',
    signal: 'Time to answer "where are we?"',
  },
  {
    problem: 'Proof lost in camera rolls',
    design: 'Photo evidence on the task',
    signal: 'Approval time & disputes',
  },
  {
    problem: 'Job sites without signal',
    design: 'Offline submissions that sync later',
    signal: 'Tasks updated from the field',
  },
  {
    problem: 'A day across many apps',
    design: 'Tasks, docs, chat, reports in one',
    signal: 'App switching per day',
  },
];

/* 10 — Outcome. */
function Outcome() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What the design changes.</h2>
      <p className="cs-body">
        The full design, web portal, laborer app, brand, and a system kit, went to development
        with a proper spec, so the build starts from a document instead of a screenshot.
        Here&rsquo;s what it was built to move:
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
        Two things stuck with me. Designing one platform for three roles isn&rsquo;t three
        products, it&rsquo;s three experiences on a shared spine, and the information architecture
        held that together far more than any visual choice did.
      </p>
      <p className="cs-body">
        And for construction, offline isn&rsquo;t a feature. The moment the design assumed a
        connection, it stopped being honest about where the work happens.
      </p>
    </Section>
  );
}

const SECTION_BODIES = {
  'the-constraint': TheConstraint,
  research: Research,
  personas: Personas,
  'problem-statements': ProblemStatements,
  structure: Structure,
  'information-architecture': InformationArchitecture,
  wireframes: Wireframes,
  'hi-fi-designs': HiFiDesigns,
  'design-system': DesignSystem,
  outcome: Outcome,
};

function Hero() {
  return (
    <section className="cs-hero">
      <div style={{ ...HERO_SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 40 }}>
        <div className="cs-hero-brand">
        <span
          className="cs-logomark"
          style={{ background: '#335CFF' }}
        >
          <img
            src={zonepillarLogomark}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />
        </span>
          <h1 className="cs-title">ZonePillar</h1>
        </div>

        <p className="cs-hero-intro">
          A construction project usually runs on paper, phone calls, and half a dozen office apps.
          ZonePillar puts it in one place, from bid to completion: task tracking, photo proof of
          work, and team chat. I designed the web portal and the mobile apps for three very
          different roles.
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
          <img src={heroShot} alt="The ZonePillar construction management platform" />
          <figcaption className="cs-hero-pill">
            ZonePillar<span> • 2025</span>
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

export default function ZonePillarPage() {
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
