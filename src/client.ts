import { HoudiniClient } from '$houdini';
import { PUBLIC_BASE_DOMAIN } from '$env/static/public';

export default new HoudiniClient({
	url: `${PUBLIC_BASE_DOMAIN}/query`,
	fetchParams({ session }) {
		//@ts-ignore
		if (session.token) {
			return {
				headers: {
					//@ts-ignore
					Authorization: `Bearer ${session.token}`
				},
				credential: true
			};
		}
		return {};
	}
});
