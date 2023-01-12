/* eslint-disable react/no-array-index-key */
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";
import IntlMessages from "../../helpers/IntlMessages";

const getMenuTitle = (sub) => {
  if (`/${sub}` === adminRoot) return <IntlMessages id="menu.home" />;
  return <IntlMessages id={`menu.${sub}`} />;
};

const getUrl = (path, sub) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  const router = useRouter();
  const geturl = router;

  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
      <BreadcrumbItems match={geturl} />
    </>
  );
};

const BreadcrumbItems = ({ match }) => {
  const path = match.pathname;
  let paths = path.split("/");
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter((x) => x.indexOf(":") === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink href={`/${getUrl(path, sub, index)}`}>
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
