<script>
	import Header from '$lib/general/header.svelte';
		export let data;
</script>

<Header
	title="Welcome to Lass"
	description="Lass (Leagues as a Service) is a platform for creating and managing league tables."
/>

<div class="flex justify-center items-center space-x-2">
	<a class="button secondary" href="https://github.com/mac-long/league-tables" target="_blank"
		>Contribute</a
	>
	{#if data.session}
		<a class="button" href="/dashboard">Dashboard</a>
	{:else}
		<a class="button" href="/get-started">Get Started</a>
	{/if}
</div>
