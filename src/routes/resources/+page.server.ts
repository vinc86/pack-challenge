import type { Actions } from './$types';
import * as z from 'zod';
import { fail } from '@sveltejs/kit';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { database } from '#lib/server/db.ts';
import { formSchema } from './schema';

export async function load() {
	const result = await database
		.selectFrom('resources')
		.selectAll()
		.orderBy('created_at', 'desc')
		.execute();

	console.log(result);
	return { resources: result };
}

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

		/* Save file locally first as a fallback */
		const fileName = `${randomUUID()}${path.extname(file.name)}`;
		await mkdir('uploads', { recursive: true });
		await writeFile(path.join('uploads', fileName), Buffer.from(await file.arrayBuffer()));
		const filePath = path.join('uploads', fileName);

		/* Save file in database */
		try {
			await database
				.insertInto('resources')
				.values({ ...metadata, file_path: filePath, type: file.type })
				.execute();
		} catch (error) {
			console.log('Could not save resource', error);
			/* Remove file locally if save to db fails */
			await unlink(filePath);
			return fail(500, {
				errorType: 'upload-fail' as const,
				message: 'Could not save the resource. Please try again.'
			});
		}

		return { success: true };
	}
} satisfies Actions;
