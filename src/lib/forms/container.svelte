<script>
	export let title, open, lg;
</script>

{#if $open}
	<div
		class="grid absolute top-1/2 left-1/2 place-items-center p-4 w-96 text-black bg-gray-100 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
		class:w-[65vw]={lg}
	>
		<h1 class="text-2xl font-bold">{title}</h1>
		<slot />
	</div>
{/if}
