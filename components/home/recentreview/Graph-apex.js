// import Chart from "react-apexcharts";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
const ChartForce = dynamic(() => import("react-apexcharts"), { ssr: false });
const Chart = forwardRef((props, ref) => (<ChartForce {...props} fgRef={ref} />))

const Graph = ({ googleChartData, xaxis, yelpChartData, facebookChartData, carwiseChartData }) => {
  const chartRef = useRef(null);
  const [series, setSeries] = useState();
  const [options, setOptions] = useState();
  console.log({ xaxis })

  useEffect(() => {
    const series = [
      {
        name: "Google",
        data: googleChartData,
      },
      {
        name: "Yelp",
        data: yelpChartData,
      },
      {
        name: "Facebook",
        data: facebookChartData,
      }, {
        name: "Carwise",
        data: carwiseChartData,
      },

    ];
    const options = {
      chart: {
        height: 200,
        type: "scatter",
        animations: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#4285F4", "#c41200", "#3b5998 ", "#00a5db",],
      xaxis: {
        tickAmount: 9,
        type: "category",
        categories: xaxis
      },
      yaxis: {
        tickAmount: 5,
      },
      markers: {
        size: 11,
      },
      fill: {
        type: "image",
        opacity: 1,
        image: {
          src: [
            "/static/assets/images/google_small.svg",
            "/static/assets/images/yelp.svg",
            "/static/assets/images/fb.svg",
            "/static/assets/images/carwise.png",
          ],
          width: 18,
          height: 18,
        },
      },
      legend: {
        show: false,
        labels: {
          useSeriesColors: true
        }
      },
      tooltip: {

        custom: function (props) {
          const { series, seriesIndex, dataPointIndex, seriesNames, w } = props
          const name = w?.globals?.seriesNames[seriesIndex]
          return (
            '<div className="arrow_box" style="padding:5px">' +
            '<p className="m-0">Rating : ' +
            series[seriesIndex][dataPointIndex] +
            '</p>' + '<p className="m-0" style="font-size:11px">' + name + '</p>' +
            "</div>"
          );
        },
      },
    };
    setOptions(options)
    setSeries(series)
  }, [googleChartData, xaxis, yelpChartData, facebookChartData, carwiseChartData]);

  return (
    <Box className="app">
      <Box>
        <Box className="mixed-chart">
          <Chart
            ref={chartRef}
            options={options}
            series={series}
            type="scatter"
            width="100%"
            height="300px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Graph;
