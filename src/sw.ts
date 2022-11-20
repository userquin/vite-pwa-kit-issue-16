import {
	cleanupOutdatedCaches,
	createHandlerBoundToURL,
	precacheAndRoute
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

if (import.meta.env.DEV) {
	// to allow work offline
	registerRoute(new NavigationRoute(createHandlerBoundToURL('/'), { allowlist: [/^\/$/] }));
}

if (import.meta.env.PROD) {
	registerRoute(new NavigationRoute(createHandlerBoundToURL('/sw')));
	registerRoute(
		({ request }) =>
			request.destination === 'style'
			|| request.destination === 'manifest'
			|| request.destination === 'script'
			|| request.destination === 'worker'
			|| request.destination === 'image',
		async ({ request }) => {
			const url = new URL(request.url);
			const idx = url.pathname.indexOf('/_app/');
			if (idx > 0) {
				return caches.match(url.pathname.slice(idx + 1));
			}
			return await fetch(request);
		}
	)
/*
	if (import.meta.env.PROD) {
		const notFoundFallbackHandler = async ({event}) => {
			const fetchResponse = await fetch(event.request);
			if (!fetchResponse || fetchResponse.status === 404) {
				return caches.match('/sw');
			} else {
				return fetchResponse;
			}
		};
		registerRoute(
			({ request }) => {
				return request.mode === 'navigate'
			},
			notFoundFallbackHandler,
		)
	}
*/
}
