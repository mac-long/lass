<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import { getValue } from '$lib/functions';
	import Header from '$lib/general/header.svelte';
	import { Bin, Edit, Plus } from '$lib/icons/icons';
	import Table from '$lib/leagues/table.svelte';
	import { currentSeason, teamsTable, visibleSeason } from '$lib/store';
	import { writable } from 'svelte/store';

	export let data;
	const { league, teams, fixtures, seasons, session, users } = data;
	const editOpen = writable(false),
		teamsOpen = writable(false),
		fixtureOpen = writable(false),
		view = writable('table'),
		editView = writable('info');

	teamsTable.set(
		teams.sort((a, b) => {
			if (a.points === b.points) {
				return b.gd - a.gd;
			}
			return b.points - a.points;
		})
	);

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
			onClick: () => view.set('table'),
			type: 'secondary'
		},
		{
			label: 'Fixtures',
			onClick: () => view.set('fixtures'),
			type: 'secondary'
		}
	]}
	dashboard
	view={$view}
	{seasons}
	{teams}
	{session}
	{league}
/>

<!-- Main View -->
{#if $view === 'table'}
	<Table />
{:else}
	<div class="flex flex-wrap justify-center items-center pb-16 mx-auto max-w-7xl">
		{#if fixtures.length === 0}
			<div class="flex flex-col justify-center items-center space-y-4">
				<h2 class="text-xl font-bold">No fixtures yet</h2>
				<p class="text-center">Add some fixtures to get started</p>
			</div>
		{/if}
		{#each fixtures.filter((fixture) => fixture.season === $visibleSeason) as fixture}
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
					class:group-hover:block={session?.user.id === league?.user}
					type="submit"
				>
					<Bin />
				</button>
			</form>
		{/each}
	</div>
{/if}

<!-- Modals -->
<!-- Edit League -->
<Container title="Edit League" open={editOpen}>
	<div class="flex items-center space-x-2 mb-4">
		<span
			class="font-bold cursor-pointer"
			class:underline={$editView === 'info'}
			on:click={() => editView.set('info')}
			on:keydown={() => editView.set('info')}
		>
			Info
		</span>
		<span
			class="font-bold cursor-pointer"
			class:underline={$editView === 'admins'}
			on:click={() => editView.set('admins')}
			on:keydown={() => editView.set('admins')}
		>
			Admins
		</span>
	</div>
	{#if $editView === 'info'}
		<form class="flex flex-col space-y-4" action="?/edit" method="POST">
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
			<div class="flex-1" />
			<div class="form-group">
				<input class="secondary" type="submit" formaction="?/newSeason" value="New Season" />
				<input class="delete" type="submit" formaction="?/delete" value="Delete" />
				<input type="submit" value="Update" />
			</div>
		</form>
	{:else}
		<ul class="space-y-4">
			{#if league.admins.length === 0}
				<p class="text-center font-bold">No admins</p>
				<p>Add some to allow other users to add/delete teams and add/delete fixtures</p>
			{/if}
			{#each league.admins as admin}
				{#if admin !== league.user}
					<form method="POST" action="?/removeAdmin">
						<input type="hidden" name="id" value={admin} />
						<li class="flex items-center">
							{getValue(admin, users, 'email')}
							<button class="no-style ml-2" type="submit">
								<Bin />
							</button>
						</li>
					</form>
				{/if}
			{/each}
		</ul>
		<form class="flex items-center" action="?/addAdmin" method="POST">
			<Input name="email" type="email" placeholder="Enter admin email" labelHidden />
			<button class="edit ml-2 -mt-2" type="submit">
				<Plus />
			</button>
		</form>
	{/if}
</Container>

<!-- Teams -->
<Container title="Teams" open={teamsOpen} lg>
	<div class="flex flex-col items-center text-center">
		{#each teams as team}
			<form class="mx-auto" method="POST" action="?/editTeam">
				<input type="hidden" name="id" value={team.id} />
				<div class="flex flex-col items-center p-0 m-0 space-x-2 sm:flex-row w-[755px]">
					<Input
						name="name"
						label="Team Name"
						type="text"
						placeholder="Enter team name"
						value={team.name}
						labelHidden
					/>
					<Input
						name="player"
						label="Player Name"
						type="text"
						placeholder="Enter player name"
						value={team.player}
						labelHidden
					/>
					<div class="actions">
						<button class="edit" type="submit">
							<Edit />
						</button>
						<button class="no-style" formaction="?/deleteTeam"><Bin /></button>
					</div>
				</div>
			</form>
		{/each}
		<form class="mx-auto" method="POST" action="?/teams">
			<div class="flex flex-col items-center p-0 m-0 space-x-2 sm:flex-row w-[755px]">
				<Input
					name="name"
					label="Team Name"
					type="text"
					placeholder="Enter team name"
					labelHidden
				/>
				<Input
					name="player"
					label="Player Name"
					type="text"
					placeholder="Enter player name"
					labelHidden
				/>
				<div class="actions">
					<button class="edit" formaction="?/addTeam">
						<Plus />
					</button>
				</div>
			</div>
		</form>
	</div>
</Container>

<!-- Add Fixture -->
<Container title="Add Fixture" open={fixtureOpen}>
	<form class="flex flex-col py-4 mx-auto space-y-4" method="POST" action="?/addFixture">
		<div class="flex flex-col justify-center items-center space-y-4">
			<div class="form-group">
				<h3 class="text-xl">Home</h3>
				<div class="flex items-center space-x-2">
					<select name="home" defaultValue={$teamsTable[0].id}>
						{#each $teamsTable as team}
							<option value={team.id}>{team.name}</option>
						{/each}
					</select>
					<input name="homeScore" type="number" defaultValue={0} />
				</div>
			</div>
			<div class="form-group">
				<h3 class="text-xl">Away</h3>
				<div class="flex items-center space-x-2">
					<select name="away" defaultValue={$teamsTable[0].id}>
						{#each $teamsTable as team}
							<option value={team.id}>{team.name}</option>
						{/each}
					</select>
					<input name="awayScore" type="number" defaultValue={0} />
					<input name="season" type="hidden" value={league.currentSeason} />
				</div>
			</div>
		</div>
		<div class="form-group">
			<button class="secondary" on:click={() => fixtureOpen.set(false)}>Cancel</button>
			<input type="submit" value="Submit" />
		</div>
	</form>
</Container>
