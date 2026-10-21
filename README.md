# ZipZap Website

Independent landing and download website for [ZipZap](https://github.com/Lord-shaban/ZipZap).

A responsive English/Arabic landing page with RTL support, real desktop-app
screenshots, static ASCII engravings, and a user-started pause/resume illustration.
The illustration uses sample files and simulated progress; it makes no downloads
and is not a performance measurement.

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
Hosted GitHub checks are intentionally skipped per the maintainer's preference;
run local checks before merging.

## Content and assets

Download links target the published `v0.2.0-beta.1` Windows 11 x64 beta.
Update the installer, extension, checksum, release-note links, version copy,
Arabic translations and release-link test together when a new beta is published.
Development-only capabilities must not be advertised as shipped.

- `assets/zipzap.svg` is the original application icon, copied unchanged from
  ZipZap's `assets/icon.svg`. The original emerald remains `#087f70`.
- `assets/desktop-ar.jpg` and `assets/desktop-en.jpg` are current 0.2.0-beta.1
  Windows WebView2 captures from 2026-10-21. They use a native debug host with
  the production frontend and isolated state, showing real shared-core loopback
  downloads with verified output hashes. They are not installed-release or
  performance evidence. The main image follows the page language. The older
  PNG files are retained historical assets; feature diagrams remain illustrations.
- Inter, Noto Sans Arabic, and IBM Plex Mono are self-hosted. Their OFL licenses
  are included. No font provider requests are made by visitors.
- UI icons use Lucide. Brand marks use Font Awesome Free and Simple Icons.
  See [asset sources and licenses](assets/third-party-assets.md).
- `ascii.js` generates one static character engraving. There is no background
  animation, canvas loop, scroll reveal, parallax, or animation dependency.
- `locales.js` contains Arabic copy; English copy lives in `index.html`.
- `demo.js` contains bounded simulated progress. The demo starts paused and
  responds to play/pause/reset; reduced motion disables transitions.
- `tests/` checks translations, local HTML/CSS resources, icons, section links,
  sample progress, static character geometry, and the published installer URL.

Original generated `bolt.webp`, `folder.webp`, and `social.jpg` artwork from the
initial design is retained. These images are no longer loaded by the page;
the real desktop screenshot is also used for social previews.
See [design references and decisions](DESIGN.md) for this redesign's sources.
