import Rating from "@mui/material/Rating";
import React from "react";
import { Card, CardBody } from "reactstrap";
const WidgetReviewCard = ({ id, avatar, name, date, rating, review, platform, postedOn, props }) => {
  //   const { id, avatar, name, date, rating, review, platform, postedOn } = props;

  return (
    <div className={`icon-row-item `}>
      <Card style={{ backgroundColor: "#f3f3f3" }} className="widget-review-card">
        <CardBody className="">
          <div className="d-flex align-item-center content-box">
            <div className="avatar-box">
              <img src={avatar} alt={name} />

            </div>
            <div className=" ml-2 name-box ">

              <h6 className=" font-weight-semibold mb-1">
                {name}
              </h6>
              <p className="d-flex align-items-start">
                <Rating size="small" name="read-only" value={rating} readOnly />{" "}
                <span className="card-text ml-2">{date}</span>
              </p>
            </div>
          </div>
          <p>{review}</p>
          <div className="d-flex footer-box">
            <img src={platform} alt={postedOn} />
            <div className="ml-2">
              <p className="m-0 p-0">Posted On</p>
              <p className="card-text">{postedOn}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(WidgetReviewCard);
