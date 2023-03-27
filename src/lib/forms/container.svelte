<script>
	export let title,
		open,
		lg = false;
</script>

{#if $open}
	<div
		class="flex items-center min-h-[65vh] sm:min-h-none absolute top-1/2 left-1/2 flex-col p-4 sm:w-96 text-black bg-gray-100 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 w-[90vw]"
		class:sm:w-[65vw]={lg}
	>
		<h1 class="text-2xl font-bold">{title}</h1>
		<slot />
	</div>
{/if}
