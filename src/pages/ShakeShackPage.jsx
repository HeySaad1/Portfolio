import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import shackLogomark from '../assets/case-shakeshack/shakeshack-logomark.svg';
import heroShot from '../assets/case-food.png';

/* Team avatars */
import avatarSaad from '../assets/case-shakeshack/avatar-saad.png';
import avatarEngLead from '../assets/case-shakeshack/avatar-eng-lead.png';
import avatarHeadGrowth from '../assets/case-shakeshack/avatar-head-growth.png';

/* Research boards. Each is a single frame in Figma, not a carousel. */
import journeyMap from '../assets/case-shakeshack/research/customer-journey-map.png';
import competitorBoard from '../assets/case-shakeshack/research/competitor-screens.png';
import auditBoard from '../assets/case-shakeshack/research/experience-audit.png';
import insightsBoard from '../assets/case-shakeshack/research/key-insights.png';

/* §9 The work. Every before/after is one flat export that already contains both
   phones and both pills — see the note on ComparePair below. */
import homeBeforeAfter from '../assets/case-shakeshack/work/home-before-after.png';
import homeExplorations from '../assets/case-shakeshack/work/home-explorations.png';
import dailyOffers from '../assets/case-shakeshack/work/daily-offers.png';
import cartScreen from '../assets/case-shakeshack/work/cart.png';
import addOnsScreen from '../assets/case-shakeshack/work/add-ons.png';
import checkoutBefore from '../assets/case-shakeshack/work/checkout-before.png';
import checkoutAfter from '../assets/case-shakeshack/work/checkout-after.png';
import placingOrder from '../assets/case-shakeshack/work/placing-order.png';

/* §10 Components */
import orderCardCompare from '../assets/case-shakeshack/components/order-card.png';
import addOnCompare from '../assets/case-shakeshack/components/add-on.png';

import Lightbox from '../components/Lightbox';
import { SECTIONS, JUMP_NAV } from './shakeShackSections';

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
  { term: 'Role', value: 'Growth product designer' },
  { term: 'Status', value: 'Shipped', badge: true },
  { term: 'Focus area', value: 'Reorder & checkout speed' },
  { term: 'Platform', value: 'iOS' },
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

/* Titled group of figure cards, 2-up in the 952 column. */
function FigureGroup({ title, children }) {
  return (
    <div className="cs-figure-group">
      {title && <h3>{title}</h3>}
      <div className="cs-figure-grid">{children}</div>
    </div>
  );
}

/* Bordered aside with a coloured rule: the starting position, and the deliberate
   decision not to change the Shack Points card. */
function Callout({ label, children }) {
  return (
    <aside className="ss-callout">
      <span className="ss-callout-label">{label}</span>
      <p>{children}</p>
    </aside>
  );
}

/* One table component for all three tables on the page. `tone` on a cell tints
   it — used only by the prioritisation scores. */
