<script>
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { onMount } from 'svelte';

	export let data;

	let isDarkMode = false;
	onMount(() => {
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
</script>

<svelte:window
	on:load={() => (isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches)}
/>

<div class="px-8 mx-auto max-w-xl text-black dark:text-white">
	<h1>Login</h1>
	<Auth
		supabaseClient={data.supabase}
		view="magic_link"
		redirectTo={`${data.url}/logging-in?redirect=/`}
		showLinks={false}
		appearance={{ theme: ThemeSupa, style: { input: isDarkMode ? 'color: #fff' : 'color: #000' } }}
	/>
</div>
