<script>
	import { AddFixture, EditLeague, Teams } from '$lib/forms/components';
	import { getValue } from '$lib/functions';
	import { Header, Modal } from '$lib/general/components';
	import { Bin } from '$lib/icons/components';
	import {
		currentSeason,
		dashboardView,
		editOpen,
		editView,
		fixtureOpen,
		headings,
		sortFilter,
		teamsOpen,
		teamsTable,
		visibleSeason
	} from '$lib/store';

	export let data;
	const { league, teams, fixtures, seasons, session } = data;

	teamsTable.set(
		teams.sort((a, b) => {
			return $sortFilter.order === 'asc'
				? a[$sortFilter.name.toLowerCase()] - b[$sortFilter.name.toLowerCase()]
				: b[$sortFilter.name.toLowerCase()] - a[$sortFilter.name.toLowerCase()];
		})
	);

	const handleHeadingClick = (heading) => {
		sortFilter.set({
			name: heading.toLowerCase(),
			order:
				heading.toLowerCase() === $sortFilter.name
					? $sortFilter.order === 'asc'
						? 'desc'
						: 'asc'
					: 'desc'
		});
		teamsTable.set(
			$teamsTable.sort((a, b) => {
				return $sortFilter.order === 'asc'
					? a[$sortFilter.name.toLowerCase()] - b[$sortFilter.name.toLowerCase()]
					: b[$sortFilter.name.toLowerCase()] - a[$sortFilter.name.toLowerCase()];
			})
		);
	};

	visibleSeason.set(league.currentSeason);
	currentSeason.set(league.currentSeason);
</script>

<!-- Header -->
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
		{ label: 'Settings', onClick: () => editOpen.set(true), type: 'settings' },
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
			onClick: () => dashboardView.set('table'),
			type: 'secondary'
		},
		{
			label: 'Fixtures',
			onClick: () => dashboardView.set('fixtures'),
			type: 'secondary'
		}
	]}
	dashboard
	view={$dashboardView}
	{seasons}
	{teams}
	{session}
	{league}
/>

<!-- Main View -->
{#if $dashboardView === 'table'}
	<div class="overflow-x-scroll space-y-4">
		<table>
			<thead>
				<tr class="rounded-t-md">
					{#each $headings as heading}
						{#if heading === 'Pos' || heading === 'Club'}
							<th class="cursor-default">{heading}</th>
						{:else}
							<th class="px-4" on:click={() => handleHeadingClick(heading)}>
								<span class="flex items-center">
									{heading}
									{#if heading.toLowerCase() === $sortFilter.name}
										{#if $sortFilter.order === 'desc'}
											<span class="transform rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="feather feather-chevron-up"
													><polyline points="18 15 12 9 6 15" /></svg
												>
											</span>
										{:else}
											<span class="">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="feather feather-chevron-up"
													><polyline points="18 15 12 9 6 15" /></svg
												>
											</span>
										{/if}
									{/if}
								</span>
							</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $teamsTable as team, i}
					<tr>
						<td>{i + 1}</td>
						<td class="flex items-center space-x-8">
							{#if team.img}<img
									class="w-5 max-h-6"
									src={team.image}
									alt={`${team.name} logo`}
								/>{/if}
							<span>
								{team.name}
								<span class="text-xs">
									({team.player})
								</span>
							</span>
						</td>
						<td>{team.played}</td>
						<td>{team.won}</td>
						<td>{team.drawn}</td>
						<td>{team.lost}</td>
						<td>{team.gf}</td>
						<td>{team.ga}</td>
						<td>{team.gd}</td>
						<td>{team.pts}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="flex flex-wrap justify-center items-center pb-16 mx-auto max-w-7xl">
		{#if fixtures.length === 0}
			<div class="flex flex-col justify-center items-center space-y-4">
				<h2 class="text-xl font-bold">No fixtures yet</h2>
				<p class="text-center">Add some fixtures to get started</p>
			</div>
		{/if}
		{#each fixtures
			.sort((a, b) => b.id - a.id)
			.filter((fixture) => fixture.season === $visibleSeason) as fixture}
			<form
				class="flex relative flex-col justify-center items-center mr-4 mb-4 font-bold text-black bg-white rounded-lg shadow-md w-[200px] h-[270px] group"
				action="?/deleteFixture"
				method="POST"
			>
				<input type="hidden" name="id" value={fixture.id} />
				<span class="flex flex-col items-center space-y-4">
					<input type="number" class="hidden" name="home" value={fixture.home} />
					<input type="number" class="hidden" name="homeScore" value={fixture.homeScore} />
					{getValue(fixture.home, teams, 'name')}<span class="text-2xl">{fixture.homeScore}</span>
					<span class="mx-2 text-4xl">vs</span>
					<span class="flex flex-col-reverse items-center">
						<input type="number" class="hidden" name="away" value={fixture.away} />
						<input type="number" class="hidden" name="awayScore" value={fixture.awayScore} />
						{getValue(fixture.away, teams, 'name')}<span class="text-2xl">{fixture.awayScore}</span>
					</span>
				</span>
				<button
					class="hidden absolute top-0 right-0 m-2 w-2 h-2 rounded-full cursor-pointer hover:text-red-500 no-style"
					class:group-hover:block={league.admins.includes(session.user.id)}
					type="submit"
				>
					<Bin />
				</button>
			</form>
		{/each}
	</div>
{/if}

<Modal title="Edit League" open={editOpen}>
	<EditLeague view={editView} {league} />
</Modal>
<Modal title="Teams" open={teamsOpen} lg><Teams /></Modal>
<Modal title="Add Fixture" open={fixtureOpen}><AddFixture /></Modal>
