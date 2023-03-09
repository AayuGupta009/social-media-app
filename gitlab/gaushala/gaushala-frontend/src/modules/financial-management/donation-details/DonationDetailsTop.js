import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonBreadcrumb from "../../../components/common/breadcumb";

const DonationDetails = ({ cowshedDetails }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="top_bx">
        <Typography variant="h4" style={{ marginBottom: ".5rem" }}>
          {t("page_title.FinanceManagement")}
        </Typography>
        <div className="breadcumb" style={{ marginBottom: "2rem" }}>
          <CommonBreadcrumb
            routes={[
              {
                label: `${t("page_title.FinanceManagement")}`,
                path: "/financial-management",
              },
              {
                label: `${t("table.cowshed")}`,
                path: "/financial-management/donation-details",
              },
            ]}
          />
        </div>
        <div className="wrapper_card" style={{ marginBottom: "1.5rem" }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <div className="content_bx">
                <p>
                  {t("table.gaushala")}-
                  <span style={{ fontWeight: "600" }}>
                    {cowshedDetails?.cowshedName ?? "NA"}
                  </span>
                </p>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className="content_bx">
                <p>
                  {t("table.rec_donation")}-
                  <span style={{ fontWeight: "600" }}>
                    {cowshedDetails?.totalDonation ?? "NA"}
                  </span>
                </p>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className="content_bx">
                <p>
                  {t("table.received_adop_amount")}-
                  <span style={{ fontWeight: "600" }}>
                    {cowshedDetails?.adoptionAmount ?? "NA"}
                  </span>
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default DonationDetails;
