# Local development & deployment

---

## Local development

Run backend and frontend together from the repo root:

```bash
npm run dev
```

- **Backend** runs with `nodemon` (e.g. on port **5050** if you set `PORT=5050` in `backend/.env`).
- **Frontend** runs with Vite (e.g. on port **8080**).

Or run them separately:

```bash
npm run dev:backend   # backend only
npm run dev:frontend  # frontend only
```

### Env for local

1. **Backend:** Copy `backend/.env.example` → `backend/.env`. Set at least:
   - `PORT=5050` (so frontend can use `http://localhost:5050`)
   - `FRONTEND_URL=http://localhost:8080` (Vite dev server origin for CORS/Socket)
   - `JWT_SECRET`, `MONGODB_URI`, etc.

2. **Frontend:** Copy `frontend/.env.example` → `frontend/src/lib/.env` (Vite loads from `src/lib`). Set:
   - `VITE_BACKEND_URL=http://localhost:5050`

Then open **https://localhost:8080** (or the URL Vite prints).

---

## Deployment (Render + Vercel)

### Why the site wasn’t connecting (fixed in code)

- **Frontend** was calling `/api` (same origin); now it uses `VITE_BACKEND_URL`.
- **Socket.io** and backend CORS now use `FRONTEND_URL` for production.

Set env vars on each platform as below.

---

### 1. Backend (Render)

- **Build command:** (whatever builds your backend, e.g. `npm install` in backend folder)
- **Start command:** (e.g. `node src/index.js` or `npm start` from backend)

**Environment variables in Render:**

| Variable       | Value |
|----------------|--------|
| `FRONTEND_URL` | Your Vercel app URL, e.g. `https://your-app.vercel.app` (no trailing slash). For multiple origins use comma-separated: `https://app.vercel.app,https://preview.vercel.app` |
| `JWT_SECRET`   | (already set if auth works) |
| `MONGODB_URI`  | (already set) |
| …              | Any other vars your backend needs |

---

### 2. Frontend (Vercel)

**Environment variables in Vercel:**

| Variable           | Value |
|--------------------|--------|
| `VITE_BACKEND_URL` | Your Render backend URL, e.g. `https://your-backend.onrender.com` (no trailing slash) |

Add this in: **Project → Settings → Environment Variables**. Apply to Production (and Preview if you use preview deployments).

Redeploy the frontend after adding or changing `VITE_BACKEND_URL` so the new value is baked into the build.

**Static assets (fix 404 for `/ringtone.mp3`, `/favicon.ico`, `/blah-blah.png`):**  
Put these files in **`frontend/public/`** so Vite copies them to the build root:

- `frontend/public/ringtone.mp3` → served at `/ringtone.mp3`
- `frontend/public/blah-blah.png` → served at `/blah-blah.png` (favicon)
- Optional: `frontend/public/favicon.ico` if you want `/favicon.ico` to work

**SPA routing (fix 404 for `/login`, `/signup`, etc.):**  
`frontend/vercel.json` is set up so unknown paths are rewritten to `index.html`; your client-side router then handles `/login`, `/signup`, etc. No extra config needed.

---

### 3. Checklist

- [ ] Render: `FRONTEND_URL` = your Vercel URL (and any extra origins if needed).
- [ ] Vercel: `VITE_BACKEND_URL` = your Render backend URL.
- [ ] Redeploy both after changing env vars.
- [ ] Render free tier may sleep; first request after sleep can be slow.
