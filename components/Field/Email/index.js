import React from "react";
import { LABEL, PLACEHOLDER } from "../../../lib/constants";
import BsTextField from "../BsTextField";

const Email = React.forwardRef(({ type, placeholder, ...props }, ref) => {
  return (
    <BsTextField
      label={LABEL.EMAIL}
      placeholder={PLACEHOLDER.EMAIL}
      autoComplete="off"
      {...props}
    />
  );
});

export default Email;
