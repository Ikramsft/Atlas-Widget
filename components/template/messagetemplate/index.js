import { Box, Typography } from "@mui/material";
import { Colxx } from "components/common/CustomBootstrap";
import moment from "moment";
import { useState } from "react";

import { Button, Form, FormGroup, Input, Row } from "reactstrap";

function MessageTemplate({ data }) {

  const [isEditMessage, setIsEditMessage] = useState(false);
  return (
    <Row className="justify-content-center">


      <Colxx xxs="12" lg="12">
        <Box
          sx={{
            display: isEditMessage ? "none" : "block",
            color: "#555",
            fontSize: "14px",
            backgroundColor: "#ebe8e5",
            width: "90%",
            margin: "2rem auto",
            padding: "30px",
            borderRadius: "5px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "0",
              left: "-20px",
              width: "20px",
              height: "20px",
              borderBottom: "solid 15px transparent ",
              borderLeft: "solid 15px transparent",
              borderRight: "solid 15px #ebe8e5 ",
              borderTop: "solid 15px #ebe8e5 ",
            },
          }}
        >
          <Typography variant="p">

            <Form>
              <p>{data && data[0]?.name}</p>
              <FormGroup row>
                <Input
                  type="textarea"
                  rows="6"
                  value={`${data && data[0]?.content}`}
                />
              </FormGroup>
              <p>{data && data[0]?.subject}</p>
              <p>{data && data[0]?.content}</p>
              <p className="text-muted">Last updated: {moment(data && data[0]?.updated_at).format("MM/DD/YYYY")}</p>
            </Form>
          </Typography>
        </Box>
        <div className="d-flex justify-content-end">
          <Button type='submit' className='btn btn-primary mr-4'>Save</Button>
        </div>
      </Colxx>
    </Row>
  );
}

export default MessageTemplate;
