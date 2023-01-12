import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
	Card,
	CardBody, Input, ListGroup,
	ListGroupItem,
	Spinner
} from "reactstrap";

import {
	useGetCustomerListMutation
} from "services/customerApi";

function LeftSide({ handleCustomerDetails, isSelected }) {

	const [getCustomerList] = useGetCustomerListMutation();
	const [isListLoading, setIsListLoading] = useState(false);

	const [customer, setCustomer] = useState([]);
	const [allCustomer, setAllCustomer] = useState([]);
	const [currentPagination, onChangePage] = useState(1);
	const router = useRouter();
	const [totalPage, setTotalPage] = useState(0);
	const { data: session, loading, status } = useSession();

	const [searchKeyword, setSearchKeyword] = useState("");

	const fetchCustomerCallback = useCallback(
		(params) => {
			const fetchCustomerData = async (params) => {
				setIsListLoading(true)
				try {
					const result = await getCustomerList({
						name: params?.name,
						page: params?.page,
						accessToken: session && session.accessToken
					});
					onChangePage(params?.page);
					if (result?.data?.result?.success) {
						setTotalPage(result?.data?.result?.data?.pagination?.page?.total);
						setCustomer(result?.data?.result?.data?.customers);
						setAllCustomer(result?.data?.result?.data?.customers);
						setIsListLoading(false)

					}
				} catch (error) {
					setIsListLoading(false)

					console.log(
						">>>>: src/pages/Customer : getCustomerList -> error", error);
				}
			};
			fetchCustomerData(params);
		},
		[getCustomerList]
	);
	const handleSearch = (e) => {
		setSearchKeyword(e.target.value)
		fetchCustomerCallback({
			name: e.target.value,
			page: currentPagination
		})
		if (e.target.value === "") {
			return setCustomer(allCustomer)
		}
	}
	useEffect(() => {
		fetchCustomerCallback({
			page: currentPagination,
		});
	}, [currentPagination, fetchCustomerCallback]);

	const handleSearchInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch(e);
		}
	};

	return (
		<Card className="mb-4">
			<CardBody>
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
				<ListGroup>
					{isListLoading ? <div className="text-center"> <Spinner color="primary" className="mb-1" /></div> : (customer.length === 0 ? <p className="text-center">Customer not found</p> : customer?.map((item) => {
						return (
							<ListGroupItem
								action
								active={isSelected === item?.id ? true : false}
								tag="button"
								key={item.id}
								className="cursor-pointer  "
								onClick={() => handleCustomerDetails(item?.id)}
							>
								{item?.name}
							</ListGroupItem>
						);
					}))}
				</ListGroup>
			</CardBody>
		</Card>
	)
}

export default LeftSide