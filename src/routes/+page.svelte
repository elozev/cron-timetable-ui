<script>
	import Cron from '../components/Cron.svelte';
	import TimeSelectionSlider from '../components/TimeSelectionSlider.svelte';
	import { CRONTIMETABLE_SERVICE } from '../utils/constants';
	import { getCrons } from '../utils/data-retriever';

	// TODO: retrieve cluster name from context
	let clusterName = 'primary';

	let message = `cron time table ${CRONTIMETABLE_SERVICE}`;

	let cronsPromise = getCrons();
</script>

<TimeSelectionSlider />
<h1>Cron timetable in cluster</h1>

{#await cronsPromise}
	<p>Loading data...</p>
{:then data}
	{#each data as cron (cron.name)}
		<Cron {...cron} />
	{/each}
{:catch error}
	<p>Error: {JSON.stringify(error)}</p>
{/await}
