import { Colxx } from "components/common/CustomBootstrap";
import { Form, Formik } from "formik";
import {
  Button,
  ButtonGroup, FormGroup,
  Label,
  Row
} from "reactstrap";
import BadgeWidget from "../badgewidget";
import FloatWidget from "../floatwidget";
import { widgetType } from "./formData";

function Layout({ forms, fields, setSelectedLayout, selectedLayout }) {
  return (
    <div className="wizard-basic-step">
      <Formik
        innerRef={forms[1]}
        initialValues={{
          widget_layout: fields.widget_layout,
        }}
        onSubmit={() => { }}
        // validateOnMount
        enableReinitialize
      >
        <Form className="av-tooltip tooltip-label-right">
          <FormGroup>
            <div className="  border-bottom py-2 mb-4">
              <h3>Select Layout</h3>
            </div>
            <Row>
              <Colxx xxs="12" lg="12">
                <ButtonGroup className="mb-4">
                  {widgetType.map(item => {
                    return (
                      <Button
                        key={item.id}
                        color="primary"
                        onClick={() => setSelectedLayout(item.value)}
                        active={selectedLayout === item.value}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </ButtonGroup>
              </Colxx>
            </Row>
            {selectedLayout === "badge" && (
              <div className="layout-container">
                <Row>
                  <Colxx xxs="12">
                    <div className="  border-bottom py-2">
                      <Label>{selectedLayout}</Label>
                    </div>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="12" md="7" lg="4" className="p-4">
                    <BadgeWidget />
                  </Colxx>
                </Row>
              </div>
            )}
            {selectedLayout === "floating" && (
              <div className="layout-container">
                <Row>
                  <Colxx xxs="12">
                    <div className="  border-bottom py-2">
                      <Label>{selectedLayout}</Label>
                    </div>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="12" md="7" lg="4" className="p-4">
                    <FloatWidget />
                  </Colxx>
                </Row>
              </div>
            )}
            {selectedLayout === "slider" && (
              <div className="layout-container">
                <Row>
                  <Colxx xxs="12">
                    <div className="  border-bottom py-2">
                      <Label>{selectedLayout}</Label>
                    </div>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="12" className="p-4">
                    {/* <WidgetSlider /> */}
                    <div className="w-full">

                      <img src={`${process.env.PROD_URL}/static/assets/widgetsample/slider.png`} width="100%" height="auto" alt="slider" loading="lazy" />
                    </div>
                  </Colxx>
                </Row>
              </div>
            )}
            {selectedLayout === "grid" && (
              <div className="layout-container">
                <Row>
                  <Colxx xxs="12">
                    <div className="  border-bottom py-2">
                      <Label>{selectedLayout}</Label>
                    </div>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="12" className="p-4">
                    {/* <WidgetSlider /> */}
                    <div className="w-full">

                      <img src={`${process.env.PROD_URL}/static/assets/widgetsample/grid.png`} width="100%" height="auto" alt="grid" loading="lazy" />
                    </div>
                  </Colxx>
                </Row>
              </div>
            )}
            {selectedLayout === "list" && (
              <div className="layout-container">
                <Row>
                  <Colxx xxs="12">
                    <div className="  border-bottom py-2">
                      <Label>{selectedLayout}</Label>
                    </div>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="12" className="p-4">
                    {/* <WidgetSlider /> */}
                    <div className="w-full">
                      <img src={`${process.env.PROD_URL}/static/assets/widgetsample/list.png`} width="100%" height="auto" alt="list" loading="lazy" />
                    </div>
                  </Colxx>
                </Row>
              </div>
            )}
          </FormGroup>
        </Form>
      </Formik>
    </div>
  );
}

export default Layout;
