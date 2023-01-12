import { Snackbar } from "@mui/material";
import copy from "copy-to-clipboard";
import { LINKS } from "lib/constants";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "reactstrap";

function InsertCode({ widgetId, companyId, companyLocationId }) {
  const divTag = `<div app-id="${widgetId}" company-id="${companyId}" company-location-id="${companyLocationId}"></div>`;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClick = useCallback(
    (newState) => () => {
      copy(divTag);
      setState({ open: true, ...newState });
    },
    [divTag]
  );
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div className="wizard-basic-step">
      <div className="av-tooltip tooltip-label-right error-l-75">
        <div>
          <div className="text-center">
            <h2 className="h1">All Set!!!</h2>
            <p>insert this short code into your website</p>
          </div>
          <div className=" ">
            <h6>Paste thid HTML code in your website</h6>
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-2 border-rounded bg-gray shadow-sm rounded-1"
                onClick={handleClick({ vertical: "top", horizontal: "center" })}
              >
                {divTag}
              </div>
              <Button
                type="button"
                className="btn btn-primary ml-2 rounded-1"
                onClick={handleClick({ vertical: "top", horizontal: "center" })}
              >
                <i className="iconsminds-file-copy"></i> Copy to Clipboard
              </Button>
            </div>
          </div>
          <div className=" ">
            <h6>Paste thid CDN code in your website</h6>
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-2 border-rounded bg-gray shadow-sm rounded-1"
                onClick={handleClick({ vertical: "top", horizontal: "center" })}
              >
                https://cdn.getatlas.us/widget/atlas.css
              </div>
              <Button
                type="button"
                className="btn btn-primary ml-2 rounded-1"
                onClick={handleClick({ vertical: "top", horizontal: "center" })}
              >
                <i className="iconsminds-file-copy"></i> Copy to Clipboard
              </Button>
            </div>
            <Link href={LINKS.WIDGET} passHref>
              <a className="link-primary">
                <span>
                  <i className="simple-icon-arrow-left"></i>
                </span>
                <span> Go to widget list</span>
              </a>
            </Link>
          </div>

          <div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="Coppied"
              key={vertical + horizontal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertCode;
