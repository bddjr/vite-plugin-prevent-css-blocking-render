import { Plugin } from 'vite'
import { JSDOM } from 'jsdom'

export function preventCSSBlockingRender(): Plugin {
    return {
        name: 'prevent-css-blocking-render',
        enforce: 'post', // only run on build
        transformIndexHtml(html) {
            const dom = new JSDOM(html)
            const { document } = dom.window
            const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
            if (links.length === 0)
                return html

            document.head.insertAdjacentHTML(
                'afterbegin',
                `<script>document.head.querySelectorAll('link[prevent-css-blocking-render]').forEach(function(e){e.rel='stylesheet'})</script>`
            )
            document.head.prepend(...links.values().map((e) => {
                e.remove()
                const newLink = document.createElement('link')
                newLink.setAttribute('prevent-css-blocking-render', '')
                for (const { name, value } of e.attributes) {
                    switch (name) {
                        case 'rel':
                            newLink.rel = 'preload'
                            newLink.setAttribute('as', 'style')
                            break
                        case 'as':
                        case 'blocking':
                            break
                        default:
                            newLink.setAttribute(name, value)
                    }
                }
                return newLink
            }))

            const charset = document.querySelector('meta[charset]')
            if (charset) {
                charset.remove()
                document.head.prepend(charset)
            }

            return dom.serialize()
        },
    }
}

export default preventCSSBlockingRender
