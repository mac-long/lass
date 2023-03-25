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

<header class="w-screen flex items-center justify-between p-16">
	<h1 class="text-3xl">
		<a href="/">League Tables</a>
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
<footer class="font-bold text-center py-8">
	<span>© {new Date().getFullYear()} <a href="/">League Tables</a></span>
</footer>
