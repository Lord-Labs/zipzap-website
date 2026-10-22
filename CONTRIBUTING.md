# Contributing to the ZipZap website

Read the [README](README.md) and search [existing issues](https://github.com/Lord-Labs/zipzap-website/issues) before starting. Keep changes focused and discuss large redesigns or product claims first.

Use Node.js 24. No runtime or build dependencies are required. Run:

```sh
npm ci
npm run check
npm run build
```

Run the local server as described in the README. For visible changes, check desktop/mobile sizes, English/Arabic, RTL, keyboard focus, and reduced motion; include screenshots in the pull request. Preserve original product artwork and third-party license notices.

Download links must point to a real published release. Update the version, installer/extension URLs, checksums, release notes, translations, and release-link tests together. Simulated download progress is an illustration, not a real download or performance measurement.

Create a short-lived branch and open a pull request explaining the problem, resulting behavior, and checks actually run. Hosted GitHub checks remain intentionally disabled by the maintainer's existing preference; local verification is required.

Application bugs belong in [ZipZap](https://github.com/Lord-Labs/ZipZap/issues). Follow the [shared code of conduct](https://github.com/Lord-Labs/.github/blob/main/CODE_OF_CONDUCT.md), [support guide](https://github.com/Lord-Labs/.github/blob/main/SUPPORT.md), and [private security policy](https://github.com/Lord-Labs/.github/blob/main/SECURITY.md).

## بالعربي

راجع التعليمات والـ Issues، واعمل فرع صغير للتغيير. اختبر العربي والإنجليزي والموبايل وإمكانية الوصول، وشغّل أوامر الفحص والبناء قبل إرسال Pull Request. مشاكل برنامج التحميل نفسه مكانها ريبو ZipZap، والمشاكل الأمنية تتبلغ بشكل خاص.
