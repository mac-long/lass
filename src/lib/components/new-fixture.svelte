<script>
	import { teamsTable } from '$lib/store';
</script>

<form class="flex flex-col mx-auto space-y-4 py-4 text-black dark:text-black" method="POST">
	<div
		class="flex flex-col justify-center items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8"
	>
		<div class="flex flex-col">
			<h3 class="text-xl">Team One</h3>
			<div class="flex items-center space-x-2">
				<select name="teamOne" defaultValue={$teamsTable[0].id}>
					{#each $teamsTable as team}
						<option value={team.id}>{team.name}</option>
					{/each}
				</select>
				<input name="scoreOne" type="number" defaultValue="0" />
			</div>
		</div>
		<div class="flex flex-col">
			<h3 class="text-xl">Team Two</h3>
			<div class="flex items-center space-x-2">
				<select name="teamTwo" defaultValue={$teamsTable[0].id}>
					{#each $teamsTable as team}
						<option value={team.id}>{team.name}</option>
					{/each}
				</select>
				<input name="scoreTwo" type="number" defaultValue="0" />
			</div>
		</div>
	</div>
	<input
		class="duration-300 cursor-pointer hover:bg-primary hover:border-primary mx-auto"
		type="submit"
		value="Submit"
	/>
</form>
