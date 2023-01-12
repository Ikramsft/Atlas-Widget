import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddIcon from "@mui/icons-material/Add";

const Employees = () => {
  return (
    <Box className="main_titlesection">
      <Box className="main_titles">
        <Typography variant="h5">Employees</Typography>
        <Box className="main_titlebtnsection">
          <HelpOutlineIcon />
          <Button variant="contained">
            <AddIcon />
            CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Employees;
