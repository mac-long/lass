<script>
	import '../app.postcss';
	import '@fontsource/poppins/700.css';
	import { configVisibile, teamsTable } from '$lib/store';
	import Header from '../lib/components/Header.svelte';
	import Table from '../lib/components/table.svelte';
	import Config from '../lib/components/config.svelte';

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
