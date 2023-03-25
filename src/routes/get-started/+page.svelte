<script>
		import { ThemeSupa } from '@supabase/auth-ui-shared';
		import { Auth } from '@supabase/auth-ui-svelte';

		export let data;
</script>

<h1>Login</h1>
<Auth
	supabaseClient={data.supabase}
	view="magic_link"
	redirectTo={`${data.url}/logging-in?redirect=/`}
	showLinks={false}
	appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
/>
