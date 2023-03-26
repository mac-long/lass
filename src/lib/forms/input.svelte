<script>
	export let name, label, labelHidden, type, placeholder = "", value = "", maxLength = 255;
</script>

<div class="form-group">
	<label for={name} class:sr-only={labelHidden}>{label}</label>
	{#if type === 'textarea'}
		<textarea {name} {placeholder} {value} {maxLength} on:change={(e) => (value = e.target.value)} />
	{:else}
		<input {type} {name} {placeholder} {value} on:change={(e) => (value = e.target.value)} />
	{/if}
</div>
