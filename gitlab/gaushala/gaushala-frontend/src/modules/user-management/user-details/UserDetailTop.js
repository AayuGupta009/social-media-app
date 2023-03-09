import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const UserDetailTop = ({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="top_bx">
        <Typography variant="h4" style={{ marginBottom: "2rem" }}>
          {t("page_title.user_description")}
        </Typography>
        <div className="wrapper_card" style={{ marginBottom: "1.5rem" }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <div className="content_bx">
                <p>
                  {t("page_title.user_name")}
                  <span style={{ fontWeight: "600" }}>
                    {data?.name ?? "NA"}
                  </span>
                </p>
              </div>
            </Grid>
            <Grid item md={4} style={{ textAlign: "center" }}>
              <div className="content_bx">
                <p>
                  {t("page_title.mob_no")}
                  <span style={{ fontWeight: "600" }}>
                    {data?.mobileNo ?? "NA"}
                  </span>
                </p>
              </div>
            </Grid>
            <Grid item md={4} style={{ textAlign: "right" }}>
              <div className="content_bx">
                <p>
                  {t("page_title.email")}
                  <span style={{ fontWeight: "600" }}>
                    {data?.email ?? "NA"}
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

export default UserDetailTop;
