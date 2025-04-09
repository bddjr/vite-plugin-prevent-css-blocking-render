import { Plugin } from 'vite'

export function preventCSSBlockingRender(): Plugin {
    return {
        name: 'prevent-css-blocking-render',
        enforce: 'post',
        transformIndexHtml(html) {
            // link preload after script
            {
                let preload = ''
                html = html.replace(/<link\s[^>]*?rel="preload"[^>]*?>/g, (match) => {
                    preload += match
                    return ''
                })
                html = html.replace(/(?=<\/head>)/, preload)
            }
            // link stylesheet before script
            {
                let stylesheet = ''
                html = html.replace(
                    /<link([^>]*?\s)rel="stylesheet"([^>]*?>)/g,
                    (match, $1: string, $2: string) => {
                        stylesheet += `<link ${$1}prevent-css-blocking-render rel="preload" as="style"${$2}`
                        return ''
                    },
                )
                if (stylesheet) {
                    html = html.replace(/(?=<script)/, stylesheet)
                    // enable stylesheet after body loaded
                    html = html.replace(
                        /(?=<\/body>)/,
                        `<script>document.querySelectorAll('link[prevent-css-blocking-render]').forEach(function(e){e.rel='stylesheet'})</script>`,
                    )
                }
            }
            return html
        },
    }
}

export default preventCSSBlockingRender
