import { mkdir, cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const path of ['index.html', '404.html', 'styles.css', 'app.js', 'ascii.js', 'locales.js', 'demo.js', 'assets', 'robots.txt']) {
  await cp(path, `dist/${path}`, { recursive: true });
}
console.log('Static website built in dist/. No runtime dependencies.');
