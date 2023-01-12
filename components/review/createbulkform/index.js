import { Grid, Snackbar } from "@mui/material";
import { Box } from "@mui/system";

import { Colxx } from "components/common/CustomBootstrap";
import 'dropzone/dist/min/dropzone.min.css';
import { LINKS } from "lib/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { withSnackbar } from "react-simple-snackbar";
import { Button, Card, CardBody, Form, FormGroup, Input, Row, Table } from "reactstrap";
import { useCreateCustomerMutation, useCreateRequestMutation } from "services/reviewApi";
import { v4 as uuidv4 } from 'uuid';

const allowedExtensions = ["csv"];
function CreateBulkForm({ fetchrequestListCallback, currentPagination }) {
	const [data, setData] = useState([]);
	const [userData, setUserData] = useState();
	const [file, setFile] = useState("");
	const [error, setError] = useState("");
	const [createRequest, response] = useCreateRequestMutation();
	const [createCustomer, customerResponse] = useCreateCustomerMutation();
	const [customerId, setCustomerId] = useState();
	const [requestId, setRequestId] = useState();
	const [isLoading, setisLoading] = useState(false);
	const [duplicateEmails, setDuplicateEmails] = useState([]);
	const [successEmails, setSuccessEmails] = useState([]);
	const [message, setMessage] = useState("Request created successfully!!")
	const { data: session, loading, status } = useSession();

	const [state, setState] = useState({
		open: false,
		vertical: "top",
		horizontal: "center",
	});

	const { vertical, horizontal, open } = state;
	const { openSnackbar, closeSnackbar } = withSnackbar;
	const handleClose = () => {
		setState({ ...state, open: false });
	};

	useEffect(() => {
		let userData;
		if (typeof window !== 'undefined') {
			userData = localStorage.getItem("user_data");
		}
		const userJson = JSON.parse(userData);
		setUserData(userJson)
	}, [])

	const handleFileChange = (e) => {
		setError("");
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}
			setFile(inputFile);
		}
	};
	const handleParse = () => {
		if (!file) return setError("Enter a valid file");
		const reader = new FileReader();
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
			const errorEmails = []
			setisLoading(true)
			parsedData.map(async (item) => {

				// (async (customerId) => {
				try {
					const customerData = {
						company_id: session && session?.user?.companyId,
						companylocation_id: session && session?.user?.companyLocationId,
						name: item.name,
						email: item.email,
						mobile: item.mobile,
						external_customer_uuid: uuidv4(),
						address: item.address,
						accessToken: session && session?.accessToken
					};

					let postCustomer = await createCustomer(customerData);
					setCustomerId(postCustomer?.data?.result?.data?.customer_id);
					if (postCustomer?.error?.status === 500) {
						if (typeof document !== 'undefined') {
							alertify.error(`${item.email} already in system!!`)
						}

					} else {
						if (postCustomer?.data?.result?.success) {
							const requestData = {
								customer_id: postCustomer?.data?.result?.data?.customer_id,
								// personal_message: item.personal_message,
								accessToken: session && session?.accessToken,
								emailtemplate_id: 'GKjWMb8B',
								smstemplate_id: 'AO8rnxNd'
								// 
							};
							try {
								const postRequest = await createRequest(requestData);
								setRequestId(postRequest?.data?.result?.data?.reviewrequest_id);
								if (postRequest?.data?.result?.success) {
									setState({ open: true });
									fetchrequestListCallback(currentPagination)
									setisLoading(false)
									if (typeof document !== 'undefined') {

										alertify.success(`Request sent to the ${item.email}!!`)
									}
								} else {
									if (typeof document !== 'undefined') {

										alertify.error(postRequest?.error?.data?.message)
									}

								}
							} catch (e) {
								console.log(">>>>: src/pages/reviews/createbulkform : postRequest -> error", e);
							}
						}
					}
				} catch (e) {

					console.log(">>>>: src/pages/reviews/createbulkform : postRequest -> error", e);
				}
				// })(customerId)
			})
			setisLoading(false)

			setData(parsedData);
		};
		reader.readAsText(file);
	};
	useEffect(() => {
		setData([])
	}, [])


	return (
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<CardBody className="position-relative">
						<Box sx={{ position: "absolute", top: "25px", left: "0", zIndex: "1" }}>
							<Link href={LINKS.REVIEWS_MANAGEMENT}>
								<a className="">
									<i className="simple-icon-arrow-left ml-4 icon-size-md float-left cursor-pointer"></i>
								</a>
							</Link>
						</Box>
						<Row className="pt-4">

							<Colxx xxs="12" lg="7">
								<Form className="position-relative av-tooltip tooltip-label-bottom create-review-form" >

									<div className="mb-4 ">
										<div>
											<h2>Create bulk request</h2>
											<p className="h6">Upload a .csv file and we will handle the rest. Download sample file <a href="/static/assets/images/sample-csv.csv" download className="link-primary">here.</a></p>
										</div>

									</div>
									<FormGroup>
										{/* <DropFile /> */}
										<Input type="file" onChange={handleFileChange} className="form-control" />
										{/* {error ? <div style={{ marginTop: "3rem", color: "red" }}>{error}</div> : null} */}
									</FormGroup>
									<div className="mt-2">
										<Button
											variant="contained"
											type="button"
											disabled={!file || loading}

											onClick={handleParse}
											className=" btn btn-primary "
										>
											{isLoading ? "Sending..." : "Send Request"}
										</Button>
									</div>
								</Form>
							</Colxx>
						</Row>
						<Row className="mt-4">
							<Colxx xxs="12">
								<div >
									{data.length > 0 && <Table >
										<thead>
											<tr>
												<th>name</th>
												<th>address</th>
												<th>email</th>
												<th>mobile</th>
												<th>message</th>
												{/* <th>status</th> */}

											</tr>
										</thead>
										<tbody>
											{
												data?.map((item, index) => {
													return (<tr key={index} >
														<td>{item.name}</td>
														<td>{item.email}</td>
														<td>{item.mobile}</td>
														<td>{item.address}</td>
														<td>{item.personal_message}</td>
														{/* <td>{isLoading ? <i className="simple-icon-info text-warning"></i> : <i className="simple-icon-check text-success"></i>} </td> */}
													</tr>)
												})
											}
										</tbody>
									</Table>
									}
								</div>
							</Colxx>
						</Row>
					</CardBody>
				</Card>
			</Grid>
			<Snackbar open={open} onClose={handleClose}
				message={message}
				key={vertical + horizontal}
			/>
		</Grid>
	)
}

export default CreateBulkForm