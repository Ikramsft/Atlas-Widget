import {
	ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler,
	Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController,
	RadarController, RadialLinearScale, ScatterController, TimeScale,
	TimeSeriesScale, Title,
	Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function TestChart({ data, iconArray, platformArr }) {
	const [icons, setIcons] = useState([]);
	const [platforms, setPlatforms] = useState([]);
	useEffect(() => {
		if (iconArray) {
			setIcons(iconArray)
		}
		if (platformArr) {
			setPlatforms(platformArr)
		}
	}, [iconArray, platformArr])
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

	// var myChart = new Chart(ctx, { ...});

	return (
		<div style={{ height: "300px" }}>
			<Line
				data={data}

				options={{
					maintainAspectRatio: false,
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
					},
					elements: {
						point: {
							pointStyle: icons
						}
					},
					scales: {
						y: {
							beginAtZero: true, ticks: {
								stepSize: 1, callback: function (value, index, ticks) {
									return index === 0 ? "No reviews" : value;
								}
							}
						},
						x: { grid: { display: false }, }
					},
				}}
			/>
		</div>
	)
}

export default TestChart