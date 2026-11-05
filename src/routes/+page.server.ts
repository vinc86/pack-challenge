import { database } from '#lib/server/db.ts';

export async function load() {
	const result = await database
		.selectFrom('resources')
		.selectAll()
		.orderBy('created_at', 'desc')
		.execute();

	return { resources: result };
}
