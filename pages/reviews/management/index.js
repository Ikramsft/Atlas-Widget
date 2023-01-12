import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import { Separator } from "components/common/CustomBootstrap";
import Pagination from "components/Pagination";
import ReviewCard from "components/review/ReviewCard";
// import Pagination from "components/Pagination";
import ReviewFilter from "components/review/ReviewFilter";
import ReviewGraphTabs from "components/review/ReviewGraphTabs";
import AppLayout from "layout/AppLayout";
import { LINKS } from "lib/constants";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "rc-switch/assets/index.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Spinner } from "reactstrap";
import { useGetDashboardMutation, useGetReviewsMutation } from "../../../services/reviewApi";

function Reviews() {
  const { data: session, loading, status } = useSession();
  const [currentPagination, onChangePage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [getReviews] = useGetReviewsMutation();
  const [reviewChartData, setReviewChartData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [getDashboardData] = useGetDashboardMutation();

  const dyamicSubtitle = useSelector(state => state?.reviewManagement?.subTitle)

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    const formated = moment(date).format("YYYY-MM-D");
    return formated;
  }

  const [type, setType] = useState('reviews_monthly_snapshot')
  function switchChart(type, reviewChartData, testimonialData) {
    console.log({ reviewChartData })
    switch (type) {
      case 'reviews_monthly_snapshot':
        return <ReviewGraphTabs
          reviewChartData={reviewChartData}
          testimonialData={testimonialData}
        />;
      default:
        return <ReviewGraphTabs
          reviewChartData={reviewChartData}
          testimonialData={testimonialData}
        />;
    }
  }

  const fetchReviewChartCallback = useCallback((params) => {
    const fetchReviewChartData = async (params) => {
      try {
        const result = await getDashboardData({
          fromDate: params.fromDate || addMonths(new Date(), -6),
          toDate: params.toDate || addMonths(new Date(), 0),
          report_type: params.report_type,
          companyId: session && session?.user?.companyId,
          accessToken: session && session?.accessToken
        });

        if (result?.data?.result?.success) {
          setType(params.report_type)
          if (params.report_type === "reviews_monthly_snapshot") {
            setReviewChartData(result?.data?.result?.data?.reviews);
          } else if (params.report_type === "lifetime_summary") {
            setReviewChartData(result?.data?.result?.data?.ratings?.overtime);
          } else if (params.report_type === "testimonials_monthly_snapshot") {
            setTestimonialData(result?.data?.result?.data);
          }
        }
      } catch (error) {
        console.log(">>>>: src/pages/reviews : getDashboardData -> error", error);
      }
    };
    fetchReviewChartData(params);
  }, [getDashboardData]);

  const fetchReviews = async (params) => {
    setIsReviewLoading(true)
    console.log({ params })
    try {
      const result = await getReviews({
        fromDate: params.fromDate || addMonths(new Date(), -6),
        toDate: params.toDate || addMonths(new Date(), 0),
        page: params.page,
        order: "DESC",
        platform: params.platform,
        companyId: session && session?.user?.companyId,
        accessToken: session && session?.accessToken
      });

      onChangePage(params?.page);
      if (result?.data?.result?.success) {
        setIsReviewLoading(false)

        setTotalPage(result?.data?.result?.data?.pagination?.page?.total);
        setReviews(result?.data?.result?.data?.reviews);
      } else {
        setIsReviewLoading(false)

      }
    } catch (error) {
      setIsReviewLoading(false)
      console.log(">>>>: src/pages/reviews : fetchReviews -> error", error);
    }
  };

  useEffect(() => {
    fetchReviewChartCallback({
      fromDate: addMonths(new Date(), -6),
      toDate: addMonths(new Date(), 0),
      report_type: "reviews_monthly_snapshot",
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    });
    fetchReviewChartCallback({
      fromDate: addMonths(new Date(), -6),
      toDate: addMonths(new Date(), 0),
      report_type: "testimonials_monthly_snapshot",
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    });
  }, [fetchReviewChartCallback]);
  useEffect(() => {
    fetchReviews({
      fromDate: addMonths(new Date(), -6),
      toDate: addMonths(new Date(), 0),
      page: currentPagination,
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppLayout>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} lg={8.5}>
          <Grid item xs={12}>

            <div className="mb-4">
              <div className="p-3">
                <Grid item sx={{ display: "flex", justifyContent: "space-between", }}>
                  <Box sx={{ "& p": { margin: "0", }, }} >
                    <h1 className="mb-0">Reviews </h1>
                    <p className="h6 text-muted">Showing {dyamicSubtitle} data.</p>
                  </Box>
                  <Box className="">
                    <Link href={LINKS.CREATE_REVIEW_BULK} passHref>
                      <a
                        className=" btn btn-primary  " >
                        <AddIcon />
                        <Typography
                          variant="span"
                          sx={{ fontWeight: "600" }}
                        >
                          Create Bulk
                        </Typography>
                      </a>
                    </Link>
                  </Box>
                </Grid>
                <Separator className="mt-2" />
              </div>
            </div>
          </Grid>
          <Card className="mb-4">
            <CardBody>
              <Grid item xs={12} id="scroll-review">

                {switchChart(type, reviewChartData, testimonialData)}
              </Grid>
            </CardBody>
          </Card>
          {isReviewLoading ? <div className="d-flex justify-content-center"><Spinner color="primary" /></div> : (
            <>
              <Box className="position-relative">
                {reviews.length > 0 ? (reviews?.map((item, index) => {
                  return <ReviewCard item={item} key={item?.id} />
                })) : <Box className="text-center text-muted">No reviews available</Box>}
              </Box>
              <Pagination
                scrollTo="#scroll-review"
                currentPage={currentPagination}
                totalPage={totalPage}
                onChangePage={(page) => fetchReviews({ page })}
              />
            </>
          )
          }
        </Grid>
        <Grid item xs={12} lg={3} sx={{ order: { sm: 1, lg: 2 } }} className="relative">
          <ReviewFilter currentPagination={currentPagination} fetchReviewChartData={fetchReviewChartCallback} fetchReviews={fetchReviews} />
        </Grid>
      </Grid>
    </AppLayout>
  );
}

export default Reviews;