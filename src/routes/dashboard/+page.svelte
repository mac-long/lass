<script>
	import Container from '$lib/forms/container.svelte';
	import Header from '$lib/general/header.svelte';
	import { writable } from 'svelte/store';
	import Input from '../../lib/forms/input.svelte';
	import Card from './card.svelte';

	export let data;

	const open = writable(false);
</script>

<Header
	actions={[{ label: 'New', onClick: () => open.set(true) }]}
	title="Leagues"
	description="This is your dashboard, click the new button to create a new league or select one of your
		previouly created leagues below."
/>

<div class="flex flex-wrap justify-center items-center mx-auto max-w-7xl py-16">
	{#each data.leagues as { id, name, color }}
		<Card {id} {name} {color} />
	{/each}
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
