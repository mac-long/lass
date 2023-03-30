<script>
	export let title,
		open,
		lg = false,
		component;
</script>

{#if $open}
	<div
		class="flex absolute top-1/2 left-1/2 flex-col items-center p-4 text-black bg-gray-100 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 sm:w-96 sm:h-auto h-[690px] min-h-[65vh] w-[90vw] sm:min-h-32 sm:min-h-none"
		class:sm:w-[65vw]={lg}
	>
		<button
			class="absolute top-0 right-0 p-2 m-2 text-2xl text-black bg-gray-100 rounded-full shadow-lg no-style"
			on:click={() => open.set(false)}>×</button
		>
		<h1 class="text-2xl font-bold">{title}</h1>
		{#if component}
			<svelte:component this={component} />
		{/if}
		<slot />
	</div>
{/if}
