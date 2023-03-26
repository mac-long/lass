<script>
	import { invalidate } from '$app/navigation';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/700.css';
	import { onMount } from 'svelte';
	import '../app.postcss';

	export let data;
	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<header class="flex justify-between items-center p-16 w-screen">
	<h1 class="text-3xl">
		<a href="/">Lass</a>
	</h1>
	<nav class="space-x-4">
		{#if data.session}
			<a href="/account">Account</a>
			<a class="button" href="/dashboard">Dashboard</a>
		{:else}
			<a class="button" href="/get-started">Get Started</a>
		{/if}
	</nav>
</header>
<main>
	<slot />
</main>
<footer class="py-8 font-bold text-center">
	<span>© {new Date().getFullYear()} <a href="/">Lass</a></span>
</footer>
