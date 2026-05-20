// Loads content.json and populates DOM elements that have data-bind attributes.
//
// Usage in HTML:
//   <h1 data-bind="home.heroTitleLine1">沈穩工藝，</h1>
//   <img data-bind="home.heroImage" data-bind-attr="src" />
//   <a data-bind="home.heroCtaPrimary" data-bind-attr-href="contact.html" href="contact.html">洽談合作</a>
//
// For lists:
//   <div data-bind-list="home.featuredWorks">
//     <template>
//       <a data-bind="link" data-bind-attr-href="#">
//         <img data-bind="image" data-bind-attr-src="">
//         <h3 data-bind="title"></h3>
//       </a>
//     </template>
//   </div>

(function () {
  const CONTENT_PATH = 'content.json';

  function resolve(obj, path) {
    if (path == null) return undefined;
    // Empty / @ / . all mean "self" — useful for list items that are primitives (strings)
    if (path === '' || path === '@' || path === '.') return obj;
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function applyValue(el, value) {
    if (value == null || value === '') return;

    // Look for data-bind-attr-<attrname> (e.g. data-bind-attr-src, data-bind-attr-href)
    let hasAttrTarget = false;
    for (const a of [...el.attributes]) {
      if (a.name.startsWith('data-bind-attr-')) {
        const attrName = a.name.slice('data-bind-attr-'.length);
        el.setAttribute(attrName, value);
        hasAttrTarget = true;
      }
    }

    // Generic data-bind-attr="src" form
    const genericAttr = el.dataset.bindAttr;
    if (genericAttr) {
      el.setAttribute(genericAttr, value);
      hasAttrTarget = true;
    }

    if (!hasAttrTarget) {
      el.textContent = value;
    }
  }

  function bindWithin(root, dataObj) {
    root.querySelectorAll('[data-bind]').forEach((el) => {
      // Skip if this element is inside a nested data-bind-list (handled separately)
      const list = el.closest('[data-bind-list]');
      if (list && list !== root && root.contains(list)) return;
      const path = el.dataset.bind;
      const value = resolve(dataObj, path);
      applyValue(el, value);
    });
  }

  function renderList(container, items) {
    const tpl = container.querySelector('template');
    if (!tpl || !Array.isArray(items)) return;
    container.innerHTML = '';
    items.forEach((item) => {
      const clone = tpl.content.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.appendChild(clone);
      bindWithin(wrapper, item);
      while (wrapper.firstChild) container.appendChild(wrapper.firstChild);
    });
  }

  async function loadContent() {
    try {
      const res = await fetch(CONTENT_PATH, { cache: 'no-cache' });
      if (!res.ok) throw new Error('content.json HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      console.warn('[content.js] failed to load content.json — keeping default HTML.', err);
      return null;
    }
  }

  async function init() {
    const data = await loadContent();
    if (!data) return;

    // Top-level (non-list) bindings
    document.querySelectorAll('[data-bind]').forEach((el) => {
      // Skip elements inside any data-bind-list (they bind to item, not root)
      if (el.closest('[data-bind-list]')) return;
      const path = el.dataset.bind;
      const value = resolve(data, path);
      applyValue(el, value);
    });

    // Lists
    document.querySelectorAll('[data-bind-list]').forEach((container) => {
      const path = container.dataset.bindList;
      const items = resolve(data, path);
      renderList(container, items);
    });

    // Expose for other scripts (e.g. mailto in main.js)
    window.__siteContent = data;
    document.dispatchEvent(new CustomEvent('content:loaded', { detail: data }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
