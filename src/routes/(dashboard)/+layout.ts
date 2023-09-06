import { graphql } from '$houdini';
import { redirect } from '@sveltejs/kit';
import type { AfterLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query UserSession {
		viewer {
			id
			...RoutineFragment
		}
	}
`);

export const _houdini_afterLoad = ({ data, event }: AfterLoadEvent) => {
	const fromURL = event.url.pathname + event.url.search;
	if (!data.UserSession.viewer) {
		throw redirect(307, `/auth?mode=signin&redirectTo=${fromURL}`);
	}
};
