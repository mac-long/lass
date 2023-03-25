<script>
	import Config from '$lib/components/league/config.svelte';
	import Header from '$lib/components/league/header.svelte';
	import Table from '$lib/components/league/table.svelte';
	import { configVisibile, teamsTable } from '$lib/store';

	export let data;

	teamsTable.set(data.teams.sort((a, b) => b.pts - a.pts));
</script>

<main class="relative">
	<div class={`${$configVisibile ? 'opacity-50 pointer-events-none' : ''}`}>
		<Header />
		<Table />
	</div>

	<Config />
</main>
