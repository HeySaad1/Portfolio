import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import kruzeeLogomark from '../assets/case-kruzee/kruzee-logomark.svg';
import heroShot from '../assets/case-driving.png';

/* §3 The phase model — dashboard */
import phaseWeb1 from '../assets/case-kruzee/student/dashboard-web-1.png';
import phaseWeb2 from '../assets/case-kruzee/student/dashboard-web-2.png';
import phaseMobile1 from '../assets/case-kruzee/student/dashboard-mobile-1.png';
import phaseMobile2 from '../assets/case-kruzee/student/dashboard-mobile-2.png';

/* §4 Why lessons lock — permit banner and locked states */
import lockWeb1 from '../assets/case-kruzee/student/blockers-web-1.png';
import lockWeb2 from '../assets/case-kruzee/student/blockers-web-2.png';
import lockWeb3 from '../assets/case-kruzee/student/blockers-web-3.png';
import lockMobile1 from '../assets/case-kruzee/student/blockers-mobile-1.png';
import lockMobile2 from '../assets/case-kruzee/student/blockers-mobile-2.png';
import lockMobile3 from '../assets/case-kruzee/student/blockers-mobile-3.png';

/* §5 Booking and canceling */
import cancelWeb1 from '../assets/case-kruzee/student/cancel-web-1.png';
import cancelWeb2 from '../assets/case-kruzee/student/cancel-web-2.png';
import cancelMobile1 from '../assets/case-kruzee/student/cancel-mobile-1.png';
import cancelMobile2 from '../assets/case-kruzee/student/cancel-mobile-2.png';

/* §6 Paying over 13 months */
import payWeb1 from '../assets/case-kruzee/student/payment-web-1.png';
import payWeb2 from '../assets/case-kruzee/student/payment-web-2.png';
import payMobile1 from '../assets/case-kruzee/student/payment-mobile-1.png';
import payMobile2 from '../assets/case-kruzee/student/payment-mobile-2.png';

/* §7 Admin — cohorts and messaging */
import cohortWeb1 from '../assets/case-kruzee/admin/cohort-web-1.png';
import cohortWeb2 from '../assets/case-kruzee/admin/cohort-web-2.png';
import cohortMobile1 from '../assets/case-kruzee/admin/cohort-mobile-1.png';
import cohortMobile2 from '../assets/case-kruzee/admin/cohort-mobile-2.png';

import messageWeb1 from '../assets/case-kruzee/admin/messaging-web-1.png';
import messageWeb2 from '../assets/case-kruzee/admin/messaging-web-2.png';
import messageWeb3 from '../assets/case-kruzee/admin/messaging-web-3.png';
import messageWeb4 from '../assets/case-kruzee/admin/messaging-web-4.png';
import messageMobile1 from '../assets/case-kruzee/admin/messaging-mobile-1.png';
import messageMobile2 from '../assets/case-kruzee/admin/messaging-mobile-2.png';
import messageMobile3 from '../assets/case-kruzee/admin/messaging-mobile-3.png';
import messageMobile4 from '../assets/case-kruzee/admin/messaging-mobile-4.png';

/* §8 Admin — students */
import studentWeb1 from '../assets/case-kruzee/admin/students-web-1.png';
import studentWeb2 from '../assets/case-kruzee/admin/students-web-2.png';
import studentWeb3 from '../assets/case-kruzee/admin/students-web-3.png';
import studentWeb4 from '../assets/case-kruzee/admin/students-web-4.png';
import studentMobile1 from '../assets/case-kruzee/admin/students-mobile-1.png';
import studentMobile2 from '../assets/case-kruzee/admin/students-mobile-2.png';
import studentMobile3 from '../assets/case-kruzee/admin/students-mobile-3.png';
import studentMobile4 from '../assets/case-kruzee/admin/students-mobile-4.png';

/* §9 Admin — instructors */
import instructorWeb1 from '../assets/case-kruzee/admin/instructors-web-1.png';
import instructorWeb2 from '../assets/case-kruzee/admin/instructors-web-2.png';
import instructorWeb3 from '../assets/case-kruzee/admin/instructors-web-3.png';
import instructorWeb4 from '../assets/case-kruzee/admin/instructors-web-4.png';
import instructorMobile1 from '../assets/case-kruzee/admin/instructors-mobile-1.png';
import instructorMobile2 from '../assets/case-kruzee/admin/instructors-mobile-2.png';
import instructorMobile3 from '../assets/case-kruzee/admin/instructors-mobile-3.png';
import instructorMobile4 from '../assets/case-kruzee/admin/instructors-mobile-4.png';

