<script>
	export let session;

	console.log(session);
</script>

{#if session}
	<h1>Logged In</h1>
{:else}
	<h1>Not Logged In</h1>
{/if}
