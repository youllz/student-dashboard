import type { LayoutServerLoad } from "./$types";
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from "@sveltejs/kit";

const schema = z.object({
    name: z.string(),
    description: z.string(),
    beginning_of_the_year: z.string().datetime(),
    end_of_the_year: z.string().datetime()

  });





export const load = (async ({locals}) => {
    const form = await superValidate(schema);
    
    const getAllWorkspace = async() => {
        try {
           const data = await locals.pb.collection('workspaces').getFullList()
           return structuredClone(data)
        } catch (err) {
            console.log(err)
            
        }
    }
    
    return {
        allWorksapces: await getAllWorkspace(),
        form
    };
}) satisfies LayoutServerLoad;