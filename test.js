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
    <script type="module" src=""></script>
    <link rel="stylesheet" crossorigin href="1.css">
    <link rel="stylesheet" crossorigin href="2.css">
</head>
<body>
    test
</body>
</html>`

console.log(await preventCSSBlockingRender().transformIndexHtml(html))
