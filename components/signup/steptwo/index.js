import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import BsTextField from "components/Field/BsTextField";
import { LABEL, PLACEHOLDER } from "lib/constants";
function StepTwo({ register, setValue, errors, giveError }) {

	return (
		<Box> <Grid item mb={2}>
			<BsTextField
				required={true}
				id="company"
				rsVariant="white"
				label={LABEL.COMPANY}
				placeholder={PLACEHOLDER.COMPANY}
				{...register("company")}
				error={Boolean(errors.company) || Boolean(giveError("name"))}
				helperText={errors.company && errors.company.message || giveError("name")}
			/>
		</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="address"
					rsVariant="white"
					label={LABEL.ADDRESS}
					placeholder={PLACEHOLDER.ADDRESS}
					{...register("address")}
					error={Boolean(errors.address)}
					helperText={errors.address && errors.address.message}
				/>
			</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="city"
					rsVariant="white"
					label={LABEL.CITY}
					placeholder={PLACEHOLDER.CITY}
					{...register("city")}
					error={Boolean(errors.city)}
					helperText={errors.city && errors.city.message}
				/>
			</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="zipCode"
					rsVariant="white"
					label={LABEL.ZIPCODE}
					placeholder={PLACEHOLDER.ZIPCODE}
					{...register("zipCode")}
					error={Boolean(errors.zipCode)}
					helperText={errors.zipCode && errors.zipCode.message}
				/>
			</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="state"
					rsVariant="white"
					label={LABEL.STATE}
					placeholder={PLACEHOLDER.STATE}
					{...register("state")}
					error={Boolean(errors.state)}
					helperText={(errors.state && errors.state.message)}
				/>
			</Grid>
			<Grid item mb={2}>
				<BsTextField
					id="country"
					rsVariant="white"
					label={LABEL.COUNTRY}
					placeholder={PLACEHOLDER.COUNTRY}
					{...register("country")}
					error={Boolean(errors.country)}
					helperText={(errors.country && errors.country.message)}
				/>
			</Grid>
		</Box>
	)
}

export default StepTwo