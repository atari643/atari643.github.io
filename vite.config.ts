import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	// Chemins relatifs pour GitHub Pages afin d'éviter les URL absolues
	// qui peuvent mener à des 404 et des erreurs de type MIME.
	base: './',
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{ src: 'images', dest: '' },
				{ src: 'pdf', dest: '' },
				{ src: 'icofont', dest: '' },
				{ src: 'Video', dest: '' },
				{ src: 'react.production.min.js', dest: '' },
				{ src: 'react-dom.production.min.js', dest: '' }
			]
		})
	],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets'
	}
})
