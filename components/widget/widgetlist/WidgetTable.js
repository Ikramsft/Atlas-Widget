/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import Pagination from "components/Pagination";
import { LINKS } from "lib/constants";
import Link from "next/link";
import { Button, Table } from "reactstrap";

// import Table from "components/table";

export default function WidgetTable({ widgetlist, currentPagination, totalPage, fetchWidgetCallback, handleView }) {
	return (
		<>
			<Table hover id="#widgetTable">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Domain Name</th>
						<th>Type</th>
						<th>Controls</th>
					</tr>
				</thead>
				<tbody>
					{widgetlist?.map((item, index) => {
						return (
							<tr key={item?.id}>
								<th scope="row">{index + 1}</th>
								<td>{item?.name}</td>
								<td>{item?.domain_name}</td>
								<td>{item?.details?.type}</td>
								<td>
									<Button color="info"
										className=" p-1 px-3"
										onClick={() => {
											handleView(item.id);
										}}
										data-id={item?.id}
									>
										View
									</Button>{" "}
									<Link
										// href={`/widget/create?id=${item.id}`}
										href={{
											pathname: `${LINKS.CREATE_WIDGET}`,
											query: { pid: item.id },
										}}

										data-id={item?.id}
									>
										<a className="btn btn-primary p-1 px-2">Update</a>

									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Pagination
				scrollTo="#widgetTable"
				currentPage={currentPagination}
				totalPage={totalPage}
				onChangePage={(page) => fetchWidgetCallback(page)}
			/>
		</>
	);
}




