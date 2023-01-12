import { Grid } from "@mui/material";

import {
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	Label
} from "reactstrap";
function CompanyInfo({ values, errors, handleChange, setFieldValue }) {
	return (
		<Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
			<Grid item xs={12} lg={6}>
				<FormGroup className="form-group ">
					<Label>Company Info</Label>
					<InputGroup className="">
						<InputGroupAddon
							addonType="prepend"
							className="input-group-text p-3"
						>
							<span>Employee</span>
						</InputGroupAddon>
						<Input
							name="employee"
							onChange={handleChange("employee")}
							value={values.employee}
							placeholder="Employee (Optional)"
						/>
					</InputGroup>
				</FormGroup>
			</Grid>
			<Grid item xs={12} lg={6}>
				<FormGroup className="form-group ">
					<InputGroup className="">
						<InputGroupAddon
							addonType="prepend"
							className="input-group-text p-3"
						>
							<span>Location</span>
						</InputGroupAddon>
						<Input
							name="location"
							onChange={handleChange("location")}
							value={values.location}
							placeholder="Location"
						/>
					</InputGroup>
				</FormGroup>
			</Grid>

		</Grid>
	)
}

export default CompanyInfo