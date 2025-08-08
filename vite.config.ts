import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{ src: 'images', dest: '' },
				{ src: 'pdf', dest: '' },
				{ src: 'icofont', dest: '' },
				{ src: 'Video', dest: '' },
				{ src: 'react.production.min.js', dest: '' },
				{ src: 'react-dom.production.min.js', dest: '' },
				{ src: 'babel.min.js', dest: '' }
			]
		})
	],
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
})
