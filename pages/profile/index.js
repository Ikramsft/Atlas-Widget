import AddIcon from "@mui/icons-material/Add";
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import BadgeWidget from "components/widget/badgewidget";
import AppLayout from 'layout/AppLayout';
import { LINKS } from "lib/constants";
import Link from 'next/link';
import {
  Badge, Button, Card,
  CardBody, CardTitle, Row
} from 'reactstrap';
function Profile({ match }) {
  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>Sarah Kortney</h1>
          <div>
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4 col-left">
                <Card className="mb-4">
                  <div className="position-absolute card-top-buttons">
                    <Button outline color="white" className="icon-button">
                      <i className="simple-icon-pencil" />
                    </Button>
                  </div>
                  <SingleLightbox
                    thumb="/static/assets/img/profiles/1.jpg"
                    large="/static/assets/img/profiles/1.jpg"
                    className="card-img-top"
                  />
                  <CardBody>
                    <p className="text-muted text-small mb-2">About</p>
                    <p className="mb-3">
                      I’m a web developer. I spend my whole day, practically
                      every day, experimenting with HTML, CSS, and JavaScript;
                      dabbling with Python and Ruby; and inhaling a wide
                      variety of potentially useless information through a few
                      hundred RSS feeds. I build websites that delight and
                      inform. I do it well.
                    </p>
                    <p className="text-muted text-small mb-2">Location</p>
                    <p className="mb-3">Nairobi, Kenya</p>
                    <p className="text-muted text-small mb-2">Responsibility</p>
                    <p className="mb-3">
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill > FRONTEND </Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill > JAVASCRIPT </Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill > SECURITY </Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill > DESIGN </Badge>
                    </p>
                    <p className="text-muted text-small mb-2">Contact</p>
                    <div className="social-icons">
                      <ul className="list-unstyled list-inline">
                        <li className="list-inline-item">
                          <Link href="#">
                            <i className="simple-icon-social-facebook" />
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link href="#">
                            <i className="simple-icon-social-twitter" />
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link href="#">
                            <i className="simple-icon-social-instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" lg="8" className="mb-4 col-right">
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle className='border-bottom'>
                      <h3>Profile</h3>
                    </CardTitle>
                    <div className="remove-last-border remove-last-margin remove-last-padding">
                      <Row>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Name :</h6> <span>Sarah Kortney</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Mobile :</h6> <span>+919820098200</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Email :</h6> <span>developer1@google.com</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Company Name:</h6> <span>technologies</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Company Address :</h6> <span>223, Corporate Arena</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">City :</h6> <span>San Francisco</span></p>
                        </Colxx>
                        <Colxx xxs="12" lg="6">
                          <p><h6 className="d-inline-block font-weight-bold">Timezone :</h6> <span>America/New_York</span></p>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" className="mb-4">
                          <h6 className="d-inline-block font-weight-bold m-0">Reviews  :</h6>
                          <div className="text-zero top-right-button-container">
                            <Link href={`${LINKS.CREATE_REVIEW}`} passHref ><span className='btn btn-primary rounded-2'><AddIcon />Request Review</span></Link>
                          </div>
                        </Colxx>
                        <Colxx xxs="12" lg="4">
                          <Card className="mb-4 p-2 bg-primary">
                            <CardBody className="p-2">
                              <p className='m-0'><h6 className="d-inline-block font-weight-bold m-0">Google  :</h6> <span className='font-weight-bold'>60</span></p>
                            </CardBody>
                          </Card>
                        </Colxx>
                        <Colxx xxs="12" lg="4">
                          <Card className="mb-4 p-2 bg-primary">
                            <CardBody className="p-2">
                              <p className='m-0'><h6 className="d-inline-block font-weight-bold m-0">Yelp :</h6> <span className='font-weight-bold'>45</span></p>
                            </CardBody>
                          </Card>
                        </Colxx>
                        <Colxx xxs="12" lg="4">
                          <Card className="mb-4 p-2 bg-primary">
                            <CardBody className="p-2">
                              <p className='m-0'><h6 className="d-inline-block font-weight-bold m-0">Facebook  :</h6> <span className='font-weight-bold'>15</span></p>
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" className="mb-4">
                          <h6 className="d-inline-block font-weight-bold m-0">Widget  :</h6>
                          <div className="text-zero top-right-button-container">
                            <Link href={`${LINKS.CREATE_WIDGET}`} passHref ><span className='btn btn-primary rounded-2'><AddIcon />Create Widget</span></Link>
                          </div>
                        </Colxx>
                        <Colxx xxs="12">
                          <h6>Active Widget</h6>

                        </Colxx>
                        <Colxx xxs="12" lg="6" className="p-4">
                          <BadgeWidget />
                        </Colxx>
                      </Row>

                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </div>
        </Colxx>
      </Row>
    </AppLayout>
  );
}
export default Profile;
