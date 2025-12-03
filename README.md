# Kira — Personal Portfolio & Pairing App

> A modern personal portfolio and pairing/demo app built with Next.js, React and Firebase. This repository contains a visually-rich portfolio and real-time pairing API endpoints used for demos and pairing sessions.

## Key Features
- Real-time pairing and session APIs under `app/api/`.
- Firebase integration for auth and data (see `lib/firebase.ts`).
- Smooth animated UI using `framer-motion` and custom parallax/scroll effects.
- Built with the Next.js App Router (`app/` directory) and TailwindCSS.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Firebase (client + admin)
- Framer Motion and various animation helpers

Dependencies (high level): `next`, `react`, `react-dom`, `firebase`, `firebase-admin`, `framer-motion`, `lucide-react`.

## Quick Start
Prerequisites:
- Node.js (v18+ recommended)
- npm, pnpm or yarn

Install dependencies:

```bash
npm install
# or with pnpm
pnpm install
```

Run in development (dev server runs on port 5000 by default):

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

Linting:

```bash
npm run lint
```

Open your browser at: `http://localhost:5000`

## Environment / Firebase
This project uses Firebase. Create a `.env.local` in the project root with the values required by `lib/firebase.ts`. Typical variables include API key and project identifiers (for example `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc.). Check `lib/firebase.ts` for exact keys used.

Do NOT commit secret keys or service account files. Keep them out of source control and use environment variables or a secure secrets manager.

## Project Structure (high level)
- `app/` — Next.js App Router pages and server components
  - `app/api/` — API routes used for pairing, sessions, and checks
  - `app/components/` — React components (Hero, Projects, Navbar, etc.)
  - `app/pair/` and `app/pair-pro/` — pairing pages
- `lib/` — helper libraries and Firebase initialization (`lib/firebase.ts`)
- `public/` — static assets, `robots.txt`, `sitemap.xml`
- `next.config.js`, `tsconfig.json` and PostCSS/Tailwind configs

Explore the `app/components/` directory for the UI building blocks and `app/api/` for the server API implementations.

## Development Notes
- The dev server is configured to listen on port `5000` and 0.0.0.0 so it can be accessed from host machines or containers.
- Use the App Router conventions for new pages/components (place new pages under `app/`).

## Contributing
- Feel free to open issues or submit pull requests.
- Keep changes focused and well-documented.
- If adding environment-specific behavior, document required env vars in this README.

## License
This repository includes a `LICENSE` file — see it for full license terms.

## Contact
If you want to collaborate or have questions, open an issue or reach out via my GitHub profile.

---

Thank you for checking out this project! If you'd like, I can also add a short demo GIF, CI setup, or deployment instructions (Vercel, Docker, etc.).
