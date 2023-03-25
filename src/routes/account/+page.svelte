<!-- src/routes/account/+page.svelte -->
<script>
	import { enhance } from '$app/forms';

	export let data;
	let { session } = data,
		loading = false;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<h1>Account</h1>
<form>
	<div class="form-group">
		<label for="email">Logged in As</label>
		<input class="text-center" type="text" value={session.user.email} disabled />
	</div>
</form>

<form method="post" action="?/signout" use:enhance={handleSubmit}>
	<div class="form-group">
		<button class="hover:text-white button" type="submit" disabled={loading}>Sign Out</button>
	</div>
	<div class="form-group">
		<button class="delete" formaction="?/delete">Delete Account</button>
	</div>
</form>
