<script>
	import Input from './input.svelte';
</script>

<form method="POST" action="?/new">
	<Input name="name" label="League Name" type="text" placeholder="Enter league name" value="" />
	<Input
		name="description"
		label="League Description"
		type="textarea"
		maxLength={255}
		placeholder="Enter league description"
		value=""
	/>
	<Input name="color" label="League Color" type="color" value="#1c1c1c" />
	<Input type="submit" value="Create" />
</form>
