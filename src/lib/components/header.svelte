<script>
	import { configVisibile } from '$lib/store';
</script>

<div class="flex flex-col items-center mb-16 space-y-8 text-center">
	<svg
		class="w-32 h-32"
		xmlns="http://www.w3.org/2000/svg"
		width="52"
		height="48"
		viewBox="0 0 52 48"
	>
		<g fill="none" fill-rule="evenodd">
			<g class="fill-black dark:fill-white">
				<path
					d="M74 46.667c-1.282 0-2.588-1.047-2.588-3.038l.29-15.944-8.526 8-.635.112-.44-.573.555-4.377.058-.18.115-.18 9.288-9.362.659-.641C73.134 20.169 73.56 20 74 20c.427 0 .855.169 1.201.461l.67.653 9.3 9.373.104.146.069.202.554 4.321-.346.585-.728-.067-8.514-8 .29 15.932c-.012 2.026-1.318 3.06-2.6 3.06zM63.407 68l-13.198-3.085-.916-.232c-.47-.143-.834-.419-1.057-.771-.223-.353-.293-.794-.188-1.212l.247-.87 3.757-12.265.07-.155.153-.165 3.617-2.567.705-.011.317.639L54 58.248l14.279-8.044c.622-.33 1.245-.507 1.843-.507.952 0 1.785.43 2.232 1.146.657 1.058.375 2.645-1.433 3.625l-14.572 7.57 11.566 3.108.423.463-.282.65-4.25 1.686-.189.044-.211.011zm20.986-.011l-.188-.044-4.196-1.651-.352-.573.435-.561 11.575-3.104-14.584-7.563c-1.81-.98-2.092-2.565-1.445-3.621.446-.716 1.28-1.145 2.233-1.145.61 0 1.222.165 1.833.495l14.301 8.036-2.914-10.93.223-.584.752-.077 3.667 2.598.129.132.094.187 3.749 12.24.246.848c.106.451.036.88-.176 1.244-.223.352-.587.628-1.022.76l-.929.23-13.22 3.083-.188.011-.023-.011z"
					transform="translate(-48 -20)"
				/>
			</g>
		</g>
	</svg>

	<h1 class="text-4xl font-bold">3 Sided Cube FC League</h1>
</div>

<button class="absolute top-0 right-0 p-4 text-black dark:text-white hover:text-primary-light dark:hover:text-primary-dark duration-300" on:click={() => configVisibile.set(true)}>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
</button>
