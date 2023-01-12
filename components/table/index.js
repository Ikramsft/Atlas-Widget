

import classnames from 'classnames';
import DatatablePagination from 'components/DatatablePagination';
import { usePagination, useSortBy, useTable } from 'react-table';
import { Button } from 'reactstrap';
function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
	const {
		getTableProps,
		getTableBodyProps,
		prepareRow,
		headerGroups,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: defaultPageSize },
		},
		useSortBy,
		usePagination
	);

	return (
		<>
			<table
				{...getTableProps()}
				className={`r-table table ${classnames({ "table-divided": divided })}`}
			>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr key={index} {...headerGroup.getHeaderGroupProps()}>
							{/* {headerGroup.headers.map((column, columnIndex) => (
								<th
									key={`th_${columnIndex}`}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={
										column.isSorted
											? column.isSortedDesc
												? "sorted-desc"
												: "sorted-asc"
											: ""
									}
								>
									{column.render("Header")}
									<span />
								</th>
							))} */}
							<th>Controls</th>
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<tr key={index}  {...row.getRowProps()}>
								{row.cells.map(
									(cell, cellIndex) => (
										(
											<td
												key={`td_${cellIndex}`}
												{...cell.getCellProps({
													className: cell.column.cellClass,
												})}
											>
												{cell.render("Cell")}
											</td>
										)
									)
								)}
								<td><Button>View</Button></td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<DatatablePagination
				page={pageIndex}
				pages={pageCount}
				canPrevious={canPreviousPage}
				canNext={canNextPage}
				pageSizeOptions={[4, 10, 20, 30, 40, 50]}
				showPageSizeOptions={false}
				showPageJump={false}
				defaultPageSize={pageSize}
				onPageChange={(p) => gotoPage(p)}
				onPageSizeChange={(s) => setPageSize(s)}
				paginationMaxSize={pageCount}
			/>
		</>
	);
}

export default Table;
