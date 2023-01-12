import { FormGroup, Snackbar } from "@mui/material";
import CloseIcon from "components/closeicon";
import { useState } from "react";
import { Button, CustomInput, Form, Input, Label } from "reactstrap";

// import Table from "components/table";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useReviewStatusMutation } from "services/feedbackApi";

const options = [
  {
    id: 1,
    text: "Services was very poor",
  },
  {
    id: 2,
    text: "Worker was lazy",
  },
  {
    id: 3,
    text: "Dont like the service ",
  },
  {
    id: 4,
    text: "Bad attitude ",
  },
  {
    id: 5,
    text: "others",
  },
];

function FeedackPopup({ setView, view, requestId, companyId, companyLocationId }) {
  const [reviewStatus, response] = useReviewStatusMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [alert, setAlert] = useState("");
  const [boxshow, setboxshow] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleSendRequest = async () => {
    setIsLoading(true);
    const statusData = {
      review_received: true,
      recommends: false,
      reason: reason,
    };

    try {
      const sentFeedback = await reviewStatus({
        payload: statusData,
        requestId: requestId,
      });
      if (sentFeedback?.result?.success) {
        setState({ open: true });
        setIsLoading(false);
        setView(false);
        setAlert("Review recieveed, thank you!!")
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setAlert(e)

      console.log(">>>>: landing page/: feedback status -> error", e);
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleRadio = (e) => {
    e.target.value === "others" ? setboxshow(true) : setboxshow(false);
    setReason(e.target.value);
  };
  return (
    <div>
      <Modal
        isOpen={view}
        size="lg"
        className="text-center"
        toggle={() => setView(!view)}
      >
        <ModalHeader className="justify-content-center">
          Please tell us What you do not like{" "}
          <CloseIcon
            customeStyle={{ right: "20px", top: "20px", fontSize: "20px" }}
            handleClose={() => setView(false)}
          />
        </ModalHeader>
        <ModalBody>
          <Form className="feedback-form">
            <div>
              {options.map((item) => {
                return (
                  <FormGroup key={item.id}>
                    <Label className="m-0 d-flex cursor-pointer align-items-center">
                      <CustomInput
                        onChange={(e) => handleRadio(e)}
                        name="reason"
                        type="radio"
                        value={item.text}
                      />
                      <span>{item.text}</span>
                    </Label>
                  </FormGroup>
                );
              })}

              <FormGroup style={{ display: boxshow ? "block" : "none" }}>
                <Label className="m-0 d-flex">
                  <Input
                    name="text"
                    type="textarea"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                  />
                </Label>
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="justify-content-between">
          <Button color="info" className="" onClick={() => setView(false)}>
            Cancel
          </Button>{" "}
          <Button color="secondary" className="" onClick={handleSendRequest}>
            {isLoading ? "loading..." : "Send Request"}
          </Button>
        </ModalFooter>
      </Modal>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={alert}
        key={vertical + horizontal}
      />
    </div>
  );
}

export default FeedackPopup;
