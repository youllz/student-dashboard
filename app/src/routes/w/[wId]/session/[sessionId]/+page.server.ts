import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
    name: z.string().min(2),
    description: z.string(),
    

  });

export const load = (async ({parent}) => {
    console.log(await parent())
    const form = await superValidate(schema);
    return {
        form
    };
}) satisfies PageServerLoad;



export const actions: Actions = {
    createMatter: async ({locals, request, params}) => {
       const form = await superValidate( request, schema)

       if(!form.valid) {
        return fail(400, {form})
       }

       let matterId = ''
       try {
        const data = await locals.pb.collection('matters').create({
            name: form.data.name,
            description: form.data.description,
            session: params.sessionId
        })
        matterId = data.id
       } catch (err) {
        console.log('Error', err)
       }

       return fail(204, {form, matterId})
    }
};