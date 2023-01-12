import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import BsTextField from "components/Field/BsTextField";
import Email from "components/Field/Email";
import Password from "components/Field/Password";
import { LABEL, PLACEHOLDER } from "lib/constants";
function StepOne({ register, setValue, errors, giveError }) {
	return (
		<Box>
			<Grid item mb={2}>
				<BsTextField
					id="name"
					rsVariant="white"
					label={LABEL.NAME}
					placeholder={PLACEHOLDER.NAME}
					{...register("name")}
					error={Boolean(errors.name)}
					helperText={errors.name && errors.name.message}
				/>
			</Grid>
			<Grid item mb={2}>
				<Email
					required={true}
					id="email"
					rsVariant="white"
					{...register("email")}
					error={Boolean(errors.email) || Boolean(giveError("email"))}
					helperText={(errors.email && errors.email.message) || giveError("email")}
					onChange={(event) => {
						setValue("email", event.target.value, {
							shouldValidate: true,
							shouldDirty: true,
						});
					}}
				/>
			</Grid>
			<Grid item mb={2}>
				<Password
					required={true}
					label={LABEL.PASSWORD}
					id="password"
					rsVariant="white"
					{...register("password")}
					error={Boolean(errors.password)}
					helperText={(errors.password && errors.password.message) || giveError("password")}
					onChange={(event) => {
						setValue("password", event.target.value, {
							shouldValidate: true,
							shouldDirty: true,
						});
					}}
				/>
			</Grid>

			<Grid item mb={2}>
				<BsTextField
					id="industry"
					rsVariant="white"
					label={LABEL.INDUSTRY}
					placeholder={PLACEHOLDER.INDUSTRY}
					{...register("industry")}
					error={Boolean(errors.industry)}
					helperText={(errors.industry && errors.industry.message)}
				/>
			</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="phone"
					rsVariant="white"
					label={LABEL.PHONE}
					placeholder={PLACEHOLDER.PHONE}
					{...register("phone")}
					error={Boolean(errors.phone)}
					helperText={errors.phone && errors.phone.message}
				/>
			</Grid>
		</Box>
	)
}

export default StepOne