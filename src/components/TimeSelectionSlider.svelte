<script>
	const handleChange = (type) => (e) => {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set(type, e.target.value);
		history.replaceState({}, '', `?${urlParams.toString()}`);
	};

	export let startDate;
	export let endDate;
</script>

<div class="slider-wrapper">
	<div class="flex-center">
		<div class="container">
			<div class="content">
				<div class="input-wrapper">
					<label class="input-label">Start date:</label>
					<input
						type="datetime-local"
						bind:value={startDate}
						on:change={(e) => handleChange('start_date')(e)}
					/>
				</div>
				<div class="input-wrapper">
					<label class="input-label">End date:</label>
					<input
						type="datetime-local"
						bind:value={endDate}
						on:change={(e) => handleChange('end_date')(e)}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.slider-wrapper {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		width: 100%;
		height: 80px;

		background: #d3d3d3;
	}

	.flex-center {
		align-items: stretch;
		flex-direction: row;
		height: 100%;
	}

	.container {
		align-items: stretch;
	}

	.content {
		display: flex;
		justify-content: start;
		align-items: center;
		height: 100%;
	}

	.input-wrapper {
		display: block;
		align-items: center;
		margin-right: 20px;
	}

	.input-label {
		display: block;
		margin-right: 10px;
		font-weight: bold;
	}
</style>
