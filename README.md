# Minimal Apple-inspired Link Shortener (Vercel-ready)

A minimalist URL shortener built with Next.js App Router and styled with Apple-inspired visual principles (clarity, spacing, restrained color, glass-like card surface).

## Features

- Generate short URLs from valid `http/https` links
- Redirect support via `/r/:code`
- Clean single-screen UI
- Vercel-ready deployment with zero config

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Deploy with defaults.

## Important production note

This starter uses **in-memory storage** (`Map`) so links are not durable across serverless cold starts / deployments. For production, replace `lib/store.ts` with a persistent database (e.g., Vercel KV, Postgres, Redis).
