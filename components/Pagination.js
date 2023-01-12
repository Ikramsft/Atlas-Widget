import { Colxx } from "components/common/CustomBootstrap";
import Link from "next/link";
import { Nav, NavItem } from "reactstrap";

const Pagination = ({
  totalPage = 0,
  currentPage = 1,
  numberLimit = 5,
  lastIsActive = true,
  firstIsActive = true,
  onChangePage,
  scrollTo
}) => {
  let startPoint = 1;
  let endPoint = numberLimit;

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - (numberLimit - 1);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }

  const firstPageButtonClassName = currentPage <= 1 ? "disabled" : "";
  const lastPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
  const prevPageButtonClassName = currentPage <= 1 ? "disabled" : "";
  const nextPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
  return totalPage > 1 ? (
    <Colxx xxs="12" className="mt-3 mb-3">
      <Nav className="pagination justify-content-center">
        {firstIsActive && (
          <NavItem className={`page-item ${firstPageButtonClassName}`}>
            <Link href={scrollTo || ""}

            >
              <a className="page-link first c-pointer"
                onClick={() => onChangePage(1)}>
                <i className="simple-icon-control-start" />
              </a>
            </Link>
          </NavItem>
        )}

        <NavItem className={`page-item ${prevPageButtonClassName}`}>
          <Link href={scrollTo || ""}

          >
            <a className="page-link prev c-pointer"
              onClick={() => onChangePage(currentPage - 1)}>
              <i className="simple-icon-arrow-left" />
            </a>
          </Link>
        </NavItem>
        {points.map((i) => {
          return (
            <NavItem
              key={i}
              className={`page-item ${currentPage === i && "active"}`}
            >
              <Link href={scrollTo || ""}

              >
                <a className="page-link c-pointer"
                  onClick={() => onChangePage(i)}>
                  {i}
                </a>
              </Link>
            </NavItem>
          );
        })}
        <NavItem className={`page-item ${nextPageButtonClassName}`}>
          <Link href={scrollTo || ""}

          >
            <a className="page-link next c-pointer"
              onClick={() => onChangePage(currentPage + 1)}>
              <i className="simple-icon-arrow-right" />
            </a>
          </Link>
        </NavItem>
        {lastIsActive && (
          <NavItem className={`page-item ${lastPageButtonClassName}`}>
            <Link href={scrollTo || ""}
            >
              <a className="page-link last c-pointer"
                onClick={() => onChangePage(totalPage)}>
                <i className="simple-icon-control-end" />
              </a>
            </Link>
          </NavItem>
        )}
      </Nav>
    </Colxx>
  ) : (
    <Colxx xxs="12" className="mt-2" />
  );
};

export default Pagination;
