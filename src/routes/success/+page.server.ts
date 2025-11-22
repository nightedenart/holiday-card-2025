import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { session, supabase } }) => {

    const user_id = session?.user.id;

    const response = await supabase.from("addresses").select().eq("user_id", user_id).limit(1).single();

    if (!response.data) {
        return redirect(303, "/");
    }

    return { address: response.data };

}) satisfies PageServerLoad;