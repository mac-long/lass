<script>
	import Card from '$lib/leagues/card.svelte';
	export let leagues;
</script>

<div class="flex flex-wrap justify-center items-center pb-16 mx-auto max-w-7xl">
	{#if leagues.length !== 0}
		{#each leagues as { id, name, color }}
			<Card {id} {name} {color} />
		{/each}
	{/if}
</div>