function DataTable({ head, rows }) {
  return (
    <div className="ss-table" style={{ '--ss-cols': head.length }}>
      <div className="ss-table-head">
        {head.map(h => <span key={h}>{h}</span>)}
      </div>
      {rows.map(cells => (
        <div key={cells[0].value ?? cells[0]} className="ss-table-row">
          {cells.map((cell, i) => {
            const value = typeof cell === 'string' ? cell : cell.value;
            const tone = typeof cell === 'string' ? undefined : cell.tone;
            return (
              <span key={value} className={tone ? `is-${tone}` : undefined} data-lead={i === 0}>
                {value}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* Numbered sub-points inside a work block. Each has a title and a body, so this
   isn't Gartner's plain bulleted `points` list. */
function NumberedPoints({ items }) {
  return (
    <ol className="ss-points">
      {items.map(({ title, body }, i) => (
        <li key={title}>
          <span className="ss-point-n">{i + 1}</span>
          <div>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const TEAM = [
  { name: 'Saad Malik', role: 'Growth Product Designer', avatar: avatarSaad, self: true },
  { name: 'Engineering Lead', avatar: avatarEngLead },
  { name: 'Head of Growth, Canada', avatar: avatarHeadGrowth },
];

/* 1 — Understanding the problem. */
function UnderstandingTheProblem() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        Growing order value without slowing the customer down.
      </h2>
      <p className="cs-body">
        Unlike regular e-commerce, every extra decision here adds friction. People order while
        commuting, walking, mid-conversation, or standing in line. The business wanted to lift
        average order value through add-ons, offers and rewards. But the usual levers, popups and
        mandatory bundles, are exactly what a hospitality-led brand can&rsquo;t afford to use.
      </p>

      <blockquote className="cs-quote">
        How do you increase revenue without slowing the ordering experience down?
      </blockquote>

      <Callout label="Starting position">
        The flow transacted well. It didn&rsquo;t sell well. Customers could finish an order, but
        the experience rarely helped them discover complementary items or complete a meal
        naturally. Most orders remained a single item worth around $15, while nearly 10% were
        abandoned before completion.
      </Callout>
    </Section>
  );
}

/* 2 — Who it's for. */
function WhoItsFor() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Two moments, two different needs.</h2>
      <p className="cs-body">
        These are behavioural, drawn from walking the existing flow, not from interviews. The work
        concentrated on the two moments where the interface was doing the least for the person
        using it.
      </p>
      <FigureCard
        src={journeyMap}
        alt="Customer journey map: arriving, then committing"
        caption="Customer journey map — arriving, then committing"
        fit="cover-top"
      />
    </Section>
  );
}

/* 3 — My role. */
function MyRole() {
  return (
    <Section>
      <h2 className="cs-heading">The Team</h2>
      <p className="cs-body">
        <strong>Growth Product designer for Shake Shack Canada.</strong> I worked on how the app
        could grow order value without adding friction to a fast, habitual flow. I reviewed the
        existing ordering experience, looked at how other ordering apps handled the same problems,
        mapped the journey end to end, and designed the flows and screens that shipped.
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

const CATEGORY_LESSONS = {
  head: ['Category', 'Strong at', 'Weak at', 'What we took'],
  rows: [
    ['Delivery marketplaces', 'Cross-sell timed to peak purchase intent', 'Generic, brand-agnostic presentation', 'Put the suggestion in the cart, but make it look like our food'],
    ['Fast-casual apps', 'Premium feel, photography doing the selling', 'Thin on rewards and repeat mechanics', 'Let the food persuade instead of the copy'],
    ['Loyalty-led chains', 'Offers impossible to miss', 'Interruptive, often pushy', 'High visibility without blocking the order'],
  ],
};

/* 4 — Desk research. */
function DeskResearch() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Three categories, three different lessons.</h2>
      <p className="cs-body">
        Rather than benchmarking other burger apps, I looked sideways, at the specific mechanic
        each category does better than food ordering typically does.
      </p>

      <FigureCard
        src={competitorBoard}
        alt="Competitor screens across delivery marketplaces, fast-casual apps and loyalty-led chains"
        caption="Screens reviewed across the three categories"
        width={952}
        fit="cover-top"
      />

      <p className="cs-body">
        Delivery marketplaces (Uber Eats, DoorDash, Wonder) for upsell placement and cart
        optimisation. Fast-casual apps (Blank Street, Sweetgreen, Honest Greens) for what makes a
        premium flow feel effortless. Loyalty-led chains (Starbucks, Dunkin&rsquo;, Burger King)
        for how promotions surface and retention loops hold.
      </p>

      <DataTable head={CATEGORY_LESSONS.head} rows={CATEGORY_LESSONS.rows} />
    </Section>
  );
}

const AUDIT_GOALS = {
  head: ['Screen', 'Customer goal', 'Business goal'],
  rows: [
    ['Home', 'Find food', 'Surface offers'],
    ['Menu', 'Customize', 'Complement items'],
    ['Cart', 'Review order', 'Complete the meal'],
    ['Checkout', 'Confirm', 'Frictionless add-ons'],
    ['Tracking', 'Wait & Collect', 'Re-engage'],
  ],
};

/* 5 — Current state. */
function CurrentState() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">The audit, screen by screen.</h2>
      <p className="cs-body">
        I walked every screen in the live app (ordering, customization, checkout, order history,
        even account recovery) and marked each stage against what the customer is trying to do and
        what the business needs it to do. The gap between those two columns is where the
        opportunities were.
      </p>

      <FigureCard
        src={auditBoard}
        alt="Every screen of the existing app, captured before any redesign"
        caption="The existing app in full, captured before anything was redrawn."
        width={952}
        fit="cover-top"
      />

      <DataTable head={AUDIT_GOALS.head} rows={AUDIT_GOALS.rows} />
    </Section>
  );
}

/* 6 — Key insights. */
function KeyInsights() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">
        The flow transacts well, but rarely sells or celebrates.
      </h2>
      <p className="cs-body">
        Three findings did the most to shape the work. Each connects something visible in the
        audit to something I changed.
      </p>
      <FigureCard
        src={insightsBoard}
        alt="Key insights board: content breaking the interface, receipt-like add-ons, and no confirmation before the charge"
        caption="The three findings, and the change each one produced"
        fit="cover-top"
      />
    </Section>
  );
}

/* Tones verified against Figma 151:1133: High/P1 #2f8f4e, Medium #b4791c,
   High effort #ae3221, Low effort and P2 the plain body colour, Low/P3 muted. */
const PRIORITISATION = {
  head: ['Opportunity', 'Impact', 'Effort', 'Priority'],
  rows: [
    ['Decrease cancellations', { value: 'High', tone: 'high' }, { value: 'Low', tone: 'plain' }, { value: 'P1', tone: 'p1' }],
    ['Offer visibility', { value: 'High', tone: 'high' }, { value: 'Medium', tone: 'medium' }, { value: 'P1', tone: 'p1' }],
    ['Cart upsell', { value: 'High', tone: 'high' }, { value: 'Low', tone: 'plain' }, { value: 'P1', tone: 'p1' }],
    ['Product recommendations', { value: 'Medium', tone: 'medium' }, { value: 'Low', tone: 'plain' }, { value: 'P1', tone: 'p1' }],
    ['Dynamic bundles', { value: 'Medium', tone: 'medium' }, { value: 'High', tone: 'costly' }, { value: 'P2', tone: 'plain' }],
    ['Post-purchase promotions', { value: 'Low', tone: 'muted' }, { value: 'Medium', tone: 'medium' }, { value: 'P3', tone: 'muted' }],
  ],
};

/* 7 — Prioritization. */
function Prioritization() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What made the cut, and why.</h2>
      <p className="cs-body">
        Six opportunities came out of the audit. I scored each on impact against effort so the
        scope read as a decision rather than a wish list, and shipped the four quick wins first to
        prove the lift before investing in bundles.
      </p>
      <DataTable head={PRIORITISATION.head} rows={PRIORITISATION.rows} />
    </Section>
  );
}

const PRINCIPLES = [
  {
    title: 'Like a great host',
    body: 'Suggest the way a warm server would. Offer, never push. The guest should always feel looked after.',
  },
  {
    title: "Surface what's genuinely missing",
    body: 'A drink, some fries, not a generic "add more." Relevance beats volume.',
  },
  {
    title: 'Let the food sell',
    body: "Show the product large enough to want. If the copy has to sell it, the image isn't doing its job.",
  },
  {
    title: 'Watch satisfaction, not just order value',
    body: "Nothing pre-checked, nothing mandatory. Track CSAT beside AOV. One can't drop for the other to rise.",
  },
];

/* 8 — Define. */
function Define() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Guiding principles.</h2>
      <p className="cs-body">
        Shake Shack is fine-casual, premium and built on hospitality. It doesn&rsquo;t upsell, it
        recommends, like a generous server who says &ldquo;the shake&rsquo;s incredible
        today.&rdquo; Never a vending machine. Four rules kept every decision honest to that.
      </p>
      <div className="ss-principles">
        {PRINCIPLES.map(({ title, body }) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* 9 — The work. Text and media alternate sides, as on the Gartner feature rows. */
function TheWork() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Rebuilding the surfaces that sell.</h2>
      <p className="cs-body">
        Two screens carry most of the thinking: the home screen and the checkout. Both follow the
        same rule: make the content legible first, then let the suggestion do its work.
      </p>

      {/* 01 — Home */}
      <div className="cs-feature">
        <div className="cs-feature-text">
          <span className="cs-insight-n">01</span>
          <h3>Home</h3>
          <p>
            Same structure, rebuilt to hold real content. Four changes, and one deliberate
            decision not to change something.
          </p>
          <NumberedPoints
            items={[
              { title: 'Labelled navigation', body: 'The tab bar carried icons alone. Adding Home, Wallet, Orders and Profile as text removes the guesswork on a bar people use on every visit.' },
              { title: 'Larger category cards', body: 'Fewer, bigger tiles with room for the full name. "Shakes & Frozen Cu..." now wraps to "Shakes & Frozen Custards" instead of truncating.' },
              { title: 'Clearer order card', body: 'Item name in full over two lines, price, date, fulfilment method, status and store address. Enough to recognise the order without opening it.' },
              { title: 'Better offer cards', body: 'Pale, flat colour blocks replaced with product photography on deep brand tones. The old card repeated "Chocolate Shake" three times and still truncated; the new one names it once and shows the food.' },
            ]}
          />
        </div>
        <div className="ss-feature-media">
          <FigureCard
            src={homeBeforeAfter}
            alt="The home screen before and after the redesign"
            width={464}
            fit="cover-top"
          />
          <Callout label="What we chose not to change">
            We explored several directions for the Shack Points card and kept the original. It
            already sits at the top of the screen with the most visual weight, and every
            alternative traded that prominence for tidiness. Rewards are what bring people back,
            so the card stayed exactly where it was.
          </Callout>
        </div>
      </div>

      <FigureGroup title="Home - Explorations">
        <div className="ss-figure-span">
          <p className="cs-body">
            A full-bleed brand hero with a single Order Now call, against an offers carousel
            sitting directly under the rewards bar. The carousel won: it puts an actual product in
            the first screenful rather than generic brand photography, which matters when most
            sessions start with a rough intention rather than a decision.
          </p>
          <FigureCard
            src={homeExplorations}
            alt="Two directions for the home screen: a brand hero and an offers carousel"
            caption="Two directions for what a returning customer should see first."
            fit="cover-top"
          />
        </div>
      </FigureGroup>

      <div className="ss-block">
        <h3>Daily offers</h3>
        <p className="cs-body">A new surface, and the first thing the app says when you open it.</p>
        <p className="cs-body">
          <strong>Exploration:</strong> A welcome reward with a promo code to copy, then apply
          manually at checkout. It fires once, and it asks the customer to do the work of
          redeeming it.
        </p>
        <p className="cs-body">
          <strong>Shipped:</strong> A single daily special with the product itself as the hero and
          Order Now as the only action. No code, no copying, no separate redemption step. The
          offer and the order are the same tap.
        </p>
        <FigureCard
          src={dailyOffers}
          alt="The promo-code exploration beside the shipped daily special"
          caption="A new surface, and the first thing the app says when you open it."
          fit="cover-top"
        />
      </div>

      {/* 02 — Cart */}
      <div className="cs-feature">
        <div className="cs-feature-text">
          <span className="cs-insight-n">02</span>
          <h3>Cart</h3>
          <p>The cart became a place you can read, and change your mind in.</p>
          <NumberedPoints
            items={[
              { title: 'Delivery resolved first', body: 'Method, fee, address, store hours and timing sit in one block at the top, so nothing about fulfilment surprises anyone at the last step.' },
              { title: 'Modifiers on the line item', body: '"Regular, No Tomato, Add Cherry" reads directly under the item, giving confirmation without opening anything.' },
              { title: 'Edit in place', body: 'Quantity steppers and an Edit control on every row, plus Add more items at the bottom rather than a trip back through the menu.' },
            ]}
          />
        </div>
        <div className="ss-feature-media">
          <FigureCard src={cartScreen} alt="The rebuilt cart" fit="cover-top" width={464} />
        </div>
      </div>

      {/* 03 — Add-ons, media first */}
      <div className="cs-feature is-reversed">
        <div className="cs-feature-text">
          <span className="cs-insight-n">03</span>
          <h3>Add-ons</h3>
          <p>The single highest-leverage change in the project, and the smallest.</p>
          <NumberedPoints
            items={[
              { title: 'Photographed like a menu item', body: 'Full-width image, name, description and price. In the old design the same product was a text row with a thumbnail, truncated to "Strawberry Lemonade S...".' },
              { title: 'Placed at peak intent', body: 'Inside the checkout, after the decision to order is made and before payment closes it.' },
              { title: 'Nothing pre-selected', body: 'An explicit Add button. One tap takes it, no tap ignores it. No pre-checked boxes, no mandatory bundles.' },
            ]}
          />
        </div>
        <div className="ss-feature-media">
          <FigureCard src={addOnsScreen} alt="The rebuilt add-ons step" fit="cover-top" width={464} />
        </div>
      </div>

      <div className="ss-block">
        <h3>Checkout</h3>
        <p className="cs-body">The checkout, before and after.</p>
        <p className="cs-body">
          <strong>Before:</strong> Order summary, add-ons, loyalty points, promo code, tips,
          totals and payment all stacked at the same visual weight. The promo field carries three
          lines of rules copy; the add-on that should sell the meal is a truncated text row.
        </p>
        <p className="cs-body">
          <strong>After:</strong> Delivery, order, payment, totals and add-ons separated into
          distinct blocks, with the running total and the cancellation policy stated before the
          charge rather than after it.
        </p>
        <div className="cs-figure-grid">
          <FigureCard src={checkoutBefore} alt="Checkout before" caption="Before" fit="cover-top" />
          <FigureCard src={checkoutAfter} alt="Checkout after" caption="After" fit="cover-top" />
        </div>
      </div>

      {/* 04 — Placing the order */}
      <div className="cs-feature">
        <div className="cs-feature-text">
          <span className="cs-insight-n">04</span>
          <h3>Placing the order</h3>
          <p>
            A deliberate slow moment in an otherwise fast flow, aimed directly at the cancellation
            rate.
          </p>
          <NumberedPoints
            items={[
              { title: 'Recap before charge', body: 'Store and address, timing, every item in the bag, and the card being charged. The four things people get wrong.' },
              { title: 'An honest way back', body: "Go Back sits directly under the confirm button at equal weight. Changing your mind isn't a hidden action." },
              { title: 'Visible progress', body: 'The button fills as the order posts, so nobody taps twice wondering whether it worked.' },
            ]}
          />
        </div>
        <div className="ss-feature-media">
          <FigureCard src={placingOrder} alt="The confirmation sheet before the charge" fit="cover-top" width={464} />
        </div>
      </div>
    </Section>
  );
}

/* 10 — Components. */
function Components() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">Two components carried the change.</h2>
      <p className="cs-body">
        Most of the visible improvement comes from rebuilding two cards, then applying them
        consistently. Same data, reordered around what someone actually needs to recognise.
      </p>

      <div className="ss-block">
        <h3>Order Card</h3>
        <p className="cs-body">
          <strong>Before:</strong> a delivery receipt line, title truncated mid-word to &ldquo;10x
          Strawberry Lemonade 10x Strawber...&rdquo;, with price and date competing at the bottom.
        </p>
        <p className="cs-body">
          <strong>After:</strong> the item named in full across two lines, price directly beneath
          it, then date, fulfilment method, status and store address. The add button became a
          clean circular control rather than a green badge overlapping the product photo.
        </p>
        <FigureCard
          src={orderCardCompare}
          alt="The order card before and after"
          caption="Order card: Before and After"
          fit="cover-top"
        />
      </div>

      <div className="ss-block">
        <h3>Add-on</h3>
        <p className="cs-body">
          <strong>Before:</strong> a horizontal text row with a small thumbnail, the name repeated
          and truncated, and a green plus badge sitting on the image.
        </p>
        <p className="cs-body">
          <strong>After:</strong> a vertical card with the photograph at full width, a single
          clean name, the description in full, and price paired with an explicit Add button.
        </p>
        <FigureCard
          src={addOnCompare}
          alt="The add-on card before and after"
          caption="Add-ons: Before and After"
          fit="cover-top"
        />
      </div>
    </Section>
  );
}

const OUTCOMES = [
  { problem: 'Add-ons missed', design: 'Full menu-card treatment in checkout', signal: 'Average order value' },
  { problem: 'Offers went unseen', design: 'Daily special on open, one tap to order', signal: 'Daily order volume' },
  { problem: 'Content truncated and hard to scan', design: 'Layouts rebuilt to hold real content', signal: 'Repeat order rate' },
  { problem: 'No review before the charge', design: 'Explicit confirmation sheet', signal: 'Cancellation rate' },
];

/* 11 — Outcome. */
function Outcome() {
  return (
    <Section>
      <h2 className="cs-heading cs-measure">What it was built to move.</h2>
      <p className="cs-body">
        Each problem, the decision I made, and the signal it was built to move. Where I have
        measured figures from the client they&rsquo;re noted; where I don&rsquo;t, I&rsquo;d
        rather name the metric than quote a number I can&rsquo;t stand behind.
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
        The interesting part wasn&rsquo;t any single screen. It was that the fastest way to grow
        order value here was to fix what the app was already trying to say, not to add new things
        for it to say.
      </p>
      <p className="cs-body">
        Almost every change was subtractive or corrective: a name that fits, a tile with room to
        breathe, a suggestion given space to look like food. Conversion and usability turned out
        to be the same goal: the add-on lands because the checkout is calm, not because the card
        is louder.
      </p>
      <p className="cs-body">
        <strong>What I&rsquo;d challenge now.</strong> The shipped daily-offer modal carries
        &ldquo;available for a limited time only&rdquo; and a Friday Special badge. That&rsquo;s
        scarcity framing, and it sits uneasily beside a principle about offering rather than
        pushing. If I ran this again I&rsquo;d test the same card without the urgency copy and see
        whether the food alone carries it.
      </p>
      <p className="cs-body">
        <strong>I will also</strong> personalize the recommendation against order history, and tie
        the offer surface to time of day. &ldquo;Surface what&rsquo;s genuinely missing&rdquo;
        only gets sharp once the app knows what you usually order.
      </p>
    </Section>
  );
}

const SECTION_BODIES = {
  'understanding-the-problem': UnderstandingTheProblem,
  'who-its-for': WhoItsFor,
  'my-role': MyRole,
  'desk-research': DeskResearch,
  'current-state': CurrentState,
  'key-insights': KeyInsights,
  prioritization: Prioritization,
  define: Define,
  'the-work': TheWork,
  components: Components,
  outcome: Outcome,
};

function Hero() {
  return (
    <section className="cs-hero">
      <div style={{ ...HERO_SHELL, paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 40 }}>
        <div className="cs-hero-brand">
        <span
          className="cs-logomark"
          style={{ background: '#418613' }}
        >
          <img
            src={shackLogomark}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />
        </span>
          <h1 className="cs-title">Shake Shack Mobile</h1>
        </div>

        <p className="cs-hero-intro">
          Shake Shack is a fine-casual burger chain with over 690 locations worldwide, and today,
          roughly three quarters of its orders begin on a screen rather than at the counter. I
          worked with Shake Shack Canada to improve the mobile ordering experience. The goal was
          to make reordering faster, reduce friction throughout checkout, and encourage customers
          to come back more often.
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
          <img src={heroShot} alt="The Shake Shack food ordering and loyalty app" />
          <figcaption className="cs-hero-pill">
            Shake Shack<span> • 2025</span>
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

export default function ShakeShackPage() {
  const [viewer, setViewer] = useState(null);
  const openLightbox = useCallback((items, startIndex) => setViewer({ items, startIndex }), []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      <main className="cs-page is-shakeshack">
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
