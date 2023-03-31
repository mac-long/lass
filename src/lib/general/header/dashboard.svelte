<script>
	import { sortTeams } from '$lib/functions';
	import { visibleSeason } from '$lib/store';

	export let seasons, teams;
</script>

<div class="flex flex-col items-center py-4">
	<div class="form-group">
		{#if seasons.length > 1}
			<span class="font-bold">View Season</span>
			<select bind:value={$visibleSeason} on:change={() => sortTeams(teams, seasons)}>
				{#each seasons as season}
					<option value={season.number}>{season.number}</option>
				{/each}
			</select>
		{/if}
	</div>
</div>