/* §10 The site. The "Full page, click to view" bar is baked into these exports
   as an overlay on the image's lower edge, so no extra markup is needed. */
import siteQuebec from '../assets/case-kruzee/site/quebec-landing.png';
import siteCity from '../assets/case-kruzee/site/city-page.png';
import siteProgram from '../assets/case-kruzee/site/program-page.png';

import Lightbox from '../components/Lightbox';
import { SECTIONS, JUMP_NAV } from './kruzeeSections';

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
  { term: 'Role', value: 'Solo product design, Quebec region' },
  { term: 'Status', value: 'Shipped', badge: true },
  { term: 'Scope', value: 'Student portal, admin portal, marketing site' },
  { term: 'Platform', value: 'Web, desktop and mobile' },
];

/* Highlights whichever nav target is currently nearest the top of the viewport.
   Uses scroll position rather than IntersectionObserver so the very top of the
   page reliably resolves to the first nav item. */
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

/* Captions on this page carry an optional eyebrow — "Web view" / "Mobile view" —
   above the sentence, so caption is either a string or { label, text }. */
function Caption({ caption }) {
  if (!caption) return null;
  if (typeof caption === 'string') return <figcaption>{caption}</figcaption>;
  return (
    <figcaption>
      {caption.label && <span className="kz-cap-label">{caption.label}</span>}
      {caption.text}
    </figcaption>
  );
}

const captionText = caption =>
  typeof caption === 'string' ? caption : caption?.text ?? '';

/* A figure card whose media cycles through several images every 7s, with a
   thumbnail strip beneath. Clicking opens the gallery, which never auto-plays. */
