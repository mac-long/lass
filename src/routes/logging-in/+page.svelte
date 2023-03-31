<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data;
	if (browser && data.session) {
		goto(redirectTo ?? '/dashboard');
	}
</script>

<h1>Add Loading Animation Here...</h1>
