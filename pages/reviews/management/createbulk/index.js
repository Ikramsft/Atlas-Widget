import { Colxx } from "components/common/CustomBootstrap";
import Pagination from "components/Pagination";
import CreateBulkForm from "components/review/createbulkform";
import AppLayout from "layout/AppLayout";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Input, Row, Spinner, Table } from "reactstrap";
import {
	useGetCustomerListMutation
} from "services/customerApi";

import { useGetRequestListMutation } from "services/reviewApi";
function CreateReview() {
	const [getCustomerList] = useGetCustomerListMutation();
	const [getRequestList, response] = useGetRequestListMutation();
	const [currentPagination, onChangePage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [requestList, setrequestList] = useState([]);
	const [allRequest, setAllRequest] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
	const { data: session, loading, status } = useSession();

	const fetchrequestListCallback = useCallback((page, accessToken) => {
		const fetchrequestList = async (page, token) => {
			try {
				setIsLoading(true)
				const result = await getRequestList({ page, accessToken: token });
				onChangePage(page);
				if (result?.data?.result?.success) {
					setTotalPage(result?.data?.result?.data?.pagination?.page?.total);
					setrequestList(result?.data?.result?.data?.review_requests);
					setAllRequest(result?.data?.result?.data?.review_requests);
					setIsLoading(false)
				}
			} catch (error) {
				setIsLoading(false)
				console.log(">>>>: src/pages/createbulk : fetchrequestList -> error", error);
			}
		};
		fetchrequestList(page, accessToken);
	}, [getRequestList]);
	useEffect(() => {
		fetchrequestListCallback(currentPagination, session && session?.accessToken)
	}, [session]);

	const handleSearch = (e) => {
		setSearchKeyword(e.target.value)
		fetchrequestListCallback({
			name: e.target.value,
			page: currentPagination
		})
		if (e.target.value === "") {
			return setrequestList(allRequest)
		}
	}

	const handleSearchInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch(e);
		}
	};

	return (
		<AppLayout>
			<Row>
				<Colxx xxs="12">
					<Row>
						<Colxx xxs="12">
							<CreateBulkForm fetchrequestListCallback={fetchrequestListCallback} currentPagination={currentPagination} />
						</Colxx>
					</Row>
					<Row className="mt-4">
						<Colxx xxs="12">

							<Card className="mb-4">
								<CardBody>
									<CardTitle>
										<h6>Review request list</h6>
									</CardTitle>
									{isLoading ? <div className="text-center"> <Spinner color="primary" className="mb-1" /></div> : (
										<>

											<div className="search">
												<Input
													name="searchKeyword"
													id="searchKeyword"
													placeholder={"Search..."}
													value={searchKeyword}
													onChange={(e) => handleSearch(e)}
													onKeyPress={(e) => handleSearchInputKeyPress(e)}
												/>
												<span
													className="search-icon"
												// onClick={(e) => handleSearchIconClick(e)}
												>
													<i className="simple-icon-magnifier" />
												</span>
											</div>
											<Table hover>
												<thead>
													<tr>
														<th>#</th>
														<th>Cutomer Name</th>
														<th>Requestor</th>
														<th>Delivery</th>
													</tr>
												</thead>
												<tbody>
													{
														requestList?.map((item, index) => {
															return (<tr key={item?.id}>
																<th scope="row">{index + 1}</th>
																<td>{item?.customer?.name}</td>
																<td>{item?.requestor?.name}</td>
																<td>
																	<p>{`Email : ${item?.delivery_status?.email_sent}`}</p>
																	<p>{`SMS : ${item?.delivery_status?.sms_sent}`}</p>
																</td>
															</tr>)
														})
													}
												</tbody>
											</Table>
											<Pagination
												currentPage={currentPagination}
												totalPage={totalPage}
												onChangePage={(page) => fetchrequestListCallback(page)}
											/>
										</>
									)}
								</CardBody>
							</Card>


						</Colxx>
					</Row>
				</Colxx>
			</Row>

		</AppLayout>
	);
}

export default CreateReview;