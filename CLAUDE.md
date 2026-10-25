# Portfolio: working notes for Claude

Abul Hasnat Abdullah's portfolio. React 18 + Vite 6 + SCSS partials (`src/styles/`), framer-motion. Deployed by Vercel from GitHub `abulhasnat-abdullah/abdullah-portfolio`, branch `main`. Live: https://abdullah-portfolio-mauve.vercel.app

## Always
- Upload after every change: build, commit, push to `main`, confirm the Vercel deploy (`/ship`).
- Verify visually in the browser preview (`.claude/launch.json`, server `portfolio`) at 1440×900 and 375×812, dark and light, before pushing. Wait for the loading screen and entrance animations to finish before measuring.
- Commit messages end with the Co-Authored-By line from the session's attribution reminder.

## Design rules the owner has set
- Orange theme, theme-aware for dark and light; no green tints.
- Compact sections and compact fonts. Don't raise font sizes without being asked; the owner rejected a global font floor that made labels bigger.
- Hero: photo centred; both side columns end level with the photo's bottom, corner blocks level with its top; straight-line network on the right. Photo-on-the-right was tried and rejected.
- No made-up metrics; keep project text short (details live on GitHub).
- Every change must keep the site smooth: animate transform/opacity only, no backdrop-filter outside the top nav and menu.

## Code style
- No semicolons, single quotes, ~120-char lines (`.prettierrc`). Match the comment style of the surrounding file.
- Content lives in `src/data/` (`portfolio.js`, `featured.js`, `teamwork.js`); sections in `src/components/sections/`.
- Full-size image viewer: `src/components/Lightbox.jsx` (portal into `<body>`). "View more" toggles: `src/components/MoreButton.jsx`.
- A list that grows inside an already-revealed `<Stagger>` must be re-keyed, or the new items stay invisible.

## Resume
`resume/resume.html` → `public/resume/Abul-Hasnat-Abdullah-Resume.pdf` with headless Chrome:
`chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=<pdf> file:///D:/my-portfolio/resume/resume.html`
Keep it to one page.
