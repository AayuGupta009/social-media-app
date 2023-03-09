import { Button, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Inputs from "../../components/common/Input";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { addCmsData, updateCms } from "../../redux/action/cms/getCmsDataAction";

const Contact = ({ cmsData }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addContactSchema = yup.object().shape({
    name: yup.string("").required("*Title is required"),
    email: yup.string("").required("*Title is required"),
    mobileNo: yup.string("").required("*Title is required"),
    designation: yup.string("").required("*Title is required"),
    address: yup
      .string()
      .required()
      .min(10, "Description must be at least 10 characters")
      .max(250, "Description must be less than 250 characters"),
  });

  const initialValues = {
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    designation: "",
  };
  const onSubmit = (values) => {
    !cmsData?.contactUs
      ? dispatch(
          addCmsData(2, values, () => {
            navigate("/cms");
          })
        )
      : dispatch(
          updateCms(2, values, () => {
            navigate("/cms");
          })
        );
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addContactSchema,
  });
  const { handleChange, values, handleSubmit, errors, touched, setFieldValue } =
    formik;
  useEffect(() => {
    if (cmsData?.contactUs) {
      setFieldValue("name", cmsData.contactUs?.name);
      setFieldValue("email", cmsData.contactUs?.email);
      setFieldValue("mobileNo", cmsData.contactUs?.mobileNo);
      setFieldValue("address", cmsData.contactUs?.address);
      setFieldValue("designation", cmsData.contactUs?.designation);
    }
  }, [setFieldValue, cmsData]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="cms_bx add_bx">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Inputs
                onChange={handleChange}
                name="name"
                value={values.name}
                title={`${t("table.name")}`}
                classNames="input_label"
                istextField={true}
                main_input_wrapper="main_input_wrapper cms"
                // placeholder={`${t("add_requirement.write_req_title")}`}
              />
              {touched.name && errors.name && (
                <div className="error">{errors.name}</div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Inputs
                onChange={handleChange}
                name="designation"
                value={values.designation}
                title={`${t("reg_appn_form.post")}`}
                classNames="input_label"
                istextField={true}
                main_input_wrapper="main_input_wrapper cms"
                // placeholder={`${t("add_requirement.write_req_title")}`}
              />
              {touched.designation && errors.designation && (
                <div className="error">{errors.designation}</div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Inputs
                onChange={handleChange}
                name="email"
                value={values.email}
                title={`${t("reg_appn_form.email")}`}
                classNames="input_label"
                istextField={true}
                main_input_wrapper="main_input_wrapper cms"
                // placeholder={`${t("add_requirement.write_req_title")}`}
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Inputs
                onChange={handleChange}
                name="mobileNo"
                value={values.mobileNo}
                title={`${t("table.mob_no")}`}
                classNames="input_label"
                istextField={true}
                main_input_wrapper="main_input_wrapper cms"
                // placeholder={`${t("add_requirement.write_req_title")}`}
              />
              {touched.mobileNo && errors.mobileNo && (
                <div className="error">{errors.mobileNo}</div>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Inputs
                onChange={handleChange}
                name="address"
                value={values.address}
                title={`${t("table.address")}`}
                rows="4"
                classNames="input_label"
                istextArea={true}
                main_input_wrapper="cms"
                // placeholder={`${t("add_requirement.write_req_descri")}`}
              />
              {touched.address && errors.address && (
                <div className="error">{errors.address}</div>
              )}
            </Grid>
          </Grid>
        </div>
        <div className="edit_btn_custom">
          <Button type="submit" variant="contained">
            {cmsData.contactUs ? `${t("action.edit")}` : `${t("action.add")}`}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Contact;
