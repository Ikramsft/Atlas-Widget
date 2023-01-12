/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import classnames from "classnames";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { Badge, NavItem } from "reactstrap";
import { NavLink } from "../common/navlink/NavLink";

import ApplicationMenu from "components/common/ApplicationMenu";
import IntlMessages from "helpers/IntlMessages";
import { getTodoListWithFilter } from "redux/actions";

const TodoApplicationMenu = ({
  todoItems,
  filter,
  allTodoItems,
  loaded,
  labels,
  categories,
  getTodoListWithFilterAction,
}) => {
  const addFilter = (column, value) => {
    getTodoListWithFilterAction(column, value);
  };

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="todo.status" />
          </p>
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter })}>
              <NavLink href="#" onClick={() => addFilter("", "")} location={{}}>
                <i className="simple-icon-reload" />
                <IntlMessages id="todo.all-tasks" />
                <span className="float-right">
                  {loaded && allTodoItems.length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === "status" &&
                  filter.value === "PENDING",
              })}
            >
              <NavLink
                location={{}}
                href="#"
                onClick={() => addFilter("status", "PENDING")}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="todo.pending-tasks" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === "PENDING").length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === "status" &&
                  filter.value === "COMPLETED",
              })}
            >
              <NavLink
                href="#"
                location={{}}
                onClick={() => addFilter("status", "COMPLETED")}
              >
                <i className="simple-icon-check" />
                <IntlMessages id="todo.completed-tasks" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === "COMPLETED").length}
                </span>
              </NavLink>
            </NavItem>
          </ul>
          <p className="text-muted text-small">
            <IntlMessages id="todo.categories" />
          </p>
          <ul className="list-unstyled mb-5">
            {categories.map((c, index) => {
              return (
                <NavItem key={index}>
                  <div onClick={() => addFilter("category", c)}>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        defaultChecked={
                          filter &&
                          filter.column === "category" &&
                          filter.value === c
                        }
                      />
                      <label className="custom-control-label">{c}</label>
                    </div>
                  </div>
                </NavItem>
              );
            })}
          </ul>
          <p className="text-muted text-small">
            <IntlMessages id="todo.labels" />
          </p>
          <div>
            {labels.map((l, index) => {
              return (
                <p className="d-sm-inline-block mb-1" key={index}>
                  <NavLink
                    href="#"
                    location={{}}
                    onClick={() => addFilter("label", l.label)}
                  >
                    <Badge
                      className="mb-1"
                      color={`${
                        filter &&
                        filter.column === "label" &&
                        filter.value === l.label
                          ? l.color
                          : `outline-${l.color}`
                      }`}
                      pill
                    >
                      {l.label}
                    </Badge>
                  </NavLink>
                </p>
              );
            })}
          </div>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { todoItems, filter, allTodoItems, loaded, labels, categories } =
    todoApp;

  return {
    todoItems,
    filter,
    allTodoItems,
    loaded,
    labels,
    categories,
  };
};
export default connect(mapStateToProps, {
  getTodoListWithFilterAction: getTodoListWithFilter,
})(TodoApplicationMenu);
