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
import { resetPassword } from "../../../redux/action/auth/authAction";
import Header from "../sign-in/Header";
import * as yup from "yup";

export default function ResetPassword() {
  const { t, i18n } = useTranslation();
  const [err, setErr] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPasswdSchema = yup.object({
    password: yup
      .string(`${t("valdate.pass1")}`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `${t("valdate.pass2")}`
      )
      .required(`${t("valdate.pass3")}`),
    cpassword: yup
      .string(`${t("valdate.cpass1")}`)
      .required(`${t("valdate.cpass2")}`)
      .oneOf([yup.ref("password")], `${t("valdate.cpass3")}`),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: resetPasswdSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword(
          values,
          () => {
            navigate("/");
          },
          (msg) => {
            setErr("Enter Valid Email ");
          }
        )
      );
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
                  <h1>{t("reset_password.title")}</h1>
                </div>
                <div className="text-box2">
                  <p>{t("reset_password.subtitle")}</p>
                </div>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      placeholder={t("reset_password.placeholder_pass")}
                      icon={Icon}
                      type="password"
                      name="password"
                      {...getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      placeholder={t("reset_password.placeholder_cpass")}
                      icon={Icon}
                      type="password"
                      name="cpassword"
                      {...getFieldProps("cpassword")}
                    />
                    {formik.touched.cpassword && formik.errors.cpassword ? (
                      <div className="error">{formik.errors.cpassword}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <div className="login_btn_custom">
                  <Button type="submit" variant="contained">
                    {" "}
                    {t("reset_password.button")}
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
