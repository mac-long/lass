<script>
	import { NewLeague } from '$lib/forms/components';
	import { Container, Header, List, Modal } from '$lib/general/components';
	import { writable } from 'svelte/store';
	export let data;
	const { leagues, merged } = data;

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

<Container>
	{#if $view === 'created'}
		<List {leagues} />
	{:else}
		<List leagues={merged} />
	{/if}
</Container>

<Modal title="New League" {open} component={NewLeague} />
