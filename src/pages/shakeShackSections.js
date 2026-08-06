/* The eleven labelled sections of the Shake Shack case study, in page order.
   Kept out of the component file so fast refresh stays happy, and so the
   jump-nav and the page body read from one list. Labels match Figma 151:838. */
export const SECTIONS = [
  { id: 'understanding-the-problem', label: 'Understanding the problem' },
  { id: 'who-its-for', label: "Who it's for" },
  { id: 'my-role', label: 'My Role' },
  { id: 'desk-research', label: 'Desk research' },
  { id: 'current-state', label: 'Current state' },
  { id: 'key-insights', label: 'Key insights' },
  { id: 'prioritization', label: 'Prioritization' },
  { id: 'define', label: 'Define' },
  { id: 'the-work', label: 'The work' },
  { id: 'components', label: 'Components' },
  { id: 'outcome', label: 'Outcome' },
];

/* Five stops against eleven sections. The labels are Figma's own (151:895).
   "Discovery" covers the whole research block — Who it's for through
   Prioritization — so it targets the first of them. */
export const JUMP_NAV = [
  { label: 'Overview', target: null },
  { label: 'Discovery', target: 'who-its-for' },
  { label: 'Define', target: 'define' },
  { label: 'The work', target: 'the-work' },
  { label: 'Outcome', target: 'outcome' },
];
