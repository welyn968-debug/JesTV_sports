# Sanity Setup (JESTV SPORTS)

This project uses Sanity v3 as the content store and includes a Studio app in `studio/`.

## 1) Environment Variables
Add the following to `.env.local` in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

Notes:
- `SANITY_API_TOKEN` must be a **write** token for mutations and the seed script.
- The public project ID + dataset are safe to expose client-side.

If you want the Studio to read environment variables, add a `studio/.env` file:

```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## 2) Install Studio Dependencies
```
pnpm --dir studio install
```

## 3) Run Sanity Studio (local)
```
pnpm studio:dev
```

## 4) Seed Starter Content (optional)
```
pnpm sanity:seed
```

This will create starter categories, authors, and articles in Sanity.
