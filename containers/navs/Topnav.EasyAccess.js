import {
  DropdownMenu,
  DropdownToggle,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";
import IntlMessages from "../../helpers/IntlMessages";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink
            href={`${adminRoot}/dashboards/default`}
            className="icon-menu-item"
          >
            <i className="iconsminds-shop-4 d-block" />{" "}
            <IntlMessages id="menu.dashboards" />
          </NavLink>

          <NavLink href={`${adminRoot}/ui`} className="icon-menu-item">
            <i className="iconsminds-pantone d-block" />{" "}
            <IntlMessages id="menu.ui" />
          </NavLink>
          <NavLink href={`${adminRoot}/ui/charts`} className="icon-menu-item">
            <i className="iconsminds-bar-chart-4 d-block" />{" "}
            <IntlMessages id="menu.charts" />
          </NavLink>
          <NavLink
            href={`${adminRoot}/applications/chat`}
            className="icon-menu-item"
          >
            <i className="iconsminds-speach-bubble d-block" />{" "}
            <IntlMessages id="menu.chat" />
          </NavLink>
          <NavLink
            href={`${adminRoot}/applications/survey`}
            className="icon-menu-item"
          >
            <i className="iconsminds-formula d-block" />{" "}
            <IntlMessages id="menu.survey" />
          </NavLink>
          <NavLink
            href={`${adminRoot}/applications/todo`}
            className="icon-menu-item"
          >
            <i className="iconsminds-check d-block" />{" "}
            <IntlMessages id="menu.todo" />
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
