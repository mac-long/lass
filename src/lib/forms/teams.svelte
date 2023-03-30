<script>
	import { Bin, Edit, Plus } from '$lib/icons/components';
	import Input from './input.svelte';
	export let teams;
</script>

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
			<Input name="name" label="Team Name" type="text" placeholder="Enter team name" labelHidden />
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
