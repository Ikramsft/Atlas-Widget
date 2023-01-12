import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { infoFormSchema } from "../../../lib/validationSchema";
import CommonInputText from "../CommonTextInput/CommonInputText";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabViewCompany() {
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");
  const [age2, setAge2] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const SelecthandleChange = (event) => {
    setAge(event.target.value);
  };
  const SelecthandleChange2 = (event) => {
    setAge2(event.target.value);
  };
  const BsWhiteInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#2b2b2b",
      width: "100%",
      padding: "10px 12px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  }));
  const { ref: searchTextRef } = usePlacesWidget({
    apiKey: "AIzaSyCVuSbXdFA0crtJlq1Rr-xOIq114425rZE",
    options: {
      types: "geocode",
    },
    onPlaceSelected: (place) => {
      if (place.geometry) {
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        // setSearchText(place.formatted_address)
        // // setStoreData({
        // //   ...storeData, address: place.formatted_address
        // // })
        // setSearchValueForApi({ lat, lng })
        console.error(
          "🚀 ~ file: add.jsx ~ line 174 ~ Add ~ lat, lng",
          lat,
          lng
        );
        // setFlag(true)
      }
    },
  });
  // const giveError = (name) => {
  //   let errorMessage;
  //   if (isCreateUserAccountError || isCreateCompanyError) {
  //     if (CreateUserAccountError?.data?.error?.message?.includes(name)) {
  //       errorMessage = CreateUserAccountError?.data?.error?.message;
  //     } else if (createCompanyError?.data?.error?.message?.includes(name)) {
  //       errorMessage = createCompanyError?.data?.error?.message;
  //     }
  //   }
  //   return errorMessage;
  // };

  const {
    register,
    setValue: setFormValue,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(infoFormSchema),
    mode: "onChange",
  });

  const signUpInfoFormSubmission = async (data) => {
    // console.log(signUpInfoFormData, "signUpFormDatasignUpFormDatasignUpFormData");
    // const httpReadyParams = {
    //   administratorName: signUpInfoFormData.administratorName,
    //   accountIndustry: signUpInfoFormData.accountIndustry,
    //   companyName: signUpInfoFormData.companyName,
    //   website: signUpInfoFormData.website,
    //   googleReview: signUpInfoFormData.googleReview,
    //   yelpReview: signUpInfoFormData.isSuccessVerify,
    // };
    // setHttpCookie(httpReadyParams).then(async () => {
    //   const signUpApiResp = await createCompanyParamas({
    //     name: signUpFormData.company,
    //     email: signUpFormData.email,
    //     password: signUpFormData.password,
    //   });
    // });
  };

  return (
    <Box sx={{ width: "100%" }} className="tab-main">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Plans" {...a11yProps(1)} />
          <Tab label="Billing" {...a11yProps(2)} />
          <Tab label="Review" {...a11yProps(3)} />
          <Tab label="Finish" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className="tab1">
          <Typography variant="h4">Info</Typography>
          <form onSubmit={handleSubmit(signUpInfoFormSubmission)}>
            <CommonInputText
              placeholder="Administrator Name"
              label="Administrator Name"
              id="administratorName"
              {...register("administratorName")}
              error={Boolean(errors.administratorName)}
              helperText={
                errors.administratorName && errors.administratorName.message
              }
              onChange={(event) => {
                setFormValue("administratorName", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            {/* <CommonInputText placeholder="" label="Account Industry" id="accountIndustry" 
            {...register("accountIndustry")}
            error={Boolean(errors.accountIndustry)}
            helperText={
              (errors.accountIndustry && errors.accountIndustry.message)
            }
            onChange={(event) => {
              setValue("accountIndustry", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }} /> */}
            <Box className="select-form">
              <Typography variant="h4">Account Industry</Typography>
              <FormControl sx={{ my: 1, minWidth: 120 }}>
                <Select
                  {...register("accountIndustry")}
                  value={getValues("accountIndustry")}
                  onChange={(event) => {
                    setFormValue("accountIndustry", event.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  // displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>
                    <Typography>Select Industry</Typography>
                  </MenuItem>
                  <MenuItem value={10}>Advertising and Marketing</MenuItem>
                  <MenuItem value={20}>daw and Marketing</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <Box className="select-form">
              <Typography variant="h4">Company Name</Typography>
              <FormControl sx={{ my: 1, minWidth: 120 }}>
                <Select
                  {...register("accountIndustry")}
                  value={getValues("accountIndustry")}
                  onChange={(event) => {
                    console.log(event.target.value, "eventeventevent")
                    setFormValue("accountIndustry", event.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    Select Industry
                  </MenuItem>
                  <MenuItem value={20}>Advertising1</MenuItem>
                  <MenuItem value={30}>Advertising1</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            <CommonInputText
              placeholder=""
              label="Company Name"
              id="website"
              cbFunction={() => {}}
              {...register("companyName")}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName && errors.companyName.message}
              onChange={(event) => {
                setFormValue("companyName", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <TextField
              sx={{ padding: "10px 12px !important" }}
              inputRef={searchTextRef}
              {...register("companyName")}
              onChange={(event) => {
                setFormValue("companyName", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            <CommonInputText
              placeholder="https://example.com"
              label="Website"
              id="website"
              {...register("website")}
              error={Boolean(errors.website)}
              helperText={errors.website && errors.website.message}
              onChange={(event) => {
                setFormValue("website", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <CommonInputText
              placeholder="Google Review"
              label="Google Review"
              id="googleReview"
              {...register("googleReview")}
              error={Boolean(errors.googleReview)}
              helperText={errors.googleReview && errors.googleReview.message}
              onChange={(event) => {
                setFormValue("googleReview", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <CommonInputText
              placeholder="Yelp Reviews"
              label="Yelp Reviews"
              id="yelpReview"
              {...register("yelpReview")}
              error={Boolean(errors.yelpReview)}
              helperText={errors.yelpReview && errors.yelpReview.message}
              onChange={(event) => {
                setFormValue("yelpReview", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            {/* <Grid item mb={4} textAlign="center"> */}
            <Button
              type="submit"
              variant="contained"
              style={{
                color: "#ffffff",
                border: "1px solid #ffffff",
                paddingLeft: "40px",
                paddingRight: "40px",
                marginTop: "20px",
              }}
              // disabled={!isValid || !isDirty }
              size="large"
            >
              {/* {createAccountLoading ? STRING.LOADING : STRING.SIGNUP_BTN} */}
              Submit
            </Button>
            {/* </Grid> */}
          </form>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className="tab1">
          <Typography variant="h4">Info</Typography>
          <CommonInputText placeholder="" label="Administrator Name" />
          <CommonInputText placeholder="" label="Administrator Email" />
          <Box className="select-form">
            <Typography variant="h4">Account Industry</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={SelecthandleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <Typography>Select Industry</Typography>
                </MenuItem>
                <MenuItem value={10}>Advertising and Marketing</MenuItem>
                <MenuItem value={20}>Advertising and Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="select-form">
            <Typography variant="h4">Company Name</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age2}
                onChange={SelecthandleChange2}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">Select Industry</MenuItem>
                <MenuItem value={20}>Advertising1</MenuItem>
                <MenuItem value={30}>Advertising1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CommonInputText placeholder="" label="Website" />
          <CommonInputText placeholder="" label="Google Review" />
          <CommonInputText
            placeholder="This is text field"
            label="Yelp Reviews"
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box className="tab1">
          <Typography variant="h4">Info</Typography>
          <CommonInputText placeholder="" label="Administrator Name" />
          <CommonInputText placeholder="" label="Administrator Email" />
          <Box className="select-form">
            <Typography variant="h4">Account Industry</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={SelecthandleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <Typography>Select Industry</Typography>
                </MenuItem>
                <MenuItem value={10}>Advertising and Marketing</MenuItem>
                <MenuItem value={20}>Advertising and Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="select-form">
            <Typography variant="h4">Company Name</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age2}
                onChange={SelecthandleChange2}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">Select Industry</MenuItem>
                <MenuItem value={20}>Advertising1</MenuItem>
                <MenuItem value={30}>Advertising1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CommonInputText placeholder="" label="Website" />
          <CommonInputText placeholder="" label="Google Review" />
          <CommonInputText
            placeholder="This is text field"
            label="Yelp Reviews"
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box className="tab1">
          <Typography variant="h4">Info</Typography>
          <CommonInputText placeholder="" label="Administrator Name" />
          <CommonInputText placeholder="" label="Administrator Email" />
          <Box className="select-form">
            <Typography variant="h4">Account Industry</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={SelecthandleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <Typography>Select Industry</Typography>
                </MenuItem>
                <MenuItem value={10}>Advertising and Marketing</MenuItem>
                <MenuItem value={20}>Advertising and Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="select-form">
            <Typography variant="h4">Company Name</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age2}
                onChange={SelecthandleChange2}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">Select Industry</MenuItem>
                <MenuItem value={20}>Advertising1</MenuItem>
                <MenuItem value={30}>Advertising1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CommonInputText placeholder="" label="Website" />
          <CommonInputText placeholder="" label="Google Review" />
          <CommonInputText
            placeholder="This is text field"
            label="Yelp Reviews"
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box className="tab1">
          <Typography variant="h4">Info</Typography>
          <CommonInputText placeholder="" label="Administrator Name" />
          <CommonInputText placeholder="" label="Administrator Email" />
          <Box className="select-form">
            <Typography variant="h4">Account Industry</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={SelecthandleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <Typography>Select Industry</Typography>
                </MenuItem>
                <MenuItem value={10}>Advertising and Marketing</MenuItem>
                <MenuItem value={20}>Advertising and Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="select-form">
            <Typography variant="h4">Company Name</Typography>
            <FormControl sx={{ my: 1, minWidth: 120 }}>
              <Select
                value={age2}
                onChange={SelecthandleChange2}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">Select Industry</MenuItem>
                <MenuItem value={20}>Advertising1</MenuItem>
                <MenuItem value={30}>Advertising1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CommonInputText placeholder="" label="Website" />
          <CommonInputText placeholder="" label="Google Review" />
          <CommonInputText
            placeholder="This is text field"
            label="Yelp Reviews"
          />
        </Box>
      </TabPanel>
    </Box>
  );
}
