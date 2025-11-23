import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = (async ({locals: {session, supabase}}) => {

    const user_id = session?.user.id;

    const response = await supabase.from("addresses").select().eq("user_id", user_id).limit(1).single();

    if (response.data) {
        return { claimed: true, order: response.data };
    }
    
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ url, locals: { supabase } }) => {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${url.origin}/auth/callback`,
                scopes: "guilds"
            }
        });

        if (error) {
            return { success: false };
        }
        
        if (data) {
            throw redirect(303, data.url);
        }
    },
    logout: async () => {
        throw redirect(303, "/auth/logout");
    }
}