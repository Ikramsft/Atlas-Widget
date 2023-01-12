/* eslint-disable prefer-rest-params */
import { Chart } from "chart.js";
import { useEffect, useRef, useState } from "react";

import { lineChartOptions } from "./config";
import { chartTooltip } from "./util";

const Line = ({ data, shadow = false }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);
  const [chartOptions, setChartOptions] = useState([]);
  useEffect(() => {
    if (data) {

      const lineChartOptions = {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: chartTooltip,
        plugins: {
          datalabels: {
            display: false,
          },
          afterDraw: function (chart) {
            console.log('After draw: ', chart);
            console.log('Title: ', chart.options.title.text);
            console.log(chart.data.datasets[0].data.length, chart.canvas.id, chart.data.datasets[0].data);
            if (chart.data.datasets[0].data.length === 0) {
              // No data is present
              var ctx = chart.chart.ctx;
              var width = chart.chart.width;
              var height = chart.chart.height;
              chart.clear();

              ctx.save();
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = "16px normal 'Helvetica Nueue'";
              // chart.options.title.text <=== gets title from chart 
              // width / 2 <=== centers title on canvas 
              // 18 <=== aligns text 18 pixels from top, just like Chart.js 
              ctx.fillText('My Chart Title', width / 2, 18); // <====   ADDS TITLE
              ctx.fillText('No data to display for selected time period', width / 2, height / 2);
              ctx.restore();
            }
          }

        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
                lineWidth: 1,
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                // min: 50,
                // max: 70,
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
    }
    setChartOptions(lineChartOptions)
  }, [data])

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.controllers.lineWithShadow = Chart.controllers.line;
        Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
          draw(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);
            const {
              chart: { ctx },
            } = this;
            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,0.15)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            ctx.responsive = true;
            ctx.stroke();
            Chart.controllers.line.prototype.draw.apply(this, arguments);
            ctx.restore();
          },
        });
      }
      const context = chartContainer.current.getContext("2d");
      let newChartInstance
      newChartInstance = new Chart(context, {
        type: shadow ? "lineWithShadow" : "line",
        options: chartOptions,
        data,
      });
      if (newChartInstance) {
        newChartInstance.update();
      }
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

export default Line;
