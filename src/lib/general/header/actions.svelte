<script>
  import {Settings, Share} from '$lib/icons/components'
	export let actions, league, session;
</script>

<div class="flex justify-center items-center my-4 space-x-3">
	{#each actions as action}
		{#if (league?.admins?.includes(session?.user.id) && action.type !== 'watcher') || (league?.admins?.includes(session?.user.id) && action.type !== 'watcher' && action.label !== 'New')}
			<button
				class={`flex items-center space-x-1 ${action.type === 'primary' ? 'primary' : 'secondary'}`}
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
