import wretch from 'wretch';
import { redirect } from '@sveltejs/kit';

type SetTokenWithRedirectParams = {
	token: string;
	redirectTo?: string;
};

type SetTokenParams = {
	token: string;
	redirectTo: string;
};

export default function setTokenWithRedirect({
	token,
	redirectTo
}: SetTokenWithRedirectParams) {
	if (!redirectTo) {
		setToken({
			token: token,
			redirectTo: '/dashboard/routines'
		});
		return;
	}
	setToken({
		token: token,
		redirectTo: redirectTo
	});
}

function setToken({ token, redirectTo }: SetTokenParams) {
	wretch(`/api/tokens/set/${token}`)
		.options({ credentials: 'include', mode: 'cors' })
		.get()
		.json(() => {
			window.location.assign(`/${redirectTo.slice(1)}`);
		});
}
