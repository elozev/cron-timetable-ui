<script>
	import moment from 'moment';
	export let scheduledTimestamps = [];
	export let startDate = moment();
	export let endDate = moment().endOf('D');
	const dateFormat = 'HH:mm:ss D MMM YYYY';
	const hourFormat = 'HH:mm';

	function constructTimeLine(startDate, endDate, scheduledTimestamps) {
		const duration = moment.duration(endDate.diff(moment(startDate)));
		const minutes = Math.round(duration.asMinutes());

		let scheduledTimestampsDatesCount = 0;
		let timelineItems = [];

		if (moment(scheduledTimestamps[scheduledTimestampsDatesCount]).isBefore(startDate)) {
			scheduledTimestampsDatesCount += 1;
		}

		for (var minuteCount = 0; minuteCount < minutes; minuteCount++) {
			const currentMinute = startDate.clone().set({ second: 0 }).add(minuteCount, 'm');
			const timelineItem = { timestamp: currentMinute.format(dateFormat), scheduled: false };

			if (
				scheduledTimestampsDatesCount < scheduledTimestamps.length &&
				currentMinute.isSame(moment(scheduledTimestamps[scheduledTimestampsDatesCount]), 'minute')
			) {
				scheduledTimestampsDatesCount += 1;
				timelineItem.scheduled = true;
			}

			timelineItems.push(timelineItem);
		}

		return timelineItems;
	}

	$: scheduledDates = constructTimeLine(startDate, endDate, scheduledTimestamps);

	let carousel;
	export let scrollLeft;

	const handleScroll = () => {
		scrollLeft = carousel.scrollLeft;
	};

	$: {
		if (carousel) {
			carousel.scrollLeft = scrollLeft;
		}
	}
</script>

<div class="wrapper" bind:this={carousel} on:scroll={handleScroll}>
	<div class="timeline">
		{#each scheduledDates as scheduledDate, i}
			<div class="minute" class:scheduled={scheduledDate.scheduled} date={scheduledDate.timestamp}>
				{#if i % 10 === 0}
					<div class="vertical-date">
						{startDate.clone().add(i, 'm').format(hourFormat)}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		background: white;
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
		z-index: 1;
		top: -35px;
		left: -37px;
		transform: rotate(-90deg);
		width: 80px;
		overflow: visible;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.timeline {
		position: relative;
		overflow: visible;
		padding-left: 80px;
		padding-right: 80px;
		background: lightgrey;
		height: 30px;
		width: fit-content;
		display: flex;
		justify-content: start;
	}

	.minute {
		position: relative;
		z-index: 2;
		width: 10px;
		height: 100%;
		cursor: pointer;
		background-color: #f2f2fd;
		border-right: 1px solid white;
	}

	.minute:hover {
		background-color: darkgray;
	}
	.minute.scheduled {
		background-color: #58db36;
	}
	.minute.scheduled:hover {
		background-color: green;
	}

	.minute::after {
		content: attr(date);
		display: none;
		position: absolute;
		width: fit-content;
		z-index: 30;

		white-space: nowrap;

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
