import { Colxx } from "components/common/CustomBootstrap";
import DeletePopup from "components/deletepopup";
import { LINKS } from "lib/constants";
import Link from "next/link";
import { useState } from "react";

import { Button, Card, CardBody, Row, Spinner } from "reactstrap";
function TemplateList({ data, isLoading, accessToken, setState, setMessage, fetchTemplateCallback }) {
  const [view, setView] = useState(false);
  const handleDeletePopup = async () => {
    setView(true);

  };

  return (
    <Row>
      <Colxx xxs="12">
        {data.length > 0 ? (data?.map((item) => {
          return (
            <Card className="mb-4 template-list-card" key={item?.id} data-id={item?.id}>
              <CardBody>
                {isLoading ? (
                  <div className="text-center"> <Spinner color="primary" className="mb-1" /></div>
                ) : (
                  <div>
                    <div className="float-right icon-size-lg text-info">
                      <i
                        className={
                          item.mode === "email"
                            ? "iconsminds-mail-forward"
                            : "simple-icon-bubble"
                        }
                      ></i>
                    </div>
                    <h4 className="font-weight-bold">{item?.name}</h4>
                    <p>{item?.subject}</p>
                    <div className="d-flex justify-content-between">
                      <Button color="primary" className="mt-2 rounded-1 py-1">
                        <Link
                          href={{
                            pathname: `${LINKS.TEMPLATE_DETAILS}`,
                            query: { pid: item?.id, mode: item?.mode },
                          }}
                          passHref
                        >
                          <a className="d-flex align-items-center text-white">
                            <span>Open Template</span>
                            <span className="ml-2  mt-1 icon-size-md">
                              <i className="simple-icon-arrow-right-circle"></i>
                            </span>
                          </a>
                        </Link>
                      </Button>
                      <Button
                        color="danger"
                        className="mt-2 rounded-1"
                        onClick={handleDeletePopup}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
              <DeletePopup
                fetchTemplateCallback={fetchTemplateCallback}
                setView={setView}
                view={view}
                id={item?.id}
                name={item?.name}
                setState={setState}
                setMessage={setMessage}
                accessToken={accessToken}
              />
            </Card>
          );
        })) : <h2 className="text-center text-muted">Template not available</h2>}
      </Colxx>
    </Row >

  );
}

export default TemplateList;
