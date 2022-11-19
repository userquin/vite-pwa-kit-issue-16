import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/status') || event.url.pathname.startsWith('/sw')) {
		return await resolve(event);
	}

	if (!event.locals.auth) {
		// get session from API and set it to event.locals.auth
	} else {
		event.locals.auth = null;
	}

	const response = await resolve(event);

	return response;
};
