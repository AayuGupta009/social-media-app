import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./delete.scss";
import { ReactComponent as WarningSvgIcon } from "../../../assets/images/warning.svg";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { truncateTitle } from "../../../utils/commonFunctions";

function DeleteModal({ isOpen, handleClose, handleConfirm, title }) {
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      disableScrollLock={true}
      className="delete_modal"
    >
      <div className="delete_main_wrapper">
        <div className="content_wrapper">
          <WarningSvgIcon />
          <div className="title">
            <p>{t("delete.title")}</p>
          </div>
          <div className="subtitle">
            <p>
              {t("delete.subtitle1")}
              <span style={{ fontWeight: 600 }}> {truncateTitle(title)} </span>
              {t("delete.subtitle2")}
            </p>
          </div>
        </div>
        <div className="button_wrapper">
          <Button onClick={handleClose} color="secondary" variant="outlined">
            {t("buttons.cancel")}
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            {t("action.delete")}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default React.memo(DeleteModal);
