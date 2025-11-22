import { DISCORD_ENTITLEMENT_GUILD_ID } from '$env/static/private';
import { PUBLIC_DISCORD_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {

    const {
        url,
        locals: { supabase }
    } = event;
    const code = url.searchParams.get('code') as string;
    const next = url.searchParams.get('next') ?? '/';

    if (!code) {
        throw redirect(303, "/?error=unauthorized");
    }

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        throw redirect(303, "/?error=server_side");
    }

    let internal_error = false;
    let in_guild = false;

    if (session && session.provider_token) {

        const url = `${PUBLIC_DISCORD_API_URL}/users/@me/guilds`;

        await fetch(url, {
            headers: {
                "Authorization": `Bearer ${session.provider_token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            for (const guild of json) {
                if (guild.id == DISCORD_ENTITLEMENT_GUILD_ID) {
                    in_guild = true;
                    break;
                }
            }
        }).catch(() => {
            internal_error = true;
        });

    }

    console.log(session);

    if (internal_error) {
        throw redirect(303, "/auth/logout?error=server_side");
    } else if (!in_guild) {

        // const { data, error } = await supabase.auth.admin.deleteUser()

        throw redirect(303, "/auth/logout?error=not_in_guild");
    } else {
        throw redirect(303, "/");
    }
};