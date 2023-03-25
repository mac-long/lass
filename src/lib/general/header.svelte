<script>
	export let actions = [],
		title,
		description;
</script>

<div class="relative mb-8">
	<div class="flex absolute top-0 right-48 items-center space-x-1">
		{#each actions as action}
			<button
				class={`flex items-center space-x-1 ${action.primary ? 'primary' : 'secondary'}`}
				on:click={action.onClick}
			>
				<span>{action.label}</span>
			</button>
		{/each}
	</div>
	<h1>{title}</h1>
	<p class="mx-auto max-w-lg">
		{description}
	</p>
</div>
