# Deployment

## Required Production Environment

- `VITE_SITE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` as a Supabase Edge Function secret

Optional integrations:

- `LEAD_NOTIFICATION_WEBHOOK_URL` for lead notifications from the Edge Function
- `GOOGLE_ANALYTICS_ID`
- `GOOGLE_TAG_MANAGER_ID`
- `META_PIXEL_ID`

## Verification

Run these before release:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

Apply Supabase migrations from `supabase/migrations` and seed `supabase/seed.sql`.
Deploy `supabase/functions/leads` and set its secrets before enabling production lead capture.
