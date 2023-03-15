<script>
	import { headings, sortFilter, teamsTable } from '$lib/store';

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

		teamsTable.set(
			$teamsTable.sort((a, b) => {
				if (heading.toLowerCase() === 'name') {
					return $sortFilter.order === 'asc'
						? a[heading.toLowerCase()].localeCompare(b[heading.toLowerCase()])
						: b[heading.toLowerCase()].localeCompare(a[heading.toLowerCase()]);
				}

				return $sortFilter.order === 'asc'
					? a[heading.toLowerCase()] - b[heading.toLowerCase()]
					: b[heading.toLowerCase()] - a[heading.toLowerCase()];
			})
		);
	};
</script>

<div class="overflow-x-scroll space-y-4">
	<table>
		<thead>
			<tr>
				{#each $headings as heading}
					{#if heading !== 'Pos'}
						<th class="px-4" on:click={() => handleHeadingClick(heading)}>
							<span class="flex items-center">
								{heading}
								{#if heading.toLowerCase() === $sortFilter.name}
									{#if $sortFilter.order === 'desc'}
										<span class="transform rotate-180">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="feather feather-chevron-up"
												><polyline points="18 15 12 9 6 15" /></svg
											>
										</span>
									{:else}
										<span class="">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="feather feather-chevron-up"
												><polyline points="18 15 12 9 6 15" /></svg
											>
										</span>
									{/if}
								{/if}
							</span>
						</th>
					{:else}
						<th class="cursor-default">{heading}</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $teamsTable as team, i}
				<tr>
					<td>{i + 1}</td>
					<td class="flex items-center space-x-8">
						<img class="w-5 max-h-6" src={team.image} alt={`${team.name} logo`} />
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
