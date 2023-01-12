import { chartTooltip } from "./util";

export const lineChartOptions = {
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
export const polarAreaChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false,
    },
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
  tooltips: chartTooltip,
};

export const areaChartOptions = {
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: chartTooltip,
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
          stepSize: 10,
          // min: 0,
          // max: 60,
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

export const scatterChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: "rgba(0,0,0,0.1)",
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          min: -80,
          max: 80,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: "rgba(0,0,0,0.1)",
        },
      },
    ],
  },
  tooltips: chartTooltip,

  // legend: {
  //   position: 'bottom',
  //   labels: {
  //     padding: 30,
  //     usePointStyle: true,
  //     fontSize: 12,
  //   },
  // },
  // responsive: true,
  // maintainAspectRatio: false,
  // scales: {
  //   yAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //         drawBorder: false,
  //       },
  //       ticks: {
  //         beginAtZero: true,
  //         stepSize: 20,
  //         min: -80,
  //         max: 80,
  //         padding: 20,
  //       },
  //     },
  //   ],
  //   xAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //       },
  //     },
  //   ],
  // },
};

export const barChartOptions = {
  legend: false,
  // legend: {
  //   position: "top",
  //   labels: {
  //     padding: 30,
  //     usePointStyle: false,
  //     fontSize: 0,
  //   },
  // },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: "rgba(0,0,0,0.1)",
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          // min: 0,
          // max: 40,
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
  tooltips: chartTooltip,
};

export const radarChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false,
    },
  },
  tooltips: chartTooltip,
};

export const pieChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  layout: {
    padding: {
      bottom: 20,
    },
  },
  tooltips: chartTooltip,
};

export const doughnutChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  cutoutPercentage: 80,
  layout: {
    padding: {
      bottom: 20,
    },
  },
  tooltips: chartTooltip,
};

export const smallLineChartOptions = {
  layout: {
    padding: {
      left: 5,
      right: 5,
      top: 10,
      bottom: 10,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        display: false,
      },
    ],
    xAxes: [
      {
        display: false,
      },
    ],
  },
};
