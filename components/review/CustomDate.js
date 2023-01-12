import * as React from "react";

import { Button, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";
import { Colxx } from 'components/common/CustomBootstrap';
import { useState } from 'react';

import CloseIcon from "components/closeicon";
import moment from "moment";
import { useSession } from "next-auth/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { Row } from 'reactstrap';
import { updateSubtitle } from "redux/actions";
export default function CustomDate({ handleClose, fetchReviewChartData, fetchReviews, currentPagination }) {
  const [value, setValue] = React.useState([null, null]);
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const formatedStart = moment(startDateRange).format("YYYY-MM-D");
  const formatedEnd = moment(endDateRange).format("YYYY-MM-D");
  const dispatch = useDispatch()
  const { data: session, loading, status } = useSession();

  const handClick = async () => {
    dispatch(updateSubtitle(`data from ${formatedStart} to ${formatedEnd}`));

    await fetchReviewChartData({
      fromDate: formatedStart,
      toDate: formatedEnd,
      report_type: "reviews_monthly_snapshot",
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    });
    fetchReviews({
      fromDate: formatedStart,
      toDate: formatedEnd,
      page: currentPagination,
      companyId: session && session?.user?.companyId,
      accessToken: session && session?.accessToken
    })
    handleClose();
  }

  return (
    <Box >
      <DialogTitle>Select Dates</DialogTitle>
      <CloseIcon customeStyle={{ right: "15px", top: "20px", fontSize: "25px" }} handleClose={() => handleClose()} />
      <Row className="mb-5">
        <Colxx xxs="6">
          <DatePicker
            selected={startDateRange}
            selectsStart
            startDate={startDateRange}
            endDate={endDateRange}
            onChange={setStartDateRange}
            placeholderText="From Date"
          />
        </Colxx>
        <Colxx xxs="6">
          <DatePicker
            selected={endDateRange}
            selectsEnd
            startDate={startDateRange}
            endDate={endDateRange}
            onChange={setEndDateRange}
            placeholderText="Till Date"
          />
        </Colxx>
      </Row>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="Button" className="btn btn-danger mr-2" onClick={handleClose}>Cancel</Button> <Button type="submit" className="btn btn-primary" onClick={handClick}>Apply</Button>
      </Box>
    </Box>
  );
}
