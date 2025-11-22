<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../scss/style.scss';
	import { invalidate, afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let showLoadingBar = $state<boolean>(false);
	let isLoaded = $state<boolean>(true);

	beforeNavigate(() => {
		showLoadingBar = true;
		isLoaded = false;
	});

	afterNavigate(() => {
		isLoaded = true;
		setTimeout(() => {
			showLoadingBar = false;
		}, 600);
	});

	let canvas = $state<HTMLCanvasElement>();
	let pageWidth = $state(0);
	let windowHeight = $state(0);
	let contentHeight = $state(0);

	interface SnowDrop {
		x: number;
		y: number;
		radius: number;
		fallen: number;
	}

	let drops: SnowDrop[] = [];
	let animating = $state(true);

	let maxRadius = 4;

	function resetDrop(drop: SnowDrop) {
		((drop.x = Math.random() * pageWidth),
			(drop.y = Math.random() * windowHeight * -2),
			(drop.radius = Math.random() * maxRadius),
			(drop.fallen = 0));
	}

	function setup() {
		drops = [];

		for (let i = 0; i < 100; i++) {
			drops.push({
				x: Math.random() * pageWidth,
				y: Math.random() * windowHeight * -2,
				radius: Math.random() * maxRadius,
				fallen: 0
			});
		}
	}

	function collision(x: number | null, y: number) {
		if (y >= windowHeight) {
			return true;
		}
		if (x && x >= containerLeft && x <= containerLeft + containerWidth && y >= containerTop) {
			return true;
		}
		return false;
	}

	function render(timestamp: DOMHighResTimeStamp) {
		if (!canvas) return;

		const ctx = canvas.getContext('2d'),
			dpr = window.devicePixelRatio || 1;

		if (!ctx) return;

		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;

		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		const now = performance.now();
		const ratio = (now - timestamp) / 8;

		for (const drop of drops) {
			let opacity = 1;

			let dropX = drop.x + Math.sin((drop.x + drop.y) / 100) * 40;

			if (!collision(dropX, drop.y)) {
				drop.y += 0.5 * ratio;
			} else {
				drop.fallen += 0.001 * ratio;
				opacity = 1 - Math.min(drop.fallen, 1);

				if (drop.fallen >= 1) {
					resetDrop(drop);
				}
			}

			ctx.beginPath();
			ctx.arc(dropX, drop.y, drop.radius, 0, 2 * Math.PI);
			ctx.fillStyle = `rgba(255,255,255,${opacity})`;
			ctx.fill();
		}

		if (animating) {
			requestAnimationFrame(() => {
				render(now);
			});
		}
	}

	onMount(() => {
		refreshPageWidthAndHeight();
		setup();

		window.requestAnimationFrame(() => {
			render(performance.now());
		});

		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let container = $state<HTMLElement>();
	let containerTop = $state(0);
	let containerLeft = $state(0);
	let containerWidth = $state(0);

	function refreshPageWidthAndHeight() {
		if (container) {
			containerTop = container.getBoundingClientRect().top;
			containerLeft = container.getBoundingClientRect().left;
		}
		pageWidth = Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth
		);
	}

	function windowResizeHandler() {
		window.requestAnimationFrame(() => {
			refreshPageWidthAndHeight();
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onresize={windowResizeHandler} bind:innerHeight={windowHeight} />

{#if showLoadingBar}
	<div id="loading-bar" class="{isLoaded ? 'is-loaded' : 'is-loading'}"></div>
{/if}

<div class="background">
	<div id="trees"></div>
	<div id="ground"></div>
	<div id="tree"></div>
	<div id="foxes"></div>
	<div id="kim"></div>
	<canvas id="canvas" bind:this={canvas}></canvas>
</div>

<svg style="display: none;">
	<filter
		color-interpolation-filters="sRGB"
		id="logo-glass"
		x="0"
		y="0"
		width="100%"
		height="100%"
		primitiveUnits="objectBoundingBox"
	>
		<feImage
			x="0"
			y="0"
			width="100%"
			height="100%"
			result="map"
			href="/logo-displacement-map.png"
		/>
		<feDisplacementMap
			transform-origin="center"
			in="SourceGraphic"
			in2="map"
			scale="1"
			xChannelSelector="R"
			yChannelSelector="G"
		></feDisplacementMap>
	</filter>
</svg>

<div class="page">
	<div class="container" bind:offsetHeight={contentHeight}>
		<header class="header">
			<a class="logo-container" href="/" title="Home">
				<img class="logo" src="/logo.svg" alt="nighteden" />
			</a>
		</header>
		<main bind:this={container} bind:offsetWidth={containerWidth}>
			{@render children()}
		</main>
	</div>
</div>

<style lang="scss">
	.background {
		position: fixed;
		inset: 0;
		background-image: linear-gradient(to bottom, #e2d7e9 25%, #ffd7db, #e2d7e9 75%);
		z-index: -1;
	}
	#ground {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 33.33333%;
		background-image: url(/ground.png);
		background-size: 100% 100%;
	}
	#trees {
		position: absolute;
		left: 0;
		bottom: 30%;
		right: 0;
		height: 20%;
		background-size: contain;
		background-position: center bottom;
		background-image: url(/trees.png);
		background-repeat: repeat-x;
	}
	#tree {
		position: absolute;
		bottom: 3%;
		left: 50%;
		transform: translateX(-50%);
		margin-left: -25%;
		height: 68vh;
		aspect-ratio: 0.46;
		background-image: url(/tree.png);
		background-size: contain;
		background-position: center bottom;
		background-repeat: no-repeat;
	}
	#foxes {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin-left: 20%;
		bottom: 20%;
		height: 8vh;
		aspect-ratio: 1.69;
		background-image: url(/foxes.png);
		background-size: contain;
		background-repeat: no-repeat;
	}
	#kim {
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(-1deg);
		background-size: contain;
		background-repeat: no-repeat;
		background-image: url(/kim.png);
		height: 53.24vh;
		aspect-ratio: 0.34;
		bottom: 5%;
		margin-left: -2%;
	}
	#canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.page {
		display: grid;
		grid-template-rows: 1fr auto 3fr;
		grid-template-areas: '.' 'body' '.';
		min-height: 100vh;
	}
	.container {
		width: 100%;
		margin: auto;
		padding: 24px;
		grid-area: body;
	}
	.logo-container {
		position: relative;
		display: inline-block;
		border-radius: 100%;
		backdrop-filter: url(#logo-glass) blur(1px);
		background-color: #3b076422;
		overflow: clip;
	}
	.logo {
		display: inline-block;
		vertical-align: bottom;
	}
	header {
		text-align: center;
		margin-bottom: 24px;
	}
	main {
		position: relative;
		padding: 32px;
		border-radius: 12px;
		width: 100%;
		max-width: 640px;
		margin-left: auto;
		margin-right: auto;
		min-height: max-content;
		background-color: transparent;

		&::after {
			position: absolute;
			inset: 0;
			content: '';
			display: block;
			border-radius: inherit;
			background: #fffd;
			z-index: -1;
			backdrop-filter: blur(20px) saturate(2);
		}

		&::before {
			position: absolute;
			inset: 0;
			content: '';
			display: block;
			border-radius: inherit;
			// box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
			box-shadow:
				0 0 0 1px rgb(0 0 0 / 0.5),
				0 20px 25px -5px rgb(0 0 0 / 0.5),
				0 8px 10px -6px rgb(0 0 0 / 0.5),
				0 10px 15px -3px rgb(0 0 0 / 0.5),
				0 4px 6px -4px rgb(0 0 0 / 0.5);
			z-index: -1;
			mix-blend-mode: overlay;
		}
	}

	@media (min-width: 768px) {
		main {
			padding: 48px;
		}
	}
</style>
