<script>
	import Config from '$lib/components/config.svelte';
	import Header from '$lib/components/header.svelte';
	import Table from '$lib/components/table.svelte';
	import { configVisibile, teamsTable } from '$lib/store';

	export let data;

	teamsTable.set(data.teams.sort((a, b) => b.pts - a.pts));
</script>

<main>
	<div class={`${$configVisibile ? 'opacity-50 pointer-events-none' : ''}`}>
		<Header />
		<Table />
	</div>

	<Config />
</main>
