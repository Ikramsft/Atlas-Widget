import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Button, Grid, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppLayout from "layout/AppLayout";
import {
	Card,
	CardBody,
	CustomInput,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	Label
} from "reactstrap";
// const initialValues = {
//   id: 1,
//   emailTitle: "",
//   emailDescription: "",
//   emailVarificationCodeTitle: "",
//   emailVarificationCode: "",
//   emailStepToFollowTitle: "",
//   emailStep1: "",
//   emailStep2: "",
//   emailStep3: "",
//   emailStep4: "",
//   emailCopyRight: "",
// };

function CreateReview() {
	// const [initData, setInitData] = useState(initialValues);

	// var handleSubmit = async (values) => {Cannot read properties of undefined (reading 'handleSubmit')
	//   // familyMembers: [],
	//   // studentDocument: [],
	//   // certificates: [],
	//   // emergencyContact: [],

	//   if (values.certificates?.length === 0) {
	//     openSnackbar("Please add atleast one certificate!");
	//     return 0;
	//   }
	//   Cannot read properties of undefined (reading 'handleSubmit')
	//   }
	//   const result = await submitStudent(values, studentId);
	//   if (result?.status === 200) {
	//     openSnackbar(result.data.message);
	//     // getStudentRecord(studentId)
	//   } else {
	//     openSnackbar(result.message);
	//   }
	// };

	// const formik = useForm(onSubmit, initData);
	// const { handleSubmit, errors, isSubmitting } = Formik;
	return (
		<AppLayout>
			<Grid container>
				<Grid item xs={12}>
					<Card>
						<CardBody>
							<Form className="av-tooltip tooltip-label-bottom create-review-form">
								<Grid container>
									<Grid item xs={12}>
										<FormGroup className="form-group ">
											<Label>
												Customer Info{" "}
												<small>
													(Please enter cell number and/or email address)
												</small>
											</Label>
											<InputGroup className="" size="lg">
												<InputGroupAddon
													addonType="prepend"
													className="input-group-text"
												>
													<span>Name</span>
												</InputGroupAddon>
												<Input />
											</InputGroup>
										</FormGroup>
									</Grid>
									<Grid xs={12}>
										<FormGroup className="form-group ">
											<Label>Contact Details</Label>
										</FormGroup>
									</Grid>
									<Grid container xs={12} sx={{ alignItems: "flex-start" }}>
										<Grid item xs={5}>
											<FormGroup className="form-group ">
												<InputGroup className="" size="lg">
													<InputGroupAddon
														addonType="prepend"
														className="input-group-text"
													>
														<span>Email</span>
													</InputGroupAddon>
													<Input type="email" />
												</InputGroup>
											</FormGroup>
										</Grid>
										<Grid item xs={2}>
											<Box
												sx={{
													textAlign: "center",
													transform: "translateY(50%)",
												}}
											>
												<Typography variant="span" sx={{ fontSize: "10px" }}>
													and/Or
												</Typography>
											</Box>
										</Grid>
										<Grid item xs={5}>
											<FormGroup className="form-group ">
												<InputGroup className="" size="lg">
													<InputGroupAddon
														addonType="prepend"
														className="input-group-text"
													>
														<span>Mobile Number</span>
													</InputGroupAddon>
													<Input />
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
									<Grid item xs={12}>
										<FormGroup className="form-group ">
											<Label>Company Info</Label>
											<InputGroup className="" size="lg">
												<InputGroupAddon
													addonType="prepend"
													className="input-group-text"
												>
													<span>Employee</span>
												</InputGroupAddon>
												<Input />
											</InputGroup>
										</FormGroup>
									</Grid>
									<Grid item xs={12}>
										<FormGroup className="form-group ">
											<InputGroup className="" size="lg">
												<InputGroupAddon
													addonType="prepend"
													className="input-group-text"
												>
													<span>Location</span>
												</InputGroupAddon>
												<Input />
											</InputGroup>
										</FormGroup>
									</Grid>
									<Grid item xs={12}>
										<FormGroup className="form-group ">
											<InputGroup className="" size="lg">
												<InputGroupAddon
													addonType="prepend"
													className="input-group-text"
												>
													<span>Preffered Language</span>
												</InputGroupAddon>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														padding: "0 20px",
														flex: "1 1 auto",
														width: "1%",
														border: "1px solid rgba(0, 0, 0, 0.125)",
													}}
													className=" input-box radio-input-box"
												>
													<CustomInput
														type="radio"
														id="english"
														name="preferredLang"
														label="English"
													/>
													<CustomInput
														type="radio"
														id="french"
														name="preferredLang"
														label="French(Canada)"
													/>
													<CustomInput
														type="radio"
														id="spanish"
														name="preferredLang"
														label="Spanish"
													/>
												</Box>
											</InputGroup>
										</FormGroup>
									</Grid>
									<Grid item xs={12}>
										<FormGroup className="form-group ">
											<Label>Sending Schedule</Label>
											<InputGroup className="" size="lg">
												<InputGroupAddon
													addonType="prepend"
													className="input-group-text"
												>
													<span>Send Immidiately</span>
												</InputGroupAddon>
												<Box
													className=" input-box"
													sx={{
														flex: "1 1 auto",
														width: "1%",
														border: "1px solid rgba(0, 0, 0, 0.125)",
													}}
												>
													<Switch defaultChecked />
												</Box>
											</InputGroup>
										</FormGroup>
									</Grid>
									<Grid xs={12}>
										<Box sx={{ paddingTop: "1rem" }}>
											<Button
												variant="contained"
												type="submit"
												className="float-right btn btn-primary rounded-2"
											>
												Send Request
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Form>
						</CardBody>
					</Card>
				</Grid>
			</Grid>
		</AppLayout>
	);
}

export default CreateReview;
