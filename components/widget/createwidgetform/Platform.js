
import { Colxx } from "components/common/CustomBootstrap";
import { Field, Form, Formik } from "formik";
import { FormGroup, Label, Row } from "reactstrap";

function Platform({ forms, fields, validateSchema, validateOnMount }) {
	const validateName = (value) => {
		let error;
		if (!value) {
			error = 'Please enter company name';
		} else if (value.length < 2) {
			error = 'Must be longer than 2 characters';
		}
		return error;
	};

	const validateWebsite = (value) => {
		let error;
		if (!value) {
			error = 'Please enter website';
		} else if (value.length < 2) {
			error = 'Value must be longer than 2 characters';
		} else if (!value.includes(".com")) {
			error = 'Must be a valid website';
		}
		else if (!value.includes("https://")) {
			error = 'Must be a valid domain';
		}
		return error;
	};
	return (

		<div className="wizard-basic-step">
			<Formik
				innerRef={forms[0]}
				initialValues={{
					name: fields.name,
					domain_name: fields.domain_name,
				}}
				validateSchema
				validateOnMount
				enableReinitialize
				onSubmit={() => { }}
			>
				{({ errors, touched }) => (
					<Form className="av-tooltip tooltip-label-bottom">
						<div className="  border-bottom py-2 mb-4">
							<h3>Company</h3>
						</div>
						<Row>
							<Colxx md="6">
								<FormGroup>
									<Label>Widget Name</Label>
									<Field
										className="form-control"
										name="name"
										validate={validateName}

									/>
									{errors.name && touched.name && (
										<div className="invalid-feedback d-block">
											{errors.name}
										</div>
									)}
								</FormGroup>
							</Colxx>
							<Colxx md="6">
								<FormGroup>
									<Label>Connect Website</Label>
									<Field
										className="form-control"
										name="domain_name"
										validate={validateWebsite}
									/>
									{errors.domain_name && touched.domain_name && (
										<div className="invalid-feedback d-block">
											{errors.domain_name}
										</div>
									)}
								</FormGroup>
							</Colxx>
						</Row>


					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Platform