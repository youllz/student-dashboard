import type {  LayoutServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
    name: z.string().min(2),
    description: z.string(),
    sessionId: z.string()
})

export const load = (async ({locals, params}) => {
    const form = superValidate(schema)

    const getMatter = async () => {
        try {
            const data = await locals.pb.collection('matters').getFullList()
           return data.filter((item) => item.session === params.sessionId)
        } catch (err) {
            console.log('Error', ErrorEvent)
        }
    }

    
    
    return {
        form,
        matters: structuredClone(await getMatter())
    };
}) satisfies LayoutServerLoad;