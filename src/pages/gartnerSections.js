/* The twelve labelled sections of the Gartner case study, in page order.
   Kept out of the component file so fast refresh stays happy, and so the
   jump-nav and the page body read from one list. */
/* The hero's six-item nav maps onto the section anchors below. Figma shows it as
   a static bar; these are the sections each label corresponds to. */
export const JUMP_NAV = [
  { label: 'Overview', target: null },
  { label: 'Discovery', target: 'discovery' },
  { label: 'Research', target: 'what-research-revealed' },
  { label: 'Opportunity', target: 'the-new-engagement-model' },
  { label: 'The Product', target: 'the-product' },
  { label: 'Outcome', target: 'outcome' },
];

export const SECTIONS = [
  { id: 'understanding-the-problem', label: 'Understanding the problem' },
  { id: 'my-role', label: 'My role' },
  { id: 'who-is-it-for', label: 'Who is it for' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'what-research-revealed', label: 'What research revealed' },
  { id: 'looking-beyond-advisory', label: 'Looking beyond advisory' },
  { id: 'the-new-engagement-model', label: 'The new engagement model' },
  { id: 'design-principles', label: 'Design principles' },
  { id: 'explorations', label: 'Explorations' },
  { id: 'the-product', label: 'The product' },
  { id: 'outcome', label: 'Outcome' },
];
