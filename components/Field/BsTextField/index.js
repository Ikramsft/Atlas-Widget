import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import React from "react";

const BsBlackInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    width: "100%",
    padding: "10px 12px",
    border: "1px solid  #c4c4c4"
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

const BsWhiteInput = styled(InputBase)(({ theme }) => ({
  position: "relative",
  borderRadius: 4,
  border: "1px solid #c4c4c4",
  overflow: "hidden",
  "& button": {
    position: "absolute",
    right: "17px",
    padding: "0 5px"
  },
  "label + &": {
    marginTop: "16px",
  },
  "& .MuiInputBase-input": {
    width: "100%",
    padding: "10px 12px",
    color: "var(--black)",

  },
}));

const BsTextField = React.forwardRef(
  ({ rsVariant, helperText, label, error, ...props }, ref) => {
    const textFieldLabelStyles = {
      fontSize: "20px",
      color: "#333",
      fontWeight: "bold",
      fontFamily: "'Nunito', sans-serif",
      paddingLeft: "0",
      marginLeft: "-10px"
    };
    const textFieldStyles = {};
    if (error) {
      textFieldStyles["border"] = "1px solid red";
    }

    // if (rsVariant == "white") {
    //   return (
    //     <FormControl variant="standard" fullWidth>
    //       <InputLabel shrink htmlFor={props.id} style={textFieldLabelStyles}>
    //         {label}
    //       </InputLabel>
    //       <BsWhiteInput
    //         inputRef={ref}
    //         style={textFieldStyles}
    //         onChange={props.onChange}
    //         {...props}
    //       />
    //       <Typography style={{ color: "red" }}>{helperText}</Typography>
    //     </FormControl>
    //   );
    // } else if (rsVariant === "googlemaps") {
    //   <FormControl variant="standard" fullWidth>
    //     <InputLabel shrink htmlFor={props.id} style={textFieldLabelStyles}>
    //       {label}
    //     </InputLabel>
    //     <BsWhiteInput
    //       inputRef={props.ref}
    //       style={textFieldStyles}
    //       onChange={props.onChange}
    //       {...props}
    //     />
    //     <Typography style={{ color: "red" }}>{helperText}</Typography>
    //   </FormControl>;
    // } else {
    //   return (
    //     <FormControl variant="outlined" fullWidth>
    //       <InputLabel shrink htmlFor={props.id} style={textFieldLabelStyles}>
    //         {label}
    //       </InputLabel>
    //       <BsBlackInput
    //         inputRef={ref}
    //         style={textFieldStyles}
    //         onChange={props.onChange}
    //         {...props}
    //       />
    //       <Typography style={{ color: "red" }}>{helperText}</Typography>
    //     </FormControl>
    //   );
    // }

    return (
      <FormControl fullWidth>
        <InputLabel shrink htmlFor={props.id} style={textFieldLabelStyles} required={props.required}>
          {label}
        </InputLabel>
        <BsWhiteInput
          inputRef={ref}
          style={textFieldStyles}
          onChange={props.onChange}
          {...props}
        />
        <Typography style={{ color: "red" }}>{helperText}</Typography>
      </FormControl>
    );
  }
);

export default BsTextField;
