<script>
	import { teamsTable } from '$lib/store';
	export let league;
</script>

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
		<input type="submit" value="Add Fixture" />
	</div>
</form>
