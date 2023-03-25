<script>
	export let id, name, color;
</script>

<a class='card' href={`/dashboard/${id}`} style={`background-color: ${color}`}>
	<h2>{name}</h2>
</a>

<style lang="postcss">
	.card {
		@apply w-64 h-36 flex items-end justify-start text-left rounded-b-md rounded-tl-md mr-4 mb-4;

		h2 {
			@apply text-2xl p-2;
		}
	}
</style>
