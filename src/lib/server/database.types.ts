import type { Generated } from 'kysely';

type Role = 'Mentor/Coach' | 'Mentee/Coachee';

type Resource = {
	id: Generated<string>;
	title: string;
	description: string;
	category: string;
	language: string;
	provider: string;
	roles: Role[];
	file_path: string;
	created_at: Generated<Date>;
};

export interface Database {
	resources: Resource;
}
