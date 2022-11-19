import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
	const searchParams = url.searchParams;
	const invite = searchParams.get('invite') ?? null;
	const user = locals.auth;

	let redirectPath = '';

	if (!user) {
		redirectPath = '/auth/login';
	} else {
		if (!user.team) {
			redirectPath = '/wizard';
		} else {
			redirectPath = '/dashboard';
		}
	}

	if (invite) {
		redirectPath = redirectPath + '?invite=' + invite;
	}

	throw redirect(302, redirectPath);
};
