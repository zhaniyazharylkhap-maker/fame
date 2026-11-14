# Aura · Aurafarm. Be extra.

A gamified personal-brand trainer for US adults 25–45. Take a quiz, pick an avatar, go through 7 blocks and 24 lessons, and pass every task on an **AI audience** (5 AI viewers built from your profile). Score 6/10 to pass, fail and lose a life. Your avatar levels up from Noob to Pro.

## What works

- **Quiz → avatar → course** with progress saved in the browser (no sign-up)
- **AI exam** (`/api/exam`): Gemini plays 5 viewers and scores each task, with reactions, fixes and a rewritten version
- **AI coach** (`/api/coach`): chat that knows your niche, audience, platforms and progress
- **Lives**: fail an exam and lose a life, each life comes back after 7 days, or refill (demo checkout)
- **Results**: real YouTube stats from a Short link (`/api/youtube`), manual numbers for Instagram and TikTok
- **Trends**: top Shorts of the week for your niche from the YouTube Data API (`/api/trends`) plus weekly picks
- **Pro paywall**: Block 1 free, blocks 2–7 with Pro (demo checkout)

Without API keys the app still runs: the exam and the coach fall back to a simple offline check, YouTube features ask you to add numbers manually.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your keys
npm run dev
```

## Environment variables

| Name | What for |
| --- | --- |
| `GEMINI_API_KEY` | AI audience and AI coach (Google AI Studio key) |
| `GEMINI_MODEL` | optional, default `gemini-flash-lite-latest` (bigger free quota), falls back to `gemini-flash-latest` |
| `YOUTUBE_API_KEY` | YouTube Data API v3 for Short stats and trends |

## Deploy on Vercel

1. Import this repo in Vercel.
2. Add the environment variables above.
3. Deploy. To make the link public: Project → Settings → Deployment Protection → turn off Vercel Authentication.

## Structure

- `lib/course.ts` all 24 lessons: theory, video links, key points, practice, task, rubric for the AI exam
- `lib/store.ts` browser storage: profile, progress, lives, streak, posts, chat
- `app/api/*` Gemini and YouTube routes
- `public/avatars` 4 characters × 8 looks
