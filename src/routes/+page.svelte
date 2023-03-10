<script>
	import moment from 'moment';
	import { onMount } from 'svelte';
	import Cron from '../components/Cron.svelte';
	import TimeSelectionSlider from '../components/TimeSelectionSlider.svelte';
	import { getCrons } from '../utils/data-retriever';

	let cronsPromise = getCrons();

	let startDate = moment().format('YYYY-MM-DDTHH:mm');
	let endDate = moment().endOf('d').format('YYYY-MM-DDTHH:mm');

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('start_date')) {
			startDate = urlParams.get('start_date');
		}

		if (urlParams.get('end_date')) {
			endDate = urlParams.get('end_date');
		}
	});

	let scrollLeft = 250;
</script>

<TimeSelectionSlider bind:startDate bind:endDate />
<h1>Cron timetable in cluster</h1>
{#await cronsPromise}
	<p>Loading data...</p>
{:then data}
	{#each data as cron (cron.name)}
		<Cron
			startDate={moment(startDate, 'YYYY-MM-DDTHH:mm')}
			endDate={moment(endDate, 'YYYY-MM-DDTHH:mm')}
			bind:scrollLeft
			{...cron}
		/>
	{/each}
{:catch error}
	<p>Error: {JSON.stringify(error)}</p>
{/await}
