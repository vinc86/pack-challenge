import { database } from '#lib/server/db.ts';
import path from 'node:path';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';

export const GET: RequestHandler = async ({ params }) => {
	const resourceId = params.id;

	const resourceFromDb = await database
		.selectFrom('resources')
		.select(['file_path'])
		.where('id', '=', resourceId)
		.executeTakeFirst();

	if (!resourceFromDb) {
		error(404, 'Resource not found');
	}

	const file = await readFile(resourceFromDb.file_path);
	const extension = path.extname(resourceFromDb.file_path).toLowerCase();

	const mimeTypes: Record<string, string> = {
		'.pdf': 'application/pdf',
		'.txt': 'text/plain',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.mp4': 'video/mp4'
	};

	const contentType = mimeTypes[extension];

	return new Response(new Uint8Array(file), {
		headers: {
			'Content-Type': contentType,
			'Content-Disposition': 'inline'
		}
	});
};
