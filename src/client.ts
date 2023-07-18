import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'http://localhost:4444/query',
	fetchParams({ session }) {
		//@ts-ignore
		if (session.token) {
			return {
				headers: {
					//@ts-ignore
					Authorization: `Bearer ${session.token}`
				}
			};
		}
		return {};
	}
});
