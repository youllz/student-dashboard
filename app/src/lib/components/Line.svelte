<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let chart: HTMLCanvasElement;

	const data = {
		labels: ['Expenses', 'Savings', 'Investments'],
		datasets: [
			{
				label: 'My First Dataset',
				data: [300, 50, 100],
				backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				// hoverOffset: 4,
				borderWidth: 0
			}
		]
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: {
			borderRadius: '30',
			responsive: true,
			cutout: '95%',
			spacing: 2,
			plugins: {
				legend: {
					position: 'bottom',
					display: true,
					labels: {
						usePointStyle: true,
						padding: 20,
						font: {
							size: 14
						}
					}
				},
				title: {
					display: true,
					text: 'My Personal Portfolio'
				}
			}
		}
	};

	onMount(() => {
		const ctx = chart.getContext('2d');
		// Initialize chart using default config set

		var myChart = new Chart(ctx, config);
	});
</script>

<div>
	<canvas bind:this={chart} height={400} />
</div>

<style>
	div {
		width: 90%;
		height: 400px;
		/* background-color: red; */
		flex-basis: 0;
		flex-grow: 1;
	}
</style>
