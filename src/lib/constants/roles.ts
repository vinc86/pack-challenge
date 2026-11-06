export const ROLES = ['Mentor/Coach', 'Mentee/Coachee'] as const;

export type Role = (typeof ROLES)[number];
