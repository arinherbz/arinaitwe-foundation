# Arinaitwe Foundation

A clean, self-contained static website for the Arinaitwe Foundation — a
community-led foundation working for education, health, and sustainable
enterprise in East Africa.

## Run it locally

```bash
cd /Users/ario/.cline/data/workspaces/chat/arinaitwe-foundation
python3 -m http.server 4173
```

Then open **http://localhost:4173**

(Any static server works — e.g. `npx serve .` or VS Code Live Server.)

## Files

- `index.html` — single page: hero, about, pillars, programs, impact, contact
- `styles.css` — custom design system (colors, buttons, responsive layout)
- `script.js` — mobile nav, scroll-reveal, demo contact form validation

## Notes

- **No fabricated metrics.** This is a starting project, so the site shows no
  invented impact numbers — the "impact" section states plainly that data will
  be published only when real, verifiable results exist.
- All other content (mission, programs, contact placeholders) is **starter
  copy** — easy to edit directly in `index.html`.
- The contact form is client-side only (demo). Wire it to your backend or an
  email/form service before going live.
- Fonts are system fonts (no external dependencies) so it runs fully offline.

## Next steps (if you want)

- Rebuild as a **Next.js** app to match your other projects (`ariostore`,
  `softshiftcare`, `aion-home-care`).
- Push to GitHub as `arinherbz/arinaitwe-foundation` via `gh repo create`.
- Deploy to Vercel / Netlify / GitHub Pages for a live link.
