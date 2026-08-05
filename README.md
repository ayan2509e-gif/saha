# Saha Home Decor — Website

A premium, single-page website for Saha Home Decor (plastic chairs & home
furniture reseller, Karachi). Built with HTML5, CSS3, Bootstrap 5, vanilla
JavaScript and Font Awesome only — no build step required.

## Folder structure
```
saha-home-decor/
├── index.html        → all page content/sections
├── css/style.css      → design tokens, layout, animations, responsiveness
├── js/script.js       → navbar, scroll reveal, counters, WhatsApp logic, modals, form
├── assets/favicon.svg → placeholder favicon / logo mark
└── README.md
```

## Running it
No server or build tools needed — just open `index.html` in a browser, or
deploy the whole folder as-is to any static host (Netlify, Vercel, GitHub
Pages, cPanel, etc).

## Before going live
1. **Replace placeholder images.** Every image currently points to
   `https://placehold.co/...` (colored placeholders with labels). Search for
   `placehold.co` in `index.html` and swap each `src` for your real product
   photos, keeping the same filename pattern if you like
   (e.g. `chair-red.jpg`, `chair-blue.jpg`) — each product carousel expects
   4 images.
2. **Replace the logo.** `assets/favicon.svg` and the inline SVG chair mark
   in the navbar/footer are placeholders — swap in your real logo file.
3. **Update the Google Map embed** in the Contact section with your exact
   pinned location if the auto-generated address search isn't precise enough.
4. **Set a real domain** in the `<link rel="canonical">`, Open Graph and
   Twitter meta tags (currently `sahahomedecor.pk` as a placeholder).
5. Double-check the WhatsApp number and email in `index.html` and
   `js/script.js` (`WHATSAPP_NUMBER` constant) if these ever change.

## Notes
- The contact form has no backend — a valid submission is packaged into a
  formatted WhatsApp message and opened automatically, since the business
  runs primarily on WhatsApp.
- All "Order on WhatsApp" buttons build a pre-filled message from the
  product name, price, selected color and description.
