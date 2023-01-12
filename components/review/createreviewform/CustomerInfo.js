import { Grid } from "@mui/material";

import {
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	Label
} from "reactstrap";
function CustomerInfo({ values, errors, handleChange, touched }) {
	return (
		<Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
			<Grid item xs={12} lg={6} >
				<FormGroup className="form-group ">
					<Label>
						Customer Info{" "}
						<small>(Please enter cell number and/or email address)</small>
					</Label>
					<InputGroup className="">
						<InputGroupAddon
							addonType="prepend"
							className="input-group-text p-3"
						>
							<span>Name</span>
						</InputGroupAddon>
						<Input
							name="name"
							onChange={handleChange("name")}
							value={values.name}
							error={errors.name}
							placeholder="Customer Name"
						/>
					</InputGroup>
					{errors.name && touched.name && (
						<div className="invalid-feedback d-block">{errors.name}</div>
					)}
				</FormGroup>
			</Grid>
			<Grid item xs={12} lg={6}>
				<FormGroup className="form-group ">
					<InputGroup className="">
						<InputGroupAddon
							addonType="prepend"
							className="input-group-text p-3"
						>
							<span>Address</span>
						</InputGroupAddon>
						<Input
							name="address"
							onChange={handleChange("address")}
							value={values.address}
							placeholder="Customer Address"
						/>
					</InputGroup>
				</FormGroup>
			</Grid>
		</Grid>
	);
}

export default CustomerInfo;
