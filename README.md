# Shree Achyutam website

Static site (GitHub Pages, `shreeachyutam.in`). No build step.

## Product availability toggle

All four product launch links (ERP, Ghost Jobs, CBM Calculator, Sign) are controlled by one flag in [`src/js/product-status.js`](src/js/product-status.js):

```js
const PRODUCTS_ONLINE = false;
```

- `false` (current): launch links are disabled, cards show "Temporarily offline", status pills show "Offline", and the hero copy no longer claims the products are live. Visitors are never sent to a down server.
- `true`: the original URLs, "Launch" labels, "Live" pills and live copy are restored automatically.

The HTML itself defaults to the offline state, so it stays safe even if JavaScript fails to load. Commit the changed flag to deploy the update.
