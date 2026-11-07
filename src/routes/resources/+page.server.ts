import { ROLES } from '#lib/constants/roles.ts';
import type { Resource } from '#lib/server/database.types.ts';
import type { Actions } from './$types';
import * as z from 'zod';
import { fail } from '@sveltejs/kit';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { database } from '#lib/server/db.ts';

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
			return fail(400, {
				errorType: 'form-errors' as const,
				errors: z.flattenError(result.error).fieldErrors
			});
		}

		const { file, ...metadata } = result.data;
		const fileName = `${randomUUID()}${path.extname(file.name)}`;
		await mkdir('uploads', { recursive: true });
		await writeFile(path.join('uploads', fileName), Buffer.from(await file.arrayBuffer()));

		const filePath = path.join('uploads', fileName);

		try {
			await database
				.insertInto('resources')
				.values({ ...metadata, file_path: filePath })
				.execute();
		} catch (error) {
			console.log('Could not save resource', error);
			await unlink(filePath);
			return fail(500, {
				errorType: 'upload-fail' as const,
				message: 'Could not save the resource. Please try again.'
			});
		}

		return { success: true };
	}
} satisfies Actions;
