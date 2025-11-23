<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
    let { address } = $derived(data);
</script>

<svelte:head>
    <title>your card is on the way ✦ nighteden</title>
</svelte:head>

<div class="stack">
	<h1>Your card is on its way!</h1>
	<p>
		Your order is now being processed and will be dispatched on the next working day aiming to deliver before
		Christmas Day.
	</p>
    <p><small>After December, your shipping address will be purged from the database and any further correspondence will be through Direct Messages on Discord.</small></p>
	<p>
		If you want to support me, I have a <a
			href="https://ko-fi.com/nighteden"
			rel="external"
			target="_blank">Ko-fi</a
		> link if you wish to pay for the card (USD$10 in value) or simply as a donation.
	</p>

    <p class="strong">Your card will be shipped to:-</p>

    <address>
        {[address.first_name, address.last_name].join(" ")}<br>
        {#if address.suite}
            {address.suite}<br>
        {/if}
        {address.address}<br>
        {#if address.address2}
            {address.address2}<br>
        {/if}
        {address.city}<br>
        {#if address.province}
            {address.province}<br>
        {/if}
        {address.zip}<br>
        {address.country}
    </address>

	<a class="button  button--kofi" href="https://ko-fi.com/nighteden" rel="external" target="_blank">
        <div class="button__content">
            <img style="margin: -4px 0;" width=24 height=24 src="/kofi.png" alt="Ko-fi Logo"/>
            Support me on Ko-fi
        </div>
    </a>
	<a href="/" class="button">
		<div class="button__content">Back to home page</div>
	</a>
</div>

<style>
    h1 {
        text-align: center;
    }
    .strong {
        font-weight: 600;
    }
    address {
        font-style: normal;
    }
</style>
