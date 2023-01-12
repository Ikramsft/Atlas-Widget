/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import AddIcon from "@mui/icons-material/Add";
import { LINKS } from "lib/constants";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

// import Table from "components/table";
import {
  useGetWidgetDetailsMutation,
  useGetWidgetMutation
} from "services/widgetApi";
import ViewWidget from "./ViewWidget";
import WidgetTable from "./WidgetTable";

function WidgetList() {
  const [getWidget] = useGetWidgetMutation();
  const [getWidgetDetails] = useGetWidgetDetailsMutation();
  const [widgetlist, setWidgetList] = useState([]);
  const [widgetDetails, setWidgetDetails] = useState([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPagination, onChangePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [view, setView] = useState(false);

  const fetchWidgetCallback = useCallback(
    (page) => {
      const fetchWidgetData = async (page) => {
        setIsLoading(true);
        try {
          const result = await getWidget(page);
          onChangePage(page);
          if (result?.data?.result?.success) {
            setTotalPage(result?.data?.result?.data?.pagination?.page?.total);
            setWidgetList(result?.data?.result?.data?.widgets);
            setIsLoading(false);
          }
        } catch (e) {
          setIsLoading(false);
          console.log(">>>>: src/pages/widgetlist : getWidget -> error", e);
        }
      };
      fetchWidgetData(page);
    },
    [getWidget]
  );
  const handleView = async (id) => {
    setView(true);
    setIsDetailsLoading(true);
    try {
      const result = await getWidgetDetails(id);
      if (result?.data?.result?.success) {
        setWidgetDetails(result?.data?.result?.data?.widgets);
        setIsDetailsLoading(false);
      }
    } catch (e) {
      setIsDetailsLoading(false);
      console.log(">>>>: src/pages/widgetlist : getWidgetDetails -> error", e);
    }
  };

  useEffect(() => {
    fetchWidgetCallback(currentPagination);
  }, []);

  return (
    <Card className="mb-4 mt-4">
      <CardBody>
        <CardTitle className="d-flex justify-content-between align-items-center">
          <h3 className="h4">Widget List</h3>
          <Link href={LINKS.CREATE_WIDGET} passHref>
            <a className=" btn btn-primary font-weight-normal">
              <AddIcon />
              <span>Create</span>
            </a>
          </Link>
        </CardTitle>
        {/* <Table columns={cols} data={widgetlist} /> */}
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <WidgetTable
            widgetlist={widgetlist}
            currentPagination={currentPagination}
            totalPage={totalPage}
            fetchWidgetCallback={fetchWidgetCallback}
            handleView={handleView}
          />
        )}

        <ViewWidget
          widgetDetails={widgetDetails}
          setView={setView}
          view={view}
          isDetailsLoading={isDetailsLoading}
        />
      </CardBody>
    </Card>
  );
}

export default WidgetList;
