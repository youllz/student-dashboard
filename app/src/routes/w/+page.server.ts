import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

const schema = z.object({
	name: z.string(),
	description: z.string(),
	beginning_of_the_year: z.string(),
	end_of_the_year: z.string()
});

export const load = (async () => {
	const form = await superValidate(schema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createWorkspace: async ({ request, locals }) => {
		// const formData = Object.fromEntries(await request.formData()) as {name:string, description:string, end_of_the_year:string, beginning_of_the_year:string}
		// console.log(formData)

		interface RecordData {
			id: string;
			name: string;
		}

		let workspaceId: RecordData = { id: '', name: '' };
		const form = await superValidate(request, schema);
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const record = await locals.pb
				.collection('workspaces')
				.create({
					name: form.data.name,
					description: form.data.description,
					end_of_the_year: new Date(form.data.end_of_the_year),
					beginning_of_the_year: new Date(form.data.beginning_of_the_year)
				});
			workspaceId.id = record.id;
			workspaceId.name = record.name;
		} catch (err) {
			console.log('Error', err);
			fail(400, { message: 'fail to create workspace' });
		}

		return fail(204, { form, workspaceId });
	}
};
