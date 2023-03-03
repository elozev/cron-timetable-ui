<script>
	import moment from 'moment';

	let startDate = moment().startOf('d').format('YYYY-MM-DDTHH:mm');
	let endDate = moment().endOf('d').format('YYYY-MM-DDTHH:mm');
</script>

<div class="slider-wrapper">
	<div class="flex-center">
		<div class="container">
			<div class="content">
				<input type="datetime-local" bind:value={startDate} />
				<input type="datetime-local" bind:value={endDate} />
			</div>
		</div>
	</div>
	<!-- <br />
	startDate: {startDate}
	<br />
	endDate: {endDate} -->
</div>

<style>
	.slider-wrapper {
		position: fixed;

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
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
</style>
