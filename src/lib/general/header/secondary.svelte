<script>
	export let view, actions;
</script>

<div class="flex justify-center items-center pt-8 mx-auto space-x-2">
	{#each actions as action}
		<button
			class="link"
			class:underline={view === action.label.toLowerCase()}
			on:click={action.onClick}>{action.label}</button
		>
	{/each}
</div>
