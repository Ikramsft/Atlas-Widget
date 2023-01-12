import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import {
	Card,
	CardBody
} from "reactstrap";
function FloatWidget() {
	return (
		<div style={{ height: "350px" }}>
			<Card className="float-widget relative">
				<CardBody className="text-center d-flex align-items-center">
					<p className="h6 text-underline p-0 m-0 mr-1 font-weight-bold">
						151 reviews on
					</p>
					<Image
						src="/static/assets/images/google_small.svg"
						alt="platform"
						width="30px"
						height="30px"
					/>{" "}
					<span className="p-0 m-0">
						<span className="h4 font-weight-bold ml-1">
							4.7
						</span>{" "}
						<span>
							<StarIcon
								style={{
									fill: "#faaf00",
									transform: "translateY('-4px')",
								}}
							/>
						</span>
					</span>
				</CardBody>
			</Card>
		</div>
	)
}

export default FloatWidget