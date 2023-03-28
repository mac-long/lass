<script>
	export let title,
		open,
		lg = false;
</script>

{#if $open}
	<div
		class="flex absolute top-1/2 left-1/2 flex-col items-center p-4 text-black bg-gray-100 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 sm:w-96 min-h-[65vh] w-[90vw] sm:min-h-none"
		class:sm:w-[65vw]={lg}
	>
		<h1 class="text-2xl font-bold">{title}</h1>
		<slot />
	</div>
{/if}
