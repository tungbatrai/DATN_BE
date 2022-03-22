/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { navigation } from "./../../routes";

function NavigationBar() {
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  if (!isLogin) {
    return (
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-light"
          id="sidenavAccordion"
          aria-label=""
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              {navigation.map((item, index) => (
                <SidenavItem navItem={item} index={index} key={index} />
              ))}
            </div>
          </div>

          {loggedIn && (
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Administrator
            </div>
          )}
        </nav>
      </div>
    );
  } else return null;
}

export default NavigationBar;

function SidenavItem(props) {
  var { navItem, index } = props;
  return (
    <div className="nav-item">
      <Link
        as="a"
        className="nav-link collapsed"
        to={`${navItem.url ? navItem.url : "#"}`}
        data-toggle="collapse"
        data-target={`#collapseLayouts${index}`}
        aria-expanded="false"
        aria-controls={`collapseLayouts${index}`}
      >
        {navItem.mainMenu}
        {navItem.subMenu && (
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-up" />
          </div>
        )}
      </Link>
      <div
        className="collapse"
        id={`collapseLayouts${index}`}
        aria-labelledby="headingOne"
      >
        {navItem.subMenu && (
          <nav className="sb-sidenav-menu-nested nav">
            {navItem.subMenu.map((subItem, idx) => (
              <Link as="a" key={idx} className="nav-link" to={subItem.url}>
                {subItem.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
