/**
 * @format
 */
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "must be more then 2 characters")
    .required("Name cannot be blank"),
  email: Yup.string().email("Must be a valid email address")
    .required("must be a valid email address"),
});

export const useForm = (onSubmit, initialValues = defaultValues) => {
  return useFormik({
    initialValues,
    // enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });
};
