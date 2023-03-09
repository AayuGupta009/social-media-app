import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout } from "../components";
import routes from "../routes";
import routesHindi from "../routesHindi";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

export default function PrivateRouter() {
  const isloggedIn = localStorage.getItem("ACCESS_TOKEN");
  const { i18n } = useTranslation();

  return (
    <>
      {isloggedIn ? (
        <DashboardLayout
          listItems={i18n.languages[0] === "hi" ? routesHindi : routes}
        >
          <Outlet />
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
