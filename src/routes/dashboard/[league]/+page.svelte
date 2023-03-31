<script>
	import { AddFixture, EditLeague, Teams } from '$lib/forms/components';
	import { Header, Modal } from '$lib/general/components';
	import { Table } from '$lib/league/components';
	import {
		currentSeason,
		editLeagueOpen,
		editLeagueView,
		fixtureOpen,
		leagueView,
		sortFilter,
		teamsOpen,
		teamsTable,
		visibleSeason
	} from '$lib/store';
	import Fixtures from '../../../lib/league/fixtures.svelte';

	export let data;
	const { league, teams, fixtures, seasons, session } = data;
	$visibleSeason = league.currentSeason;
	$currentSeason = league.currentSeason;
	$teamsTable = teams.sort((a, b) => {
		return $sortFilter.order === 'asc'
			? a[$sortFilter.name.toLowerCase()] - b[$sortFilter.name.toLowerCase()]
			: b[$sortFilter.name.toLowerCase()] - a[$sortFilter.name.toLowerCase()];
	});
</script>

<!-- Head/Header -->
<svelte:head>
	<title>{league.name} | Lass</title>
</svelte:head>
<Header
	actions={[
		{
			label: 'Share',
			onClick: () =>
				navigator.clipboard.writeText(`https://lass.vercel.app/dashboard/${league.id}`),
			type: 'share'
		},
		{ label: 'Settings', onClick: () => editLeagueOpen.set(true), type: 'settings' },
		{ label: 'Teams', onClick: () => teamsOpen.set(true), type: 'secondary' },
		{ label: 'Add Fixture', onClick: () => fixtureOpen.set(true), type: 'primary' },
		{
			label: league?.watchers?.includes(session?.user.id) ? 'Unwatch' : 'Watch',
			type: 'watcher'
		}
	]}
	title={league.name}
	description={league.description}
	secondaryActions={[
		{
			label: 'Table',
			onClick: () => leagueView.set('table'),
			type: 'secondary'
		},
		{
			label: 'Fixtures',
			onClick: () => leagueView.set('fixtures'),
			type: 'secondary'
		}
	]}
	view={$leagueView}
	{seasons}
	{teams}
	{session}
	{league}
	dashboard
/>

<!-- Main View -->
{#if $leagueView === 'table'}
	<Table />
{:else}
	<Fixtures admins={league.admins} user={session.user.id} {teams} {fixtures} />
{/if}

<!-- Modals -->
<Modal title="Edit League" open={editLeagueOpen}>
	<EditLeague view={editLeagueView} {league} />
</Modal>
<Modal title="Teams" open={teamsOpen} lg><Teams /></Modal>
<Modal title="Add Fixture" open={fixtureOpen}><AddFixture /></Modal>
