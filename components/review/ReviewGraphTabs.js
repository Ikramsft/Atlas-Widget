import { Box } from "@mui/material";
import classnames from "classnames";
import { useState } from "react";
import { Nav, NavItem, TabContent, TabPane } from "reactstrap";

import { barChartData } from "data/charts";
import ReviewChart from "./chart/ReviewChart";
import TestimonialsChart from "./chart/TestimonialsChart";


function ReviewGraphTabs({ reviewChartData, testimonialData }) {
  const [activeFirstTab, setActiveFirstTab] = useState("1");
  console.log({ reviewChartData })
  return (
    <>
      <Box>
        {testimonialData?.length > 0 && <Box className="mb-4">
          <Box>
            <Nav tabs className="card-header-tabs mb-4">
              <NavItem>
                <a
                  href="#"
                  className={classnames({
                    active: activeFirstTab === "1",
                    "nav-link": true,
                  })}
                >
                  <span
                    onClick={() => {
                      setActiveFirstTab("1");
                    }}
                  >
                    {" "}
                    Reviews
                  </span>
                </a>
              </NavItem>
              <NavItem>
                <a
                  href="#"
                  className={classnames({
                    active: activeFirstTab === "2",
                    "nav-link": true,
                  })}
                >
                  <span
                    onClick={() => {
                      setActiveFirstTab("2");
                    }}
                  >
                    {" "}
                    Testimonials
                  </span>
                </a>
              </NavItem>
              {/* <NavItem>
                <a
                  href="#"
                  className={classnames({
                    active: activeFirstTab === "3",
                    "nav-link": true,
                  })}
                >
                  <span
                    onClick={() => {
                      setActiveFirstTab("3");
                    }}
                  >
                    {" "}
                    Bulk Reviews
                  </span>
                </a>
              </NavItem> */}
            </Nav>
          </Box>

          <TabContent activeTab={activeFirstTab} className="pt-2">
            <TabPane tabId="1">
              <Box className="relative">
                {/* <Countpopup date="6" count="23" type="Reviews" /> */}
                <ReviewChart data={reviewChartData} />
              </Box>
            </TabPane>
            <TabPane tabId="2">
              <Box className="relative">
                {/* <Countpopup date="6" count="28" type="Testimonials" /> */}
                <TestimonialsChart data={barChartData} />
              </Box>
            </TabPane>
            {/* <TabPane tabId="3">
              <Box className="relative">
                <Countpopup date="6" count="28" type="Testimonials" />
                <BulkReviewChart data={barChartData} />
              </Box>
            </TabPane> */}
          </TabContent>
        </Box>}
        <Box className="relative mb-4">
          {/* <Countpopup date="6" count="23" type="Reviews" /> */}
          <ReviewChart data={reviewChartData} />
          {/* <Test data={reviewChartData} /> */}
        </Box>
      </Box>
    </>
  );
}

export default ReviewGraphTabs;
