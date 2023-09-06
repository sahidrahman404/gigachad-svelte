import { graphql } from '$houdini';
import { redirect } from '@sveltejs/kit';
import type { AfterLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query UserSessionAuth {
		viewer {
			id
		}
	}
`);

export const _houdini_afterLoad = ({ data }: AfterLoadEvent) => {
	if (data.UserSessionAuth.viewer) {
		throw redirect(307, `/dashboard/routines`);
	}
};
