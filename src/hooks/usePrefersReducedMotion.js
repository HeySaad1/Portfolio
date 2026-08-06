import { useSyncExternalStore } from 'react';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function subscribe(onChange) {
  motionQuery.addEventListener('change', onChange);
  return () => motionQuery.removeEventListener('change', onChange);
}

/* Shared by the home-page carousel and the case-study figure carousels. */
export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, () => motionQuery.matches);
}
