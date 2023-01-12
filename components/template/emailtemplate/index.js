/* eslint-disable react/no-danger */
import { Colxx } from "components/common/CustomBootstrap";
import moment from "moment";
import { Button, Row } from "reactstrap";
// import Logo from "/static/assets/logos/logo.svg";


const EmailTemplate = ({ match, data }) => {
	return (
		<>
			<Row className="justify-content-between mt-4">
				<Colxx xxs="12" lg="3" className="mb-4">
					<h3>{data && data[0]?.name}</h3>
				</Colxx>
				<Colxx xxs="12" lg="4" className="mb-4">
					<p className="text-muted">Last updated : {moment(data && data[0]?.updated_at).format("MM/DD/YYYY")}</p>
				</Colxx>
			</Row>
			<Row>
				<Colxx xxs="12" lg="12" className="mb-4">
					<div
						className="content mt-4"
						dangerouslySetInnerHTML={{
							__html: ` ${data && data[0]?.content}`,
						}}
					/>
				</Colxx>

			</Row>
			<div className="d-flex justify-content-end">
				<Button type='submit' className='btn btn-primary mr-4'>Save</Button>
			</div>
		</>
	);
};
export default EmailTemplate;
