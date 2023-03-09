import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import { ReactComponent as CloseSvg } from "../../assets/images/close.svg";
import "./handover.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  nearestCowshedData,
  updateNearestData,
} from "../../redux/action/complain-management/complainManagement";
import { useDispatch, useSelector } from "react-redux";

function HandoverDialogueBox({
  isOpen,
  handleClose,
  header,
  mainClass,
  display,
  header_style,
  fullScreen,
  complaintID,
}) {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(
      updateNearestData(complaintID, value?.userId, () => {
        handleClose();
      })
    );
  };

  useEffect(() => {
    isOpen && dispatch(nearestCowshedData(complaintID));
  }, [dispatch, complaintID, isOpen]);

  const { result } = useSelector(
    (store) => store.nearestCowshedDataReducer?.nearestCowshedData
  );
  return (
    <div className={mainClass ?? ""}>
      <Dialog
        open={isOpen}
        fullScreen={fullScreen}
        onClose={handleClose}
        disableScrollLock={true}
        className={mainClass ?? ""}
      >
        <DialogTitle className={header_style}>{header}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="autocomplete_bx">
              <div className="title">
                <span> {t("dropdown.handover")}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Autocomplete
                  options={result?.data ?? []}
                  getOptionLabel={(option) => option?.cowshedName ?? ""}
                  value={value ?? ""}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        padding: "1rem",
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        label="Cowshed Name"
                        placeholder="Start typing to search"
                      />
                    </>
                  )}
                  fullWidth
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <div className="double_btn">
          <Button
            onClick={handleClose}
            header
            color="secondary"
            variant="outlined"
            fullWidth
            sx={{ display: `${display}` ?? "block" }}
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            fullWidth
          >
            {t("buttons.save")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default React.memo(HandoverDialogueBox);
