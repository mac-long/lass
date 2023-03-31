<script>
	import { sortTeams } from '$lib/functions';
	import { Chevron } from '$lib/icons/components';
	import { sortFilter, tableHeadings, teamsTable } from '$lib/store';

	export let teams, seasons;

	const handleHeadingClick = (heading) => {
		sortFilter.set({
			name: heading.toLowerCase(),
			order:
				heading.toLowerCase() === $sortFilter.name
					? $sortFilter.order === 'asc'
						? 'desc'
						: 'asc'
					: 'desc'
		});
		sortTeams(teams, seasons);
	};
</script>

<div class="overflow-x-scroll space-y-4">
	<table>
		<thead>
			<tr class="rounded-t-md">
				{#each $tableHeadings as heading}
					{#if heading === 'Pos' || heading === 'Club'}
						<th class="cursor-default">{heading}</th>
					{:else}
						<th class="px-4" on:click={() => handleHeadingClick(heading)}>
							<span class="flex items-center">
								{heading}
								{#if heading.toLowerCase() === $sortFilter.name}
									<Chevron direction={$sortFilter.order === 'desc' ? 'down' : null} />
								{/if}
							</span>
						</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $teamsTable as team, i}
				<tr>
					<td>{i + 1}</td>
					<td class="flex items-center space-x-8">
						{#if team.img}<img
								class="w-5 max-h-6"
								src={team.image}
								alt={`${team.name} logo`}
							/>{/if}
						<span>
							{team.name}
							<span class="text-xs">
								({team.player})
							</span>
						</span>
					</td>
					<td>{team.played}</td>
					<td>{team.won}</td>
					<td>{team.drawn}</td>
					<td>{team.lost}</td>
					<td>{team.gf}</td>
					<td>{team.ga}</td>
					<td>{team.gd}</td>
					<td>{team.pts}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
