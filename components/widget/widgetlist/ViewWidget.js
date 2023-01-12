import { Button, Row } from "reactstrap";

// import Table from "components/table";
import { Colxx } from "components/common/CustomBootstrap";
import moment from "moment";
import Link from "next/link";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import BadgeWidget from "../badgewidget";

function ViewWidget({ widgetDetails, setView, view, isDetailsLoading }) {
	const formatedDate = moment(widgetDetails && widgetDetails[0]?.created_at).format("MM-DD-YYYY")
	return (
		<div>
			<Modal isOpen={view} size="lg" toggle={() => setView(!view)}>
				<ModalHeader>
					<h2>Widget Details</h2>
				</ModalHeader>
				<ModalBody>
					{isDetailsLoading ? (
						<div className="loading"></div>
					) : (
						<>
							<Row>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Widget Name </span> :{" "}
										{widgetDetails[0]?.name}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Website</span> :{" "}
										{widgetDetails[0]?.domain_name}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Widget Type :</span>{" "}
										{widgetDetails[0]?.details?.type}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Platforms</span> :{" "}
										{widgetDetails[0]?.platform_filter?.map((item, index) => (
											<span key={index}>{item} ,</span>
										))}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">rating Type</span> :
										Minimum {widgetDetails[0]?.rating_filter?.value}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Order By</span> :{" "}
										{widgetDetails[0]?.order_filter}
									</p>
								</Colxx>
								<Colxx xxs="12" lg="6">
									<p>
										<span className="font-weight-bold">Created Date</span> :{" "}
										{formatedDate}
									</p>
								</Colxx>
							</Row>
							<Row>
								<Colxx xxs="12" md="5">
									<div>
										<h6 className="mb-4">Preview</h6>
										<div>
											{widgetDetails[0]?.details?.type === "badge" ? (
												<BadgeWidget />
											) : (
												<p className="text-center font-weight-bold text-lg">
													Preview Not available
												</p>
											)}
										</div>
									</div>
								</Colxx>
							</Row>
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Link href="/widget/create" onClick={() => setView(false)} passHref>
						<a className="btn btn-primary">Update</a>

					</Link>{" "}
					<Button color="info" onClick={() => setView(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default ViewWidget