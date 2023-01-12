import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import {
  Card, CardImg,
  CardImgOverlay, CardText, CardTitle, Row
} from "reactstrap";

const ImageOverlayCard = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="cards.image-overlay-card" />
        </CardTitle>
        <Row>
          <Colxx xxs="12" xs="6" lg="3">
            <Card inverse className="mb-4">
              <CardImg
                src="/static/assets/img/cards/thumb-1.jpg"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Fruitcake</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </CardText>
              </CardImgOverlay>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
export default ImageOverlayCard;
