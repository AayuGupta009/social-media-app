import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./delete.scss";
import { ReactComponent as DeleteSvg } from "../../../assets/images/block.svg";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function BlockModal({ isOpen, handleClose, handleConfirm, title, isBlock }) {
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
          <DeleteSvg />
          <div className="title">
            <p>
              {" "}
              {t("delete.block_title")}
              {t("delete.block")}
              {t("delete.block_title_2")}{" "}
            </p>
          </div>
          <div className="subtitle">
            <p>
              {t("delete.block_Subtitle1")}
              <span style={{ fontWeight: 600 }}> {title} </span>
              {t("delete.blocks")} {t("delete.block_Subtitle2")}
            </p>
          </div>
        </div>
        <div className="button_wrapper">
          <Button onClick={handleClose} color="secondary" variant="outlined">
            {t("buttons.cancel")}
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            {isBlock?.status
              ? `${t("delete.block")}`
              : `${t("delete.unblock")}`}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default React.memo(BlockModal);
