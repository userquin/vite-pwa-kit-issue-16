<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	// types

	// variables
	let reloadPrompt: ConstructorOfATypedSvelteComponent | null = null;

	onMount(async () => {
		pwaInfo && (reloadPrompt = (await import('$lib/Components/UpdateSWPrompt.svelte')).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

{#if reloadPrompt}
	<svelte:component this={reloadPrompt} />
{/if}

<slot />