function FigureCarousel({ items, caption, aspect = '462 / 293' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const openLightbox = useLightbox();
  const reducedMotion = usePrefersReducedMotion();
  const label = captionText(caption);

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
        aria-label={`Open ${label || 'image'} full screen`}
        onClick={() => openLightbox(items, index)}
      >
        <div className="cs-figure-card-media is-carousel" style={{ aspectRatio: aspect }}>
          {items.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={i === index ? (item.alt ?? '') : ''}
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

      <Caption caption={caption} />
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
function FigureCard({ src, alt, caption, width = 464, fit = 'contain', aspect }) {
  const openLightbox = useLightbox();
  const label = captionText(caption);

  return (
    <figure className="cs-figure-card" style={{ maxWidth: width }}>
      <button
        type="button"
        className="cs-figure-open"
        aria-label={`Open ${label || alt || 'image'} full screen`}
        onClick={() => openLightbox([{ src, alt, caption: label }], 0)}
      >
        <div
          className={`cs-figure-card-media is-${fit}`}
          style={aspect ? { aspectRatio: aspect } : undefined}
        >
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </button>
      <Caption caption={caption} />
    </figure>
  );
}

/* A web capture and a mobile capture side by side, each its own carousel. This
   pairing is the spine of the whole case, so it gets a component. */
function ViewPair({ web, mobile, labels = true }) {
  return (
    <div className="cs-figure-grid">
      <FigureCarousel
        items={web.images.map((src, i) => ({ src, alt: `${web.text} — web view ${i + 1}` }))}
        caption={labels ? { label: 'Web view', text: web.text } : web.text}
      />
      <FigureCarousel
        items={mobile.images.map((src, i) => ({ src, alt: `${mobile.text} — mobile view ${i + 1}` }))}
        caption={labels ? { label: 'Mobile view', text: mobile.text } : mobile.text}
      />
    </div>
  );
}

/* Table used by the four comparison and decision tables. --kz-cols is set inline. */
function DataTable({ head, rows }) {
  return (
    <div className="kz-table" style={{ '--kz-cols': head.length }}>
      <div className="kz-table-head">
        {head.map(h => <span key={h}>{h}</span>)}
      </div>
      {rows.map(cells => (
        <div key={cells[0]} className="kz-table-row">
          {cells.map((cell, i) => (
            <span key={cell} data-lead={i === 0}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Phase colours read from Figma 146:1389, not eyedropped. The chip renders the
   colour at 28% behind the label with a solid swatch of it as the leading rule. */
const PHASES = [
  { name: 'Phase 1', color: '#A9C64B', body: "Theory only. Ends with the exam that unlocks the learner's licence, without which no in-car session is legal.", minimum: 'Minimum 28 days' },
  { name: 'Phase 2', color: '#E08A2E', body: 'Theory continues, first in-car sessions begin.', minimum: 'Minimum 28 days' },
  { name: 'Phase 3', color: '#5B93B5', body: 'Theory and in-car sessions in parallel.', minimum: 'Minimum 56 days' },
  { name: 'Phase 4', color: '#2A5B72', body: 'Final modules, road test preparation.', minimum: 'Minimum 56 days' },
];

const INVERSIONS = {
  head: ['Kruzee elsewhere', 'Kruzee in Quebec'],
  rows: [
    ['Choose your instructor', 'A cohort with an assigned primary instructor'],
    ['Theory at your own pace', 'Dated modules on a cohort calendar'],
    ['Book any lesson, any time', 'Sequence locks and minimum intervals between phases'],
    ['Finish fast, test sooner', 'Thirteen months, no way to compress it'],
    ['Buy hours', 'Enroll in a program and pay it down over a year'],
  ],
};

/* 1 — Constraint. */
function Constraint() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Everything Kruzee sells works the opposite way in Quebec
      </h2>
      <p className="cs-body">
        Kruzee launched in Ontario in 2022 selling control: browse instructors, book a lesson
        online in under a minute, do the theory at your own pace. Quebec allows none of that.
      </p>
      <p className="cs-body">
        Every new Class 5 driver has to complete the Road Safety Education Program through an
        approved school, and the program sets the pace.
      </p>

      <div className="kz-phases">
        <p className="kz-phases-head">
          The four phases, drawn to their legal minimum durations · 12 theory modules, 15 in-car
          sessions, 39 hours
        </p>
        <div className="kz-phases-grid">
          {PHASES.map(({ name, color, body, minimum }) => (
            <div key={name} className="kz-phase">
              <span className="kz-phase-bar" style={{ '--kz-phase': color }}>
                <i aria-hidden="true" />
                {name}
              </span>
              <p>{body}</p>
              <span className="kz-phase-min">{minimum}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="cs-body">
        So this could not be the Ontario product with a province toggle. Each thing Kruzee sells
        inverts.
      </p>

      <DataTable head={INVERSIONS.head} rows={INVERSIONS.rows} />

      <p className="cs-body">
        The real problem is in the last row. A student pays in month one and finishes in month
        thirteen, with gaps of weeks between lessons. That is eleven months to lose interest,
        forget what they bought, or stop paying, and the portal is the only thing holding
        attention across the gap.
      </p>
    </Section>
  );
}

const APPROACH_QUESTIONS = [
  { title: 'Where am I', body: 'One active phase, expanded. Everything before it collapsed and done, everything after it collapsed and locked.' },
  { title: 'What is holding me up', body: 'Blockers appear inside the lesson list at the row they block, not as a banner at the top of the page.' },
  { title: 'What can I do now', body: 'Every blocked state is paired with the thing that is still available, usually theory.' },
];

/* 2 — The approach. */
function TheApproach() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">You cannot make it faster, so make it clear</h2>
      <p className="cs-body">
        The design cannot make the program faster. It can stop the program from feeling like an
        unexplained delay. Every screen in the student portal answers three questions and refuses
        to bury any of them: where am I, what is holding me up, and what can I do today anyway.
      </p>
      <div className="cs-insights">
        {APPROACH_QUESTIONS.map(({ title, body }) => (
          <article key={title} className="cs-insight">
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* 3 — The phase model. */
function ThePhaseModel() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">One phase open, the rest closed</h2>
      <p className="cs-body">
        The obvious build is a full course outline. It is also the wrong one. A student in month
        two cannot act on anything in Phase 3, so listing twenty-seven greyed rows only makes the
        year look longer. The dashboard shows the active phase as a working table and collapses
        the other three into single rows carrying a lock and a phase colour.
      </p>
      <p className="cs-body">
        Progress is stated twice and neither number is a percentage on its own. The ring gives
        activities completed out of twenty-seven, which is the real curriculum count of twelve
        theory modules and fifteen in-car sessions. Next to it sits the number a student actually
        wants, which is months remaining. In a thirteen-month program, twenty-seven percent
        complete is discouraging on its own. Six months to completion is a fact you can plan
        around.
      </p>

      <ViewPair
        web={{
          images: [phaseWeb1, phaseWeb2],
          text: 'One phase open, three collapsed to a single row each with a lock and a phase colour.',
        }}
        mobile={{
          images: [phaseMobile1, phaseMobile2],
          text: 'The ring stays because months remaining is the number read out loud on a phone call. Percentage sits beside it, not instead of it.',
        }}
      />
    </Section>
  );
}

const BLOCKERS = {
  head: ['Blocker', 'Who imposes it', 'How it appears', 'What the student can do'],
  rows: [
    ["Learner's permit missing", 'The ministry', 'Amber banner sitting between Phase 1 and Phase 2, exactly where the block occurs', 'Upload it, and keep taking theory while it is verified'],
    ['Installment pending', 'Kruzee', 'Amber panel inside the open phase, above the lessons it is holding back', 'Pay, which unlocks the rows below immediately'],
    ['Sequence or minimum duration', 'The program', 'Grey Locked chip on the row, disabled action', 'Nothing, and the interface does not pretend otherwise'],
  ],
};

/* 4 — Why lessons lock. */
function WhyLessonsLock() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Three reasons a lesson can be locked</h2>
      <p className="cs-body">
        Three separate systems can stop a student progressing, and a single grey Locked chip for
        all three would be the easy answer and a useless one. A student who cannot proceed because
        the ministry has not issued their permit has something to do about it. A student waiting
        out a legal minimum does not. Treating those the same trains people to ignore the
        interface.
      </p>

      <DataTable head={BLOCKERS.head} rows={BLOCKERS.rows} />

      <p className="cs-body">
        The permit banner is the one I would defend hardest. It states the requirement, names who
        requires it, and then does the thing most products skip: it tells the student what is
        still open to them. Theory continues while the permit is verified, so the wait costs
        nothing.
      </p>

      <ViewPair
        web={{
          images: [lockWeb1, lockWeb2, lockWeb3],
          text: 'The banner sits between Phase 1 and Phase 2, in the gap a student learns to scroll past, and states the requirement, who imposes it, and what is still open.',
        }}
        mobile={{
          images: [lockMobile1, lockMobile2, lockMobile3],
          text: 'Full width stacked pairs, so the status chip and the Upload action stay thumb reachable rather than sitting in a scrolling table.',
        }}
      />
    </Section>
  );
}

/* 5 — Booking and canceling. */
function BookingAndCanceling() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Say the cancellation rule before it costs someone</h2>
      <p className="cs-body">
        Lessons cannot be moved or cancelled inside twenty-four hours without losing the credit.
        That rule is written into three places rather than one: a standing note on the dashboard,
        the top of the reschedule dialog, and the confirmation step of the cancel dialog.
        Repetition is deliberate. A student who is surprised by this rule calls support, and a
        student who calls support is an operations cost on a thirteen-month contract.
      </p>
      <p className="cs-body">
        The reschedule dialog restates the lesson in full before it offers a calendar. Date, time,
        duration, instructor and pickup location, because a student rescheduling a lesson two
        weeks out has usually forgotten at least one of those. Only dates with real availability
        are selectable, which turns the calendar into an answer rather than a form.
      </p>

      <ViewPair
        web={{
          images: [cancelWeb1, cancelWeb2],
          text: 'The lesson restated in full before the calendar. Only dates with real availability are selectable.',
        }}
        mobile={{
          images: [cancelMobile1, cancelMobile2],
          text: 'Dates as solid tints and times as large targets rather than a dropdown, because this is booked one handed.',
        }}
      />
    </Section>
  );
}

/* 6 — Paying over 13 months. */
function PayingOver13Months() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Extra hours, priced honestly</h2>
      <p className="cs-body">
        The program is fixed but the practice a student needs is not, so additional lessons sell
        in singles, fives and tens. The ten-lesson package is flagged for new drivers rather than
        as the best value, which is a small honesty that matters when the buyer is often a parent.
        Tax is broken out as GST and QST at fifteen percent rather than folded into a single
        total, because in Quebec the split is what people expect to see.
      </p>
      <p className="cs-body">
        The bigger money problem is the program itself, which is paid in installments across the
        year. The payment screen is reached from the block inside the phase, and it keeps the
        connection explicit: the subheading names the phase the payment unlocks rather than saying
        complete your purchase. The order line carries the phase colour and the lesson count, so a
        student sees what the money buys before they see what it costs.
      </p>
      <p className="cs-body">
        Underneath sits the whole schedule, not just today&rsquo;s charge. Paid installments keep
        their date, the current one is marked due now, and the remaining ones stay visible in grey.
        Total remaining after today is stated as its own line, because in a thirteen-month program
        that is the number a parent asks for and the one most checkouts hide.
      </p>

      <ViewPair
        web={{
          images: [payWeb1, payWeb2],
          text: 'The subheading names the phase this payment unlocks. The order line carries the phase colour and the lesson count.',
        }}
        mobile={{
          images: [payMobile1, payMobile2],
          text: 'Selection and payment stack, and the summary updates in place so the chosen package never scrolls out of view.',
        }}
      />
    </Section>
  );
}

/* 7 — Admin, cohorts. */
function AdminCohorts() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">The whole schedule builds itself from one date</h2>
      <p className="cs-body">
        Because the phase minimums are fixed, a cohort&rsquo;s entire thirteen months can be
        calculated from one field: the start date. The admin creates a cohort by choosing a date,
        a language and a primary instructor, and the twenty-seven activity schedule generates
        itself.
      </p>
      <p className="cs-body">
        The interesting part is not the generation, it is the admission that generation will be
        wrong. Rooms get double booked, instructors take leave, holidays land badly. So every
        generated row carries an override, the original date stays struck through rather than
        disappearing, and a row whose new date breaks the program&rsquo;s spacing is flagged in
        red rather than silently accepted. The system holds the rule and the human holds the
        exception, and neither one hides from the other.
      </p>

      <ViewPair
        web={{
          images: [cohortWeb1, cohortWeb2],
          text: 'Date, language and primary instructor. The twenty seven activity schedule generates from those three fields.',
        }}
        mobile={{
          images: [cohortMobile1, cohortMobile2],
          text: 'Sessions as cards with the phase chip on each, because the admin checking a conflict is usually standing somewhere.',
        }}
      />

      <p className="cs-body">
        Because a cohort moves as a group, the messaging is addressed to the group. Recipients are
        picked off the roster rather than typed, the message carries a type so a reminder reads
        differently from an announcement, and the body supports variables so one message still
        greets each student by name.
      </p>
      <p className="cs-body">
        Scheduling the send is the part that matters in a thirteen-month program. A reminder about
        Phase 1 materials is only useful in the week before Phase 1 starts, and the person writing
        it is usually setting the cohort up months earlier. Send later means the message gets
        written when the context is fresh and delivered when it is relevant.
      </p>

      {/* Confirmed against Figma: this pair carries no Web view / Mobile view eyebrow. */}
      <ViewPair
        labels={false}
        web={{
          images: [messageWeb1, messageWeb2, messageWeb3, messageWeb4],
          text: 'Announcement, reminder and custom are separate types rather than one free text field, so recurring messages are not rewritten from scratch each cohort.',
        }}
        mobile={{
          images: [messageMobile1, messageMobile2, messageMobile3, messageMobile4],
          text: 'The same sequence as a bottom sheet: who, what kind, the message, then when it goes out.',
        }}
      />
    </Section>
  );
}

/* 8 — Admin, students. */
function AdminStudents() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Who is falling behind</h2>
      <p className="cs-body">
        The students list exists to answer one question, so it carries phase, progress and a
        status that separates a student who paused from a student who is drifting: Active, On
        Hold, Off Track, Not Started. Off Track is a judgement the system makes so that staff do
        not have to read every row.
      </p>
      <p className="cs-body">
        Opening a student gives that same four-phase model again, this time with the numbers a
        support call needs. Lessons completed, hours driven, next payment, and the upcoming lesson
        with its instructor and pickup address. Cohort information carries enrolment date, expected
        completion and the assigned vehicle, which matters because the road test is taken in the
        school&rsquo;s car.
      </p>
      <p className="cs-body">
        Reusing the phase model here means nobody has to translate. When a student calls to ask
        why Phase 3 is locked, the person answering is looking at the same four rows, in the same
        colours, with the same locked chip.
      </p>
      <p className="cs-body">
        The documents tab exists because an approved school carries record-keeping obligations,
        and because those records expire. Contract, theory exam result, driving licence and road
        test booking each show their own state rather than a generic uploaded or missing. The
        expiry warning fires ten months ahead and tells staff to remind the student, so an
        expiring licence becomes a task rather than a discovery made on the day of a road test.
      </p>

      <ViewPair
        web={{
          images: [studentWeb1, studentWeb2, studentWeb3, studentWeb4],
          text: 'Phase coloured with the same four colour system students see, so staff and student share vocabulary.',
        }}
        mobile={{
          images: [studentMobile1, studentMobile2, studentMobile3, studentMobile4],
          text: 'The upcoming lesson is promoted above the progress ring, since that is what gets read out on a call.',
        }}
      />
    </Section>
  );
}

/* 9 — Admin, instructors. */
function AdminInstructors() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Who can take work, and when</h2>
      <p className="cs-body">
        The instructors list answers availability, which is why status sits next to ratings and
        student load rather than inside a profile. On Leave and Deactivated are distinct because
        one is temporary and one is not, and cohort assignment depends on knowing which. Location
        is on the row because in-car sessions are geographic, and an instructor in Laval is not
        interchangeable with one in Longueuil.
      </p>
      <p className="cs-body">
        The instructor profile is where the four phase colours do their third job. Each assigned
        cohort carries a segmented bar showing how far through the program that group has moved,
        so workload reads as position in the year rather than a count of students. A cohort that
        has not started yet shows the bar empty rather than hiding it.
      </p>
      <p className="cs-body">
        The calendar is deliberately ordinary. Month, week and day, a current-time line, blocks
        coloured by lesson type. Scheduling is the one part of this product where staff already
        hold a strong mental model from every other calendar they use, so inventing something here
        would have cost more than it returned.
      </p>

      {/* Confirmed against Figma: this pair carries no Web view / Mobile view eyebrow. */}
      <ViewPair
        labels={false}
        web={{
          images: [instructorWeb1, instructorWeb2, instructorWeb3, instructorWeb4],
          text: 'Status sits beside ratings and student load, because the question is availability. On Leave and Deactivated stay separate, since one is temporary and one is not.',
        }}
        mobile={{
          images: [instructorMobile1, instructorMobile2, instructorMobile3, instructorMobile4],
          text: 'Rows collapse to name, status and load, with location kept on the row because in-car sessions are geographic.',
        }}
      />
    </Section>
  );
}

/* 10 — The site. */
function TheSite() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Selling a course that takes a year</h2>
      <p className="cs-body">
        The marketing site has a harder job than the portal. Everywhere else Kruzee sells a lesson
        you can book in under a minute. In Quebec it has to sell a nine hundred and ninety five
        dollar program that takes a year, to a teenager who wants to drive now and to a parent
        signing the cheque.
      </p>
      <p className="cs-body">
        Three moves do most of that work. A province picker sits in the header, because a national
        brand selling a provincially regulated program cannot show one set of rules to everyone.
        The SAAQ approval mark sits in the hero beside the headline, since in this market
        accreditation is not a trust badge, it is the reason the school can legally issue what a
        student needs for their road test. And the same four-phase timeline that structures the
        portal appears on the site, drawn in the same phase colours and labelled with the same
        minimum durations.
      </p>
      <p className="cs-body">
        That last one is the decision I would point at. The site does not hide the thirteen months
        or bury them in a FAQ. It draws the program as a route, states 28 days minimum under Phase
        1 and 56 under Phase 4, and ends the graphic on the licence itself. Selling the length as
        structure rather than apologising for it is also what makes the portal legible later,
        because a student arrives already holding the model the dashboard uses.
      </p>

      <div className="cs-figure-grid">
        <FigureCard
          src={siteQuebec}
          alt="The Quebec landing page"
          caption="The Quebec landing page. Program pricing, the accreditation mark, the phase route and instructor proof, in that order."
          fit="cover-top"
          aspect="462 / 338"
        />
        <FigureCard
          src={siteCity}
          alt="A city landing page"
          caption="City pages carry the same structure with local proof, since a parent in Montreal is choosing school that will pick their child up."
          fit="cover-top"
          aspect="462 / 338"
        />
      </div>

      <p className="cs-body">
        The program page is where the length gets explained rather than summarised. It is the page
        a parent reads before paying, so it walks all four phases module by module instead of
        asking anyone to trust a graphic.
      </p>

      <FigureCard
        src={siteProgram}
        alt="The program page"
        caption="The long form version of the same four phases the portal runs on."
        fit="cover-top"
        aspect="462 / 338"
      />
    </Section>
  );
}

