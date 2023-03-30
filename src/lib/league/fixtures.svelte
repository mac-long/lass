<script>
	import { getValue } from '$lib/functions';
	import { Bin } from '$lib/icons/components';
	import { visibleSeason } from '$lib/store';

	export let fixtures, teams, admins, user;
</script>

<div class="flex flex-wrap justify-center items-center pb-16 mx-auto max-w-7xl">
	{#if fixtures.length === 0}
		<div class="flex flex-col justify-center items-center space-y-4">
			<h2 class="text-xl font-bold">No fixtures yet</h2>
			<p class="text-center">Add some fixtures to get started</p>
		</div>
	{/if}
	{#each fixtures
		.sort((a, b) => b.id - a.id)
		.filter((fixture) => fixture.season === $visibleSeason) as fixture}
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
				class:group-hover:block={admins.includes(user)}
				type="submit"
			>
				<Bin />
			</button>
		</form>
	{/each}
</div>
