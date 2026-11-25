/*
 * Product availability toggle — this is the only setting you need to change.
 * Set PRODUCTS_ONLINE to true when the four product servers are back up.
 * Every launch link, status badge and "live" copy on the site follows this flag.
 */
(function () {
  const PRODUCTS_ONLINE = false; // erp / ghostjobs / cbm / sign

  const online = PRODUCTS_ONLINE === true;

  // Product links have no href in the HTML by default, so visitors can never
  // be sent to a down server. The flag restores the real URLs when they return.
  document.querySelectorAll('[data-product-url]').forEach((link) => {
    if (online) {
      link.setAttribute('href', link.dataset.productUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
    } else {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
    }
    link.classList.toggle('is-offline', !online);
  });

  // Swap "live" copy for the offline message (and back again when re-enabled).
  document.querySelectorAll('[data-online-text][data-offline-text]').forEach((el) => {
    el.textContent = online ? el.dataset.onlineText : el.dataset.offlineText;
  });

  // Status pills on products.html get an amber dot while offline.
  document.querySelectorAll('[data-status-pill]').forEach((pill) => {
    pill.classList.toggle('is-offline', !online);
  });
})();
