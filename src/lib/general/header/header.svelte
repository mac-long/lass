<script>
	import Actions from './actions.svelte';
	import Dashboard from './dashboard.svelte';
	import SecondaryActions from './secondary.svelte';
	import Title from './title.svelte';

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
		<Title {title} {description} />
		<Actions {session} {league} {actions} />
		{#if dashboard}
			<Dashboard {seasons} {teams} />
		{/if}
		<SecondaryActions {view} actions={secondaryActions} />
	</div>
</div>
