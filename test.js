import preventCSSBlockingRender from './dist/main.js'

const html = `
<!--
    <link rel="stylesheet" crossorigin href="invalid">
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="module" src="/assets/index-xxxxxxxx.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-xxxxxxxx.css">
    <link rel="stylesheet" crossorigin href="/assets/about-xxxxxxxx.css">
</head>
<body>
    <div id="app"></div>
</body>
</html>`

const output = await preventCSSBlockingRender().transformIndexHtml(html)

console.log(output)
