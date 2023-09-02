import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2),
	description: z.string(),
	beginning_of_the_session: z.string(),
	end_of_the_session: z.string()
});

export const load = (async ({ locals, params }) => {
	const form = await superValidate(schema);
	const getCurrentWorkspace = async () => {
		try {
			const data = await locals.pb.collection('workspaces').getOne(params.wId);
			return structuredClone(data);
		} catch (err) {
			console.log('Error', err);
		}
	};

	const getallSessionWorkspace = async () => {
		console.log(params.wId);

		try {
			const data = await locals.pb.collection('sessions').getFullList();

			return structuredClone(data.filter((item) => item.workspace === params.wId));
		} catch (err) {
			console.log('Error', err);
		}
	};

	return {
		form,
		currentWorkspace: await getCurrentWorkspace(),
		allSessionsForCurrentWorkspace: await getallSessionWorkspace()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createSession: async ({ request, locals, params }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		let sessionId = '';
		try {
			const record = await locals.pb.collection('sessions').create({
				name: form.data.name,
				description: form.data.description,
				beginning_of_the_session: new Date(form.data.beginning_of_the_session),
				end_of_the_session: new Date(form.data.end_of_the_session),
				workpace: params.wId
			});
		} catch (err) {
			console.log('Error', err);
			return fail(400, { form });
		}

		return fail(204, { form, sessionId });
	}
};
