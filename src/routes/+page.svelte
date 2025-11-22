<script>
	import { page } from '$app/state';

	let { data } = $props();
	let { claimed, order, session } = $derived(data);

	let error = page.url.searchParams.get('error');
</script>

<svelte:head>
    <title>nighteden ✦ holiday / christmas card 2025</title>
</svelte:head>

<div class="stack">
	<h1>Holiday / Christmas Card 2025</h1>
	{#if error === 'not_in_guild'}
        <div class="error">
            <p>
                You are not in the Midnight Café server to claim a holiday card. Message nighteden on Discord
                for details.
            </p>
        </div>
	{:else if error === 'internal_error'}
        <div class="error">
		    <p>There was a problem authorising your Discord account. Please try again later.</p>
        </div>
	{:else if error === 'unauthorized'}
        <div class="error">
		    <p>You must log in to Discord to claim your free holiday card.</p>
        </div>
	{/if}
	<p>
		It's Winter holiday season again - that means I'm sending out greetings cards this year. Log in
		with Discord to get your free card and fill out your shipping address before 8th December to
		ensure your card arrives on time.
	</p>
	<p>
		If you want to help support my art, feel free to send me a <a
			href="https://ko-fi.com/nighteden"
			rel="external"
			target="_blank">Ko-fi</a>.
	</p>
	<p>
		<small
			>The card is only available to those in the Midnight Café server and on a per-account basis.</small
		>
	</p>

    <div class="card-container">
        <div class="shadow">
            <img class="card" src="/card.png" alt="Preview of the 2025 Card" />
        </div>
    </div>

	{#if session}
		<!--
<pre>
{JSON.stringify(session, null, 4)}
</pre>
-->

		{#if data.claimed}
			<button class="button button--primary" disabled>Claimed free card</button>
		{:else}
			<a class="button button--primary" href="/claim">
				<div class="button__content">Claim my free holiday card</div>
			</a>
		{/if}
        <a class="button  button--kofi" href="https://ko-fi.com/nighteden" rel="external" target="_blank">
            <div class="button__content">
                <img style="margin: -4px 0;" width=24 height=24 src="/kofi.png" alt="Ko-fi Logo"/>
                Support me on Ko-fi
            </div>
        </a>

		<div class="user">
			<img class="user__avatar" src={session.user.user_metadata.avatar_url} alt="Avatar" />
			<p>Signed in as {session.user.user_metadata.full_name}</p>
			<a href="/auth/logout">Log out</a>
		</div>
	{:else}
		<form class="discord-form" method="POST" action="?/login">
			<button class="button  button--discord">
				<div class="button__content">
                    <img src="/discord.svg" alt="Discord Logo"/>
                    Sign in with Discord
                </div>
			</button>
            <a class="button  button--kofi" href="https://ko-fi.com/nighteden" rel="external" target="_blank">
                <div class="button__content">
                    <img style="margin: -4px 0;" width=24 height=24 src="/kofi.png" alt="Ko-fi Logo"/>
                    Support me on Ko-fi
                </div>
            </a>
		</form>
	{/if}
</div>

<style>
    .error {
        background-color: #dc262611;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 14px;
        border: 1px solid #dc262633;
        color: #450a0a;
    }
	h1 {
		text-align: center;
	}
	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-align: center;
		font-size: 14px;
	}
	.user__avatar {
		width: 16px;
		height: 16px;
		border-radius: 44px;
	}
	.user a {
		font-weight: 600;
	}
    .card-container {
        width: 320px;
        height: auto;
        margin: 48px auto;
        transform: rotate(-5deg);
    }
	.shadow {
		position: relative;
        z-index: 1;
	}
	.shadow:before {
		content: '';
		display: block;
		position: absolute;
        right: 0;
        bottom: 0;
        width: 50%;
        height: 30%;
        background: rgb(0 0 0 / .3);
        transform-origin: left;
        transform: skewY(5deg);
        filter: blur(7px);
        z-index: -1;
	}
	.shadow:after {
		content: '';
		display: block;
		position: absolute;
        left: 0;
        bottom: 0;
        width: 50%;
        height: 30%;
        background: rgb(0 0 0 / .3);
        transform-origin: right;
        transform: skewY(-5deg);
        filter: blur(7px);
        z-index: -1;
	}
    .discord-form {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }
</style>
