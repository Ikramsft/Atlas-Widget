import { Box } from "@mui/material";
import { BarChart } from "components/charts";
import { Colxx } from "components/common/CustomBootstrap";
import { ThemeColors } from "helpers/ThemeColors";
import { useEffect, useState } from "react";
import { Row } from "reactstrap";

const colors = ThemeColors();

const testData = {
  "reviews": [
    {
      "count": 1,
      "month": 4,
      "year": 2022
    },
    {
      "count": 5,
      "month": 8,
      "year": 2022
    }
  ]
}
const testDayData = {
  "reviews": [
    {
      "count": 1,
      "day": 4,
      "month": 6
    },
    {
      "count": 1,
      "day": 8,
      "month": 7
    }
  ]
}



function TestimonialsChart({ data }) {

  const [testimonialData, setTestimonialData] = useState({
    labels: [],
    testimonialData: [],
  });

  useEffect(() => {
    if (data) {
      const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
      let tempData = [];
      let chartTempData = [];
      let tempLabels = [];
      Object.keys(data).map((key) => {
        const yearData = data[key];
        yearData.map((item) => {
          if (item.month) {

            tempLabels.push(`${monthNames[item.month]}/${item.year}`)
            chartTempData.push(item.count)
          } else if (item.day) {
            const d = new Date();
            yearData.map(item => {

              tempLabels.push(`${item.day}/${monthNames[item.month]}`)
              chartTempData.push(item.count)
            })
          }
        })
      });
      // testData.map(item => {
      //   tempLabels.push(`${monthNames[item.month]}/${item.year}`)
      //   chartTempData.push(item.count)
      // })

      setTestimonialData({ labels: tempLabels, testimonialData: chartTempData });
    }
  }, [data]);
  const testimonialBarChartData = {
    labels: testimonialData.labels,
    datasets: [
      {
        label: false,
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: testimonialData.testimonialData,
        borderWidth: 2,
      },
    ],
  };
  return (
    <Row>
      <Colxx sm="12">
        <Box>
          <Box className="chart-container testimonial-chart relative ">
            {/* <Typography
              variant="span"
              className=""
              sx={{
                position: "relative",
                top: "45px",
                left: "37px",
                zIndex: 111,
                backgroundColor: "#f8f8f8",
                color: "#666",
                padding: "5px 10px",
              }}
            >
              {" "}
              6 months snapshot
            </Typography> */}

            <BarChart shadow data={testimonialBarChartData} />
          </Box>
        </Box>
      </Colxx>
    </Row>
  );
}

export default TestimonialsChart;