const DECISIONS = {
  head: ['Decision', 'Why', 'Trade-off'],
  rows: [
    ['Only the active phase is expanded', 'Nothing in a later phase is actionable for months, and showing it makes the year feel longer', 'A student who wants to see the whole curriculum has to open three accordions'],
    ['Blockers live inline, not in a page banner', 'A blocker is only meaningful next to the thing it blocks', 'A student who does not scroll can miss a payment block'],
    ['Three visually distinct lock types', 'Actionable and non-actionable blocks are different problems', 'More states to build, document and translate'],
    ['Months remaining shown next to percent complete', 'Percent complete is demoralising in a fixed-length program', 'An estimate that will be wrong for any student who falls behind'],
    ['Cohort schedule generated, then overridable per row', 'The minimums are deterministic, real life is not', 'Overrides can cascade, so the conflict flag has to be trusted'],
    ['Original date kept struck through on override', 'Ops needs to see what the rule said before someone broke it', 'Denser table'],
  ],
};

/* 11 — Decisions. */
function Decisions() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What I chose, and what it cost</h2>
      <DataTable head={DECISIONS.head} rows={DECISIONS.rows} />
    </Section>
  );
}

/* 12 — Outcome. */
function Outcome() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Where it landed</h2>
      <p className="cs-body">The Quebec platform shipped.</p>
      <p className="cs-body">
        Support volume dropped. The three-blocker work was aimed squarely at the question a student
        asks when progress stops, which is some version of why can I not book my next lesson. Once
        the interface named which blocker applied, at the row where it applied, and said what the
        student could still do in the meantime, the question stopped being worth asking.
      </p>
      <p className="cs-body">
        Cohort scheduling left the spreadsheet. Setting up a thirteen-month cohort had been a
        manual calculation of dates against the program minimums, done outside any system. It
        became one start date, one language, one instructor, with a per-row override for the cases
        the calculation gets wrong and a flag for the ones that break the spacing.
      </p>
      <p className="cs-body">
        Administrators gained visibility they did not previously have. Enrolment against capacity,
        phase progress, which students are drifting and which instructors can take work all read
        off shared screens rather than being reconstructed each time someone asks.
      </p>
    </Section>
  );
}

