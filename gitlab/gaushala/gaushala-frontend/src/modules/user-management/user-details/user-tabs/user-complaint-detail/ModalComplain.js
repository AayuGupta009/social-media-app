import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as ImgSvg } from "../../../../../assets/images/image.svg";

function ModalComplain({ datas }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="cattle_dialogue_main awareness ">
      <div className="dialogue_bx_content" style={{ marginTop: ".5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.c_name")}</p>
            <span>{datas?.complaintBy ?? "NA"} </span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.type_of_complain")}</p>
            <span>{datas?.complaintType?.hi ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.mob_no")}</p>
            <span>{datas?.mobileNo ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.photo_video")} </p>
            <span>
              <ImgSvg />
            </span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("modal_content.photo_video")} </p>
            <span>
              <ImgSvg />
            </span>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>{t("table.address")}</p>
            <span>{datas?.address ?? "NA"}</span>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <p>{t("table.descriptipn")}</p>
            <span>{datas?.description ?? "NA"}</span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(ModalComplain);
