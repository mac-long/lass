<script>
	import { sortTeams } from '$lib/functions';
	import { Settings, Share } from '$lib/icons/components';
	import { visibleSeason } from '$lib/store';

	export let actions = [],
		title,
		description,
		dashboard = false,
		view,
		secondaryActions = [],
		seasons,
		league,
		teams,
		session;
</script>

<div class="flex relative flex-col justify-center px-8 sm:block sm:px-0 item-center">
	<div>
		<h1>{title}</h1>
		<p class="py-4 mx-auto max-w-lg">
			{description}
		</p>
		<div class="flex  justify-center items-center my-4 space-x-3">
			{#each actions as action}
				{#if (league?.admins?.includes(session?.user.id) && action.type !== 'watcher') || (league?.admins?.includes(session?.user.id) && action.type !== 'watcher' && action.label !== 'New')}
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
				{/if}
				{#if action.label === 'New'}
					<button class="flex items-center space-x-1 secondary" on:click={action.onClick}>
						<span>{action.label}</span>
					</button>
				{/if}
				{#if action.type === 'watcher' && !league?.admins?.includes(session?.user.id)}
					<form action="?/watch" method="POST">
						<input type="hidden" name="league" value={league.id} />
						<button class="flex items-center space-x-1 secondary" type="submit">
							{action.label}
						</button>
					</form>
				{/if}
			{/each}
		</div>
		{#if dashboard}
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
		{/if}
		<div class="flex justify-center items-center pt-8 mx-auto space-x-2">
			{#each secondaryActions as action}
				<button
					class="link"
					class:underline={view === action.label.toLowerCase()}
					on:click={action.onClick}>{action.label}</button
				>
			{/each}
		</div>
	</div>
</div>
