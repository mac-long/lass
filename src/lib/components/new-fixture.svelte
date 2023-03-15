<script>
	import { teamsTable } from '$lib/store';
</script>

<form class="flex flex-col mx-auto space-y-4" method="POST">
	<div
		class="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0 justify-center"
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
		class="hover:bg-primary hover:border-primary cursor-pointer duration-300"
		type="submit"
		value="Submit"
	/>
</form>
