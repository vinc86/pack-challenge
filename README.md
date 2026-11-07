# Pack – Resources upload

A SvelteKit app to upload learning resources (title, description, category, language, provider, roles and a file) and browse them in a table. Clicking a row opens the uploaded file.

**Stack:** SvelteKit 3 · Svelte 5 · TypeScript · PostgreSQL 17 (Docker) · Kysely · Zod · Tailwind CSS 4

## Prerequisites

You need these installed once on your machine:

| Tool                  | Version | How to install                                                                                         |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| Git                   | any     | <https://git-scm.com/downloads>                                                                        |
| Node.js               | ≥ 22.17 | <https://nodejs.org> (LTS installer) or a version manager such as [nvm](https://github.com/nvm-sh/nvm) |
| pnpm                  | 10      | `npm install -g pnpm`                                                                                  |
| Docker (with Compose) | any     | [Docker Desktop](https://www.docker.com/products/docker-desktop/) – make sure it is **running**        |

Check everything is in place:

```sh
node -v            # v22.17 or newer
pnpm -v            # 10.x
docker compose version
```

## Getting started

```sh
git clone https://github.com/vinc86/pack-challenge.git
cd pack-challenge
pnpm install
pnpm start
```

Then open <http://localhost:5173/resources>.

`pnpm start` does two things:

1. `docker compose up -d --wait` starts PostgreSQL in Docker and waits until it is ready. On the first run, Docker downloads the Postgres image and creates the `resources` table from [`sql/create_resources.sql`](sql/create_resources.sql).
2. `vite dev` starts the SvelteKit dev server.

No `.env` file is needed: the app connects by default to the database started by Compose. To use a different database, copy `.env.example` to `.env.local` and change `DATABASE_URL`.

### Stopping and resetting

```sh
# stop the dev server: Ctrl + C
docker compose down      # stop the database (data is kept)
docker compose down -v   # stop the database and delete all data
```

Uploaded files are stored in the local `uploads/` folder.

## Troubleshooting

- **`Cannot connect to the Docker daemon`** – Docker Desktop is not running. Start it and run `pnpm start` again.
- **`port 5432 is already allocated`** – another PostgreSQL is running on your machine. Stop it, or change the port mapping in [`compose.yml`](compose.yml) and set `DATABASE_URL` accordingly in `.env.local`.
- **`column "..." does not exist`** – the database was created with an older schema. The SQL script only runs when the database is created for the first time, so reset it with `docker compose down -v` and run `pnpm start` again.
- **`Unsupported engine`** during `pnpm install` – your Node.js version is too old; install Node 22.17 or newer.

## Scripts

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `pnpm start` | Start the database and the dev server |
| `pnpm dev`   | Start only the dev server             |
| `pnpm db:up` | Start only the database               |
| `pnpm check` | Type-check with `svelte-check`        |
| `pnpm lint`  | Prettier + ESLint                     |

## How it works

- **Upload** – the form posts to the `upload` form action in [`src/routes/resources/+page.server.ts`](src/routes/resources/+page.server.ts). It works without JavaScript and is progressively enhanced with `use:enhance`.
- **Validation** – a Zod schema ([`schema.ts`](src/routes/resources/schema.ts)) validates every field on the server and returns per-field error messages to the form. Native `required` attributes give instant feedback in the browser.
- **Storage** – files are saved on local disk under `uploads/` with a random UUID name (this avoids collisions and path traversal). The database stores the relative path and the MIME type. If the database insert fails, the file is removed.
- **File access** – [`/resources/[id]/file`](src/routes/resources/[id]/file/+server.ts) looks up the resource by id and serves the file inline, so the browser can display PDFs, images and videos directly.
- **Codes vs labels** – category, language, provider and roles are stored as stable codes (e.g. `en`, `coach/mentor`) and mapped to labels in the UI. Labels can change or be translated without migrating data.
