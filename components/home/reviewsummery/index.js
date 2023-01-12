import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Card } from "reactstrap";

function ReviewSummery({ data }) {
  const [total, setTotal] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [ratingCount, setRatingCount] = useState(0)
  const [finalRatingData, setFinalRatingData] = useState([])


  const checkStar = (rating) => {
    switch (rating) {
      case 1:
        return true
      case 2:
        return true
      case 3:
        return true
      case 4:
        return true
      case 5:
        return true
      default:
        return false
    }
  }

  useEffect(() => {
    if (data) {
      let tempTotal = 0;
      let totalStar5 = 0;
      let totalStar4 = 0;
      let totalStar3 = 0;
      let totalStar2 = 0;
      let totalStar1 = 0;
      let tempData = []

      // data.map((item) => {
      for (let i = 1; i <= 5; i++) {

        const isExist = data.filter(x => x.rating === i)

        if (i === isExist?.[0]?.rating) {
          const obj = data.find(x => x.rating === i)
          tempData.push(obj)
        } else {

          tempData.push({ rating: i, count: 0 })
        }
      }
      // })
      setFinalRatingData(tempData.reverse())
      // console.log("tempData", tempData.reverse())
      data?.map((key) => {


        switch (key.rating) {
          case 1:
            totalStar1 = key.count * 1;
            break;
          case 2:
            totalStar2 = key.count * 2;
            break;
          case 3:
            totalStar3 = key.count * 3;
            break;
          case 4:
            totalStar4 = key.count * 4;
            break;
          case 5:
            totalStar5 = key.count * 5;
            break;
        }
        tempTotal = tempTotal += key.count;
        setTotal(tempTotal);
      });
      const sum =
        totalStar5 + totalStar4 + totalStar3 + totalStar2 + totalStar1;
      setTotalStars(sum);
      setRatingCount((totalStars / total)?.toFixed(1))


    }
  }, [data, total, totalStars]);
  const MIN = 0;
  const MAX = total;

  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
  return (
    <Card style={{ padding: 20, marginBottom: 20, height: "90%" }}>
      <p className="list-item-heading  m-0">Review Summary</p>
      <Box className="dashboard_ponit">
        <Typography variant={ratingCount === "NaN" ? "h6" : "h2"}>
          {ratingCount === "NaN" ? "No Rating" : ratingCount}
        </Typography>
        <Box className="dashboard_ponit_star">
          <Rating color="text-primary" value={totalStars} readOnly />
          <p className="text-muted mb-1 text-small">{total} reviews</p>
        </Box>
      </Box>
      <Box
        className="dashboard_pogress"
        sx={{
          "& > div": {
            margin: "20px 0",
          },
        }}
      >
        {finalRatingData?.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{ marginBottom: "15px" }}
              className="dashboard_pogress_point"
            >
              <Typography variant="h5">
                {item.rating} <StarIcon sx={{ fill: "#faaf00" }} />{" "}
              </Typography>
              <Box sx={{ width: "100%", color: "#e09d47" }}>
                <LinearProgress
                  color="inherit"
                  variant="determinate"
                  valueBuffer={total}
                  value={normalise(item ? item.count : item.count === 5 ? 5 : 0)}
                />

              </Box>
              <p className="text-muted mb-1 text-small">
                {item ? item.count : item.count === 5 ? 5 : 0}
              </p>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}

export default ReviewSummery;
