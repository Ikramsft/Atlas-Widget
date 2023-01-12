/* eslint-disable react/no-array-index-key */
import { Box } from "@mui/system";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle } from "reactstrap";

const Summaries = ({ data }) => {

  let total = 0;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const replaceLabel = (str) => {
    switch (str) {
      case 'visit':
        return 'Site visits';
      case 'hover_widget':
        return 'Widget hovered';
      case 'widget_button_hover':
        return 'Widget button hovered';
      case 'widget_open':
        return 'Widget opened';
      case 'hover_review':
        return 'Review hovered';
      case 'widget_close':
        return 'Widget Closed';
      case 'widget_button_click':
        return 'Widget Button Clicked';
      case 'form_submit':
        return 'From submitted';
      case 'read':
        return 'Read';
      case 'call':
        return 'Calls';
      default:
        return 'Not available';
    }
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <Box className="recent_reviews_title">
              <p className="list-item-heading">Visitors Summary</p>
              {/* <p className="list-item-heading">View full report</p> */}
            </Box>
          </CardTitle>
          <div className="dashboard-logs">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Box className="table table-sm table-borderless">
                <Box>
                  {data &&
                    data?.map((log, index) => {
                      const value = log?.type;
                      total += log.count;

                      return (
                        <Box
                          key={index}
                          className="d-flex flex-row mb-3 pb-1 border-bottom"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            className=" pr-2 pb-1"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 5,
                            }}
                          >
                            <span className={`log-indicator align-middle `} />
                            <p className="font-weight-medium mb-0 text-capitalize">
                              {replaceLabel(value)}
                            </p>
                          </Box>
                          <p className="text-muted mb-0 text-small">
                            {numberWithCommas(log.count)}
                          </p>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </PerfectScrollbar>
          </div>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 15,
              paddingLeft: 15,
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <p className="list-item-heading">Total</p>
            <p className="list-item-heading">{numberWithCommas(total)}</p>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};
export default Summaries;
