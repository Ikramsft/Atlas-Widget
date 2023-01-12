import { Colxx } from 'components/common/CustomBootstrap';
import Createwidgetform from 'components/widget/createwidgetform';
import AppLayout from "layout/AppLayout";
import { useRouter } from 'next/router';
import "rc-switch/assets/index.css";
import { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, Row } from "reactstrap";
import {
	useGetWidgetDetailsMutation
} from "services/widgetApi";
function CreateWidget() {
	const router = useRouter()
	const { pid } = router.query;
	const [widgetIdData, setwidgetIdData] = useState([]);
	const [getWidgetDetails] = useGetWidgetDetailsMutation();

	const fetchDataCallback = useCallback((id) => {

		const handleGetData = async (id) => {
			try {
				const result = await getWidgetDetails(id);
				if (result?.data?.result?.success) {
					setwidgetIdData(result?.data?.result?.data?.widgets);
				}
			} catch (e) {
				console.log(">>>>: src/pages/widgetlist : getWidgetDetails -> error", e);
			}
		};
		handleGetData(id)

	}, [getWidgetDetails])

	useEffect(() => {

		if (pid) {
			fetchDataCallback(pid)
		}
	}, [fetchDataCallback, pid])

	return (
		<AppLayout>
			<Row >
				<Colxx xxs="12">
					<Card >
						<CardBody className="">
							<Row className='justify-content-center'>

								<Colxx xxs="12" lg="12" xlg="9" className="mb-5">
									{/* <h5 className="mb-4">Please Give Information</h5> */}
									<Createwidgetform widgetIdData={widgetIdData.length > 0 && widgetIdData} pid={pid} />
								</Colxx>
							</Row>
						</CardBody>
					</Card>
				</Colxx>
			</Row>
		</AppLayout>
	)
}

export default CreateWidget