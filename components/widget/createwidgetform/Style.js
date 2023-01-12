
import { Rating } from "@mui/material";
import { Colxx } from "components/common/CustomBootstrap";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { Card, CardBody, FormGroup, Label, Row } from "reactstrap";
function Style({ forms, fields }) {
	return (

		<div className="wizard-basic-step">
			<Formik
				innerRef={forms[2]}
				initialValues={{
					widget_style: fields.widget_style,
				}}
				onSubmit={() => { }}
			// validateOnMount
			>
				<Form className="av-tooltip tooltip-label-right">
					<FormGroup>
						<Label className="mb-4">Select Style</Label>
						<Card>
							<CardBody className="text-center">
								<Row>
									<Colxx md="12">
										<div className="d-flex justify-content-between border-bottom py-2">
											<Label>style 1</Label>
											<span className="btn btn-primary">
												<label htmlFor="widget_style" className="cursor-pointer relative m-0 p-0">
													<Field
														type="radio"
														className="cursor-pointer relative"
														name="widget_style"
														id="widget_style"
														style={{
															width: "0.1px",
															height: "0.1px",
															opacity: "0",
															position: "absolute",
														}}
														value="block"

														rating_filter />
													<span>Select</span>
												</label>
											</span>

										</div>
									</Colxx>
									<Colxx md="4" className="p-4">
										<Card>
											<CardBody className="text-center">
												<Image
													src="/static/assets/images/google_small.svg"
													alt="platform"
													width="25px"
													height="25px"
												/>
												<p>
													<span className="h3 font-weight-bold">
														4.7
													</span>{" "}
													<Rating value={4.7} readOnly />
												</p>
												<a href="#" className="h6 text-underline">
													Read our 151 reviews
												</a>
											</CardBody>
										</Card>
									</Colxx>
								</Row>
							</CardBody>
						</Card>
					</FormGroup>
				</Form>
			</Formik>
		</div>
	)
}

export default Style