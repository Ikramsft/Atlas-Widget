/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import { injectIntl } from "react-intl";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle, UncontrolledDropdown
} from "reactstrap";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { MenuIcon, MobileMenuIcon } from "../../components/svg";
import {
  adminRoot
} from "../../constants/defaultValues";
import {
  changeLocale,
  clickOnMobileMenu,
  logoutUser,
  setContainerClassnames
} from "../../redux/actions";

// import { signOut } from "next-auth/react";
import { signOut } from "next-auth/react";

import Link from "next/link";
// import TopnavDarkSwitch from "./Topnav.DarkSwitch";
// import TopnavEasyAccess from "./Topnav.EasyAccess";
import UserAvatar from "components/useravatar";
import { LINKS } from "lib/constants";
import TopnavNotifications from "./Topnav.Notifications";

// const cookies = new Cookies();
// const userData = cookies.get('userData')

function TopNav({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  changeLocaleAction,
  session
}) {
  const userName = session?.user?.userName.split("-").join(" ")
  const router = useRouter();
  // const search = () => {
  //   history.push(`${searchPath}?key=${searchKeyword}`);
  //   setSearchKeyword("");
  // };

  // const handleChangeLocale = (_locale, direction) => {
  //   changeLocaleAction(_locale);

  //   const currentDirection = getDirection().direction;
  //   if (direction !== currentDirection) {
  //     setDirection(direction);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 500);
  //   }
  // };


  // const handleSearchIconClick = (e) => {
  //   if (window.innerWidth < menuHiddenBreakpoint) {
  //     let elem = e.target;
  //     if (!e.target.classList.contains("search")) {
  //       if (e.target.parentElement.classList.contains("search")) {
  //         elem = e.target.parentElement;
  //       } else if (
  //         e.target.parentElement.parentElement.classList.contains("search")
  //       ) {
  //         elem = e.target.parentElement.parentElement;
  //       }
  //     }

  //     if (elem.classList.contains("mobile-view")) {
  //       search();
  //       elem.classList.remove("mobile-view");
  //       removeEventsSearch();
  //     } else {
  //       elem.classList.add("mobile-view");
  //       addEventsSearch();
  //     }
  //   } else {
  //     search();
  //   }
  //   e.stopPropagation();
  // };

  // const handleDocumentClickSearch = (e) => {
  //   let isSearchClick = false;
  //   if (
  //     e.target &&
  //     e.target.classList &&
  //     (e.target.classList.contains("navbar") ||
  //       e.target.classList.contains("simple-icon-magnifier"))
  //   ) {
  //     isSearchClick = true;
  //     if (e.target.classList.contains("simple-icon-magnifier")) {
  //       search();
  //     }
  //   } else if (
  //     e.target.parentElement &&
  //     e.target.parentElement.classList &&
  //     e.target.parentElement.classList.contains("search")
  //   ) {
  //     isSearchClick = true;
  //   }

  //   if (!isSearchClick) {
  //     const input = document.querySelector(".mobile-view");
  //     if (input && input.classList) input.classList.remove("mobile-view");
  //     removeEventsSearch();
  //     setSearchKeyword("");
  //   }
  // };

  // const removeEventsSearch = () => {
  //   document.removeEventListener("click", handleDocumentClickSearch, true);
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (localStorage.getItem("user_data")) {
  //       const userData = localStorage.getItem("user_data");
  //       // const userjson = userData ? JSON.parse(userData) : null
  //       setUser(null)
  //     }
  //   }
  // }, [])

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          href="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          href="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
        <Link href={adminRoot} passHref>
          <a className="navbar-logo" >
            <span className="logo d-none d-xs-block" />
            <span className="logo-mobile d-block d-xs-none" />
          </a>
        </Link>

        {/* <div className="search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div> */}

        {/* <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}

      </div>


      <div className="navbar-right">
        {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}
        <div className="header-icons d-inline-block align-middle">
          {/* <TopnavEasyAccess /> */}
          <TopnavNotifications />
          {/* <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button> */}
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0 d-flex align-items-center" color="empty">
              <span className="name mr-1 text-capitalize">
                {userName}
              </span>
              <span>
                <UserAvatar name={userName} sx={{ textTransform: "capitalize", width: "26px", height: "26px" }} />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem><Link href={LINKS.PROFILE} passHref><a>Profile</a></Link></DropdownItem>
              <DropdownItem divider />
              <Link href="/api/auth/signout" passHref>
                <DropdownItem >
                  <a onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                    className="d-block w-full"
                  >Sign Out</a>
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
