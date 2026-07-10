const SUPPORTED_LANGS = ['en', 'az', 'tr', 'ru'];
const DEFAULT_LANG = 'en';

function getSavedLang() {
  return localStorage.getItem('butcetakip_lang') || navigator.language.split('-')[0] || DEFAULT_LANG;
}

function setSavedLang(lang) {
  localStorage.setItem('butcetakip_lang', lang);
}

function getEffectiveLang() {
  const lang = getSavedLang();
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

function translatePage() {
  const lang = getEffectiveLang();
  const t = translations[lang] || translations[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let val = t;
    for (const k of keys) {
      val = val?.[k];
      if (!val) break;
    }
    if (val) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const keys = key.split('.');
    let val = t;
    for (const k of keys) {
      val = val?.[k];
      if (!val) break;
    }
    if (val) el.title = val;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

function switchLang(lang) {
  setSavedLang(lang);
  translatePage();
}

document.addEventListener('DOMContentLoaded', () => {
  translatePage();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });
});
