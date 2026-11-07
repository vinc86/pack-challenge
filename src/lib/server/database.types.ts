import type { Generated, Insertable, Selectable } from 'kysely';
import type { Role } from '#lib/constants/roles.ts';

export type ResourceTable = {
	id: Generated<string>;
	title: string;
	description: string;
	category: string;
	language: string;
	provider: string;
	roles: Role[];
	file_path: string;
	created_at: Generated<Date>;
	type: string;
};

export type Resource = Selectable<ResourceTable>;
export type NewResource = Insertable<ResourceTable>;

export interface Database {
	resources: ResourceTable;
}
