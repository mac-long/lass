<script>
	import { NewLeague } from '$lib/forms/components';
	import { Container, Header, List, Modal } from '$lib/general/components';
	import { dashboardView, newLeagueOpen } from '$lib/store';

	export let data;
	const { leagues, merged } = data;
</script>

<svelte:head>
	<title>Dashboard | Lass</title>
</svelte:head>

<Header
	actions={[{ label: 'New', onClick: () => newLeagueOpen.set(true) }]}
	title="Leagues"
	description="This is your dashboard, click the new button to create a new league or select one of your
		previouly created leagues below."
	secondaryActions={[
		{ label: 'Created', onClick: () => dashboardView.set('created') },
		{ label: 'Watched', onClick: () => dashboardView.set('watched') }
	]}
	view={$dashboardView}
/>

<Container>
	{#if $dashboardView === 'created'}
		<List {leagues} />
	{:else}
		<List leagues={merged} />
	{/if}
</Container>

<Modal title="New League" open={newLeagueOpen}>
	<NewLeague />
</Modal>
