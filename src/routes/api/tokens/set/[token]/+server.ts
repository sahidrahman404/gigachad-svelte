import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ params, cookies }) => {
	const token = params['token'];
	if (!token) {
		return json({ success: false }, { status: 400 });
	}

	cookies.set('auth', token, {
		path: '/',
		maxAge: 3600,
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	});

	return json({ success: true }, { status: 200 });
};
