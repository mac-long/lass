<script>
  import { visibleSeason } from '$lib/store';
	export let fixtures, teams;

	const getTeamName = (id) => {
		return teams.find((team) => team.id === id).name;
	};
</script>

<div class="flex flex-wrap justify-center items-center py-16 mx-auto max-w-7xl">
	{#each fixtures.filter((fixture) => fixture.season === $visibleSeason) as fixture}
		<div class="flex items-center p-4 mr-4 mb-4 text-black bg-white rounded-lg shadow-md">
			<span class="flex flex-col items-center space-y-4">
				{getTeamName(fixture.home)}<span class="text-2xl font-bold">{fixture.homeScore}</span>
				<span class="mx-2 text-4xl font-bold">vs</span>
				<span class="flex flex-col-reverse items-center">
					{getTeamName(fixture.away)}<span class="text-2xl font-bold">{fixture.awayScore}</span>
				</span>
			</span>
		</div>
	{/each}
</div>
