<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import Header from '$lib/general/header.svelte';
	import { writable } from 'svelte/store';

	export let data;
	const { league } = data;
	const open = writable(false);
</script>

<Header
	actions={[{ label: 'Settings', onClick: () => open.set(true), primary: false }]}
	title={league.name}
	description={league.description}
/>

<Container title="Edit League" {open}>
	<form method="POST" action="?/edit">
		<Input
			name="name"
			label="League Name"
			type="text"
			placeholder="Enter league name"
			value={league.name}
		/>
		<Input
			name="description"
			label="League Description"
			type="textarea"
			maxLength={255}
			placeholder="Enter league description"
			value={league.description}
		/>
		<Input name="color" label="League Color" type="color" value={league.color} />
		<div class="flex justify-center items-center space-x-2">
			<button class="secondary" on:click={() => open.set(false)}>Cancel</button>
			<input class="delete" type="submit" formaction="?/delete" value="Delete" />
			<input type="submit" value="Update" />
		</div>
	</form>
</Container>
