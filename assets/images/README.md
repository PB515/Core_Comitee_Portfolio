# Swapping in real photos

Right now every section banner and gallery tile is a CSS-only placeholder (gradients/patterns), so the site works today with zero images. To drop in real photos later:

## 1. Section banners (`.visual-banner` in `index.html`)

Add an image file here, then in `index.html` find the matching `<div class="visual-banner ...">` and add an inline style:

| Section | Class in index.html | Suggested filename |
|---|---|---|
| Pole Operations | `vb-pole` | `assets/images/pole-ops.jpg` |
| Undergrad Engineering | `vb-eng` | `assets/images/engineering.jpg` |
| Gov & Civic | `vb-civic` | `assets/images/civic.jpg` |
| Community & Preservation | `vb-comm` | `assets/images/community.jpg` |

Example, change:
```html
<div class="visual-banner vb-pole reveal">
```
to:
```html
<div class="visual-banner vb-pole reveal" style="background-image:url('assets/images/pole-ops.jpg'); background-size:cover; background-position:center;">
```
The existing gradient stays underneath as a fallback if the image fails to load.

## 2. Gallery tiles (Personal Creativity section)

Same idea: the three tiles use classes `gt1`, `gt2`, `gt3`. Add:
```html
<div class="gallery-tile gt1" style="background-image:url('assets/images/moon-model.jpg')"><span>Chandrayaan-2 Moon Surface Model</span></div>
```

Suggested filenames: `moon-model.jpg`, `jharukha-set.jpg`, `apparel-pipeline.jpg`.

## 3. App icon (`icon.svg`)

Replace `assets/images/icon.svg` with your own square logo/monogram (works as SVG or swap to PNG and update `manifest.json` + `sw.js` accordingly). Used for the installable quiz PWA icon.

## Recommended image specs

- Banners: 1600×500px (wide), JPG, under 300KB
- Gallery tiles: 800×1000px (portrait), JPG, under 200KB
- Keep total page weight reasonable for mobile scanning at the event
