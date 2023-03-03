<script>
	import moment from 'moment';
	export let scheduledTimestamps = [];
	export let startDate;
	export let endDate;
	const minutesInRange = 24 * 60;

	const dateFormat = 'HH:mm:ss D MMM YYYY';
	const hourFormat = 'HH:mm:ss';
</script>

<div class="wrapper">
	<div class="timeline">
		<div class="vertical-date start-date">{startDate.format(hourFormat)}</div>
		{#each Array(minutesInRange) as _, i}
			<div class="minute" date={startDate.clone().add(i, 'm').format(dateFormat)}>
				{#if i % 30 === 0}
					<div class="vertical-date start-date">
						{startDate.clone().add(i, 'm').format(hourFormat)}
					</div>
				{/if}
			</div>
		{/each}
		<div class="vertical-date end-date">{endDate.format(hourFormat)}</div>
	</div>
</div>

<style>
	.wrapper {
		background: lightcyan;
		border-radius: 8px;
		width: 100%;

		overflow-x: scroll;
		overflow-y: visible;
		position: relative;
		z-index: 1;
		padding-top: 100px;
	}

	.vertical-date {
		position: absolute;
		top: -50px;
		transform: rotate(-90deg);
		width: 80px;
		overflow: visible;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.vertical-date.start-date {
		left: 35px;
	}

	.vertical-date.end-date {
		right: 35px;
	}

	.timeline {
		position: relative;
		overflow: visible;
		padding-left: 80px;
		padding-right: 80px;
		background: lightgrey;
		height: 30px;
		width: calc(1440px * 10);
		display: flex;
		justify-content: start;
	}

	.minute {
		position: relative;
		z-index: 2;
		width: 10px;
		height: 100%;
		cursor: pointer;
		background-color: gray;
		border-right: 1px solid white;
	}

	.minute:hover {
		background-color: lightseagreen;
	}

	.minute::after {
		content: attr(date);
		display: none;
		position: absolute;
		width: fit-content;
		z-index: 30;

		background: white;
		box-shadow: -3px 3px 9px -1px rgba(0, 0, 0, 0.75);
		padding: 5px 10px;
		border-radius: 6px;
		width: 160px;
		top: -35px;
		left: -50%;
		justify-content: center;
		align-items: center;
		text-align: center;

		transform: translateX(-50%);
	}

	.minute:hover::after {
		display: flex;
	}
</style>
