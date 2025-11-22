import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    
    const {
        url,
        locals: { supabase }
    } = event;

    const response = await supabase.auth.signOut();

    if (response.error) {
        throw error(400, "Could not log out the user.");
    }

    if (url.searchParams.get("error")) {
        throw redirect(303, `/?error=${url.searchParams.get("error")}`);
    } else {
        throw redirect(303, "/");
    }
};