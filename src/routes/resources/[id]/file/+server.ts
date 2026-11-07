import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { error } from '@sveltejs/kit';
import * as z from 'zod';
import { database } from '#lib/server/db.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// An invalid UUID would make Postgres throw, so treat it as "not found"
	if (!z.uuid().safeParse(params.id).success) {
		error(404, 'Resource not found');
	}

	const resource = await database
		.selectFrom('resources')
		.select(['file_path', 'type'])
		.where('id', '=', params.id)
		.executeTakeFirst();

	if (!resource) {
		error(404, 'Resource not found');
	}

	const fileStats = await stat(resource.file_path).catch(() => null);
	if (!fileStats) {
		error(404, 'File not found');
	}

	// Stream the file instead of loading it in memory (videos can be large)
	const stream = Readable.toWeb(createReadStream(resource.file_path)) as ReadableStream;

	return new Response(stream, {
		headers: {
			'Content-Type': resource.type,
			'Content-Length': String(fileStats.size),
			'Content-Disposition': 'inline',
			// Stop the browser from guessing a different (possibly executable) type
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
