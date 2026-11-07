# Pack – Resources upload

Upload learning resources (title, description, category, language, provider, roles and a file) and browse them in a table. Clicking a row opens the file in a new tab.

**Stack:** SvelteKit · TypeScript · PostgreSQL (Docker) · Kysely · Zod · Tailwind CSS

## Prerequisites

- [Node.js](https://nodejs.org) 22.17 or newer
- [pnpm](https://pnpm.io): `npm install -g pnpm`
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), running

## Getting started

```sh
git clone https://github.com/vinc86/pack-challenge.git
cd pack-challenge
pnpm install
pnpm start
```

Open <http://localhost:5173/resources>.

`pnpm start` starts PostgreSQL in Docker (the table is created on the first run) and then the dev server. The app uses the default local database connection configured in `src/env.ts`. To use a different connection, copy `.env.example` to `.env` and update `DATABASE_URL`.

To stop the database run `docker compose down`. Add `-v` to also delete all data.

## Troubleshooting

- **Cannot connect to the Docker daemon** – start Docker Desktop.
- **Port 5432 is already allocated** – another PostgreSQL is running; stop it first.
- **Column does not exist** – the database was created with an older schema. Reset it with `docker compose down -v` and run `pnpm start` again.

## Notes

- Files are stored locally in `uploads/`; the database keeps their path and type.
- Allowed files: PDF, TXT, Word, PowerPoint, MP4, WebM, MOV, PNG and JPEG, up to 100 MB.
- All fields are validated on the server with Zod.
- Run the tests with `pnpm test`.
