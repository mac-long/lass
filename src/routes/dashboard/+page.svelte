<script>
	import Container from '$lib/forms/container.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import { writable } from 'svelte/store';
	import Input from '../../lib/forms/input.svelte';
	import Card from './card.svelte';

	export let data;

	const open = writable(false);
</script>

<div class="relative mb-8">
	<button class="absolute flex items-center space-x-1 top-0 right-48">
		<Plus /> <span>New</span>
	</button>
	<h1>Welcome</h1>
	<p class="max-w-lg mx-auto">
		This is your dashboard, click the new button to create a new league or select one of your
		previouly created leagues below.
	</p>
</div>

<div class="flex items-center flex-wrap justify-center mx-auto max-w-7xl">
	{#each data.leagues as { id, name, color }}
		<Card key={id} {id} {name} {color} />
	{/each}
</div>

<Container title="New League" {open}>
	<form action="">
		<Input name="name" label="League Name" type="text" placeholder="Enter league name" value="" />
		<Input
			name="decription"
			label="League Description"
			type="text"
			placeholder="Enter league description"
			value=""
		/>
		<Input name="color" label="League Color" type="color" />
		<div class="flex items-center justify-center space-x-2">
			<button class="secondary" on:click={() => (this.form.reset(), open.set(false))}>
				Cancel
			</button>
			<input type="submit" value="Create" />
		</div>
	</form>
</Container>
