import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function ModalVol({ datas }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="cattle_dialogue_main awareness ">
      <div className="dialogue_bx_content" style={{ marginTop: ".5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.name")}</p>
            <span>{datas?.name ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.dob")}</p>
            <span>{datas?.dateOfBirth ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.gender")}</p>
            <span>{datas?.gender ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.email")}</p>
            <span>{datas?.name ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.address")}</p>
            <span>{datas?.address ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.aadhar_no")}</p>
            <span>{datas?.aadharNo ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <p>{t("modal_content.reason_for_appn")}</p>
            <span>{datas?.description ?? "NA"}</span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(ModalVol);
