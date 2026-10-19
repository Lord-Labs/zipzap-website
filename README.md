# ZipZap Website

Independent landing and download website for [ZipZap](https://github.com/Lord-shaban/ZipZap).

An ASCII-inspired, responsive page in English and Arabic, with RTL support,
original generated artwork, an SVG icon sprite, and a pause/resume illustration.
The illustration uses sample files and simulated progress; it makes no downloads
and is not a screenshot or performance measurement of the desktop application.

## Local development

Use Node.js 24. The site has no runtime or build dependencies.

```sh
npm ci
npm run check
npm run build
npm run dev -- --dist
```

Open the printed local URL. Without `--dist`, the server serves source files.
`dist/` is generated and ignored. Vercel uses `npm run build` and serves `dist/`;
the GitHub production branch is `main`. No environment variables are required.
Hosted GitHub checks are intentionally skipped per the maintainer’s preference;
run local checks before merging.

## Content and assets

Download links target the verified published `v0.1.0-beta.1` Windows 11 x64 beta.
Update the installer, extension, checksum, release-note links, version copy,
Arabic translations and release-link test together when a new beta is published.
Development-only capabilities must not be advertised as shipped.

- `assets/bolt.webp` and `assets/folder.webp`: original AI-generated ASCII-style
  illustrations created for this website during its initial design. `social.jpg`
  is its social sharing artwork. Keep these assets in this repository.
- `assets/icons.svg`: locally authored line icons on a 24×24 grid, styled through
  `.icon`; decorative instances are hidden from assistive technology.
- Manrope and IBM Plex Mono are self-hosted; their OFL license files are included
  beside the fonts. Arabic uses the system’s Arabic font fallback.
- `locales.js`: Arabic copy; English copy lives in `index.html`.
- `demo.js`: bounded simulated progress, tested independently of the DOM.
- `tests/`: translation coverage, local links/icons, demo behavior and installer
  target. Browser checks additionally cover language persistence, navigation,
  pause/resume/reset, FAQs, mobile layout and reduced-motion styling.

The product storytelling was inspired by [Cap](https://cap.so/); artwork, layout,
icons and copy are original to this website. No Cap assets are bundled.
