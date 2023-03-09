import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
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
import { adminLogin } from "../../../redux/action/auth/authAction";
import * as yup from "yup";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function ColumnsGrid() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const logInSchema = yup.object().shape({
    email: yup
      .string(`${t("valdate.email1")}`)
      .trim()
      .test(
        "email-without-spaces",
        "Email cannot contain spaces",
        (value) => !/\s/.test(value)
      )
      .email(`${t("valdate.email2")}`)
      .required(`${t("valdate.email3")}`),
    password: yup
      .string(`${t("valdate.pass1")}`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `${t("valdate.pass2")}`
      )
      .required(`${t("valdate.pass3")}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInSchema,
    onSubmit: (values) => {
      dispatch(
        adminLogin(values, () => {
          navigate("/dashboard");
        })
      );
      if (rememberMe) {
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    },
  });
  const storedUsername = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  const { handleChange, values, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  useEffect(() => {
    if (storedUsername && storedPassword) {
      setFieldValue("email", storedUsername);
      setFieldValue("password", storedPassword);
    }
  }, [storedUsername, storedPassword, setFieldValue]);
  function AvoidSpace(event) {
    const key = event.keyCode || event.which;
    const keyChar = String.fromCharCode(key);
    if (/\s/.test(keyChar)) {
      event.preventDefault();
    }
  }
  const onPaste = (e) => {
    e.preventDefault();
  };
  return (
    <>
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
                  <h1>{t("login.part1")}</h1>
                </div>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      placeholder={`${t("login.part2")}`}
                      icon={Icon}
                      type="text"
                      name="email"
                      defaultValue={storedUsername}
                      {...getFieldProps("email")}
                      onKeyPress={(event) => AvoidSpace(event)}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      placeholder={`${t("login.part3")}`}
                      icon={Icon1}
                      name="text"
                      type={showPassword ? "text" : "password"}
                      handleClickShowPassword={handleClickShowPassword}
                      handleMouseDownPassword={handleMouseDownPassword}
                      defaultValue={storedPassword}
                      onPaste={onPaste}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <div className="rember_common_bx">
                  <div className="remember_me">
                    {" "}
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={handleRememberMe}
                          />
                        }
                        label={`${t("login.part9")}`}
                      />
                    </FormGroup>
                  </div>
                  <div className="text3">
                    <span onClick={() => navigate("/forget-password")}>{`${t(
                      "login.part4"
                    )}`}</span>
                  </div>
                </div>
                <div className="login_btn_custom">
                  <Button type="submit" variant="contained">
                    {`${t("login.part5")}`}
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
