<script>
	import { getValue } from '$lib/functions';
	import { Bin, Plus } from '$lib/icons/components';
	import Input from './input.svelte';

	export let view, league, users;
</script>

<div class="flex items-center mb-4 space-x-2">
	<span
		class="text-lg font-bold cursor-pointer"
		class:underline={$view === 'info'}
		on:click={() => view.set('info')}
		on:keydown={() => view.set('info')}
	>
		Info
	</span>
	<span
		class="text-lg font-bold cursor-pointer"
		class:underline={$view === 'admins'}
		on:click={() => view.set('admins')}
		on:keydown={() => view.set('admins')}
	>
		Admins
	</span>
</div>
{#if $view === 'info'}
	<form class="flex flex-col space-y-4" action="?/edit" method="POST">
		<Input
			name="name"
			label="League Name"
			type="text"
			placeholder="Enter league name"
			value={league.name}
		/>
		<Input
			name="description"
			label="League Description"
			type="textarea"
			maxLength={255}
			placeholder="Enter league description"
			value={league.description}
		/>
		<Input name="color" label="League Color" type="color" value={league.color} />

		<div class="flex-1" />
		<div class="form-group">
			<input class="secondary" type="submit" formaction="?/newSeason" value="New Season" />
			<input class="delete" type="submit" formaction="?/delete" value="Delete" />
			<input type="submit" value="Update" />
		</div>
	</form>
{:else}
	<ul class="space-y-4">
		{#if league.admins.length === 0}
			<p class="font-bold text-center">No admins</p>
			<p class="max-w-sm">
				Add some to allow other users to add/delete teams and add/delete fixtures
			</p>
		{/if}
		{#each league.admins as admin}
			{#if admin !== league.user}
				<form method="POST" action="?/removeAdmin">
					<input type="hidden" name="id" value={admin} />
					<li class="flex items-center">
						{getValue(admin, users, 'email')}
						<button class="ml-2 no-style" type="submit">
							<Bin />
						</button>
					</li>
				</form>
			{/if}
		{/each}
	</ul>
	<form class="flex items-center" action="?/addAdmin" method="POST">
		<Input name="email" type="email" placeholder="Enter admin email" labelHidden />
		<button class="ml-2 -mt-2 edit" type="submit">
			<Plus />
		</button>
	</form>
{/if}
