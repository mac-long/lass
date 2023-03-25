<!-- src/routes/account/+page.svelte -->
<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { session, profile } = data;

	let profileForm,
		loading = false,
		fullName = profile?.full_name || '',
		username = profile?.username || '',
		avatarUrl = profile?.avatar_url || '';

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<h1>Account</h1>
<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div class="form-group">
			<label for="email">Email</label>
			<input type="text" value={session.user.email} disabled />
		</div>

		<div class="form-group">
			<label for="fullName">Full Name</label>
			<input name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div class="form-group">
			<label for="username">Username</label>
			<input name="username" type="text" value={form?.username ?? username} />
		</div>

		<div class="form-group">
			<input
				type="submit"
				class="cursor-pointer border-none bg-primary-light border-primary-light hover:text-white hover:bg-primary-dark hover:border-primary-dark"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSubmit}>
		<div class="form-group mt-16">
			<button class="cursor-pointer bg-white border-none text-black hover:bg-primary-light hover:border-primary-light hover:text-white" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
