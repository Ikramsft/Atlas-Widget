import { yupResolver } from "@hookform/resolvers/yup";
import SignupStepper from "components/signup/singupstepper";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import tzlookup from "tz-lookup";
import { setHttpCookie } from "../../lib/helperFunction";
import { SignupFormSchema } from "../../lib/validationSchema";
import {
  useCreateCompanyMutation,
  useCreateUserMutation
} from "../../services/userApi";

const SignUp = (props) => {
  const router = useRouter();
  const [
    createCompanyParamas,
    {
      isLoading: createAccountLoading,
      data: createCompanyData,
      status: createCompanyStatus,
      error: createCompanyError,
      isError: isCreateCompanyError,
      isSuccess: isCreateComapnySuccess,
    },
  ] = useCreateCompanyMutation();
  const [
    CreateUserAccountParamas,
    {
      isLoading: createUserAccountLoading,
      data: CreateUserAccountData,
      status: CreateUserAccountStatus,
      error: CreateUserAccountError,
      isError: isCreateUserAccountError,
      isSuccess: isCreateUserAccountSuccess,
    },
  ] = useCreateUserMutation();
  useEffect(() => {
    if (isCreateUserAccountSuccess && CreateUserAccountData) {
      handleSnackbar({
        vertical: 'top',
        horizontal: 'center',
      })
      setHttpCookie({
        user_id: CreateUserAccountData?.result?.data?.user_id,
      }).then(() => {
        router.push("/");
      });
    }
  }, [CreateUserAccountData, isCreateUserAccountSuccess, router]);
  const giveError = (name) => {
    let errorMessage;
    if (isCreateUserAccountError || isCreateCompanyError) {
      if (CreateUserAccountError?.data?.error?.message?.includes(name)) {
        errorMessage = CreateUserAccountError?.data?.error?.message;
      } else if (createCompanyError?.data?.error?.message?.includes(name)) {
        errorMessage = createCompanyError?.data?.error?.message;
      }
    }
    return errorMessage;
  };
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(SignupFormSchema),
    mode: "onChange",
  });

  const [currentCoordinates, setcurrentCoordinates] = useState({
    lat: "",
    long: "",
  });
  const signUpFormSubmission = async (signUpFormData) => {
    const httpReadyParams = {
      name: signUpFormData.company,
      email: signUpFormData.email,
      password: signUpFormData.password,
      industry: signUpFormData.industry,
      phone: signUpFormData.phone,

    };

    setHttpCookie(httpReadyParams).then(async () => {
      const signUpApiResp = await createCompanyParamas({
        name: signUpFormData.company,
        address: signUpFormData.address,
        city: signUpFormData.city,
        zipCode: signUpFormData.zipCode,
        state: signUpFormData.state,
        country: signUpFormData.country,
      });
    });
  };
  const getName = (string) => {
    try {
      if (string && string.split(" ").length > 1) {
        return {
          first_name: string.split(" ")[0],
          last_name: string.split(" ")[1],
        };
      } else {
        return {
          first_name: string.substr(0, string.length / 2),
          last_name: string.substr(string.length / 2, string.length),
        };
      }
    } catch (err) {
      console.log(err, "this is error");
    }
  };

  useEffect(() => {
    if (createCompanyData && isCreateComapnySuccess) {
      if (
        createCompanyData?.result &&
        createCompanyData?.result?.data &&
        createCompanyData?.result?.data?.company_id
      ) {
        setHttpCookie({
          company_id: createCompanyData?.result?.data?.company_id,
        }).then(() => {
          const value = getValues();

          CreateUserAccountParamas({
            company_id: createCompanyData?.result?.data?.company_id,
            companylocation_id: createCompanyData?.result?.data?.companylocation_id,
            email: value.email,
            password: value.password,
            mobile: value.phone,
            city: value.city,
            timezone: tzlookup(currentCoordinates.lat, currentCoordinates.long),
            is_test_user: 1,
            ...getName(value.name),
          });
        });
      }
    }
  }, [CreateUserAccountParamas, createCompanyData, currentCoordinates.lat, currentCoordinates.long, getValues, isCreateComapnySuccess, router]);

  useEffect(() => {
    document.body.classList.add("background");
    document.body.classList.add("no-footer");
    return () => {
      document.body.classList.remove("background");
      document.body.classList.remove("no-footer");
    };
  }, []);

  const geolocFail = () => {
    // setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  };

  const getGpsLocationCallbacks = useCallback(() => {
    const getGpsLocation = () => {
      if ("geolocation" in navigator) {
        var location_timeout = setTimeout(geolocFail, 10000);
        navigator.geolocation.getCurrentPosition(
          function (position) {
            clearTimeout(location_timeout);
            setcurrentCoordinates({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          function (error) {
            clearTimeout(location_timeout);
            geolocFail();
          }
        );
      } else {
        geolocFail();
      }
    };
    getGpsLocation();
  }, [])

  useEffect(() => {
    getGpsLocationCallbacks();
  }, [getGpsLocationCallbacks]);
  return (
    <SignupStepper signUpFormSubmission={signUpFormSubmission} isValid={isValid} isDirty={isDirty} isCreateUserAccountSuccess={isCreateUserAccountSuccess} CreateUserAccountData={CreateUserAccountData} register={register} setValue={setValue} handleSubmit={handleSubmit} errors={errors} giveError={giveError} createAccountLoading={createAccountLoading} createCompanyStatus={createCompanyStatus} />
  );
};

export default SignUp;