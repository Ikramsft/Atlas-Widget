import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { Card, CardBody, FormGroup } from "reactstrap";
import { updateSubtitle } from "redux/actions";
import CustomDate from "./CustomDate";

const ResponsiveDialog = ({ open, setOpen, fetchReviewChartData, fetchReviews, currentPagination }) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{ padding: "2rem" }}
    >
      <DialogContent sx={{ height: "70vh" }} >
        <CustomDate handleClose={handleClose} currentPagination={currentPagination} fetchReviews={fetchReviews} fetchReviewChartData={fetchReviewChartData} />
      </DialogContent>
    </Dialog>
  );
};
function ReviewFilter({ fetchReviewChartData, fetchReviews, currentPagination }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [selectedDays, setSelectedDays] = useState([{ label: 'Last 6 months', value: addMonths(new Date(), -6), key: 1 }]);
  const [selectedPlatform, setSelectedPlatform] = useState([{ label: 'All Sites', value: 'all', key: 0 }]);
  const [reportType, setReportType] = useState();
  const [customDateData, setCustomDateData] = useState();
  const { data: session, loading, status } = useSession();

  const dispatch = useDispatch()
  const filterData = {
    daysData: [
      { label: 'Last 30 days', value: addMonths(new Date(), -1), key: 0 },
      { label: 'Last 6 months', value: addMonths(new Date(), -6), key: 1 },
      { label: 'Custom', value: 'custom', key: 2 },
    ],
    platform: [
      { label: 'All Sites', value: 'all', key: 0 },
      { label: 'Google', value: 'googlemaps', key: 1 },
      { label: 'Yelp', value: 'yelp', key: 2 },
      { label: 'Facecbook', value: 'facecbook', key: 3 },
      { label: 'Carwise', value: 'carwise', key: 4 },

    ],
    channels: [
      { label: 'All Channels', value: 'all', key: 0 },
      { label: 'SMS', value: 'sms', key: 1 },
      { label: 'Email', value: 'email', key: 2 },

    ]
  }

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    const formated = moment(date).format("YYYY-MM-D");
    return formated;
  }
  const fetchAllData = (target) => {
    if (target?.value === addMonths(new Date(), -1)) {
      setReportType("lifetime_summary")
    } else {

      setReportType("reviews_monthly_snapshot")
    }
    fetchReviewChartData({
      fromDate: target?.value,
      toDate: addMonths(new Date(), 0),
      report_type: target?.value === addMonths(new Date(), -1) ? "lifetime_summary" : "reviews_monthly_snapshot",
      page: currentPagination,
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    });
    fetchReviews({
      fromDate: target?.value,
      toDate: addMonths(new Date(), 0),
      page: currentPagination,
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    })
  }

  const handleDate = (target) => {
    console.log({ target })
    if (target?.value === "custom") {
      target?.value == "custom" && setOpen(true);
    }
    if (target?.value !== "custom") {
      dispatch(updateSubtitle(`${target?.label}`))
      fetchAllData(target)
    }
    setSelectedDays(target);
    setDateLabel(target.label)

  };
  const handlePlatform = (target) => {
    console.log({ target })
    // fetchReviewChartData({
    //   fitler: target?.value,
    //   report_type: reportType,
    //   companyId: session && session?.user?.companyId,
    //   accessToken: session && session?.accessToken
    // });
    fetchReviews({
      platform: target?.value,
      page: currentPagination,
      report_type: reportType,
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    })
    setSelectedPlatform(target);
    // setDateLabel(target.label)

  };

  // useEffect(() => {
  //   dispatch(updateSubtitle(dateLabel))
  // }, [dateLabel, dispatch])

  return (
    <Card className="review-filter sticky sticky-review px-0 mt-3">
      <CardBody className=" px-0">
        <Box
          sx={{
            paddingLeft: "1.5rem",
            paddingRight: "1rem",
          }}
        >
          <h3 className="text-center mb-3">Filter By</h3>
          <FormGroup>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="select-days"
              value={selectedDays}
              onChange={(val) => handleDate(val)}
              options={filterData.daysData}
              defaultValue={{ label: 'Last 6 months', value: addMonths(new Date(), -6), key: 1 }}
            />
          </FormGroup>
          <FormGroup>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="select-site"
              value={selectedPlatform}
              onChange={(val) => handlePlatform(val)}
              options={filterData.platform}
              placeholder="By sites"
            />
          </FormGroup>
          {/* <FormGroup>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              value={selectedChannel}
              onChange={(val) => { setSelectedChannel(val) }}
              options={filterData.channels}
              placeholder="By channels"
            />
          </FormGroup> */}
        </Box>
        <ResponsiveDialog currentPagination={currentPagination} open={open} setOpen={setOpen} fetchReviews={fetchReviews} fetchReviewChartData={fetchReviewChartData} />
      </CardBody>
    </Card>
  );
}

export default ReviewFilter;
