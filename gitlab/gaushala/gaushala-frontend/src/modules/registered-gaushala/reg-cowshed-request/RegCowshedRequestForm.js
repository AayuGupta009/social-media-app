import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonBreadcrumb from "../../../components/common/breadcumb";
import CustomDialog from "../../../components/common/Dialogue";
import {
  acceptApplication,
  rejectApplication,
  ViewGaushalApplicationForm,
} from "../../../redux/action/gaushala-management/getGaushalaManagementData";

const RegCowshedRequestForm = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(ViewGaushalApplicationForm(params?.id));
  }, [dispatch, params?.id]);
  console.log(reason, "reason");

  const { result } = useSelector(
    (store) => store.ViewGaushalApplicationFormReducer.gaushalaData
  );
  const onsubmit = () => {
    dispatch(
      acceptApplication(params?.id, () => {
        navigate("/registered-gaushala-management");
      })
    );
  };
  const handleReject = () => {
    setOpen(false);
    dispatch(
      rejectApplication(params?.id, reason, () => {
        navigate("/registered-gaushala-management");
      })
    );
  };
  return (
    <>
      <div className="add_request_form">
        <Typography variant="h4" style={{ marginBottom: ".5rem" }}>
          {`${t("reg_appn_form.appn_lettr")}`}
        </Typography>
        <div className="breadcumb" style={{ marginBottom: "2rem" }}>
          <CommonBreadcrumb
            routes={[
              {
                label: `${t("page_title.GaushalaManagement")}`,
                path: "/registered-gaushala-management",
              },
              {
                label: `${t("reg_appn_form.appn_lettr")}`,
                path: `/registered-gaushala-management/view-application-form/${params.id}`,
              },
            ]}
          />
        </div>
        <Box className="add_bxx">
          <Grid container spacing={2} className="box">
            <Grid item md={12} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.cowshed_name")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.cowshedName ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.cowshed_name_add")}`}</p>
              </div>
              <div className="view_bx">
                <p>
                  {result?.address?.address}, {result?.address?.pincode},
                  {result?.address?.city ?? "NA"}
                </p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.state")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.address?.state?.hi ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.dist")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.address?.district?.hi ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.city")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.address?.city ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.pinc")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.address?.pincode ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.establishment")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.establishedDate?.slice(0, 10) ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.till")}`}</p>
              </div>
              <div className="view_bx">
                <p>05/01/2030</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.type")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.cowshedType ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.capacity")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.maxCow ?? ""} </p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.gst")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.gstNumber ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.reg_no")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.registrationNo ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.lcoordinate")}`}</p>
              </div>
              <div className="view_bx">
                <p>16.5062° N</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.mob_n")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.user?.mobileNo ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.email")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.user?.email ?? "NA"}</p>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box className="add_bxx">
          <div className="text_bx title_bx" style={{ marginBottom: "1rem" }}>
            <p> {`${t("reg_appn_form.trustee_details")}`}</p>
          </div>
          <Grid container spacing={2} className="box">
            <Grid item md={12} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.count")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.totalTrust ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.trustee_name")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.trustName ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.gardian_name")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.fatherName ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.address")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.trustName ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.post")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.trustName ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.job_type")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.workType ?? "NA"}</p> */}
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.adhar_no")}`}</p>
              </div>
              <div className="view_bx">
                {/* <p>{result?.trust[0]?.aadharNo ?? "NA"}</p> */}
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box className="add_bxx">
          <div className="text_bx title_bx" style={{ marginBottom: "1rem" }}>
            <p> {`${t("reg_appn_form.Property_details")}`}</p>
          </div>
          <Grid container spacing={2} className="box">
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.land")}`}</p>
              </div>
              <div className="view_bx">
                <p>{result?.totalLand ?? "NA"}</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.itr")}`}</p>
              </div>
              <div className="view_bx">
                <p>xyz.pdf</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.itr")}`}</p>
              </div>
              <div className="view_bx">
                <p>xyz.pdf</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.itr")}`}</p>
              </div>
              <div className="view_bx">
                <p>xyz.pdf</p>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box className="add_bxx">
          <div className="text_bx title_bx" style={{ marginBottom: "1rem" }}>
            <p> {`${t("reg_appn_form.bank_details")}`}</p>
          </div>
          <Grid container spacing={2} className="box">
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.acc_no")}`}</p>
              </div>
              <div className="view_bx">
                <p>xxxxxxxx1234</p>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.acc_holder_name")}`}</p>
              </div>
              <div className="view_bx">
                <p>नारायण गौ सेवा केंद्र</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.ifsc_code")}`}</p>
              </div>
              <div className="view_bx">
                <p>SBIN0005943</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.bank_name")}`}</p>
              </div>
              <div className="view_bx">
                <p>SBI</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.branch_name")}`}</p>
              </div>
              <div className="view_bx">
                <p>Ghaziabad</p>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div className="text_bx">
                <p> {`${t("reg_appn_form.upi_id")}`}</p>
              </div>
              <div className="view_bx">
                <p>9875325473@okaxis</p>
              </div>
            </Grid>
          </Grid>
        </Box>
        <div className="add_bx">
          <div className="add_btns">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              {`${t("reg_appn_form.reject")}`}
            </Button>
            <Button variant="contained" color="primary" onClick={onsubmit}>
              {`${t("reg_appn_form.accept")}`}
            </Button>
          </div>
        </div>
      </div>
      <CustomDialog
        header={`${t("modal_title.cancel_reason")}`}
        header_style="custom_header"
        isOpen={open}
        isButton={true}
        yes={`${t("modal_title.send")}`}
        isText="2"
        placeholder={`${t("modal_title.reason")}`}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={handleReject}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
        rows="4"
        isClose={true}
        reason={reason}
        reasonText={(e) => setReason(e.target.value)}
      />
    </>
  );
};

export default RegCowshedRequestForm;
