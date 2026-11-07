import type { Actions } from './$types';
import * as z from 'zod';
import { fail } from '@sveltejs/kit';
import { mkdir, rm, writeFile } from 'node:fs/promises';
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

	return { resources: result };
}

const uploadFailed = () =>
	fail(500, {
		errorType: 'upload-fail' as const,
		message: 'Could not save the resource. Please try again.'
	});

/* A failed cleanup is only logged, so it never hides the upload error. `force` ignores missing files */
const removeFile = (filePath: string) =>
	rm(filePath, { force: true }).catch((error) =>
		console.log('Could not remove orphaned file', filePath, error)
	);

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
		const filePath = path.join('uploads', `${randomUUID()}${path.extname(file.name)}`);

		try {
			await mkdir('uploads', { recursive: true });
			await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
		} catch (error) {
			console.log('Could not write file', error);
			/* writeFile can fail halfway and leave a partial file */
			await removeFile(filePath);
			return uploadFailed();
		}

		/* Save file in database */
		try {
			await database
				.insertInto('resources')
				.values({ ...metadata, file_path: filePath, type: file.type })
				.execute();
		} catch (error) {
			console.log('Could not save resource', error);
			await removeFile(filePath);
			return uploadFailed();
		}

		return { success: true };
	}
} satisfies Actions;
