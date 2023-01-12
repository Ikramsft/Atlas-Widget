import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Logo from "components/Logo";
import Image from "next/image";
import React from "react";
// import flag from "../../../public/static/assets/images/flag.svg"

const Header = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const FlagIcon = () => {
    return (
      <Box sx={{ maxWidth: "20px" }}>
        <Image
          width="100%"
          height="auto"
          src={"/static/assets/images/flag.png"}
          alt="flag icon"
        />
      </Box>
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = () => { };

  return (
    <Box className="Main_header_section">
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ background: "transparent", boxShadow: "unset" }}
          >
            <Toolbar
              sx={{
                padding: { xs: 0 },
                justifyContent: "space-between",
              }}
            >
              <Box className="header_sidesection">
                <Box className="header_logo">
                  <Link
                    href="/"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <Logo />
                  </Link>
                </Box>
                <Box className="header_searchbar">
                  <Stack
                    component="form"
                    sx={{
                      width: "450px",
                      position: "relative",
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      // defaultValue="Search"
                      placeholder="Search..."
                      variant="filled"
                      size="small"
                    />
                    <SearchIcon sx={{ fill: "#7f869c" }} />
                  </Stack>
                </Box>
              </Box>
              {auth && (
                <Box className="header_rightsection">
                  <IconButton
                    sx={{ margin: "0 3px" }}
                    className="header_sendicon"
                  >
                    <i className="glyph-icon simple-icon-paper-plane"></i>
                  </IconButton>
                  <IconButton sx={{ margin: "0 3px" }}>
                    <FlagIcon />
                  </IconButton>
                  <IconButton sx={{ margin: "0 3px" }}>
                    <i className="glyph-icon iconsminds-email"></i>
                  </IconButton>
                  <IconButton sx={{ margin: "0 3px" }}>
                    <i className="glyph-icon simple-icon-bell"></i>
                  </IconButton>

                  <IconButton
                    sx={{ margin: "0 3px" }}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
