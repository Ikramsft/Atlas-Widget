import { Box } from "@mui/system";
import ReviewAndRating from "components/home/reviewandrating";
import AppLayout from "layout/AppLayout";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { useGetDashboardDataQuery, useGetReviewsDataQuery } from "services/dashboardApi";
import Cookies from 'universal-cookie';
import { addMonths, setValueToStorage } from "utils";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import RecentReview from "../../../components/home/recentreview";
import ReviewSummery from "../../../components/home/reviewsummery";
import Summaries from "../../../components/home/summaries";

function Dashboard({ intl, match }) {
  const { data: session, loading, status } = useSession();
  const cookies = new Cookies()
  const [platforms, setPlatforms] = useState();
  const [currentPagination, onChangePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const currentDate = moment().format("YYYY-MM-DD");
  // const { data: lifetimeData } = useGetDashboardDataQuery({
  //   fromDate: '2000-01-01',
  //   toDate: currentDate,
  //   report_type: "lifetime_summary",
  //   companyId: session && session?.user?.companyId,
  //   accessToken: session && session?.accessToken,
  // })
  const router = useRouter();
  if (cookies.get('reload')) {
    cookies.remove("reload");
    router.reload(window.location.pathname);
  }

  const { data: monthlyRatingData } = useGetDashboardDataQuery({
    fromDate: addMonths(new Date(), -3),
    toDate: currentDate,
    report_type: "lifetime_summary",
    companyId: session && session?.user?.companyId,
    accessToken: session && session?.accessToken,
  })


  const { data: dashboardData } = useGetDashboardDataQuery({
    fromDate: addMonths(new Date(), -6),
    toDate: currentDate,
    report_type: "lifetime_summary",
    companyId: session && session?.user?.companyId,
    accessToken: session && session?.accessToken,
  })

  const { data: reviewsData } = useGetReviewsDataQuery({
    fromDate: addMonths(new Date(), -6),
    toDate: currentDate,
    page: currentPagination,
    order: "DESC",
    platform: platforms,
    companyId: session && session?.user?.companyId,
    accessToken: session && session?.accessToken,
  })

  // useEffect(() => {

  //   const lifetime = lifetimeData?.result?.data?.ratings?.lifetime
  //   const sum = lifetime?.map(item => {
  //     return item.count
  //   })
  //   const totalCount = sum?.reduce((a, b) => a + b, 0)
  //   const recentRating = dashboardData?.result?.data?.ratings?.lifetime
  //   const sumRecentRating = recentRating?.map(item => {
  //     return item.count
  //   })
  //   const totalRecentRating = sumRecentRating?.reduce((a, b) => a + b, 0)
  //   const initialCount = totalCount - totalRecentRating
  //   setInitialCount(initialCount)
  // }, [lifetimeData, dashboardData])



  useEffect(() => {
    setTotalPage(reviewsData?.result?.data?.pagination?.page?.total);
  }, [reviewsData])


  useEffect(() => {
    if (session) {
      cookies.set('userData', session);
      if (typeof window !== 'undefined') {
        setValueToStorage('userData', JSON.stringify(session));
      }
    }
  }, [cookies, session]);

  return (
    <AppLayout >
      <Box>
        <Row>
          <Colxx lg="12" xxs="12">
            <h1 className="mt-2">Dashboard</h1>
            <p className="h6 text-muted">Showing data of last 6 months</p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="4" xl="4">
            <ReviewSummery data={dashboardData && dashboardData?.result?.data?.ratings?.lifetime} />
          </Colxx>
          <Colxx xxs="12" lg="8" className="mb-4">
            <RecentReview
              data={reviewsData && reviewsData?.result?.data?.reviews}
              currentPage={currentPagination}
              totalPage={totalPage}
              onChangePage={(page) => onChangePage(page)}
              accessToken={session && session?.accessToken}
              setPlatforms={setPlatforms}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" className="mb-4">
            <ReviewAndRating data={monthlyRatingData && monthlyRatingData?.result?.data?.ratings?.overtime} />
          </Colxx>
          <Colxx xxs="12" lg="6" className="mb-4">
            <Summaries data={dashboardData && dashboardData?.result?.data?.visitors_actions?.actions} />
          </Colxx>
        </Row>
      </Box>
    </AppLayout>
  );
}

export default Dashboard;
