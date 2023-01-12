import ImageIcon from "@mui/icons-material/Image";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import StarIcon from "@mui/icons-material/Star";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Button,
  Checkbox,
  Dialog,
  Grid,
  Link,
  Menu,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Box } from "@mui/system";
import AppLayout from "layout/AppLayout";
import Image from "next/image";
import React, { useState } from "react";
import "../../../styles/dashboard.module.css";
import Employees from "../../components/Employees";
import MyMapComponent from "../../components/GoogleMap";
import Header from "../../components/Header";

function createData(tabimg, name, calories, fat, carbs, protein, Status) {
  return { tabimg, name, calories, fat, carbs, protein, Status };
}

const rows = [
  createData(
    "1",
    "Frozen ",
    "bg@sfsjshjfkjfhh",
    "sales",
    "Emplyees",
    "Office Employee",
    "joined 08/08/2019"
  ),
  createData(
    "1",
    "Frozen ",
    "bg@sfsjshjfkjfhh",
    "sales",
    "Emplyees",
    "Office Employee",
    "joined 08/08/2019"
  ),
  createData(
    "1",
    "Frozen ",
    "bg@sfsjshjfkjfhh",
    "sales",
    "Emplyees",
    "Office Employee",
    "joined 08/08/2019"
  ),
  createData(
    "1",
    "Frozen ",
    "bg@sfsjshjfkjfhh",
    "sales",
    "Emplyees",
    "Office Employee",
    "joined 08/08/2019"
  ),
  createData(
    "1",
    "Frozen ",
    "bg@sfsjshjfkjfhh",
    "sales",
    "Emplyees",
    "Office Employee",
    "joined 08/08/2019"
  ),
];

