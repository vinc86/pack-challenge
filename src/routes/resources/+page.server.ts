import { ROLES } from '#lib/constants/roles.ts';
import type { Resource } from '#lib/server/database.types.ts';
import type { Actions } from './$types';
import * as z from 'zod';
import { fail } from '@sveltejs/kit';

type Fields = Pick<
	Resource,
	'title' | 'description' | 'category' | 'language' | 'provider' | 'roles'
> & { file: File };

const required = (field: string) => ({ error: `${field} is required` });

const formSchema = z.object({
	title: z
		.string(required('Title'))
		.trim()
		.min(1, required('Title'))
		.max(200, { error: 'Title must be at most 200 characters' }),
	description: z
		.string(required('Description'))
		.trim()
		.min(1, required('Description'))
		.max(1000, { error: 'Description must be at most 1000 characters' }),
	category: z.string(required('Category')).min(1, { error: 'Select a category' }),
	language: z.string(required('Language')).min(1, { error: 'Select a language' }),
	provider: z.string(required('Provider')).min(1, { error: 'Select a provider' }),
	roles: z
		.array(z.enum(ROLES, { error: 'Invalid role' }))
		.min(1, { error: 'Select at least one role' }),
	file: z
		.file({ error: 'Select a file' })
		.min(1, { error: 'Select a file' })
		.max(10_000_000, { error: 'File must be smaller than 10 MB' })
}) satisfies z.ZodType<Fields>;

export const actions = {
	upload: async (event) => {
		const data = await event.request.formData();
		const result = formSchema.safeParse({
			...Object.fromEntries(data),
			roles: data.getAll('roles')
		});

		if (!result.success) {
			return fail(400, { errors: z.flattenError(result.error).fieldErrors });
		}
	}
} satisfies Actions;
