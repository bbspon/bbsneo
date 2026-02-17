# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## API routes (Next.js backend)

This project also includes a simple backend implemented as Next.js API
endpoints (only when running a Next.js server). If you are using the
standard Vite development setup those files are not executed, so the
login components will automatically fall back to the external identity
service described below.

The API handlers still exist under `pages/api` for reference or if you
migrate the app to Next.js later; they perform OTP-based phone
authentication using a MongoDB database and the BSNL SMS gateway.

### Important notes

1. **Dependencies**: install `mongodb`, `jsonwebtoken` and (if you use TypeScript) `@types/axios` on the frontend
   side (`npm install mongodb jsonwebtoken && npm install -D @types/axios`).  Axios itself is already present.
2. **Environment variables** (place in `.env.local`):

```ini
MONGODB_URI=mongodb://localhost:27017/yourdb
JWT_SECRET=your_jwt_secret

# BSNL OTP config (same as backend)
# these values are read by the `bsnl-helpers.js` file used by the
# `/api/send-otp` and `/api/verify-otp` handlers.  Set
# `BSNL_MOCK_MODE=false` in production to have real SMS messages sent
# (the mock mode simply logs the message to the console).
BSNL_BASE_URL=https://bulksms.bsnl.in:5010
BSNL_USERNAME=...
BSNL_PASSWORD=...
BSNL_SERVICE_ID=10894
BSNL_SENDER_ID=GLXINF
BSNL_TEMPLATE_ID=1407172612209917457
BSNL_ENTITY_ID=1401534940000071127
BSNL_IPS=
BSNL_MOCK_MODE=true
```

3. **Endpoints**:
   - `POST /api/send-otp` – body `{ phone }` sends an SMS and stores code.
   - `POST /api/verify-otp` – body `{ phone, otp }` validates code and
     issues a JWT token with user info.

The React login components already use these routes; you can modify or
extend them as needed.
