import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
		__RELOAD_SW__: false
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			useCredentials: true,
			mode: process.env.NODE_ENV as 'development' | 'production',
			strategies: 'injectManifest',
			filename: 'sw.ts',
			scope: '/',
			base: '/',
			injectRegister: 'script',
			includeManifestIcons: false,
			manifest: {
				short_name: 'freispace',
				name: 'freispace',
				description: 'Your supercharged resource and project management.',
				start_url: '/dashboard?source=pwa',
				scope: '/',
				display: 'standalone',
				theme_color: '#006aa3',
				background_color: '#f3f4f6',
				icons: [
					{
						src: '/img/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/img/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/img/favicon.svg',
						sizes: 'any',
						type: 'image/svg+xml',
						purpose: 'any'
					}
				],
				shortcuts: [
					{
						name: 'freispace Dashboard',
						short_name: 'Dashboard',
						url: '/dashboard?source=pwa',
						icons: [
							{
								src: '/img/pwa-dashboard.png',
								type: 'image/png',
								sizes: '96x96'
							},
							{
								src: '/img/pwa-dashboard.svg',
								type: 'image/svg+xml',
								sizes: 'any'
							}
						]
					},
					{
						name: 'freispace Planner',
						short_name: 'Planner',
						url: '/planning/overview?source=pwa',
						icons: [
							{
								src: '/img/pwa-planner.png',
								type: 'image/png',
								sizes: '96x96'
							},
							{
								src: '/img/pwa-planner.svg',
								type: 'image/svg+xml',
								sizes: 'any'
							}
						]
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			}
		})
	]
};

export default config;
