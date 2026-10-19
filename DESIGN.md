# Design references and decisions

The redesign preserves the original ZipZap logo and emerald `#087f70`, while
replacing the split introduction and separate illustration panels with a centered
headline, a full-width product stage, and a connected feature grid.

## References reviewed

- [Zed](https://zed.dev/): a clear primary download action, restrained navigation,
  generous headline space, and content organized around the product.
- [Ghostty](https://ghostty.org/) and its
  [open website source](https://github.com/ghostty-org/website), including
  [home styles](https://github.com/ghostty-org/website/blob/main/src/app/home-content.module.css):
  character art that belongs to a native desktop tool's identity, paired with
  concise copy and direct download/documentation actions.
- [Supabase](https://supabase.com/) and its
  [open website source](https://github.com/supabase/supabase/tree/master/apps/www):
  product-first hierarchy, clear section borders, technical labels, and a
  consistent brand accent across a long page.

These are composition and hierarchy references. No reference project's marketing
copy, branding, screenshots, or implementation is bundled in ZipZap.

## Decisions

- Inter gives English clearer small text and strong display headings. Noto Sans
  Arabic supplies actual Arabic glyphs rather than relying on an OS fallback.
  IBM Plex Mono remains limited to ASCII and technical annotations.
- Static ASCII appears at the edges of the introduction, within the feature
  grid, in the link-to-local diagram, and at the final download section.
  It shares the page's color and structure without moving behind the copy.
- The real app screenshot is prominent; simulated feature diagrams stay labeled.
  No invented download-speed claims, testimonials, or unshipped features.
- A wide resume panel leads three supporting features. The workflow section
  introduces a darker surface; source, FAQ, download, and footer retain distinct
  jobs and consistent spacing.
- Motion is limited to short hover/focus feedback, smooth anchor navigation, and
  progress after the visitor presses play. Reduced-motion CSS disables transitions
  and smooth scrolling; a preference change pauses the demo.
- No new JavaScript or build dependencies. Fonts and SVG marks are served locally
  with their license notices. Brand marks use their supplied proportions.

## Verification

Run `npm run check` and `npm run build`. Browser review covers English and Arabic,
320/375/768/1024/1440 px widths, mobile navigation and Escape, anchor navigation,
FAQ expansion, source copying, and sample play/pause/reset. Browser artifacts are
local-only under ignored `qa/`. Hosted GitHub checks are skipped by maintainer policy.
