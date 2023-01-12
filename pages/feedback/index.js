import { Snackbar } from "@mui/material";
import { Colxx } from "components/common/CustomBootstrap";
import FeedackPopup from "components/feedback/feedbackpopup";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, CardBody, Container, Row } from "reactstrap";
import { useGetHashIdsMutation, useReviewStatusMutation } from "services/feedbackApi";

function LandingPage() {
	const { query } = useRouter();
	const [reviewStatus] = useReviewStatusMutation();
	const [getHashIds] = useGetHashIdsMutation();
	const [requestId, setRequestId] = useState('');
	const [companyId, setCompanyId] = useState('');
	const [companyLocationId, setCompanyLocationId] = useState('');
	const [message, setMessage] = useState('');
	const hashIds = async () => {
		try {
			const token = query && query?.payload?.split('')?.reverse()?.join("");
			const decode = Base64.decode(token);
			const decodedJson = JSON.parse(decode)
			console.log({ decodedJson })
			setRequestId(decodedJson?.reviewrequest_id)
			const result = await getHashIds(decodedJson?.company_id);
			if (result?.data?.result?.success) {
				setCompanyId(result?.data?.result?.data?.company_id)
				setCompanyLocationId(result?.data?.result?.data?.companylocation_id);
			}
		} catch (error) {
			setMessage(error.message)
			setState({ open: true });
			console.log(">>>>: landing page/: Hashid -> error", error.message);
		}
	}
	useEffect(() => {
		hashIds()
	}, [])
	const [view, setView] = useState(false);
	const [state, setState] = useState({
		open: false,
		vertical: "bottom",
		horizontal: "center",
	});
	const { vertical, horizontal, open } = state;
	const sendStatus = async () => {

		const statusData = {
			review_received: true,
		};

		try {
			const postRequest = await reviewStatus({ payload: statusData, requestId: requestId });
			// setRequestId(postRequest?.data?.result?.data?.reviewrequest_id);
			if (postRequest?.result?.success) {
				console.log({ postRequest })
				setState({ open: true });
				location.href = 'https://www.google.com/maps/contrib/116914307670433729093/contribute/@21.179519,79.0757927,15z/data=!4m3!8m2!3m1!1e1'
				setMessage("Recieved successfully, thank you!!")
			} else {
				console.log({ postRequest })
				setMessage(postRequest?.error?.data?.error?.message)
				setState({ open: true });
			}
		} catch (e) {
			console.log(">>>>: landing page/: recommend status -> error", e);
		}
	}

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Colxx xxs="12" lg="6">
					<Card className=" review-landing-page">
						<CardBody>
							<CardBody className="text-center">
								<h1>Your review makes our worker happy!</h1>
								<p>Please tell us how much you liked our services </p>
								<Row className="justify-content-center">
									<Colxx xxs="12" sm="3">
										<div role="button " onClick={sendStatus} className="review-btn review-btn-like link-success tada">
											<i className="iconsminds-like "></i>
										</div>
									</Colxx>
									<Colxx xxs="12" sm="3">
										<div role="button" className="review-btn review-btn-unlike link-danger" onClick={() => setView(true)}>
											<i className="iconsminds-unlike"></i>
										</div>
									</Colxx>
								</Row>
							</CardBody>
						</CardBody>
					</Card>
					<FeedackPopup requestId={requestId} companyId={companyId} companyLocationId={companyLocationId} view={view} setView={setView} />
				</Colxx>
			</Row>
			<Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose}
				message={message}
				key={vertical + horizontal}
			/>
		</Container>
	);
}




export default LandingPage;
