import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function ModalVen({ datas }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="cattle_dialogue_main awareness ">
      <div className="dialogue_bx_content" style={{ marginTop: ".5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <p> {t("table.name")}</p>
            <span>{datas?.name ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p> {t("reg_appn_form.gst")}</p>
            <span>{datas?.gstNumber ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.company_name")}</p>
            <span>{datas?.companyName ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.pancard")}</p>
            <span>{datas?.pancardNumber ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.email")}</p>
            <span>{datas?.name ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.address")}</p>
            <span>{datas?.address ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <p>{t("modal_content.reason_for_appn")}</p>
            <span>{datas?.description ?? "NA"}</span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(ModalVen);
