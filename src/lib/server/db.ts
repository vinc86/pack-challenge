import { DATABASE_URL } from '$app/env/private';
import { Pool } from 'pg';

export const db = new Pool({
	connectionString: DATABASE_URL
});
