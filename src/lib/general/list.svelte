<script>
	export let leagues;
</script>

<div class="flex flex-wrap justify-center items-center pb-16 mx-auto max-w-7xl">
	{#if leagues.length !== 0}
		{#each leagues as { id, name, color }}
			<a class="card" href={`/dashboard/${id}`} style={`background-color: ${color}`}>
				<h2>{name}</h2>
			</a>
		{/each}
	{/if}
</div>
