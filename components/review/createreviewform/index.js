import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

import {
	Card,
	CardBody, Form
} from "reactstrap";
import CompanyInfo from "./CompanyInfo";
import ContactDetails from "./ContactDetails";
import CustomerInfo from "./CustomerInfo";
import SendingSchedule from "./SendingSchedule";

function CreateReviewForm({ values, errors, handleSubmit, handleChange, setFieldValue, isSubmitting, handleDate, date, touched }) {

	return (
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<CardBody>
						<Form
							className="av-tooltip tooltip-label-bottom create-review-form"
							onSubmit={handleSubmit}
						>
							<Grid container>
								<CustomerInfo values={values} errors={errors} touched={touched} handleChange={handleChange} />
								<ContactDetails values={values} errors={errors} touched={touched} handleChange={handleChange} />

								<CompanyInfo values={values} errors={errors} handleChange={handleChange} setFieldValue={setFieldValue} />
								<SendingSchedule values={values} errors={errors} handleChange={handleChange} handleDate={handleDate} date={date} />
								<Grid item xs={12}>
									<Box sx={{ paddingTop: "1rem" }}>
										<Button
											variant="contained"
											type="submit"
											className="float-right btn btn-primary rounded-2"
										>
											{isSubmitting ? "Loading..." : "Send Request"}
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Form>
					</CardBody>
				</Card>
			</Grid>
		</Grid>
	)
}

export default CreateReviewForm