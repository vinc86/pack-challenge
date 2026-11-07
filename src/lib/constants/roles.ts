export const ROLES = ['coach/mentor', 'coachee/mentee'] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
	'coach/mentor': 'Coach/Mentor',
	'coachee/mentee': 'Coachee/Mentee'
};
