import { useState, useEffect, useRef, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import avatar from '../assets/avatar-color.png';

/* Entry loader. The ring is the progress bar; the photo warms from greyscale to
   colour slightly ahead of it, so colour always means loaded and never arrives
   early. Exits by clip-path rather than sliding a panel.

   The meter runs on rAF and writes straight to the DOM through refs — at 60fps
   that avoids a re-render per frame, and React state is kept for the three
   things that actually change rarely (phase text and exit stage). */

const FILL_MS = 2600;   // the ring always takes at least this long
const CEILING_MS = 4600; // hard cap, however slow the real payload is
const SETTLE_MS = 780;
const LIFT_MS = 1250;

const PHASES = [
  { at: 0.0, line: 'Preparing selected work', tag: 'Loading' },
  { at: 0.55, line: 'Almost ready', tag: 'Finishing' },
  { at: 1.0, line: 'Ready', tag: 'Portfolio loaded' },
];

const easeOut = x => 1 - Math.pow(1 - x, 2.2);

export default function EntryLoader() {
  const reducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState('enter'); // enter → go → settle → lift → gone
  const [phase, setPhase] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const ringRef = useRef(null);
  const avRef = useRef(null);
  const pctRef = useRef(null);
  const doneRef = useRef(false);
  const phaseRef = useRef(-1);
  const phaseLockRef = useRef(0);
  const timersRef = useRef([]);

  const beginExit = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (ringRef.current) ringRef.current.style.strokeDashoffset = '0';
    if (avRef.current) {
      avRef.current.style.setProperty('--g', '0');
      avRef.current.classList.add('is-colour');
    }
    if (pctRef.current) pctRef.current.textContent = '100%';
    setPhase(PHASES.length - 1);
    setStage('settle');

    const t1 = setTimeout(() => {
      setStage('lift');
      document.documentElement.classList.remove('entry-lock');
      document.body.classList.remove('entry-lock');
      const t2 = setTimeout(() => setStage('gone'), LIFT_MS);
      timersRef.current.push(t2);
    }, SETTLE_MS);
    timersRef.current.push(t1);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const t0 = Date.now();
    let raf = 0;
    let lastPct = -1;
    let documentLoaded = document.readyState === 'complete';
    const onLoad = () => { documentLoaded = true; };
    window.addEventListener('load', onLoad);

    /* Real progress: how much of the entry payload has decoded. Lazy images are
       deliberately deferred and are not part of it — counting them would hold
       the ratio permanently below 1 and leave the ceiling to end every load. */
    const loadedFraction = () => {
      const imgs = Array.from(document.images).filter(i => i.loading !== 'lazy');
      const ratio = imgs.length
        ? imgs.filter(i => i.complete && i.naturalWidth > 0).length / imgs.length
        : 1;
      return documentLoaded ? ratio : Math.min(ratio, 0.95);
    };

    const setPhaseIfDue = shown => {
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (shown >= PHASES[i].at) {
          if (i === phaseRef.current) return;
          const now = Date.now();
          // Hold each line long enough to be read, except the final one.
          if (now < phaseLockRef.current && i < PHASES.length - 1) return;
          phaseRef.current = i;
          phaseLockRef.current = now + 700;
          setSwapping(true);
          const t = setTimeout(() => { setPhase(i); setSwapping(false); }, 300);
          timersRef.current.push(t);
          return;
        }
      }
    };

    const meter = () => {
      if (doneRef.current) return;
      const timeP = Math.min(1, (Date.now() - t0) / FILL_MS);
      const realP = loadedFraction();
      // Let the bar run slightly ahead of a lagging payload so it never stalls.
      const shown = easeOut(Math.min(timeP, realP < timeP ? realP + 0.15 : timeP));
      const pct = Math.min(100, Math.round(shown * 100));

      if (pct !== lastPct) {
        lastPct = pct;
        if (pctRef.current) pctRef.current.textContent = `${pct}%`;
        if (ringRef.current) ringRef.current.style.strokeDashoffset = String(1 - shown);
        // Colour leads the ring, so the photo is fully warm as the arc closes.
        const colourP = Math.pow(shown, 0.45);
        if (avRef.current) avRef.current.style.setProperty('--g', (1 - colourP).toFixed(3));
      }
      setPhaseIfDue(shown);

      if (timeP >= 1 && realP >= 1) { beginExit(); return; }
      raf = requestAnimationFrame(meter);
    };

    document.documentElement.classList.add('entry-lock');
    document.body.classList.add('entry-lock');
    const goT = setTimeout(() => setStage('go'), 0);
    timersRef.current.push(goT);
    raf = requestAnimationFrame(meter);
    const capT = setTimeout(beginExit, CEILING_MS);
    timersRef.current.push(capT);

    // Any deliberate interaction skips the wait.
    const skip = () => beginExit();
    const events = ['click', 'keydown', 'wheel', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, skip, { passive: true }));
    // Returning via back/forward cache should not replay the whole thing.
    const onPageShow = e => { if (e.persisted) beginExit(); };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      cancelAnimationFrame(raf);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onPageShow);
      events.forEach(ev => window.removeEventListener(ev, skip));
      document.documentElement.classList.remove('entry-lock');
      document.body.classList.remove('entry-lock');
    };
  }, [reducedMotion, beginExit]);

  if (reducedMotion || stage === 'gone') return null;

  return (
    <div className={`entry-overlay is-${stage}`} role="presentation" aria-hidden="true">
      <div className="entry-paper" />
      <div className="entry-grain" />

      <div className="entry-readout">
        <b />
        <em ref={pctRef}>0%</em>
        <i>{PHASES[phase].tag}</i>
      </div>

      <div className="entry-centre">
        <div className="entry-avwrap">
          <svg className="entry-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="entry-ring-track" cx="60" cy="60" r="56" />
            <circle ref={ringRef} className="entry-ring-arc" cx="60" cy="60" r="56" pathLength="1" />
          </svg>
          <div className="entry-av" ref={avRef}>
            <img src={avatar} alt="" aria-hidden="true" />
          </div>
        </div>
        <p className={`entry-status${swapping ? ' is-swapping' : ''}`}>{PHASES[phase].line}</p>
      </div>
    </div>
  );
}
