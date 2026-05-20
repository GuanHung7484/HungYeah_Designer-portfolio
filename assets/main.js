// Scroll-reveal effect for sections / cards marked with .reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Hide-on-scroll-down, show-on-scroll-up top nav
let lastScroll = 0;
const nav = document.querySelector('nav[data-sticky]');
if (nav) {
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y <= 0) {
      nav.classList.remove('-translate-y-full');
    } else if (y > lastScroll && !nav.classList.contains('-translate-y-full')) {
      nav.classList.add('-translate-y-full');
    } else if (y < lastScroll && nav.classList.contains('-translate-y-full')) {
      nav.classList.remove('-translate-y-full');
    }
    lastScroll = y;
  }, { passive: true });
}

// Portfolio filter buttons (only present on portfolio.html)
const filterButtons = document.querySelectorAll('[data-filter]');
const filterItems = document.querySelectorAll('[data-category]');

if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter;
      filterButtons.forEach((b) => {
        b.classList.remove('active-filter', 'text-primary');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('active-filter', 'text-primary');
      btn.classList.remove('text-on-surface-variant');

      filterItems.forEach((item) => {
        const match = target === 'all' || item.dataset.category === target;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

// Mobile menu toggle
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Contact form — opens user's email client pre-filled to vkopkimo@gmail.com
const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const topic = (data.get('topic') || '').toString().trim();
    const budget = (data.get('budget') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const subject = `[作品集網站洽談] ${topic || '合作詢問'}｜${name || '訪客'}`;
    const body = [
      `姓名：${name}`,
      `電子郵件：${email}`,
      `合作類型：${topic}`,
      `預算範圍：${budget || '（未填）'}`,
      '',
      '需求說明：',
      message,
      '',
      '— 來自作品集網站聯絡表單'
    ].join('\n');

    const targetEmail = window.__siteContent?.site?.email || 'vkopkimo@gmail.com';
    const mailto = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    const status = contactForm.querySelector('[data-form-status]');
    if (status) {
      status.textContent = '已開啟您的郵件程式，請於郵件中按送出。';
      status.classList.remove('hidden');
    }
  });
}

// Sync all mailto: links with the email from CMS content (window.__siteContent.site.email)
document.addEventListener('content:loaded', (e) => {
  const email = e.detail?.site?.email;
  if (!email) return;
  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.href = 'mailto:' + email;
  });
});

// Auto-swap .img-placeholder with a real <img> when a matching file exists.
// Runs at script load (for static placeholders) AND on content:loaded
// (for placeholders added dynamically by content.js list rendering).
function swapImagePlaceholders(root) {
  (root || document).querySelectorAll('.img-placeholder[data-src]').forEach((el) => {
    const src = el.dataset.src;
    if (!src) return;
    if (el.dataset.swapped === '1') return;
    el.dataset.swapped = '1';
    const probe = new Image();
    probe.onload = () => {
      const real = document.createElement('img');
      real.src = src;
      real.alt = el.dataset.label || '';
      real.loading = 'lazy';
      real.className = (el.className + ' object-cover').replace('img-placeholder', '').trim();
      el.replaceWith(real);
    };
    probe.onerror = () => {
      // Image doesn't exist — keep the placeholder visible
      delete el.dataset.swapped;
    };
    probe.src = src;
  });
}

swapImagePlaceholders();
document.addEventListener('content:loaded', () => swapImagePlaceholders());
