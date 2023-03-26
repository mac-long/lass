<script>
	import { Settings } from '$lib/icons/icons';
	import { dashboardView } from '$lib/store';

	export let actions = [],
		title,
		description,
		dashboard = false,
		season = 1;
</script>

<div class="relative mb-8">
	<div class="flex absolute top-0 right-48 items-center space-x-3">
		{#each actions as action}
			<button
				class={`flex items-center space-x-1 ${action.type === 'primary' ? 'primary' : 'secondary'}`}
				on:click={action.onClick}
			>
				{#if action.type === 'settings'}
					<Settings />
				{:else}
					<span>{action.label}</span>
				{/if}
			</button>
		{/each}
	</div>
	<h1>{title}</h1>
	<p class="mx-auto max-w-lg">
		{description}
	</p>

	{#if dashboard}
		<!-- <div class="flex flex-col">
			<span>View Season</span>
			<select on>
				{#each seasons as season}
					<option value={season} >Season {season}</option>
				{/each}
			</select>
		</div> -->
		<div class="flex items-center justify-center space-x-2 mx-auto pt-8">
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
