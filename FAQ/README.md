# NICE CXone Agent SDK — FAQ

A simple, fast, fully-static FAQ site for the [nice-cxone-agent-sdk](https://www.npmjs.com/org/nice-devone) packages and the `cxa-sdk-consumer` reference app.

## What you get

- **9 SDK / topic categories**, **133 questions**
- **Live in-place search** — filters items where they sit, no scroll-jumps
- **Click-to-expand accordion** answers
- **NPM** and **Official docs** links in the header
- **No build step**, no fetch, no server required — `data/faqs-data.js` embeds the data as a JS global, so `index.html` works straight from `file://` or any static host

## Preview

Just double-click `index.html`, or serve the folder:

```powershell
cd FAQ
python -m http.server 8080
# visit http://localhost:8080/
```

## Structure

```
FAQ/
├── index.html              Header, hero+search, accordion sections, footer
├── styles.css              Clean Stripe-inspired design system
├── script.js               Renders accordion, in-place search filtering
├── data/
│   ├── faqs.json           Source of truth (edit here)
│   └── faqs-data.js        Auto-generated mirror loaded by the page
└── README.md
```

## Editing FAQs

1. Edit [data/faqs.json](data/faqs.json) — each category has `id`, `name`, `icon`, `color`, `description`, and an array of `{ q, a }` items.
2. Regenerate the JS mirror (any of these works):

   ```powershell
   $json = Get-Content data/faqs.json -Raw
   "window.__FAQ_DATA__ = $json;" | Set-Content data/faqs-data.js -Encoding UTF8
   ```

   ```bash
   echo "window.__FAQ_DATA__ = $(cat data/faqs.json);" > data/faqs-data.js
   ```

## Deployment

Pushed changes under `FAQ/**` (or `storybooks/**`) deploy via [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml), the single unified Pages pipeline. After the first push, enable Pages in **Settings → Pages → Source: GitHub Actions**.

The resulting site layout:

- `/` — this FAQ
- `/storybooks/` — Storybook bundle
