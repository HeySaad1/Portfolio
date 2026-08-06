/* The eight labelled sections of the Upvote case study, in page order.
   Kept out of the component file so fast refresh stays happy, and so the
   jump-nav and the page body read from one list.

   Note: Figma has seven labelled sections — Branding is a nested
   "Section - BRANDING" block inside Design (90:376) rather than its own stop.
   Promoting it to a top-level section is the brief's editorial call. */
export const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'why-this-needed-to-exist', label: 'Why this needed to exist' },
  { id: 'the-research', label: 'The research' },
  { id: 'from-the-research', label: 'From the research' },
  { id: 'design', label: 'Design' },
  { id: 'branding', label: 'Branding' },
  { id: 'the-work', label: 'The work' },
  { id: 'outcome', label: 'Outcome' },
];

/* Six stops against eight sections, same as Gartner. "Neutrality" points at the
   design section, since that is where the neutrality decisions actually live —
   the label is the reader's word for it, not the section's. */
export const JUMP_NAV = [
  { label: 'Overview', target: null },
  { label: 'Research', target: 'the-research' },
  { label: 'Neutrality', target: 'design' },
  { label: 'Branding', target: 'branding' },
  { label: 'The Work', target: 'the-work' },
  { label: 'Outcome', target: 'outcome' },
];
