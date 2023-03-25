<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import Header from '$lib/general/header.svelte';
	import { Edit } from '$lib/icons/icons';
	import { writable } from 'svelte/store';

	export let data;
	const { league, teams } = data;
	const editOpen = writable(false);
	const teamsOpen = writable(false);
</script>

<Header
	actions={[
		{ label: 'Settings', onClick: () => editOpen.set(true), primary: false },
		{ label: 'Teams', onClick: () => teamsOpen.set(true), primary: true }
	]}
	title={league.name}
	description={league.description}
/>

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
		<div class="flex justify-center items-center space-x-2">
			<button class="secondary" on:click={() => editOpen.set(false)}>Cancel</button>
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
			<div class="flex items-center space-x-2 m-0 p-0">
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
						class="secondary text-black w-8 h-8 rounded-full flex items-center justify-center m-0"
						formaction="?/addTeam"
					>
						+
					</button>
				</div>
			</div>
		</form>
	</div></Container
>
