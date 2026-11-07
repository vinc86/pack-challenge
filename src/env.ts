import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'PostgreSQL connection string',
		// Defaults to the database started by compose.yml, so no .env is needed for local setup
		schema: (value) => value || 'postgres://pack:pack_dev@localhost:5432/pack_resources'
	}
});
