# Prevent CSS Blocking Render

Usage scenario: Display a loading animation or logo from an HTML file before mount, similar to [X](https://x.com).

## Setup

```
npm i vite-plugin-prevent-css-blocking-render
```

```ts
import preventCSSBlockingRender from 'vite-plugin-prevent-css-blocking-render'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // Add plugin:
    preventCSSBlockingRender(),
```

---

## Effect

before:

```html
<meta charset="UTF-8">
<script type="module" src="/assets/index-xxxxxxxx.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-xxxxxxxx.css">
```

after:

```html
<meta charset="UTF-8">
<link prevent-css-blocking-render rel="preload" as="style" crossorigin href="/assets/index-xxxxxxxx.css">
<script>
  document.head.querySelectorAll('link[prevent-css-blocking-render]')
    .forEach(function(e){ e.rel = 'stylesheet' })
</script>
<script type="module" src="/assets/index-xxxxxxxx.js"></script>
```
