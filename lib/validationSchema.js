import * as yup from "yup";

export const ValidationMessage = {
  EMAIL_REQUIRED: "Email id is required",
  INVALID_EMAIL: "Invalid email id",
  PASSWORD_REQUIRED: "Password is required",
  STRONG_PASSWORD_REQUIRED:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
  PASSWORD_MISMATCH: "Password and Confirm password should match",
};

export const infoValidationMessage = {
  ADMINISTRATOR_NAME: "Administrator Name is required",
  ACCOUNT_INDUSTRY: "Account Industry is required",
  COMPANY_NAME: "Company Name is required",
  WEBSITE: "Website is required",
  GOOGLE_REVIEW: "Google review is required",
  YELP_REVIEW: "Yelp review is required",
};

export const SigninFormSchema = yup
  .object({
    email: yup
      .string()
      .required(ValidationMessage.EMAIL_REQUIRED)
      .email(ValidationMessage.INVALID_EMAIL),
    password: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      ),
  })
  .required();
export const infoFormSchema = yup
  .object({
    administratorName: yup
      .string()
      .required(infoValidationMessage.ADMINISTRATOR_NAME),
    accountIndustry: yup
      .string()
      .required(infoValidationMessage.ACCOUNT_INDUSTRY),
    companyName: yup.string().required(infoValidationMessage.COMPANY_NAME),
    website: yup.string().required(infoValidationMessage.WEBSITE),
    googleReview: yup.string(),
    yelpReview: yup.string(),
  })
  .required();

export const forgetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required(ValidationMessage.EMAIL_REQUIRED)
      .email(ValidationMessage.INVALID_EMAIL),
  })
  .required();
export const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      ),
    repeat_password: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      ),
  })
  .required();

export const SignupFormSchema = yup
  .object({
    email: yup
      .string()
      .required(ValidationMessage.EMAIL_REQUIRED)
      .email(ValidationMessage.INVALID_EMAIL),
    password: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      ),
  })
  .required();

export const FrgtPassFormSchema = yup
  .object({
    email: yup
      .string()
      .required(ValidationMessage.EMAIL_REQUIRED)
      .email(ValidationMessage.INVALID_EMAIL),
  })
  .required();

export const RstPassFormSchema = yup
  .object({
    password: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      ),
    confirmPassword: yup
      .string()
      .required(ValidationMessage.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        ValidationMessage.STRONG_PASSWORD_REQUIRED
      )
      .oneOf([yup.ref("password"), null], ValidationMessage.PASSWORD_MISMATCH),
  })
  .required();
