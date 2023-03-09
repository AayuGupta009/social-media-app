import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ImgPng from "../../assets/images/image-icon.png";
import CommonBreadcrumb from "../../components/common/breadcumb";
import CustomDialog from "../../components/common/Dialogue";
import {
  acceptApplication,
  ViewNgoApplicationFormDetails,
  rejectApplication,
} from "../../redux/action/ngo/ngoAction";

const ViewNgoApplicationForm = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ViewNgoApplicationFormDetails(id));
  }, [dispatch, id]);

  const { viewNgoData, msg, count } = useSelector(
    (store) => store.ViewNgoApplicationFormReducer
  );
  const data = viewNgoData;

  const onsubmit = () => {
    dispatch(
      acceptApplication(id, () => {
        navigate("/ngo-management");
      })
    );
  };
  const handleReject = () => {
    setOpen(false);
    dispatch(
      rejectApplication(id, reason, () => {
        navigate("/ngo-management");
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: ".5rem" }}>
        {`${t("reg_appn_form.appn_lettr")}`}
      </Typography>
      <div className="breadcumb" style={{ marginBottom: "2rem" }}>
        <CommonBreadcrumb
          routes={[
            {
              label: `${t("page_title.NgoManagement")}`,
              path: "/ngo-management",
            },
            {
              label: `${t("reg_appn_form.appn_lettr")}`,
              path: `/ngo-management/view-ngo-application-form/${id}`,
            },
          ]}
        />
      </div>
      <div className="add_request_form add_bx">
        <Box className="add_bxx" style={{ padding: "2.5rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <label htmlFor="profile">
                <div
                  className="add_image_bx"
                  style={{
                    border: "1px solid #aa7d54",
                    background: "transparent",
                  }}
                >
                  <img src={ImgPng} alt={ImgPng} width="220px" />
                </div>
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <div className="text_bx">
                    <p> {`${t("table.name")}`}</p>
                  </div>
                  <div className="view_bx">
                    <p>{data?.name ?? "NA"}</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="text_bx">
                    <p> {`${t("table.address")}`}</p>
                  </div>
                  <div className="view_bx">
                    <p>{data?.address ?? "NA"}</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="text_bx">
                    <p> {`${t("table.reg_no")}`}</p>
                  </div>
                  <div className="view_bx">
                    <p>{data?.registrationNo ?? "NA"}</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} style={{ marginTop: "2rem" }}>
            <Grid item xs={12} md={6}>
              <div className="text_bx">
                <p> {`${t("table.email")}`}</p>
              </div>
              <div className="view_bx">
                <p>{data?.email ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="text_bx">
                <p> {`${t("table.mob_no")}`}</p>
              </div>
              <div className="view_bx">
                <p>{data?.mobileNo ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="text_bx">
                <p> {`${t("tab.about")}`}</p>
              </div>
              <div className="view_bx" style={{ height: "120px" }}>
                <p>{data?.description ?? "NA"}</p>
              </div>
            </Grid>
          </Grid>
          <div className="add_btns">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              {`${t("action.reject")}`}
            </Button>
            <Button variant="contained" color="primary" onClick={onsubmit}>
              {`${t("action.accept")}`}
            </Button>
          </div>
        </Box>
      </div>
      <CustomDialog
        header={`${t("modal_title.cancel_reason")}`}
        header_style="custom_header"
        isOpen={open}
        isButton={true}
        yes={`${t("modal_title.send")}`}
        isText="2"
        placeholder="कारण"
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={handleReject}
        handleClose={() => setOpen(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
        rows="4"
        reason={reason}
        reasonText={(e) => setReason(e.target.value)}
      />
    </>
  );
};

export default ViewNgoApplicationForm;
