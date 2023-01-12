import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Badge, CustomInput, FormGroup } from "reactstrap";
import { NavLink } from "../common/navlink/NavLink";

import ApplicationMenu from "components/common/ApplicationMenu";

const SurveyDetailApplicationMenu = () => {
  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">Status</p>
          <ul className="list-unstyled mb-5">
            <li className="active">
              <NavLink href="#" location={{}}>
                <i className="simple-icon-refresh" />
                Active Surveys
                <span className="float-right">12</span>
              </NavLink>
            </li>
            <li>
              <NavLink href="#" location={{}}>
                <i className="simple-icon-check" />
                Completed Surveys
                <span className="float-right">24</span>{" "}
              </NavLink>
            </li>
          </ul>

          <p className="text-muted text-small">Categories</p>
          <FormGroup className="mb-5">
            <CustomInput
              type="checkbox"
              id="developmentCheck"
              label="Development"
              className="mb-2"
            />
            <CustomInput
              type="checkbox"
              id="workplaceCheck"
              className="mb-2"
              label="Workplace"
            />
            <CustomInput
              type="checkbox"
              id="hardwareCheck"
              className="mb-2"
              label="Hardware"
            />
          </FormGroup>

          <p className="text-muted text-small">Labels</p>
          <div>
            <NavLink href="#" location={{}}>
              <Badge className="mb-1" color="outline-primary" pill>
                NEW FRAMEWORK
              </Badge>{" "}
            </NavLink>

            <NavLink href="#" location={{}}>
              <Badge className="mb-1" color="outline-secondary" pill>
                EDUCATION
              </Badge>{" "}
            </NavLink>
            <NavLink href="#" location={{}}>
              <Badge className="mb-1" color="outline-dark" pill>
                PERSONAL
              </Badge>{" "}
            </NavLink>
          </div>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyDetailApplicationMenu;
