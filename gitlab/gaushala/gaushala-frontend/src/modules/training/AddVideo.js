import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../components/common/Input";
import { ReactComponent as CameraSvg } from "../../assets/images/camera.svg";
import CommonBreadcrumb from "../../components/common/breadcumb";
import { useNavigate } from "react-router-dom";
import { addVideo } from "../../redux/action/training/trainingManagementAction";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

const AddVideo = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addVidoSchema = yup.object().shape({
    title: yup.string("").required("*Title is required"),
    video: yup.string("").required("*video is required"),
  });

  const initialValues = {
    title: "",
    video: "",
  };
  const onSubmit = (values) => {
    dispatch(
      addVideo(values, () => {
        navigate("/training-management");
      })
    );
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addVidoSchema,
  });
  const { handleChange, values, handleSubmit, errors, touched, setFieldValue } =
    formik;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">{`${t("buttons.add_video")}`}</Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.TrainingManagement")}`,
                  path: "/training-management",
                },
                {
                  label: `${t("buttons.add_video")}`,
                  path: "/training-management/add-video",
                },
              ]}
            />
          </div>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Inputs
                    value={values.title}
                    name="title"
                    onChange={handleChange}
                    title={`${t("add_programmes.video_title")}`}
                    classNames="input_label"
                    istextField={true}
                    main_input_wrapper="main_input_wrapper"
                    placeholder={`${t("add_requirement.write_req_title")}`}
                  />
                  {touched.title && errors.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Inputs
                    value={values.video}
                    name="video"
                    onChange={handleChange}
                    title={`${t("add_programmes.video_url")}`}
                    classNames="input_label"
                    istextField={true}
                    main_input_wrapper="main_input_wrapper"
                    placeholder={`${t("add_requirement.write_req_title")}`}
                  />
                  {touched.video && errors.video && (
                    <div className="error">{errors.video}</div>
                  )}
                </Grid>
              </Grid>
              <div className="add_btns">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/training-management")}
                >
                  {`${t("buttons.cancel")}`}
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {`${t("buttons.save")}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
};

export default AddVideo;
