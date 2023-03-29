<script>
	export let name,
		label,
		labelHidden = false,
		type,
		placeholder = '',
		value = '',
		maxLength = 255;
</script>

<div class="form-group">
	<label for={name} class:sr-only={labelHidden}>{label}</label>
	{#if type === 'textarea'}
		<textarea
			{name}
			{placeholder}
			{value}
			{maxLength}
			on:change={(e) => (value = e.target.value)}
		/>
	{:else}
		<input
			class="sm:max-w-none max-w-[80vw]"
			{type}
			{name}
			{placeholder}
			{value}
			on:change={(e) => (value = e.target.value)}
		/>
	{/if}
</div>
