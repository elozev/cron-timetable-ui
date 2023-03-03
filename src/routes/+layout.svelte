<script>
	import '@fontsource/be-vietnam'; // The font we are gonna serve with fontsource
</script>

<link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css" />

<main>
	<div class="container">
		<slot />
	</div>
</main>

<style global>
	:global(body) {
		font-family: 'Be Vietnam', sans-serif;
	}

	:global(main) {
		margin-top: 80px;
	}

	:global(.flex-center, main) {
		display: flex;
		justify-content: center;
	}

	:global(.container) {
		width: 90%;
		max-width: 1200px;
	}
</style>
