//@ts-check

/**
 * @returns {import("vite").Plugin} 
 */
export function preventCSSBlockingRender() {
	return {
		name: 'prevent-css-blocking-render',
		enforce: 'post',
		transformIndexHtml(html) {
			// link preload
			{
				let preload = ''
				html = html.replace(/<link\s[^>]*?rel="preload"[^>]*?>/g, (match) => {
					preload += match
					return ''
				})
				html = html.replace(/(?=<\/head>)/, preload)
			}
			// link stylesheet
			{
				let stylesheet = ''
				html = html.replace(
					/<link rel="stylesheet"([^>]*?)href="([^"]*?)"([^>]*?>)/g,
					(match, p1, p2, p3) => {
						stylesheet += `<link prevent-css-blocking-render rel="preload" as="style"${p1}href="${p2}"${p3}`
						return ''
					},
				)
				if (stylesheet) {
					html = html.replace(/(?=<script)/, stylesheet)
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
