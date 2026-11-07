import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from '#lib/constants/files.ts';
import { ROLES } from '#lib/constants/roles.ts';
import { categories, languages, providers } from '#lib/constants/uploadDialog.ts';
import type { SelectProps } from '#lib/components/Select/select.types.ts';
import type { Resource } from '#lib/server/database.types.ts';
import z from 'zod';

type Fields = Pick<
	Resource,
	'title' | 'description' | 'category' | 'language' | 'provider' | 'roles'
> & { file: File };
const required = (field: string) => ({ error: `${field} is required` });

// Only accept values that are offered in the form's select options
const oneOf = (field: SelectProps, error: string) =>
	z.enum(
		field.options.map((option) => option.value),
		{ error }
	);

export const formSchema = z.object({
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
	category: oneOf(categories, 'Select a category'),
	language: oneOf(languages, 'Select a language'),
	provider: oneOf(providers, 'Select a provider'),
	roles: z
		.array(z.enum(ROLES, { error: 'Invalid role' }))
		.min(1, { error: 'Select at least one role' }),
	file: z
		.file({ error: 'Select a file' })
		.min(1, { error: 'Select a file' })
		.max(MAX_FILE_SIZE, { error: `File must be smaller than ${MAX_FILE_SIZE_MB} MB` })
		.mime(ALLOWED_FILE_TYPES, { error: 'Unsupported file type' })
}) satisfies z.ZodType<Fields>;
