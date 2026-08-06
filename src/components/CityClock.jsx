import { useState, useEffect, useRef, useCallback } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/* Three cities, rotating every 5s. Press and drag up/down to flick through them
   by hand; a plain tap nudges forward one. Rotation is suspended only while
   held, and resumes from wherever you let go. */
const CITIES = [
  { city: 'Toronto', tz: 'America/Toronto' },
  { city: 'San Francisco', tz: 'America/Los_Angeles' },
  { city: 'Islamabad', tz: 'Asia/Karachi' },
];

const ROTATE_MS = 5000;
const TICK_MS = 15000; // minute precision — no second hand, so this is plenty
const SWAP_MS = 320;
const STEP_PX = 46;

const formatTime = (tz, date) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

const wrap = n => ((n % CITIES.length) + CITIES.length) % CITIES.length;

export default function CityClock() {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  /* Hold the instant, not the formatted string: the string is derived below, so
     switching city re-renders with the right time without an extra effect. */
  const [instant, setInstant] = useState(() => new Date());
  const reducedMotion = usePrefersReducedMotion();

  const holding = useRef(false);
  const dragStartY = useRef(0);
  const dragFromIndex = useRef(0);
  const dragMoved = useRef(false);
  const swapTimer = useRef(null);
  // Rotation restarts whenever this changes, so releasing a drag gives a full 5s.
  const [rotateEpoch, setRotateEpoch] = useState(0);

  /* Minute precision, so a 15s tick is plenty to stay honest. */
  useEffect(() => {
    const t = setInterval(() => setInstant(new Date()), TICK_MS);
    return () => clearInterval(t);
  }, []);

  const now = formatTime(CITIES[index].tz, instant);

  /* Auto-rotation. Paused while the clock is held. */
  useEffect(() => {
    const t = setInterval(() => {
      if (holding.current) return;
      if (reducedMotion) {
        setIndex(i => wrap(i + 1));
        return;
      }
      // Fade out, swap at the bottom of the fade, fade back in.
      setSwapping(true);
      swapTimer.current = setTimeout(() => {
        setIndex(i => wrap(i + 1));
        setSwapping(false);
      }, SWAP_MS);
    }, ROTATE_MS);
    return () => {
      clearInterval(t);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, [reducedMotion, rotateEpoch]);

  const onPointerDown = useCallback(e => {
    holding.current = true;
    dragMoved.current = false;
    dragStartY.current = e.clientY;
    setIndex(i => { dragFromIndex.current = i; return i; });
    // A swap mid-drag would blink, so cancel any fade already in flight.
    if (swapTimer.current) clearTimeout(swapTimer.current);
    setSwapping(false);
    setRotateEpoch(n => n + 1);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(e => {
    if (!holding.current) return;
    const steps = Math.round((dragStartY.current - e.clientY) / STEP_PX);
    if (steps !== 0) dragMoved.current = true;
    setIndex(wrap(dragFromIndex.current + steps));
  }, []);

  const onPointerUp = useCallback(() => {
    if (!holding.current) return;
    holding.current = false;
    if (!dragMoved.current) setIndex(i => wrap(i + 1)); // a tap nudges forward
    setRotateEpoch(n => n + 1);
  }, []);

  const step = useCallback(delta => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
    setSwapping(false);
    setIndex(i => wrap(i + delta));
    setRotateEpoch(n => n + 1);
  }, []);

  return (
    <div
      className={`city-clock${swapping ? ' is-swapping' : ''}`}
      role="group"
      aria-label={`Local time in ${CITIES[index].city}. Use arrow keys to change city.`}
      tabIndex={0}
      title="Click to hold · drag to change city"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      }}
    >
      <span className="city-clock-city">{CITIES[index].city}</span>
      <span className="city-clock-time">
        {now}
        <span className="sr-only"> in {CITIES[index].city}</span>
      </span>
    </div>
  );
}
