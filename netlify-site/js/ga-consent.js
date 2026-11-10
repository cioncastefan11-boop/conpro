/* GA4 (G-PEKFFG1TWT). gtag.js is injected only after the analytics cookie category is granted. */
(function () {
  var MEASUREMENT_ID = 'G-PEKFFG1TWT';
  var STORAGE_KEY = 'conpro_cookie_consent_v1';
  var scriptRequested = false;
  var leadSent = false;

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (err) {
      return null;
    }
  }

  function analyticsOn(consent) {
    return !!(consent && consent.analytics);
  }

  function ensureStub() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    if (!window.__conproGaDefault) {
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });
      window.gtag('set', 'ads_data_redaction', true);
      window.__conproGaDefault = true;
    }
  }

  function isThankYouPage() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    return path === '/multumim' || path === '/multumim.html';
  }

  function sendLeadIfNeeded() {
    if (leadSent || !isThankYouPage() || !analyticsOn(readConsent())) return;
    var navEntries = performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
    var nav = navEntries && navEntries[0];
    if (nav && nav.type && nav.type !== 'navigate') return;
    leadSent = true;
    window.gtag('event', 'generate_lead', { method: 'form' });
  }

  function loadGa() {
    ensureStub();
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (!scriptRequested) {
      scriptRequested = true;
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID);
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
      document.head.appendChild(script);
    }
    sendLeadIfNeeded();
  }

  function denyGa() {
    if (!scriptRequested) return;
    ensureStub();
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function applyConsent(consent) {
    if (analyticsOn(consent)) loadGa();
    else denyGa();
  }

  window.conproApplyAnalyticsConsent = applyConsent;

  function contactMethod(href) {
    if (!href) return '';
    var value = String(href).trim();
    if (/^tel:/i.test(value)) return 'phone';
    if (/^mailto:/i.test(value)) return 'email';
    if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(value)) return 'whatsapp';
    return '';
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a[href]');
    if (!link) return;
    var method = contactMethod(link.getAttribute('href'));
    if (!method || !analyticsOn(readConsent()) || typeof window.gtag !== 'function') return;
    window.gtag('event', 'contact_click', { method: method });
  });

  applyConsent(readConsent());
})();
