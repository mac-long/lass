<script>
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Auth } from '@supabase/auth-ui-svelte';


	export let data;
</script>

<div class="px-8 mx-auto max-w-xl">
	<h1>Login</h1>
	<Auth
		supabaseClient={data.supabase}
		view="magic_link"
		redirectTo={`${data.url}/logging-in?redirect=/`}
		showLinks={false}
		appearance={{ theme: ThemeSupa }}
	/>
</div>
