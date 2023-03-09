import { DialogContentText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ViewFaq = ({ datas }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="faqBox">
      <p>
        <b>{t("reg_appn_form.qus")}</b>
      </p>
      <DialogContentText>{datas?.question ?? "NA"}</DialogContentText>
      <p style={{ marginTop: ".5rem" }}>
        <b>{t("reg_appn_form.ans")}</b>
      </p>
      <DialogContentText>{datas?.answer ?? "NA"}</DialogContentText>
    </div>
  );
};

export default ViewFaq;
