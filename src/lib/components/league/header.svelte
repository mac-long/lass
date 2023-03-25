<script>
	import { Plus, TSC } from '$lib/components/icons/icons';
	import { configVisibile } from '$lib/store';
</script>

<div class="flex flex-col items-center mb-16 space-y-8 text-center">
	<TSC />
	<h1 class="text-4xl font-bold">3 Sided Cube FC League</h1>
</div>

<button class="absolute top-0 right-40 p-4 link text-black dark:text-white hover:text-primary" on:click={() => configVisibile.set(true)} aria-label="New Fixture">
	<Plus />
</button>
