# MedConnect — Frontend

A React + TypeScript + TailwindCSS starter. Login, Register, and Dashboard pages are ready and wired up to talk to a backend API.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Connecting to the backend

`vite.config.ts` proxies `/api` requests to `http://localhost:4000` in development. The frontend uses `/api/v1` by default, so requests such as `/auth/login` are sent to `/api/v1/auth/login`. Change the proxy target if your backend runs on a different port.

Set `VITE_API_BASE_URL` to override the API base URL for a deployment. Keep this URL public; do not put secrets in Vite environment variables.

Mock authentication is disabled by default. To enable it for local UI work, set `VITE_MOCK_AUTH=true` before starting Vite. Mock mode accepts any valid email and password and must not be enabled in a production deployment.

`src/lib/api.ts` contains the API client; it attaches the stored JWT token automatically.

## Structure

```
src/
├── components/     — reusable UI (Button, TextField, Sidebar, ...)
├── pages/          — Login, Register, Dashboard
├── lib/            — api.ts (axios client), auth.ts (zustand store)
├── types/          — shared TypeScript types
```

## Next steps

- Add new pages under `src/pages/`: Appointments, MedicineSearch, HospitalSearch, Reviews
- Register new routes inside `App.tsx` (commented placeholders are already there for `/dashboard/appointments`, etc.)
- Swap `MOCK_APPOINTMENTS` in `Dashboard.tsx` for a real `useQuery` call to `GET /api/v1/appointments/me`
- For role-specific dashboards (`doctor`, `hospital_admin`, `super_admin`), branch on `useAuthStore().user.role`, or create separate folders under `src/pages/` (`patient/`, `doctor/`, `hospital-admin/`)

## Design tokens

Defined in `tailwind.config.js`: primary color `pine` (brand green), background `sand` (warm off-white), text `ink`. Headings use `font-display` (Fraunces), body text uses `font-sans` (Inter).
