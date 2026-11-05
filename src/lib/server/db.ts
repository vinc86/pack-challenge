import { DATABASE_URL } from '$app/env/private';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './database.types';
import { Pool } from 'pg';

export const database = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: DATABASE_URL
		})
	})
});
