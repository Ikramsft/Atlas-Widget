import {
	ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler,
	Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController,
	RadarController, RadialLinearScale, ScatterController, TimeScale,
	TimeSeriesScale, Title,
	Tooltip
} from 'chart.js';
import { ThemeColors } from "helpers/ThemeColors";
import { Bar } from 'react-chartjs-2';
import { monthNames } from 'utils';



export default function Test({ data }) {

	Chart.register(
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip
	);
	const colors = ThemeColors();

	// var myChart = new Chart(ctx, { ...});
	const barChartData = {
		labels: data?.map(item => `${monthNames[item?.month]}/${item?.year}`),
		datasets: [
			{
				label: 'Reviews',
				borderColor: colors.themeColor1,
				backgroundColor: colors.themeColor1_10,
				data: data?.map(item => item?.count),
				borderWidth: 2,
			},
		],
	};
	console.log({ barChartData })
	return (
		<div style={{ height: "300px" }}>
			<Bar
				data={barChartData}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
					},
					scales: {
						y: { grid: { display: false }, ticks: { stepSize: 1 } },
						x: { grid: { display: false }, }
					},
				}}
			/>
		</div>
	);
}