import { Snackbar } from "@mui/material";
import { useForm } from "components/form/useForm";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { withSnackbar } from "react-simple-snackbar";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useCreateCustomerMutation } from "services/reviewApi";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";

const cookies = new Cookies();
const userData = cookies.get("userData");
function AddCustomerPopup({ setView, view, customerDetails }) {
  const [isloading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [requestId, setRequestId] = useState();
  const { openSnackbar, closeSnackbar } = withSnackbar;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [createCustomer, customerResponse] = useCreateCustomerMutation();
  const { data: session, status } = useSession();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
  };
  const [initData, setInitData] = useState(initialValues);

  var onSubmit = async (values) => {
    const customerData = {
      company_id: userData?.user?.companyId,
      companylocation_id: userData?.user?.companyLocationId,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      external_customer_uuid: uuidv4(),
      address: values.address,
      accessToken: session && session?.accessToken,
    };

    try {
      let creatCustomer = await createCustomer(customerData);

      if (creatCustomer?.data?.result?.success) {
        setCustomerId(creatCustomer?.data?.result?.data?.customer_id);
        setView(false);
        setState({ open: true });
        resetForm();
      } else {
        openSnackbar("Something went wrong");
        alert("error");
      }
    } catch (e) {
      console.log(">>>>: src/pages/customer : creatCustomer -> error", e);
    }
  };

  const formik = useForm(onSubmit, initData);
  const {
    handleSubmit,
    errors,
    isSubmitting,
    values,
    handleChange,
    touched,
    resetForm,
  } = formik;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
      <Modal isOpen={view} className="" toggle={() => setView(!view)}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader className="justify-content-center">
            Add Customer Details{" "}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label> Name</Label>
              <Input
                name="name"
                type="text"
                onChange={handleChange("name")}
                value={values.name}
                error={errors.name}
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label> Email</Label>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>
                {" "}
                Mobile <span className="text-muted">optional</span>{" "}
              </Label>
              <Input
                name="mobile"
                type="number"
                min={0}
                onChange={handleChange("mobile")}
                value={values.mobile}
                error={errors.mobile}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                {" "}
                Address <span className="text-muted">optional</span>
              </Label>
              <Input
                name="address"
                type="textarea"
                onChange={handleChange("address")}
                value={values.address}
                error={errors.address}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="justify-content-between">
            <Button color="info" className="" onClick={() => setView(false)}>
              {" "}
              Cancel{" "}
            </Button>
            <Button color="secondary" className="" type="submit">
              {" "}
              {isSubmitting ? "Submitting" : "Add Customer"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Customer Added Successfully!!"
        key={vertical + horizontal}
      />
    </div>
  );
}

export default AddCustomerPopup;
