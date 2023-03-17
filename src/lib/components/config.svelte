<script>
	import { configVisibile } from '$lib/store';
	import NewFixture from './new-fixture.svelte';
</script>

{#if $configVisibile}
	<div
		class="absolute top-1/2 left-1/2 py-12 px-8 w-[90vw] h-80vh] sm:w-1/2 sm:h-1/2 bg-white rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 w-[80vw]  text-black dark:text-black"
	>
		<h2 class="mb-16 text-2xl font-bold">New Fixture</h2>
		<button
			class="absolute top-0 right-0 p-2 text-4xl font-bold duration-300"
			on:click={() => configVisibile.set(false)}
		>
			×
		</button>
		<NewFixture />
	</div>
{/if}
