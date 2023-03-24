<script>
	import moment from 'moment';
	import Switch from '@smui/switch';
	import { getCronByName } from '../utils/data-retriever';
	import Timeline from './Timeline.svelte';
	import { onMount } from 'svelte';

	import '@smui/switch/bare.css';
	const DEFAULT_DATE_FORMAT = 'HH:mm:ss DD/MM/YYYY';

	export let name;
	export let suspended;
	export let schedule;
	export let nextScheduledDate;
	export let startDate;
	export let endDate;
	export let status = {};

	const { lastScheduleTime, lastSuccessfulTime } = status;

	let cardOpen = false;
	$: cronScheduledTimesPromise = cardOpen && getCronByName(name, startDate, endDate);

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		if (
			urlParams.has('enabled_crons') &&
			urlParams.get('enabled_crons')?.split(',').includes(name)
		) {
			cardOpen = true;
		}
	});

	function handleCardOpen(e) {
		const isOpen = e.detail.selected;

		const urlParams = new URLSearchParams(window.location.search);

		let enabledCrons = {};

		if (urlParams.has('enabled_crons')) {
			(urlParams.get('enabled_crons') || '').split(',').forEach((cronName) => {
				enabledCrons[cronName] = true;
			});
		}

		enabledCrons[name] = isOpen;
		const enabledCronUrlParam = Object.keys(enabledCrons)
			.filter((cronName) => enabledCrons[cronName])
			.join(',');

		urlParams.set('enabled_crons', enabledCronUrlParam);
		history.replaceState({}, '', `?${urlParams.toString()}`);
	}

	export let scrollLeft;
</script>

<div class="wrapper">
	<div class="header">
		<h4 class="cron-name">{name}</h4>
		<Switch bind:checked={cardOpen} on:SMUISwitch:change={handleCardOpen} />
	</div>
	<div class="meta-wrapper">
		<p class="cron-meta"><span>Suspended:</span> {suspended}</p>
		<p class="cron-meta"><span>Schedule:</span> {schedule}</p>
		<p class="cron-meta">
			<span>Next scheduled time:</span>
			{(nextScheduledDate && moment(nextScheduledDate).format(DEFAULT_DATE_FORMAT)) || '-'}
		</p>
		<p class="cron-meta">
			<span>Last scheduled time:</span>
			{(lastScheduleTime && moment(lastScheduleTime).format(DEFAULT_DATE_FORMAT)) || '-'}
		</p>
		<p class="cron-meta">
			<span>Last successful time:</span>
			{(lastSuccessfulTime && moment(lastSuccessfulTime).format(DEFAULT_DATE_FORMAT)) || '-'}
		</p>
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

	.meta-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: row wrap;
	}

	.cron-name {
		flex: 1;
		width: 100%;
		font-size: 22px;
		text-transform: uppercase;
	}

	.cron-meta > span {
		display: block;
		font-weight: 800;
		color: black;
	}

	.cron-meta {
		color: darkgray;
		margin-right: 30px;
	}

	.cron-meta:hover {
		color: black;
	}

	.body {
	}
</style>
