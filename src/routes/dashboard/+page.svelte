<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import Header from '$lib/general/header.svelte';
	import List from '$lib/leagues/list.svelte';
	import { writable } from 'svelte/store';

	export let data;

	const { leagues, watched } = data;

	const open = writable(false);
	const view = writable('created');
</script>

<svelte:head>
	<title>Dashboard | Lass</title>
</svelte:head>

<Header
	actions={[{ label: 'New', onClick: () => open.set(true) }]}
	title="Leagues"
	description="This is your dashboard, click the new button to create a new league or select one of your
		previouly created leagues below."
	secondaryActions={[
		{ label: 'Created', onClick: () => view.set('created') },
		{ label: 'Watched', onClick: () => view.set('watched') }
	]}
	view={$view}
/>

<div class="flex flex-wrap justify-center items-center py-16 mx-auto max-w-7xl">
	{#if $view === 'created'}
		<List {leagues} />
	{:else}
		<List leagues={watched} />
	{/if}
</div>

<Container title="New League" {open}>
	<form method="POST" action="?/new">
		<Input name="name" label="League Name" type="text" placeholder="Enter league name" value="" />
		<Input
			name="description"
			label="League Description"
			type="textarea"
			maxLength={255}
			placeholder="Enter league description"
			value=""
		/>
		<Input name="color" label="League Color" type="color" />
		<div class="flex justify-center items-center space-x-2">
			<button class="secondary" on:click={() => open.set(false)}>Cancel</button>
			<input type="submit" value="Create" />
		</div>
	</form>
</Container>
