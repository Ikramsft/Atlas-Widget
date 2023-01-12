import { useEffect, useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";

import {
	useDeleteTemplateMutation
} from "services/templateApi";
function DeletePopup({ view, setView, id, accessToken, name, setState, setMessage, fetchTemplateCallback }) {
	const [deleteTemplate, response] = useDeleteTemplateMutation();
	const [status, setStatus] = useState(false);

	const handleDelete = async (id) => {
		console.log("first", response?.isSuccess, id)

		try {
			const result = await deleteTemplate({ id, accessToken });
		} catch (e) {
			console.log(">>>>: src/pages/templates : delete template -> error", e);
			console.log("error", e)
			setMessage(`Something went wrong, please try again. Or read console logs ${e}`)

		}
	};
	useEffect(() => {
		const isDeleted = response?.isSuccess;
		if (isDeleted) {

			successFunction(isDeleted)
		}
	}, [response?.isSuccess,])

	const successFunction = async (value) => {
		if (value) {
			console.log("result", value)
			setState({ open: true, });
			setMessage("Deleted successfully!!")
			setView(false)
			await fetchTemplateCallback();
		} else {
			setState({ open: true, });
			setMessage(result?.error?.data?.result?.error?.message)
		}
	}
	return (
		<Modal isOpen={view} size="sm" className="text-center" toggle={() => setView(!view)}>
			<ModalHeader className="justify-content-center">Are you sure you want to delete {name}?</ModalHeader>
			<ModalFooter className="justify-content-between">
				<Button color="primary" className="rounded-1" onClick={() => setView(false)} >
					Cancel
				</Button>{" "}
				<Button color="danger" className="rounded-1"
					onClick={() => handleDelete(id)}
				>
					Delete
				</Button>
			</ModalFooter>

		</Modal>
	)
}

export default DeletePopup