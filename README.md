# FORM

A mobile-first, installable gym companion. Plain HTML, CSS, and JavaScript; no build step, account, API key, or backend.

## Run locally

```sh
npm run dev
```

Open http://localhost:5173. Use `npm run check` and `npm test` for verification.

## Host on GitHub Pages

1. Create a GitHub repository and upload these files (including `.github/workflows/pages.yml`) to its `main` branch.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Run the **Deploy FORM to GitHub Pages** workflow from the Actions tab, or push a commit to `main`.
4. Open the URL shown by the deployment, typically `https://USERNAME.github.io/REPOSITORY/`.

All asset paths are relative, so repository subpaths work. The workflow uploads only public app files. HTTPS on GitHub Pages enables installation and offline caching.

## Put it on your phone

- **iPhone:** open the deployed URL in Safari → Share → Add to Home Screen.
- **Android:** open it in Chrome → menu → Install app / Add to home screen.

After the first online visit, the app shell and routines work offline. External web fonts fall back to system fonts offline. The timer uses a real end timestamp, so it catches up when the app returns from the background; alerts are not guaranteed while the phone is locked.

## Features

- Seven daily routines: four strength, two cardio/mobility, one recovery.
- Original SVG start/finish diagrams and exercise-specific cues.
- Set tracking, rest countdown, reusable weight logs in kilograms.
- Monday-based weekly reset, session history, JSON export/import.
- Responsive desktop and phone layouts, accessible controls, reduced-motion support.
- Home screen manifest, icons, service worker, and GitHub Pages deployment.

## Plan and data

The routine is a general starting plan for healthy adults, not a personalized training prescription. Start with fewer sets if new, leave 2–3 repetitions in reserve, and stop painful movements. Exercise diagrams are schematics, not videos or a substitute for coaching. Cardio sessions total 60 minutes; build toward the [CDC's adult activity guidance](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html) of 150 moderate minutes weekly by adding comfortable activity.

Progress lives in localStorage on the current device/browser. Export a backup before clearing site data. Imports merge data and preserve existing session and weight entries. No cross-device sync. A new calendar week gets fresh set tracking; weight entries persist. Adjust the plan in `routines.js`; after edits bump the cache version in `sw.js` for deployed clients.
