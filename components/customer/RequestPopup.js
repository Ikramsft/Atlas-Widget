import { Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "reactstrap";

import { withSnackbar } from "react-simple-snackbar";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
	useCreateRequestMutation
} from "services/reviewApi";

function RequestPopup({ setView, view, customerDetails }) {
	const { data: session, loading, status } = useSession();

	const [createRequest, response] = useCreateRequestMutation();
	const [isloading, setIsLoading] = useState(false);
	const [requestId, setRequestId] = useState();
	const { openSnackbar, closeSnackbar } = withSnackbar;

	const [state, setState] = useState({
		open: false,
		vertical: "top",
		horizontal: "center",
	});
	const { vertical, horizontal, open } = state;

	const handleSendRequest = async () => {
		setIsLoading(true)
		const requestData = {
			customer_id: customerDetails[0]?.id,
			personal_message: "Hi there its Atlas",
			accessToken: session && session?.accessToken
		};
		try {
			const postRequest = await createRequest(requestData);

			if (postRequest?.data?.result?.success) {
				setRequestId(postRequest?.data?.result?.data?.reviewrequest_id);
				// openSnackbar("Request Sent, Thank You!");
				setState({ open: true });
				setIsLoading(false)
				setView(false)
			} else {
				openSnackbar(postRequest?.error?.data?.error?.message);
				setIsLoading(false)

			}
		} catch (e) {
			setIsLoading(false)

			console.log(">>>>: src/pages/customer/request : postRequest -> error", e);
		}
	}
	const handleClose = () => {
		setState({ ...state, open: false });
	};
	return (
		<div>
			<Modal isOpen={view} size="sm" className="text-center" toggle={() => setView(!view)}>
				<ModalHeader className="justify-content-center">Send Review Request?</ModalHeader>

				<ModalBody>
					<div >
						<p className="h5">You are about to send a review request to</p>
						<p className="h5 font-weight-bold"> {customerDetails && customerDetails[0]?.name}</p>
					</div>

				</ModalBody>
				<ModalFooter className="justify-content-between">
					<Button color="primary" className="rounded-1" onClick={() => setView(false)} >
						Cancel
					</Button>{" "}
					<Button color="secondary" className="rounded-1" onClick={handleSendRequest}>
						Send Request
					</Button>
				</ModalFooter>
			</Modal>
			<Snackbar open={open} onClose={handleClose}
				message="Request sent successfully!!"
				key={vertical + horizontal}
			/>
		</div>
	)
}

export default RequestPopup