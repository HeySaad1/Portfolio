/* Section labels rendered down the left rail, in page order. `id` doubles as the
   scroll target for the jump nav, so the two lists have to stay in sync. */
export const SECTIONS = [
  { id: 'the-constraint', label: 'The Constraint' },
  { id: 'research', label: 'Research' },
  { id: 'personas', label: 'Personas' },
  { id: 'problem-statements', label: 'Problem Statements' },
  { id: 'structure', label: 'Structure' },
  { id: 'information-architecture', label: 'Information Architecture' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'hi-fi-designs', label: 'Hi-Fi Designs' },
  { id: 'design-system', label: 'Design System' },
  { id: 'outcome', label: 'Outcome' },
];

/* Deliberately shorter than SECTIONS: the nav jumps to the seven decision points,
   and lets the three screen-dump sections (wireframes, hi-fi, design system) sit
   under Architecture rather than adding three more stops. First entry has no
   target so it resolves to the top of the page. */
export const JUMP_NAV = [
  { label: 'Overview', target: null },
  { label: 'Research', target: 'research' },
  { label: 'Personas', target: 'personas' },
  { label: 'Problems', target: 'problem-statements' },
  { label: 'Structure', target: 'structure' },
  { label: 'Architecture', target: 'information-architecture' },
  { label: 'Outcome', target: 'outcome' },
];
