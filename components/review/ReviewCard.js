import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import moment from "moment";
import "rc-switch/assets/index.css";
// import { useState } from "react";
import {
  Card,
  CardBody
} from "reactstrap";
import ReviewCardText from './ReviewCardText';
function ReviewCard({ item }) {
  // const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  // const [dropdownTemplate, setDropdownTemplate] = useState(false);
  // const [isReply, setIsReply] = useState(false);
  const PlatformIcon = ({ platform }) => {
    const icon = () => {
      if (platform === "googlemaps") {
        return `${process.env.PROD_URL}/static/assets/images/google_small.svg`
      }
      else if (platform === "yelp") {
        return `${process.env.PROD_URL}/static/assets/images/yelp.svg`
      }
      else if (platform === "facecbook") {
        return `${process.env.PROD_URL}/static/assets/images/fb.svg`
      }
      else if (platform === "carwise") {
        return `${process.env.PROD_URL}/static/assets/images/carwise.png`
      }
      return `${process.env.PROD_URL}/static/assets/images/google_small.svg`
    }
    return (
      <>
        <Box><img src={icon()} className="img-thumbnail  rounded-circle list-thumbnail align-self-center xsmall" width="30px" height="30px" alt="thumbnail image" /></Box>
      </>
    )
  }
  function isObject(val) {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
  }
  return (
    <Card className="review-card mb-4 mt-8 ">
      <CardBody>
        <Box className="">
          <Box className="d-flex flex-row mb-3 pb-3 border-bottom justify-content-between align-items-center">
            <Box className="d-flex flex-row ">
              <Box className="align-self-center" >
                <img
                  width="45px"
                  height="45px"
                  src={item?.reviewer?.avatar || `${process.env.PROD_URL}/static/assets/images/user-icon.png`}
                  alt={item?.customer}
                  className="img-thumbnail border-0 rounded-circle list-thumbnail  xsmall"
                />
              </Box>
              <Box className="pl-2">
                <a href="#">
                  <Typography
                    sx={{ fontSize: "15px" }}
                    className="font-weight-medium mb-0"
                  >
                    {item?.reviewer?.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px" }}
                    className="text-muted mb-0 "
                  >
                    {moment(item?.reviewed_at).format("MM/DD/yyyy hh:mm A")}
                  </Typography>
                  <Box className="form-group mb-1">
                    <Rating
                      name="read-only"
                      size="small"
                      color="text-primary"
                      value={item?.rating}
                      readOnly
                    />
                  </Box>
                </a>
              </Box>
            </Box>
            <PlatformIcon platform={item.platform} />
          </Box>
          <Box className="mb-2">
            {isObject(item?.review?.text) ? (item?.review?.text?.map((text) => {
              return <ReviewCardText key={item?.id} text={text} />
            })) : item?.review?.text}
          </Box>
          {/* <Box
            sx={{ display: isReply ? "block" : "none" }}
            className="reply-box"
          >
            <FormGroup row>
              <Input type="textarea" rows="3" />
            </FormGroup>
          </Box> */}

          {/* <Grid
            container
            sx={{ justifyContent: "space-between" }}
            className="mt-3"
          >
            <Grid item sx={12} md={4}>
              <Dropdown
                isOpen={dropdownTemplate}
                toggle={() =>
                  setDropdownTemplate((dropdownTemplate) => !dropdownTemplate)
                }
                className=""
              >
                <DropdownToggle
                  caret
                  color="secondary"
                  outline
                  className="rounded-3"
                >
                  Use a reply template
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>5 star review - with text</DropdownItem>
                  <DropdownItem>5 star review - without text</DropdownItem>
                  <DropdownItem>5 star review_ABC Nissan</DropdownItem>
                  <DropdownItem>Apologies_ABC Nissan</DropdownItem>
                  <DropdownItem>Apology</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Grid>
            <Grid item sx={12} md={3.5}>
              <Box sx={{ display: "flex", alignItems: "start" }}>
                <Dropdown
                  isOpen={dropdownBasicOpen}
                  toggle={() =>
                    setDropdownBasicOpen(
                      (dropdownBasicOpen) => !dropdownBasicOpen
                    )
                  }
                  className=""
                >
                  <DropdownToggle
                    caret
                    color="secondary"
                    outline
                    className="rounded-3 mr-2 p-2"
                  >
                    Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Actions 1</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Actions 2</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button color="primary" outline className="rounded-3  mr-2 p-2">
                  <i className="glyph-icon simple-icon-bubble"></i>
                </Button>
                <Button
                  color="primary"
                  outline
                  className="rounded-3  mr-2 p-2 px-3"
                  onClick={() => {
                    setIsReply(!isReply);
                  }}
                >
                  {isReply ? "Post Reply" : "Reply"}
                </Button>
              </Box>
            </Grid>
          </Grid> */}
        </Box>
      </CardBody>
    </Card>
  );
}

export default ReviewCard;
