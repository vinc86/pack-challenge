import type { Actions } from './$types';

export const actions = {
	upload: async (event) => {
		// TODO log the user in
		console.log(await event.request.formData());
	}
} satisfies Actions;
