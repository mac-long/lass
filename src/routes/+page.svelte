<script>
	import Container from '$lib/forms/container.svelte';
	import Input from '$lib/forms/input.svelte';
	import Header from '$lib/general/header.svelte';
	import Edit from '$lib/icons/edit.svelte';
	import { writable } from 'svelte/store';
	const teams = [];
	const open = writable(true);
</script>

<Header
	title="Welcome to Lass"
	description="Lass (Leagues as a Service) is a platform for creating and managing league tables."
/>

<Container title="Teams" {open} lg>
	<div class="teams">
		{#each teams as team}
			<form method="POST" action="?/editTeam">
				<div class="flex flex-col sm:flex-row items-center space-x-2">
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
			<div class="flex flex-col sm:flex-row items-center p-0 m-0 space-x-2">
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
		<button class="mx-auto secondary" on:click={() => open.set(false)}>Close</button>
	</div>
</Container>
