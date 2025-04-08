# Prevent CSS Blocking Render

Usage scenario: Display a loading animation or logo from the HTML file before mount.

<br>

```
npm i vite-plugin-prevent-css-blocking-render
```

```ts
import preventCSSBlockingRender from 'vite-plugin-prevent-css-blocking-render'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // Add plugin:
    preventCSSBlockingRender(),
```

<br>

> [!WARNING]  
> If you have added the `@sergeymakinen/vite-plugin-html-minimize` plugin, you must place the current plugin after `htmlMinimize`; otherwise, the current plugin will not work properly.
