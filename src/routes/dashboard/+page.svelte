<script>
	import Plus from '$lib/icons/plus.svelte';
	import Card from './card.svelte';
</script>

<div class="relative mb-8">
	<button class="absolute flex items-center space-x-1 top-0 right-48">
		<Plus /> <span>New</span>
	</button>
	<h1>Welcome</h1>
	<p class="max-w-lg mx-auto">
		This is your dashboard, click the new button to create a new league or select one of your
		previouly created leagues below.
	</p>
</div>

<div class="flex items-center flex-wrap justify-center mx-auto max-w-7xl">
  <Card />
</div>