<script>
	export let name, label, type, placeholder = "", value = "", maxLength = 255;
</script>

<div class="form-group">
	<label for={name}>{label}</label>
	{#if type === 'textarea'}
		<textarea {name} {placeholder} {value} {maxLength} on:change={(e) => (value = e.target.value)} />
	{:else}
		<input {type} {name} {placeholder} {value} on:change={(e) => (value = e.target.value)} />
	{/if}
</div>
