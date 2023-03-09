import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "../../../components/common/TextField/TextField";
import Button from "@mui/material/Button";
import Icon from "../../../assets/images/sms.svg";
import Icon1 from "../../../assets/images/lock.svg";
import "../auth.scss";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { forgotPwd } from "../../../redux/action/auth/authAction";
import Header from "../sign-in/Header";
import * as yup from "yup";

export default function ForgetPassword() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ForgetSchema = yup.object({
    email: yup
      .string(`${t("valdate.email1")}`)
      .email(`${t("valdate.email2")}`)
      .required(`${t("valdate.email3")}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetSchema,
    onSubmit: (values) => {
      dispatch(forgotPwd(values));
    },
  });
  const { handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }} className="auth_box">
          <Grid container spacing={1}>
            <Grid item lg={7} display={{ xs: "none", lg: "block" }}>
              <div className="login_image"></div>
            </Grid>
            <Grid item lg={5} xs={12} className="flex_box">
              <div className="form-div">
                <div className="logo-image1">
                  <img src="logo.png" alt="logo" />
                </div>
                <div className="login-text1">
                  <h1>{t("forget_password.title")}</h1>
                </div>
                <div className="text-box2">
                  <p>{t("forget_password.subtitle")}</p>
                </div>
                <div>
                  <TextField
                    placeholder={t("forget_password.placeholder")}
                    icon={Icon}
                    type="email"
                    name="email"
                    {...getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="login_btn_custom">
                  <Button type="submit" variant="contained">
                    {t("forget_password.button")}
                  </Button>
                </div>
                <div className="back_to_login" onClick={() => navigate("/")}>
                  <Button variant="contained">
                    {t("forget_password.button2")}
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
