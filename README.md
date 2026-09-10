# LemonTrip Frontend

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs at `http://localhost:3000` and expects the backend at
`http://localhost:5000/api/v1` by default.

## Google Sign-In

The login and signup pages use Google Identity Services and send the returned
ID token to the backend at `POST /api/v1/auth/google`. To enable the real
Google button, add the same OAuth web client ID used by the backend:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

In Google Cloud Console, add `http://localhost:3000` under **Authorized
JavaScript origins**. Add the production frontend origin there as well when
deploying. No redirect URI is required for this button flow.

Restart Next.js after changing `.env.local`. Until the value is replaced, the
Google control remains visible but disabled; no credential is committed to
this repository.