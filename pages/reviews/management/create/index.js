import { Snackbar } from "@mui/material";
import { useForm } from "components/form/useForm";
import CreateReviewForm from "components/review/createreviewform";
import AppLayout from "layout/AppLayout";
import moment from "moment/moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { withSnackbar } from "react-simple-snackbar";
import {
  useCreateCustomerMutation,
  useCreateRequestMutation
} from "services/reviewApi";
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies();
const userData = cookies.get('userData')
function CreateReview() {
  const [createRequest, response] = useCreateRequestMutation();
  const [createCustomer, customerResponse] = useCreateCustomerMutation();
  const { openSnackbar, closeSnackbar } = withSnackbar;
  const [loading, isLoading] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(moment().add(1, "h").format(" YYYY-MM-DDTHH:mm:ss"));

  }, []);
  const initialValues = {
    name: "",
    address: "",
    email: "",
    mobile: "",
    employee: "",
    location: "",
    preferredLang: "English",
    send_at: "",
    personal_message: "",
  };
  const [initData, setInitData] = useState(initialValues);
  const [customerId, setCustomerId] = useState();
  const [requestId, setRequestId] = useState();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const { data: session, status } = useSession();


  var onSubmit = async (values) => {
    const customerData = {
      company_id: userData?.user?.companyId,
      companylocation_id: userData?.user?.companyLocationId,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      external_customer_uuid: uuidv4(),
      address: values.address,
      accessToken: session && session?.accessToken
    };
    try {
      let postCustomer = await createCustomer(customerData);
      setCustomerId(postCustomer?.data?.result?.data?.customer_id);

      if (postCustomer?.data?.result?.success || customerId) {
        const requestData = {
          customer_id:
            customerId || postCustomer?.data?.result?.data?.customer_id,
          personal_message: values.personal_message,
          send_at: values.send_at || date,
          accessToken: session && session?.accessToken
        };
        try {
          const postRequest = await createRequest(requestData);
          setRequestId(postRequest?.data?.result?.data?.reviewrequest_id);
          if (postRequest?.data?.result?.success) {
            setState({ open: true });
          } else {
            openSnackbar(postRequest?.error?.data?.error?.message);
          }
        } catch (e) {
          console.log(">>>>: src/pages/reviews/create : postRequest -> error", e);
        }
      } else {
        openSnackbar(postCustomer?.error?.data?.error?.message);
        alert("error");
      }
    } catch (e) {
      console.log(">>>>: src/pages/reviews/create : postRequest -> error", e);
    }
  };

  const formik = useForm(onSubmit, initData);
  const {
    handleSubmit,
    errors,
    isSubmitting,
    values,
    handleChange,
    setFieldValue,
    touched,
  } = formik;

  const handleDate = (newValue) => {
    setDate(newValue);
    const dateFormated = newValue.format(" YYYY-MM-DDTHH:mm:ss");
    setFieldValue("send_at", dateFormated);
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <AppLayout>
      <CreateReviewForm
        values={values}
        errors={errors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
        handleDate={handleDate}
        date={date}
        touched={touched}
      />
      <Snackbar open={open} onClose={handleClose}
        message="Request created successfully!!"
        key={vertical + horizontal}
      />
    </AppLayout>
  );
}

export default CreateReview;
