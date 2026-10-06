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

- Full gym and Dumbbells + cables plans: four strength days, two cardio/mobility days, one recovery day.
- Barbell bench press, Smith-machine squat, leg press/curl/extension, pec deck, supported rows, cable curls/pushdowns/Pallof press, and machine shoulder/calf work.
- Equipment labels, machine setup instructions, and clear load logging (stack weight, total bar + plates, added plates, or per dumbbell).
- Real exercise videos from fitness publishers, with exercise-specific cues.
- Set tracking, rest countdown, reusable weight logs in kilograms.
- Monday-based weekly reset, session history, JSON export/import.
- Responsive desktop and phone layouts, accessible controls, reduced-motion support.
- Home screen manifest, icons, service worker, and GitHub Pages deployment.

## Plan and data

The routine is a general starting plan for healthy adults, not a personalized training prescription. Start with fewer sets if new, leave 2–3 repetitions in reserve, and stop painful movements. Video demonstrations supplement the form cues; ask a gym trainer to check unfamiliar lifts. Cardio sessions total 60 minutes; build toward the [CDC's adult activity guidance](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html) of 150 moderate minutes weekly by adding comfortable activity.

Progress lives in localStorage on the current device/browser. Export a backup before clearing site data. Imports merge data and preserve existing session and weight entries. No cross-device sync. A new calendar week gets fresh set tracking; weight entries persist. Adjust the plan in `routines.js`; after edits bump the cache version in `sw.js` for deployed clients.

## Exercise videos

Each exercise has a thumbnail and a tap-to-play 30-second video preview. Videos are embedded through YouTube’s privacy-enhanced player and remain hosted by their original creators; no videos are copied or redistributed. The source author and full-video link appear below each player. Clips start muted, play inline on iPhone, and can be replayed. Videos and remote thumbnails require an internet connection. The offline app keeps routines, written form cues, and progress available. Closing a guide removes the player and stops playback.

Sources include [Muscle & Strength](https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html), [NASM](https://www.youtube.com/watch?v=XPPfnSEATJA), [Hospital for Special Surgery](https://www.youtube.com/watch?v=3QZlgJ40LfU), and the other creators credited per exercise in `media.js`. All 37 exercise mappings were verified against official YouTube oEmbed metadata. A creator can later disable embedding; use “Watch full video” if playback is unavailable. Edit `start`/`end` in `media.js` to adjust preview segments.

## Gym plan and existing progress

Full gym is the default. Use the equipment selector above the days to switch to the original Dumbbells + cables plan. Your selection persists. Each plan tracks sets separately, so sets previously recorded for a dumbbell exercise cannot appear completed for a new machine exercise. Original session keys, histories, backup files, and weights are preserved. History labels show which plan you used. Weekly completed days count each day once across both plans, while total sessions and sets include both.

Machine models vary: follow their adjustment labels and ask gym staff to show the stops and releases. Use a spotter or correctly set rack safeties for barbell bench press; setup cues are included in the movement guide. The program leaves recovery time between repeat upper and lower sessions, consistent with [Mayo Clinic strength-training guidance](https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670).
