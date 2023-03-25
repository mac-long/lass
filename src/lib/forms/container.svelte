<script>
	export let title, open;
</script>

{#if open}
	<div
		class="w-96 bg-gray-100 rounded-lg shadow-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black"
	>
		<h1 class="text-2xl font-bold">{title}</h1>
		<slot />
	</div>
{/if}
