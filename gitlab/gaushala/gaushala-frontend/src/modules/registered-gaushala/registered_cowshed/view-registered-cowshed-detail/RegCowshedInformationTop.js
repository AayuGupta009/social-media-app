import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommonBreadcrumb from "../../../../components/common/breadcumb";

const RegCowshedInformationTop = ({ headData, topData }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const data = useSelector(
    (store) => store.GaushalaManagementReducer?.gaushalaData
  );
  return (
    <>
      <div className="top_bx">
        <Typography variant="h4" style={{ marginBottom: ".5rem" }}>
          {t("page_title.cowshed_info")}
        </Typography>
        <div className="breadcumb" style={{ marginBottom: "2rem" }}>
          <CommonBreadcrumb
            routes={[
              {
                label: `${t("page_title.GaushalaManagement")}`,
                path: "/registered-gaushala-management",
              },
              {
                label: `${t("page_title.cowshed_info")}`,
                path: `/registered-gaushala-management/reg-cowshed-info-detail/${id}`,
              },
            ]}
          />
        </div>
        <div className="wrapper_card" style={{ marginBottom: "1.5rem" }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <div className="content_bx">
                <p>
                  <span style={{ fontWeight: "600" }}>
                    {t("page_title.cowshed_name")}
                  </span>
                  {headData?.cowshedName ?? "NA"}
                </p>
              </div>
            </Grid>
            <Grid item md={4} style={{ textAlign: "center" }}>
              <div className="content_bx">
                <p>
                  <span style={{ fontWeight: "600" }}>
                    {t("page_title.cowshed_cows_no")}
                  </span>
                  {headData?.totalCow ?? "NA"}
                </p>
              </div>
            </Grid>
            <Grid item md={4} style={{ textAlign: "right" }}>
              <div className="content_bx">
                <p>
                  <span style={{ fontWeight: "600" }}>
                    {t("page_title.adopted_cow_nos")}
                  </span>
                  {topData?.totalAdoptedCow ?? "NA"}
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default RegCowshedInformationTop;
