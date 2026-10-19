import { ar } from './locales.js';
import { advance } from './demo.js';

const translated = [...document.querySelectorAll('[data-i18n]')];
const english = Object.fromEntries(translated.map(el => [el.dataset.i18n, el.innerHTML]));
const languageButton = document.querySelector('#language');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
const toggle = document.querySelector('#demo-toggle');
const progressbar = document.querySelector('#demo-progress');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let language = 'en';
let progress = 64;
let paused = reducedMotion.matches;

const words = () => language === 'ar' ? {
  pause: 'إيقاف التنزيل التوضيحي مؤقتًا', resume: 'استئناف التنزيل التوضيحي',
  replay: 'إعادة التنزيل التوضيحي', downloading: 'جارٍ التنزيل', paused: 'متوقف مؤقتًا', complete: 'مكتمل',
  active: 'عملية تنزيل نشطة', inactive: 'لا توجد تنزيلات نشطة', open: 'فتح القائمة', close: 'إغلاق القائمة'
} : {
  pause: 'Pause sample download', resume: 'Resume sample download', replay: 'Replay sample download',
  downloading: 'Downloading', paused: 'Paused', complete: 'Complete', active: '1 active transfer',
  inactive: 'No active transfers', open: 'Open navigation', close: 'Close navigation'
};

function renderDemo() {
  const done = progress >= 100;
  const text = words();
  const status = done ? text.complete : paused ? text.paused : text.downloading;
  progressbar.setAttribute('aria-valuenow', Math.floor(progress));
  progressbar.setAttribute('aria-label', language === 'ar' ? 'تقدم التنزيل التوضيحي' : 'Sample download progress');
  progressbar.firstElementChild.style.transform = `scaleX(${progress / 100})`;
  progressbar.firstElementChild.style.background = paused ? 'var(--muted)' : 'var(--orange)';
  document.querySelector('#demo-percent').textContent = `${Math.floor(progress)}%`;
  document.querySelector('#demo-status').textContent = status;
  document.querySelector('[data-i18n="oneActive"]').textContent = paused || done ? text.inactive : text.active;
  toggle.setAttribute('aria-label', done ? text.replay : paused ? text.resume : text.pause);
  toggle.querySelector('use').setAttribute('href', `/assets/icons.svg#${done ? 'reset' : paused ? 'play' : 'pause'}`);
}

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', words().open);
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  translated.forEach(el => {
    const key = el.dataset.i18n;
    // Both dictionaries are authored locally; no remote/user HTML is inserted.
    if (next === 'ar') el.textContent = ar[key];
    else el.innerHTML = english[key];
  });
  languageButton.textContent = next === 'ar' ? 'English' : 'العربية';
  languageButton.lang = next === 'ar' ? 'en' : 'ar';
  languageButton.setAttribute('aria-label', next === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  document.title = next === 'ar' ? 'ZipZap — انتظار أقل. إنجاز أكثر.' : 'ZipZap — Good things come to those who download.';
  document.querySelector('meta[name="description"]').content = next === 'ar'
    ? 'مدير تحميل مجاني ومفتوح المصدر لويندوز 11. استئناف آمن، وقائمة تنزيلات بسيطة، ودعم للعربية. بلا حساب أو اشتراك.'
    : 'Your files. Your pace. ZipZap is a free, open-source download manager for Windows 11. Safe resume, a simple queue, and no account required.';
  document.querySelector('.hero-art img').alt = next === 'ar' ? 'صاعقة مصنوعة من حروف ASCII تحيط بها ملفات متدفقة' : 'A lightning bolt sculpted from ASCII characters, surrounded by flowing files';
  document.querySelector('.browser-art img').alt = next === 'ar' ? 'مجلد بأسلوب ASCII يستقبل سهم تنزيل وتدور حوله ملفات' : 'An ASCII folder receiving a download arrow, with files orbiting around it';
  navigation.setAttribute('aria-label', next === 'ar' ? 'القائمة الرئيسية' : 'Main navigation');
  closeMenu();
  renderDemo();
  try { localStorage.setItem('zipzap-language', next); } catch { /* Page remains usable when storage is blocked. */ }
}

languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? words().close : words().open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
toggle.addEventListener('click', () => {
  if (progress >= 100) { progress = 0; paused = false; }
  else paused = !paused;
  renderDemo();
});
document.querySelector('#demo-reset').addEventListener('click', () => {
  progress = 64;
  paused = reducedMotion.matches;
  renderDemo();
});
setInterval(() => {
  if (document.hidden || paused || progress >= 100) return;
  const bounds = progressbar.getBoundingClientRect();
  if (bounds.bottom < 0 || bounds.top > innerHeight) return;
  progress = advance(progress, paused);
  renderDemo();
}, 900);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) { paused = true; renderDemo(); }
});
document.querySelectorAll('svg.icon').forEach(icon => icon.setAttribute('aria-hidden', 'true'));

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('js-motion');
}
let saved;
try { saved = localStorage.getItem('zipzap-language'); } catch { /* Default to English. */ }
setLanguage(saved === 'ar' ? 'ar' : 'en');
