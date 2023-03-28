<script>
	import { Settings, Share } from '$lib/icons/icons';
	import { currentSeason, dashboardView, sortFilter, teamsTable, visibleSeason } from '$lib/store';

	export let actions = [],
		title,
		description,
		dashboard = false,
		seasons,
		league,
		session,
		teams;

	const changeSeason = (e) => {
		if (Number(e.target.value) !== $currentSeason) {
			teamsTable.set(
				seasons
					.find((season) => season.number === $visibleSeason)
					.table.sort((a, b) => {
						return $sortFilter.order === 'asc'
							? a[$sortFilter.name.toLowerCase()] - b[$sortFilter.name.toLowerCase()]
							: b[$sortFilter.name.toLowerCase()] - a[$sortFilter.name.toLowerCase()];
					})
			);
		} else {
			teamsTable.set(
				teams.sort((a, b) => {
					return $sortFilter.order === 'asc'
						? a[$sortFilter.name.toLowerCase()] - b[$sortFilter.name.toLowerCase()]
						: b[$sortFilter.name.toLowerCase()] - a[$sortFilter.name.toLowerCase()];
				})
			);
		}
	};
</script>

<div class="relative flex flex-col-reverse item-center justify-center px-8 sm:px-0 sm:block">
	{#if session?.user.id === league.user}
		<div
			class="flex justify-center sm:justify-start sm:absolute top-0 right-16 items-center space-x-3 my-4"
		>
			{#each actions as action}
				<button
					class={`flex items-center space-x-1 ${
						action.type === 'primary' ? 'primary' : 'secondary'
					}`}
					on:click={action.onClick}
				>
					{#if action.type === 'settings'}
						<Settings />
					{:else if action.type === 'share'}
						<Share />
					{:else}
						<span>{action.label}</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
	<div>
		<h1>{title}</h1>
		<p class="mx-auto max-w-lg py-4">
			{description}
		</p>

		{#if dashboard}
			<div class="flex flex-col items-center py-4">
				<div class="items-center form-group">
					{#if seasons.length > 1}
						<span class="font-bold">View Season</span>
						<select bind:value={$visibleSeason} on:change={changeSeason}>
							{#each seasons as season}
								<option value={season.number}>{season.number}</option>
							{/each}
						</select>
					{/if}
				</div>
			</div>
			<div class="flex justify-center items-center pt-8 mx-auto space-x-2">
				<button
					class="link"
					class:underline={$dashboardView === 'table'}
					on:click={() => dashboardView.set('table')}>Table</button
				>
				<button
					class="link"
					class:underline={$dashboardView === 'fixtures'}
					on:click={() => dashboardView.set('fixtures')}>Fixtures</button
				>
			</div>
		{/if}
	</div>
</div>
