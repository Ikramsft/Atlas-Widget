import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { PLACEHOLDER } from "../../../lib/constants";
import BsTextField from "../BsTextField";
// import { BlackTextField } from "../RsTextField";

const Password = React.forwardRef(({ type, placeholder, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BsTextField
      type={showPassword ? "text" : "password"}
      autoComplete="off"
      label={props.label}
      placeholder={PLACEHOLDER.PASSWORD}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      {...props}
    />
  );
});

export default Password;
