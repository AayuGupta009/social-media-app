import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const CommonBreadcrumb = ({ routes = [] }) => {
  const location = useLocation();
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {routes.map((route, index) => {
        return (
          <Link
            underline="hover"
            style={{
              color: `${
                location.pathname === route.path ? "#AA7D54" : "#001e50"
              }`,
              textDecoration: "none",
              cursor: `${
                location.pathname === route.path ? "inherit" : "pointer"
              }`,
            }}
            key={index}
            to={route.path}
          >
            {route.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CommonBreadcrumb;
