<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import Header from '$lib/general/header.svelte';
	import { Edit } from '$lib/icons/icons';
	import Fixtures from '$lib/leagues/fixtures.svelte';
	import Table from '$lib/leagues/table.svelte';
	import { currentSeason, dashboardView, teamsTable, visibleSeason } from '$lib/store';
	import { writable } from 'svelte/store';

	export let data;
	const { league, teams, fixtures, seasons } = data;
	const editOpen = writable(false),
		teamsOpen = writable(false),
		fixtureOpen = writable(false);

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

<svelte:head>
	<title>{league.name} | Lass</title>
</svelte:head>

<Header
	actions={[
		{ label: 'Settings', onClick: () => editOpen.set(true), type: 'settings' },
		{ label: 'Teams', onClick: () => teamsOpen.set(true), type: 'secondary' },
		{ label: 'Add Fixture', onClick: () => fixtureOpen.set(true), type: 'primary' }
	]}
	title={league.name}
	description={league.description}
	dashboard
	{seasons}
	{teams}
/>

{#if $dashboardView === 'table'}
	<Table  />
{:else}
	<Fixtures {fixtures} {teams} />
{/if}

<Container title="Edit League" open={editOpen}>
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
		<div class="form-group">
			<button class="secondary" on:click={() => editOpen.set(false)}>Cancel</button>
			<input class="secondary" type="submit" formaction="?/newSeason" value="New Season" />
			<input class="delete" type="submit" formaction="?/delete" value="Delete" />
			<input type="submit" value="Update" />
		</div>
	</form>
</Container>

<Container title="Teams" open={teamsOpen} lg>
	<div class="teams">
		{#each teams as team}
			<form method="POST" action="?/editTeam">
				<div class="flex items-center space-x-2">
					<input type="hidden" name="id" value={team.id} />
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
						<button class="circle delete" formaction="?/deleteTeam">×</button>
					</div>
				</div>
			</form>
		{/each}
		<form method="POST" action="?/teams">
			<div class="flex items-center p-0 m-0 space-x-2">
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
					<button
						class="flex justify-center items-center m-0 w-8 h-8 text-black rounded-full secondary"
						formaction="?/addTeam"
					>
						+
					</button>
				</div>
			</div>
		</form>
		<button class="mx-auto secondary" on:click={() => teamsOpen.set(false)}>Close</button>
	</div>
</Container>

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
