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
}
