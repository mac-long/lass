<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		if (browser && data.session) {
			goto(redirectTo ?? '/dashboard');
		}
	}
</script>

<h1>Add Loading Animation Here</h1>