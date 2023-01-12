import { Rating } from "@mui/material";
import { Colxx } from "components/common/CustomBootstrap";
import CustomSelectInput from "components/common/CustomSelectInput";
import { Form, Formik } from "formik";
import Image from "next/image";
import Select from 'react-select';
import { Card, CardBody, FormGroup, Label, Row } from "reactstrap";
import { selectData } from "./formData";

function Setup({ forms, fields }) {
	return (
		<div className="wizard-basic-step">
			<Formik
				innerRef={forms[2]}
				initialValues={{
					platform_filter: fields.platform_filter,
					rating_filter: fields.rating_filter,
					order_filter: fields.order_filter,
				}}
				enableReinitialize
				onSubmit={() => { }}
			>
				{({ errors, touched, handleChange, setFieldValue }) => (
					<Form className="av-tooltip tooltip-label-right error-l-75">
						<FormGroup>
							<div className="  border-bottom py-2">
								<h3>Setup Widget</h3>
							</div>
							<Row className="align-items-center">
								<Colxx md="6" className="p-4">
									<Form className="av-tooltip tooltip-label-right">
										<FormGroup>
											<Label>Filter your ratings</Label>
											{/* <Field
												as="select"
												name="rating_filter"
												className="form-control"
												defaultValue={fields.rating_filter}
											>
												<option value="<=5">minimum 5 star</option>
												{/* <option value="5only">5 star only</option> 
											</Field> */}
											<Select
												className="react-select"
												classNamePrefix="react-select"
												// isMulti
												name="rating_filter"
												// value={selectedOptions}
												defaultValue={{ label: "minimum 5 stars", value: { "symbol": "<=", value: "5" } }}
												onChange={(e) => { setFieldValue("rating_filter", e.value) }}
												options={selectData.rating}
											/>
											{/* {errors.rating_filter &&
																	touched.rating_filter && (
																		<div className="invalid-feedback d-block">
																			{errors.rating_filter}
																		</div>
																	)} */}
										</FormGroup>
										<FormGroup>
											<Label>Select Platforms</Label>
											{/* <Field
												as="select"
												name="platform_filter"
												className="form-control"
												defaultValue={fields.platform_filter}

											>
												<option value="google">Google</option>
												<option value="facebook">Facebook</option>
												<option value="yelp">Yelp</option>
											</Field> */}
											<Select
												components={{ Input: CustomSelectInput }}
												className="react-select"
												classNamePrefix="react-select"
												isMulti
												name="platform_filter"
												// value={selectedOptions}
												defaultValue={{ label: 'Google', value: 'google', key: 0 }}
												onChange={(e) => { setFieldValue("platform_filter", e?.map(i => i.value)) }}
												options={selectData.platform}
											/>

											{/* {errors.platform_filter &&
																	touched.platform_filter && (
																		<div className="invalid-feedback d-block">
																			{errors.platform_filter}
																		</div>
																	)} */}
										</FormGroup>
										<FormGroup>
											<Label>Select Order By</Label>
											{/* <Field
												as="select"
												name="order_filter"
												className="form-control"
												defaultValue={fields.order_filter}

											>
												<option value="Asc">Ascending</option>
												<option value="Desc">Descending</option>
											</Field> */}
											<Select
												className="react-select"
												classNamePrefix="react-select"
												name="order_filter"
												defaultValue={{ label: 'Descending', value: 'Desc', key: 1 }}
												onChange={(e) => { setFieldValue("order_filter", e.value) }}
												options={selectData.orderBy}
											/>
											{/* {errors.order_filter &&
																	touched.order_filter && (
																		<div className="invalid-feedback d-block">
																			{errors.order_filter}
																		</div>
																	)} */}
										</FormGroup>
									</Form>
								</Colxx>
								<Colxx md="4" className="p-4">
									<div className="text-center py-2 mb-2 ">
										<Label>Widget preview</Label>
									</div>
									<Card>
										<CardBody className="text-center">
											<Image
												src="/static/assets/images/google_small.svg"
												alt="platform"
												width="25px"
												height="25px"
											/>
											<p>
												<span className="h3 font-weight-bold">4.7</span>{" "}
												<Rating value={5} readOnly />
											</p>
											<a href="#" className="h6 text-underline">
												Read our 151 reviews
											</a>
										</CardBody>
									</Card>
								</Colxx>
							</Row>
						</FormGroup>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Setup;
