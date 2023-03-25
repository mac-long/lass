<script>
	export let id, name, color;
</script>

<a class='card' href={`/dashboard/league/${id}`} style={`background-color: ${color}`}>
	<h2>{name}</h2>
</a>

<style lang="postcss">
	.card {
		@apply w-56 h-36 flex items-end justify-start text-left rounded-b-md rounded-tl-md mr-4 mb-4;

		h2 {
			@apply text-2xl pl-4 pb-2;
		}
	}
</style>
