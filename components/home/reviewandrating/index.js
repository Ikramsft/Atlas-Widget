import { Box } from "@mui/system";
import {
	ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler,
	Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController,
	RadarController, RadialLinearScale, ScatterController, TimeScale,
	TimeSeriesScale, Title,
	Tooltip
} from 'chart.js';
import { ThemeColors } from "helpers/ThemeColors";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
	Card,
	CardBody,
	CardTitle,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledButtonDropdown
} from "reactstrap";
import { addMonths, monthNames } from "utils";

const colors = ThemeColors();

const ReviewAndRating = ({ data, className = "", controls = true, }) => {
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
	const [activeTab, setActiveTab] = useState(false);
	const [ratingChartData, setRatingChartData] = useState({
		labels: [],
		ratingData: [],
	});
	const [reviewChartData, setReviewChartData] = useState({
		labels: [],
		reviewData: [],
	});

	useEffect(() => {
		if (data) {
			let reviewChartTempData = [];
			let tempLabels = [];

			data?.map((item, index, arr) => {
				// tempLabels.push(moment(item.review_date).format("MMM/YY"));
				// let prevCount = 0
				// if (index === 0) {
				//   prevCount = initialCount + item.count
				// } else if (index === 1) {
				//   const twomonth = data[0].count + item.count
				//   prevCount = initialCount + twomonth
				// } else if (index === 2) {
				//   const twomonth = data[0].count + data[1].count + item.count
				//   prevCount = initialCount + twomonth
				// } else if (index === 3) {
				//   const twomonth = data[0].count + data[1].count + data[2].count + item.count
				//   prevCount = initialCount + twomonth
				// } else if (index === 4) {
				//   const twomonth = data[0].count + data[1].count + data[2].count + data[3].count + item.count
				//   prevCount = initialCount + twomonth
				// }
				// else if (index === 5) {
				//   const twomonth = data[0].count + data[1].count + data[2].count + data[3].count + data[4].count + item.count
				//   prevCount = initialCount + twomonth
				// }


				tempLabels.push(`${monthNames[item.month]}/${item.year}`);
				reviewChartTempData.push(item?.total);
				if (data.length === 1) {
					tempLabels.push(moment(addMonths(new Date(), 0)).format("MMM/YYYY"));
					reviewChartTempData.push(item?.total);
				}
			});
			setReviewChartData({
				labels: tempLabels,
				reviewData: reviewChartTempData,
			});
		} else {
			setReviewChartData({
				labels: [],
				reviewData: [],
			});
		}
	}, [data,]);


	const tempDataset = {
		labels: reviewChartData.labels,
		datasets: [
			{
				label: "",
				data: reviewChartData.reviewData,
				borderColor: colors.themeColor1,
				pointBackgroundColor: colors.foregroundColor,
				pointBorderColor: colors.themeColor1,
				pointHoverBackgroundColor: colors.themeColor1,
				pointHoverBorderColor: colors.foregroundColor,
				pointRadius: 4,
				pointBorderWidth: 2,
				pointHoverRadius: 5,
				fill: true,
				borderWidth: 2,
				backgroundColor: colors.themeColor1_10,
			},
		],
	}



	const handleActive = () => {
		setActiveTab((active) => !active);
	};
	return (
		<Card
			className={`${className} dashboard-filled-line-chart px-0`}
			style={{
				height: "100%",
			}}
		>
			<CardBody>
				<CardTitle>
					<Box
						className="recent_reviews_title"
						sx={{
							"& > p": {
								margin: 0,
							},
						}}
					>
						<p className="list-item-heading">Reviews Over Time <span className="text-muted">(Showing 3 months Data)</span></p>
					</Box>
				</CardTitle>
				<Box className="shadow-0">
					<Box className="hide">
						{controls && (
							<div className="btn-group  mt-2">
								<UncontrolledButtonDropdown>
									<DropdownToggle
										caret
										color="primary"
										className="btn-xs"
										outline
									>
										{activeTab ? "Rating" : "Revews"}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem onClick={handleActive}>Ratings</DropdownItem>
										<DropdownItem onClick={handleActive}>Reviews</DropdownItem>
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
						)}
					</Box>
					<Box sx={{ paddingTop: "2rem", position: "relative" }}>

						{/* <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-25%,-40%)",
              display: data.length > 0 ? "none" : "block"
            }}><p>No data available</p> </Box> */}
						<Box
							sx={{ display: activeTab ? "none" : "block" }}
							className="chart review-chart position-relative"
						>
							<Line shadow data={tempDataset} />
						</Box>
					</Box>
				</Box>
			</CardBody>
		</Card>
	);
};

export default ReviewAndRating;