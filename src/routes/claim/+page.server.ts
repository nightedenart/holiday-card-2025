import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals: {session, supabase}}) => {

    const user_id = session?.user.id;

    const response = await supabase.from("addresses").select().eq("user_id", user_id).limit(1).single();

    if (response.data) {
        return redirect(303, "/success");
    }
    
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ url, request, locals: { session, supabase } }) => {

        const formData = await request.formData()
        const user_id = session?.user.id
        const discord_id = session?.user.user_metadata.provider_id as number
        const name = session?.user.user_metadata.full_name as string

        const address = {
            name,
            user_id,
            discord_id,
            card_name: formData.get("card_name") as string,
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            suite: formData.get("suite") as string,
            address: formData.get("address") as string,
            address2: formData.get("address2") as string,
            city: formData.get("city") as string,
            province: formData.get("province") as string,
            zip: formData.get("zip") as string,
            country: formData.get("country") as string,
        };

        const response = await supabase.from("addresses").insert(address);

        if (response.error) {
            return fail(400, { message: "Couldn't save your address." });
        }
        
        return redirect(303, "/success");

    }
}