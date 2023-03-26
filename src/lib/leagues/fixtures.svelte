<script>
  import { visibleSeason } from '$lib/store';
	export let fixtures, teams;

	const getTeamName = (id) => {
		return teams.find((team) => team.id === id).name;
	};
</script>

<div class="flex flex-wrap justify-center items-center mx-auto max-w-7xl py-16">
	{#each fixtures.filter((fixture) => fixture.season === $visibleSeason) as fixture}
		<div class="bg-white shadow-md rounded-lg p-4 text-black flex items-center mr-4 mb-4">
			<span class="flex flex-col items-center space-y-4">
				{getTeamName(fixture.home)}<span class="font-bold text-2xl">{fixture.homeScore}</span>
				<span class="font-bold text-4xl mx-2">vs</span>
				<span class="flex flex-col-reverse items-center">
					{getTeamName(fixture.away)}<span class="font-bold text-2xl">{fixture.awayScore}</span>
				</span>
			</span>
		</div>
	{/each}
</div>