const EmployeesPage = () => {
  const [age, setAge] = React.useState("");
  const [age1, setAge1] = React.useState("");
  const [age2, setAge2] = React.useState("");
  const [editState, setEditState] = React.useState(false);
  const [profileState, setProfileState] = useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checked, setChecked] = React.useState(true);

  const handleChanges = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Header />
      <AppLayout currentUser={null}>
        <Box className="main_dashboard">
          <Employees />
          <Box className="dashboard_select_section">
            <Box className="slect_section">
              <Box className="slect_menu">
                <FormControl sx={{ m: 1, minWidth: 225 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>Active Employees</span>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="slect_menu">
                <FormControl sx={{ m: 1, minWidth: 225 }}>
                  <Select
                    value={age1}
                    onChange={handleChange1}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>All Roles</span>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="slect_menu">
                <FormControl sx={{ m: 1, minWidth: 225 }}>
                  <Select
                    value={age2}
                    onChange={handleChange2}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>All Points Classes</span>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box className="deshboard_select_input">
              <Box className="select_input">
                <Stack
                  component="form"
                  sx={{
                    width: "225px",
                    position: "relative",
                  }}
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="Search Employees"
                    variant="filled"
                    size="small"
                  />
                </Stack>
              </Box>
              <Box className="export_btn">
                <Button variant="text">
                  <SendToMobileIcon />
                  Export
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="dashboard_table_section">
            <Box>
              <Box style={{ height: 400, width: "100%" }}>
                <TableContainer
                  component={Paper}
                  sx={{ backgroundImage: "unset" }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">
                          <SwapVertIcon />
                          Email
                        </TableCell>
                        <TableCell align="left">
                          <SwapVertIcon />
                          Title
                        </TableCell>
                        <TableCell align="left">
                          <SwapVertIcon />
                          Role
                        </TableCell>
                        <TableCell align="left">
                          <SwapVertIcon />
                          Points Class
                        </TableCell>
                        <TableCell align="left">
                          <SwapVertIcon />
                          Status
                        </TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Box className="tableimage">{row.tabimg}</Box>
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.calories}</TableCell>
                          <TableCell align="left">{row.fat}</TableCell>
                          <TableCell align="left">{row.carbs}</TableCell>
                          <TableCell align="left">{row.protein}</TableCell>
                          <TableCell align="left">{row.Status}</TableCell>
                          <TableCell align="right">
                            <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <LinearScaleIcon />
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  setAnchorEl(null);
                                  setEditState(true);
                                }}
                              >
                                Edit Profile
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Dectivate
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Resend Invite
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppLayout>
      <Dialog
        fullWidth
        maxWidth={"xl"}
        open={editState}
        onClose={() => {
          setEditState(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="edit_modal_section">
          <Box className="editmodal_title">
            <Typography variant="h5">Edit Employee</Typography>
            <Box className="edit_modal_btn">
              <Button variant="contained">Save Changes</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Box>
          <Grid container sx={{ background: "#0d1e2d" }}>
            <Grid item xs={10}>
              <Box className="edit_modal_inputsection">
                <Box className="edit_froms">
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">First Name</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl sx={{ m: 0 }} variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="Hello World"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Last Name</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl sx={{ m: 0 }} variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="Hello World"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Email</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl sx={{ m: 0 }} variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="be@bgmatgkdhjj"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Profil View</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <Button
                        variant="text"
                        onClick={() => {
                          setProfileState(true);
                        }}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Box className="edit_froms">
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Skip Customer From</Typography>
                    </Box>
                    <Box className="edit_inputmodal edit_password">
                      <Button variant="text">Changes Password</Button>
                    </Box>
                  </Box>
                </Box>

                <Box className="edit_froms">
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Title</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl
                        sx={{ m: 0, width: "120ch" }}
                        variant="outlined"
                      >
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="Sales"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Role</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl
                        sx={{ m: 0, width: "120ch" }}
                        variant="outlined"
                      >
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="Employees"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">Points Class</Typography>
                    </Box>
                    <Box className="edit_inputmodal">
                      <FormControl
                        sx={{ m: 0, width: "120ch" }}
                        variant="outlined"
                      >
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          // value={values.weight}
                          // onChange={handleChange('weight')}
                          aria-describedby="outlined-weight-helper-text"
                          defaultValue="Office Employee"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname">
                      <Typography variant="h6">
                        Current Points Earned
                      </Typography>
                    </Box>
                    <Box className="Points_edit">
                      <Box className="Points_edit_current">
                        <Typography variant="h5">Requests</Typography>
                        <Typography variant="h6">75</Typography>
                      </Box>
                      <Box className="Points_edit_current">
                        <Typography variant="h5">Reviews</Typography>
                        <Typography variant="h6">75</Typography>
                      </Box>
                      <Box className="Points_edit_current">
                        <Typography variant="h5">Bonus</Typography>
                        <Typography variant="h6">10</Typography>
                      </Box>
                      <Box className="Points_edit_current">
                        <Typography variant="h5">Survey</Typography>
                        <Typography variant="h6">75</Typography>
                      </Box>
                      <Box className="Points_edit_current">
                        <Typography variant="h5">Meet the team</Typography>
                        <Typography variant="h6">0</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="edit_namefrom">
                    <Box className="edit_fromname edit_inpuarea">
                      <Typography variant="h6">Bio</Typography>
                    </Box>
                    <Box className="edit_inputmodal edit_inpuarea">
                      <TextareaAutosize
                        aria-label="Energry professional providing sound advice for my clients for over 30 Years"
                        minRows={3}
                        placeholder="Energry professional providing sound advice for my clients for over 30 Years"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="editmodal_check">
                  <Checkbox
                    checked={checked}
                    onChange={handleChanges}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography>Active</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box className="edit_profile_client">
                <Box className="client_images">
                  <Image
                    width="auto" height="auto"
                    src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/337/af8/e797ca5cab85b8864dd49a290b.jpg"
                    alt="profile Img"
                  />
                </Box>
                <Button variant="text">Edit Photo</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={"xl"}
        open={profileState}
        onClose={() => {
          setProfileState(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="energy_modal_title">
          <ImageIcon />
          <Typography variant="h5">Bpyle Energy</Typography>
        </Box>
        <Box className="energy_modal_section">
          <MyMapComponent
            lat={21.1843631}
            lng={72.7924497}
            defaultZoom={15}
            containerElement={
              <Box style={{ height: `250px`, width: "100%" }} />
            }
            mapOptions={{
              zoomControl: false,
              streetViewControl: false,
              draggable: false,
              fullscreenControl: false,
              mapTypeControl: false,
              disableDefaultUI: true,
            }}
          />
          <Grid container>
            <Grid item xs={7}>
              <Box className="energy_modal_profile">
                <Box className="energy_profile_img">
                  <Box className="profile_img">
                    <Image
                      width="auto" height="auto"
                      src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/337/af8/e797ca5cab85b8864dd49a290b.jpg"
                      alt="profile Img"
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">Brian Egan</Typography>
                    <Typography>Sales</Typography>
                  </Box>
                </Box>
                <Box className="energy_profile_review">
                  <Typography>5.0</Typography>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <Typography>5 Total Reviews</Typography>
                </Box>
              </Box>
              <Box className="energy_profile_contine">
                <Typography>
                  Energry professional providing sound advice for my clients for
                  over 30 Years.{" "}
                </Typography>
                <Box className="profile_contine_review">
                  <Typography>{"Brian Egan's Reviews"}.</Typography>
                  <Link href="#">View all company reviews</Link>
                </Box>
              </Box>
              <Box className="energy_profile_contine_new">
                <Typography>{`There are many variations of passages of Lorem Ipsum available,
                  but the majority have suffered alteration in some form, by injected humour,
                  or randomised words which don't look even slightly believable. If you are
                  going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text....... `}</Typography>
                <Link href="#">More</Link>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box className="energy_information">
                <Box className="energy_information_title">
                  <Typography variant="h6">Company Information </Typography>
                </Box>
                <Box className="information_area">
                  <Box className="information_location">
                    <LocationOnIcon />
                    <Typography>40 W anoaR,Havertown PA 19083, USA</Typography>
                  </Box>
                  <Box className="information_location information_web">
                    <UploadFileIcon />
                    <Typography>www.boylenner.net.</Typography>
                  </Box>
                </Box>
                <Box className="information_media">
                  <Box className="media_img">
                    <Image
                      width="auto" height="auto" src={"/static/assets/images/google.png"} alt="" />
                  </Box>
                  <Box className="media_img">
                    <Image
                      width="auto" height="auto" src={"/static/assets/images/facebook.png"} alt="" />
                  </Box>
                  <Box className="media_img">
                    <Image
                      width="auto" height="auto" src={"/static/assets/images/facebook.png"} alt="" />
                  </Box>
                  <Box className="media_img">
                    <Image
                      width="auto" height="auto" src={"/static/assets/images/facebook.png"} alt="" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};
// export function getServerSideProps({ req, res }) {
//   let response = { props: {} };

//   if (!req.cookies.token) {
//     response.redirect = {
//       permanent: false,
//       destination: "/",
//     };
//     return response;
//   } else if (!req.cookies.user_id) {
//     response.redirect = {
//       permanent: false,
//       destination: "/profile",
//     };
//     return response;
//   }

//   if (req.cookies.userRole) {
//     response.props.user_id = req.cookies.user_id;
//   }
//   if (req.cookies.token) {
//     response.props.token = req.cookies.token;
//   }

//   return response;
// }
export default EmployeesPage;
