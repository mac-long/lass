<script>
	import { configVisibile } from '$lib/store';
</script>

<div class="flex flex-col text-center items-center space-y-8 mb-16">
	<img src="/logo.svg" alt="3 Sided Cube FC Logo" class="w-32 h-32" />
	<h1 class="text-4xl font-bold">3 Sided Cube FC League</h1>
</div>

<button class="absolute top-0 right-0 p-4" on:click={() => configVisibile.set(true)}>
	<img src="/plus-circle.svg" alt="Back" class="w-5" />
</button>
