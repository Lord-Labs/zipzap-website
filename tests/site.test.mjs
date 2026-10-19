import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { ar } from '../locales.js';
import { advance } from '../demo.js';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
test('all visible copy has complete Arabic translations', () => {
  const keys = new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(match => match[1]));
  assert.deepEqual([...keys].filter(key => !ar[key]), []);
  assert.deepEqual(Object.keys(ar).filter(key => !keys.has(key)), []);
});
test('all local resources and section links resolve', async () => {
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]));
  const symbols = await readFile(new URL('../assets/icons.svg', import.meta.url), 'utf8');
  for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (link.startsWith('#')) assert.ok(ids.has(link.slice(1)), `Missing section: ${link}`);
    else if (link.startsWith('/')) {
      const [path, symbol] = link.slice(1).split('#');
      assert.ok((await stat(new URL(`../${path}`, import.meta.url))).isFile(), link);
      if (symbol) assert.ok(symbols.includes(`id="${symbol}"`), `Missing icon: ${symbol}`);
    } else assert.equal(new URL(link).protocol, 'https:');
  }
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  for (const [, path] of css.matchAll(/url\('\/(.*?)'\)/g)) {
    assert.ok((await stat(new URL(`../${path}`, import.meta.url))).isFile(), `Missing CSS resource: ${path}`);
  }
});
test('pause preserves progress, resume advances, completion is bounded', () => {
  assert.equal(advance(64, true), 64);
  assert.equal(advance(64, false), 64.75);
  assert.equal(advance(99.8, false), 100);
  assert.equal(advance(100, false), 100);
  let progress = 0;
  for (let i = 0; i < 150; i++) progress = advance(progress, false);
  assert.equal(progress, 100);
});
test('download points to the verified published beta, not a guessed latest URL', () => {
  const installer = html.match(/data-installer href="([^"]+)"/)[1];
  const url = new URL(installer);
  assert.equal(url.hostname, 'github.com');
  assert.match(url.pathname, /^\/Lord-shaban\/ZipZap\/releases\/download\/v0\.1\.0-beta\.1\/ZipZap_0\.1\.0-beta\.1_x64-setup\.exe$/);
  assert.match(html, /Unsigned beta/);
});
