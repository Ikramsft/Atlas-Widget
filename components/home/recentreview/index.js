import { Box } from "@mui/system";
import CustomSelectInput from "components/common/CustomSelectInput";
import { ThemeColors } from "helpers/ThemeColors";
import moment from "moment";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { Card } from "reactstrap";
import { useGetplatformsQuery } from "services/reviewApi";
import Graph from "./Graph";

function RecentReview({
  data,
  totalPage = 0,
  currentPage = 1,
  numberLimit = 5,
  onChangePage,
  accessToken,
  setPlatforms
}) {

  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [iconArray, setIconArray] = useState([]);
  const [platformList, setPlatformList] = useState([]);
  const [xaxis, setAxis] = useState([]);
  const [platformArr, setPlatformArr] = useState([]);
  const colors = ThemeColors();
  // const [getReviews] = useGetReviewsMutation();

  const { data: getPlatform } = useGetplatformsQuery({ page: 1, accessToken })

  // const fetchReviews = async (params) => {
  //   setIsReviewLoading(true)
  //   console.log({ params })
  //   try {
  //     const result = await getReviews({
  //       fromDate: params.fromDate || addMonths(new Date(), -6),
  //       toDate: params.toDate || addMonths(new Date(), 0),
  //       page: params.page,
  //       order: "DESC",
  //       platform: params.platform,
  //       companyId: session && session?.user?.companyId,
  //       accessToken: session && session?.accessToken
  //     });

  //     onChangePage(params?.page);
  //     if (result?.data?.result?.success) {
  //       setIsReviewLoading(false)

  //       setTotalPage(result?.data?.result?.data?.pagination?.page?.total);
  //       setReviews(result?.data?.result?.data?.reviews);
  //     } else {
  //       setIsReviewLoading(false)

  //     }
  //   } catch (error) {
  //     setIsReviewLoading(false)
  //     console.log(">>>>: src/pages/reviews : fetchReviews -> error", error);
  //   }
  // };
  const handleFilter = (e) => {
    const tempArray = e.map(item => item.value)
    console.log({ tempArray })
    setPlatforms(tempArray)
    // fetchReviews({
    //   fromDate: target?.value,
    //   toDate: addMonths(new Date(), 0),
    //   filter: tempArray,
    //   report_type: target?.value === addMonths(new Date(), -1) ? "lifetime_summary" : "reviews_monthly_snapshot"
    // });
    // setSelectedDays(target);

  }
  useEffect(() => {
    if (getPlatform) {
      let tempArray = []
      getPlatform?.result?.data?.review_platform?.map((item) => {
        if (item.platform === "googlemaps") {
          tempArray.push({ label: 'Google', value: item?.platform, key: 0 },)
        } else {
          tempArray.push({ label: item?.platform, value: item?.platform, key: 0 + 1 },)
        }
      })
      setPlatformList(tempArray)
    } else {
      setPlatformList([])

    }
  }, [getPlatform]);

  useEffect(() => {
    if (data) {
      let tempData = [];
      let tempLabels = [];
      let tempImg = [];
      let tempPlatform = [];
      const xAxisArray = []
      data.map((item) => {
        const icon = new Image(13, 13);
        icon.src = item?.platform === 'googlemaps' ? "/static/assets/images/google_small.svg" : item?.platform === 'yelp' ? "/static/assets/images/yelp.svg" : item?.platform === 'carwise' ? "/static/assets/images/carwise.png" : item?.platform === 'facebook' ? '/static/assets/images/fb.svg' : '';
        icon.setAttribute("style", "position:relative;z-index:9999;border:1px solid red;");
        tempData.push(item?.rating)
        tempPlatform.push(item?.platform)
        tempLabels.push(moment(item?.reviewed_at).format("MM-DD"))
        tempImg.push(icon)
        xAxisArray.push(`${moment(item?.reviewed_at).format("MM-DD").toString()}`)
      });

      setChartLabels(tempLabels.reverse())
      setAxis(xAxisArray)
      setPlatformArr(tempPlatform)
      setChartData(tempData)
      setIconArray(tempImg)
    } else {
      setChartLabels([])
      setChartData([])

    }
  }, [data]);

  let startPoint = 1;
  let endPoint = numberLimit;

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - (numberLimit - 1);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }
  const rightButtonClassName = currentPage <= 1 ? "d-none" : "";
  const leftButtonClassName = currentPage >= totalPage ? "d-none" : "";

  const tempDataSet = {
    labels: chartLabels,
    datasets: [
      {
        label: "reviews",
        data: chartData,
        fill: false,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        showLine: false
      }
    ]
  };
  return (
    <Card style={{ padding: 20, paddingBottom: 40, marginBottom: 20 }} className="relative">
      <Box
        onClick={() => onChangePage(currentPage + 1)}
        sx={{ position: "absolute", bottom: "10px", left: "30px", zIndex: 999 }}
        className={`${leftButtonClassName} cursor-pointer`}
      >
        <i className="simple-icon-arrow-left"></i>
      </Box>
      <Box
        onClick={() => onChangePage(currentPage - 1)}
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "30px",
          zIndex: 999,
        }}
        className={`${rightButtonClassName} cursor-pointer`}
      >
        <i className="simple-icon-arrow-right"></i>
      </Box>
      <Box
        className="recent_reviews_title"
        sx={{
          "& p": {
            margin: "0",
          },
        }}
      >
        <Box sx={{ width: { sx: "100%", sm: "30%" } }}>
          <p className="list-item-heading">Recent Reviews</p>
        </Box>
        {/* <p className="list-item-headinrightButtonClassNameg">Read all reviews</p> */}
        <Box sx={{ width: { sx: "100%", sm: "50%" } }}>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            isMulti
            name="platform_filter"
            // value={selectedOptions}
            defaultValue={''}
            onChange={(e) => handleFilter(e)}
            options={platformList}
          />
        </Box>
      </Box>
      <Box
        sx={{ marginBottom: "2rem" }}
        className="recent_reviews_contain"
      ></Box>
      <div className="chart" >
        <Graph
          data={tempDataSet}
          iconArray={iconArray}
          platformArr={platformArr}
        />
      </div>
    </Card>
  );
}

export default RecentReview;
