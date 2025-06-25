import type { PageLoad } from './$types';

// PUBLIC_INTERFACE
/** SvelteKit page load for getting note id param in edit route. */
export const load: PageLoad = async ({ params }) => {
	return {
		id: params.id
	};
};
