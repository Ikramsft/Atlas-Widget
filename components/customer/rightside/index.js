import { Colxx } from "components/common/CustomBootstrap";
import moment from "moment";
import { useState } from "react";
import { Button, Card, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from "reactstrap";
import RequestPopup from "../RequestPopup";
function RightSide({ customerDetails, }) {
	const [viewRequest, setViewRequest] = useState(false);
	const statsDateformat = customerDetails && moment(customerDetails[0]?.created_at).format("MM/DD/YYYY");
	return (
		<Card className="mb-4 customer-details w-full">
			<CardBody>
				<Row className="">
					<Colxx xxs="12" sm="3">
						<Button
							type="button"
							className=" p-2 bg-white text-center text-primary  w-full rounded-0 shadow-lg"
							onClick={() => setViewRequest(true)}
							style={{ height: "100%" }}

						>
							<i className="iconsminds-mail-favorite m-1" style={{ fontSize: "25px" }}></i>{" "}
							<p className="m-0">Send Request</p>
						</Button>
					</Colxx>

					<Colxx xxs="12" sm="3">
						<Button
							type="button"
							className=" p-2 bg-white text-center text-primary  w-full rounded-0 shadow-lg"
							disabled
							style={{ height: "100%" }}
						>
							<i className="simple-icon-call-out m-1" style={{ fontSize: "25px" }}></i>{" "}
							<p className="m-0">Call</p>
						</Button>
					</Colxx>
					<Colxx xxs="12" sm="3">
						<Button
							type="button"
							className=" p-2 bg-white text-center text-primary  w-full rounded-0 shadow-lg"
							disabled
							style={{ height: "100%" }}

						>
							<i className="iconsminds-mail-add-- m-1" style={{ fontSize: "25px" }}></i>{" "}
							<p className="m-0">Message</p>
						</Button>
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs="12">
						<div className="mb-4 customer-details">
							<div className="details ">
								<FormGroup className="form-group ">
									<Label>Details</Label>
									<InputGroup className="">
										<InputGroupAddon
											addonType="prepend"
											className="input-group-text p-3"
										>
											<span>Name</span>
										</InputGroupAddon>
										<Input name="name" value={customerDetails && customerDetails[0]?.name} readonly />
									</InputGroup>
								</FormGroup>
								<FormGroup className="form-group ">
									<InputGroup className="">
										<InputGroupAddon
											addonType="prepend"
											className="input-group-text p-3"
										>
											<span>Email</span>
										</InputGroupAddon>
										<Input name="email" value={customerDetails && customerDetails[0]?.email} readonly />
									</InputGroup>
								</FormGroup>
								<FormGroup className="form-group ">
									<InputGroup className="">
										<InputGroupAddon
											addonType="prepend"
											className="input-group-text p-3"
										>
											<span>Phone</span>
										</InputGroupAddon>
										<Input name="phone" value={customerDetails && customerDetails[0]?.mobile} readonly />
									</InputGroup>
								</FormGroup>
								<FormGroup className="form-group ">
									<Label>Quick Stats</Label>
									<InputGroup className="">
										<InputGroupAddon
											addonType="prepend"
											className="input-group-text p-3"
										>
											<span>Added By</span>
										</InputGroupAddon>
										<Input name="name" value={customerDetails && customerDetails[0]?.created_by?.name} readonly />
									</InputGroup>
								</FormGroup>
								<FormGroup className="form-group ">
									<InputGroup className="">
										<InputGroupAddon
											addonType="prepend"
											className="input-group-text p-3"
										>
											<span>Added At</span>
										</InputGroupAddon>
										<Input name="rating" value={customerDetails && statsDateformat} readonly />
									</InputGroup>
								</FormGroup>
							</div>
						</div>
					</Colxx>
				</Row>
				<RequestPopup setView={setViewRequest} view={viewRequest} customerDetails={customerDetails} />

			</CardBody>
		</Card>
	)
}

export default RightSide