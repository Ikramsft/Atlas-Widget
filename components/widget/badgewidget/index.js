import { Rating } from "@mui/material";
import Image from "next/image";
import {
	Card,
	CardBody
} from 'reactstrap';
function BadgeWidget() {
	return (
		<Card>
			<CardBody className="text-center">
				<Image
					src="/static/assets/images/google_small.svg"
					alt="platform"
					width="35px"
					height="35px"
				/>
				<p>
					<span className="h3 font-weight-bold">4.7</span>{" "}
					<Rating value={4.7} readOnly />
				</p>
				<a href="#" className="h6 text-underline">
					Read our 151 reviews
				</a>
			</CardBody>
		</Card>
	)
}

export default BadgeWidget