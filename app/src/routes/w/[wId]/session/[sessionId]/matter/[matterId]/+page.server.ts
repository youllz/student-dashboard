import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const addNoteSchema = z.object({
    note: z.number().min(0).max(20),
    date: z.string(),
    description: z.string(),
    factor: z.number().min(1).max(5).default(1),
    type: z.string().default('homework')


})





export const load = (async ({locals, params}) => {

    const addNoteForm = await superValidate(addNoteSchema)

    const getAllNotes = async() => {
        try {
            const data = await locals.pb.collection('notes').getFullList()
            return structuredClone(data.filter((item) => item.matter === params.matterId))
        } catch (err) {
            console.log('Error: ', err)            
        }
    }

    return {
        addNoteForm,
        allNote: await getAllNotes()
    };
}) satisfies PageServerLoad;



export const actions: Actions = {
    addNote: async({request,locals, params}) => {
        const addNoteForm = await superValidate(request, addNoteSchema);

        console.log('POST', addNoteForm);

        if (!addNoteForm.valid) {
            return fail(400, {addNoteForm})
        }

        try {
            await locals.pb.collection('notes').create({
                note: addNoteForm.data.note,
                matter: params.matterId,
                description: addNoteForm.data.description,
                date: new Date(addNoteForm.data.date),
                factor: addNoteForm.data.factor,
                type: addNoteForm.data.type,
            })
        } catch (err) {
            console.log('Error: ', err)
            return fail(400, {addNoteForm})
        }

        
    }
};