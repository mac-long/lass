<script>
	export let name, label, type, placeholder, value;
</script>

<div class="form-group">
	<label for={name}>{label}</label>
	<input {type} {name} {placeholder} {value} on:change={e => value = e.target.value} />
</div>
