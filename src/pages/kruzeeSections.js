/* The twelve labelled sections of the Kruzee case study, in page order.
   Kept out of the component file so fast refresh stays happy, and so the
   jump-nav and the page body read from one list. Labels match Figma 131:1607. */
export const SECTIONS = [
  { id: 'constraint', label: 'Constraint' },
  { id: 'the-approach', label: 'The approach' },
  { id: 'the-phase-model', label: 'The phase model' },
  { id: 'why-lessons-lock', label: 'Why lessons lock' },
  { id: 'booking-and-canceling', label: 'Booking and canceling' },
  { id: 'paying-over-13-months', label: 'Paying over 13 months' },
  { id: 'admin-cohorts', label: 'Admin - Cohorts' },
  { id: 'admin-students', label: 'Admin - Students' },
  { id: 'admin-instructors', label: 'Admin - Instructors' },
  { id: 'the-site', label: 'The site' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'outcome', label: 'Outcome' },
];

/* Seven stops against twelve sections (Figma 131:1623). The first label is
   "Constraint", not "Overview" as on the other four cases — it still resolves
   to the top of the page. "Student portal" and "Admin portal" each cover a run
   of sections and point at the first in their run. */
export const JUMP_NAV = [
  { label: 'Constraint', target: null },
  { label: 'Approach', target: 'the-approach' },
  { label: 'Student portal', target: 'the-phase-model' },
  { label: 'Admin portal', target: 'admin-cohorts' },
  { label: 'The site', target: 'the-site' },
  { label: 'Decisions', target: 'decisions' },
  { label: 'Outcome', target: 'outcome' },
];
