import { Grid, Switch, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

import {
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	Label
} from "reactstrap";

function SendingSchedule({ values, errors, handleChange, handleDate, date }) {
	
	const [switchChange, setSwitchChange] = useState(false)
	const handleSwitch = async () => {
		setSwitchChange((state) => !state)

	}
	return (
		<>
			<Grid item xs={12}>
				<FormGroup className="form-group ">
					<Label>Sending Schedule</Label>
					<InputGroup className="">
						<InputGroupAddon
							addonType="prepend"
							className="input-group-text p-3"
						>
							<span>Schedule</span>
						</InputGroupAddon>
						<Box
							className=" input-box"
							sx={{
								flex: "1 1 auto",
								width: "1%",
								border: "1px solid rgba(0, 0, 0, 0.125)",
							}}
						>
							<Switch defaultChecked onChange={handleSwitch} />
						</Box>
					</InputGroup>
				</FormGroup>
			</Grid>
			{
				!switchChange && (
					<>
						<Grid item xs={12}>
							<FormGroup className="form-group ">
								<InputGroup className="">
									<InputGroupAddon
										addonType="prepend"
										className="input-group-text p-3"
									>
										<span>Send At</span>
									</InputGroupAddon>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateTimePicker
											onChange={handleDate}
											value={date}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</InputGroup>
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<FormGroup className="form-group ">
								<InputGroup className="">
									<InputGroupAddon
										addonType="prepend"
										className="input-group-text p-3"
									>
										<span>Send personal_message</span>
									</InputGroupAddon>
									<Input
										type="textarea"
										name="personal_message"
										onChange={handleChange("personal_message")}
										value={values.personal_message}
										placeholder="Ask Anything..."
									/>
								</InputGroup>
							</FormGroup>
						</Grid>
					</>
				)
			}

		</>
	)
}

export default SendingSchedule