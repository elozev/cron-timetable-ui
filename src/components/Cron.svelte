<script>
	import moment from 'moment';
	import Switch from '@smui/switch';
	import { getCronByName } from '../utils/data-retriever';
	import Timeline from './Timeline.svelte';

	export let name;
	export let suspended;
	export let schedule;
	export let nextScheduledDate;
	export let startDate;
	export let endDate;

	$: formattedDate = moment(nextScheduledDate).format('HH:mm:ss DD/MM/YYYY');

	let cardOpen = true;
	$: cronScheduledTimesPromise = cardOpen && getCronByName(name, startDate, endDate);

	export let scrollLeft;
</script>

<div class="wrapper">
	<div class="header">
		<h4>{name}</h4>
		<p class="cron-meta"><span>Suspended:</span> {suspended}</p>
		<p class="cron-meta"><span>Schedule:</span> {schedule}</p>
		<p class="cron-meta"><span>Next scheduled run at:</span> {formattedDate}</p>
		<Switch bind:checked={cardOpen} />
	</div>

	{#if cardOpen}
		<div class="body">
			{#await cronScheduledTimesPromise}
				Loading scheduled times...
			{:then data}
				<Timeline
					scheduledTimestamps={data.scheduledTimestamps}
					{startDate}
					{endDate}
					bind:scrollLeft
				/>
			{/await}
		</div>
	{/if}
</div>

<style>
	h4 {
		font-weight: 800;
	}

	.wrapper {
		border: 1px solid lightgrey;
		padding: 10px 25px;
		margin: 10px 0;
		border-radius: 16px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cron-meta > span {
		font-weight: 800;
		color: black;
	}

	.cron-meta {
		color: darkgray;
	}

	.cron-meta:hover {
		color: black;
	}

	.body {
	}
</style>
