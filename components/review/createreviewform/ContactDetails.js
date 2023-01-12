import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from "reactstrap";

function ContactDetails({ values, errors, handleChange, touched }) {
  return (
    <>
      <Grid xs={12}>
        <FormGroup className="form-group ">
          <Label>Contact Details</Label>
        </FormGroup>
      </Grid>
      <Grid container xs={12} sx={{ alignItems: "flex-start" }}>
        <Grid item xs={5}>
          <FormGroup className="form-group ">
            <InputGroup className="">
              <InputGroupAddon
                addonType="prepend"
                className="input-group-text p-3"
              >
                <span>Email</span>
              </InputGroupAddon>
              <Input
                name="email"
                type="email"
                onChange={handleChange("email")}
                value={values.email}
                error={errors.email}
                placeholder="Email Address"
              />
            </InputGroup>
            {errors.email && touched.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </FormGroup>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              textAlign: "center",
              transform: "translateY(50%)",
            }} setFieldValue
          >
            <Typography variant="span" sx={{ fontSize: "10px" }}>
              and/Or
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <FormGroup className="form-group ">
            <InputGroup className="">
              <InputGroupAddon
                addonType="prepend"
                className="input-group-text p-3"
              >
                <span>Mobile Number</span>
              </InputGroupAddon>
              <Input
                name="mobile"
                onChange={handleChange("mobile")}
                value={values.mobile}
                placeholder="Mobile Number"
              />
            </InputGroup>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ padding: "1rem" }}>
        <Box
          className="text-center text-small px-2"
          sx={{ backgroundColor: "#ffbb3e", padding: "6px" }}
        >
          <Typography variant="p">
            <TipsAndUpdatesIcon /> Hint: Icrease your chances of
            getting a review by providing both email and phone
            number
          </Typography>
        </Box>
      </Grid>
    </>
  )
}

export default ContactDetails