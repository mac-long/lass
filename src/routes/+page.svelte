<script>
	import Header from '$lib/general/header.svelte';
	export let data;
</script>

<div class="h-96">
	<Header
		title="Welcome to Lass"
		description="Lass (Leagues as a Service) is a platform for creating and managing league tables."
	/>

	<div class="flex justify-center items-center space-x-2">
		<a
			class="button secondary"
			href="https://github.com/mac-long/league-tables"
			target="_blank"
			rel="noopener noreferrer"
		>
			Contribute
		</a>
		{#if data.session}
			<a class="button" href="/dashboard">Dashboard</a>
		{:else}
			<a class="button" href="/get-started">Get Started</a>
		{/if}
	</div>
</div>
<div class="parallax">
	<h2>Compete With Your Friends</h2>

	<p>
		Compete with your friends in a league table to see who is the best. Create a league table for
		any sport or activity.
	</p>
	<img src="/screen.png" alt="League Table" />
</div>
