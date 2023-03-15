<script>
	import { configVisibile } from '$lib/store';
	import NewFixture from './new-fixture.svelte';
</script>

{#if $configVisibile}
	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-lg shadow-xl px-8 py-12 w-[80vw]"
	>
		<h2 class="text-2xl font-bold mb-16">New Fixture</h2>
		<button
			class="absolute top-0 right-0 p-2 text-4xl font-bold hover:text-primary duration-300"
			on:click={() => configVisibile.set(false)}
		>
			×
		</button>
		<NewFixture />
	</div>
{/if}
