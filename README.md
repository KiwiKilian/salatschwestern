# 🥗 Salatschwestern

This repository is a pnpm workspace containing the frontend and backend applications.

## Install

From the repository root, install dependencies for both applications:

```bash
pnpm install
```

## Setup Database

To set up the database, you can use the provided `backend/docker-compose.yml` file:

```bash
docker compose --file backend/docker-compose.yml up -d
```

This will start the PostgreSQL database and Adminer.

## Start Development

```bash
pnpm start
```

To run a package script directly, use its workspace name:

```bash
pnpm frontend <script>
pnpm backend <script>
```
