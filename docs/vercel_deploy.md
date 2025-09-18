# Deploying to Vercel

This document shows a minimal, safe path to push this Next.js + Firebase project to GitHub and host it on Vercel.

1) Create a GitHub repository

- On GitHub, create a new repository (private or public) and copy its URL (HTTPS or SSH).

2) Local: initialize git, commit, push

Replace <GIT_URL> with your repo URL.

```powershell
git init
git add .
git commit -m "Initial commit: prepare for Vercel deployment"
git branch -M main
git remote add origin <GIT_URL>
git push -u origin main
```

3) Add environment variables in Vercel

- Go to Vercel dashboard → Your Project → Settings → Environment Variables.
- Add the following variables (match names exactly):
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID

- Use the values from your Firebase console (Project settings → General).

4) Deploy on Vercel

- In Vercel, click "Import Project" → select the GitHub repo you pushed.
- Framework Preset: Next.js
- Build Command: npm run build
- Output Directory: (leave blank for Next.js)
- Environment: select the environment (Preview / Production) and ensure env vars are set there.

5) Common issues and tips

- If you use server-side Firebase Admin SDK anywhere, do NOT expose admin credentials as NEXT_PUBLIC_ vars. Use Vercel Server Environment or serverless functions with secret vars.
- If typescript build fails in Vercel, the project currently has `ignoreBuildErrors: true` in `next.config.ts`, so Vercel will still build. Consider fixing type errors locally and enable strict checks.
- If images from Firebase Storage are used, ensure CORS and rules allow public access for hosting, or use signed URLs.

6) Local development with env vars

- Copy `.env.local.example` -> `.env.local` and fill in values.
- Run locally:

```powershell
npm install
npm run dev
```

7) Post-deploy checks

- Visit the Vercel URL. Confirm authentication (if any) and Firestore reads/writes work.
- For auth redirects, ensure authorized domains in Firebase console include your Vercel domain.
