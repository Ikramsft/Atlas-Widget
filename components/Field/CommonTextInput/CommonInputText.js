import React from "react";
import BsTextField from "../BsTextField";

const CommonInputText = React.forwardRef(({ type, ...props }, ref) => {
  return (
    <BsTextField
      ref={props.ref}
      label={props.label}
      placeholder={props.placeholder}
      autoComplete="off"
      {...props}
    />
  );
});

export default CommonInputText;
