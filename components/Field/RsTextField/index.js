import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { theme } from "../../../pages/_app";

export const BlackTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#000000",
  },
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
});

export const WhiteTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#ebebeb",
    color: "#000000",
  },
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000000",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
});

export default BlackTextField;