const SECTION_BODIES = {
  constraint: Constraint,
  'the-approach': TheApproach,
  'the-phase-model': ThePhaseModel,
  'why-lessons-lock': WhyLessonsLock,
  'booking-and-canceling': BookingAndCanceling,
  'paying-over-13-months': PayingOver13Months,
  'admin-cohorts': AdminCohorts,
  'admin-students': AdminStudents,
  'admin-instructors': AdminInstructors,
  'the-site': TheSite,
  decisions: Decisions,
  outcome: Outcome,
};

function Hero() {
  return (
    <section className="cs-hero">
      <div style={{ ...HERO_SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 40 }}>
        <div className="cs-hero-brand">
        <span
          className="cs-logomark"
          style={{ background: '#39A3D1' }}
        >
          <img
            src={kruzeeLogomark}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />
        </span>
          <h1 className="cs-title">Kruzee</h1>
        </div>

        <p className="cs-hero-intro">
          Kruzee is an online driving school built on choice and pace. Quebec licenses new drivers
          on a fixed thirteen-month program with no shortcuts. I designed the student portal, the
          admin portal and the site for that market.
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
          <img src={heroShot} alt="The Kruzee driving education platform" />
          <figcaption className="cs-hero-pill">
            Kruzee<span> • 2025</span>
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

export default function KruzeePage() {
  const [viewer, setViewer] = useState(null);
  const openLightbox = useCallback((items, startIndex) => setViewer({ items, startIndex }), []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      <main className="cs-page is-kruzee">
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
