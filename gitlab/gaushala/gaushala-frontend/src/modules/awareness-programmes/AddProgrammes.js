import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../components/common/Input";
import { ReactComponent as CameraSvg } from "../../assets/images/camera.svg";
import * as yup from "yup";
import ResponsiveTimePickers from "../../components/common/timepicker";
import ResponsiveDatePickers from "../../components/common/datepicker";
import { useFormik } from "formik";
import {
  addProgramme,
  awarenessEditDetailsAction,
  updateProgramme,
} from "../../redux/action/awareness-programme/awarenessProgAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommonBreadcrumb from "../../components/common/breadcumb";
import { ReactComponent as PdfSvg } from "../../assets/images/pdf-file.svg";
import { ReactComponent as CloseSvg } from "../../assets/images/close.svg";
import {
  getFileDataAction,
  imageDataAction,
} from "../../redux/action/master-data/getFileDataAction";
import { useState } from "react";

const AddProgrammes = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const [preview, setPreview] = useState("");
  const [fileError, setFileError] = useState("");

  const addVendorSchema = yup.object().shape({
    title: yup.string("").required("*Title is required"),
    document: yup.string("").required("*Pdf is required").nullable(),
    image: yup.string("").required("*Picture is required").nullable(),
    eventDate: yup.date().required("*Date is required").nullable(),
    eventTime: yup.string().required("*Time is required").nullable(),
  });

  const initialValues = {
    image: "",
    title: "",
    eventTime: null,
    eventDate: null,
    document: null,
  };
  const onSubmit = (values) => {
    !isEdit
      ? dispatch(
          addProgramme(values, () => {
            navigate("/awareness-programmes");
          })
        )
      : dispatch(
          updateProgramme(id, values, () => {
            navigate("/awareness-programmes");
          })
        );
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addVendorSchema,
  });
  const { handleChange, values, handleSubmit, errors, touched, setFieldValue } =
    formik;

  // image upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    let formData = new FormData(); //formdata object
    formData.append("file", file);
    const res = await dispatch(imageDataAction(3, 0, formData));
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    res && setFieldValue("image", res?.data?.result?.uri);
  };

  // pdf upload
  const handleChangePdf = async (event) => {
    const file = event.target.files[0];
    const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
    if (file.size > maxFileSize) {
      setFileError("File size must be less than 10 MB");
    } else {
      setFileError("");
      let formData = new FormData(); //formdata object
      formData.append("file", file);
      const res = await dispatch(getFileDataAction(3, 1, formData));
      res && setFieldValue("document", res?.data?.result?.uri);
    }
  };

  useEffect(() => {
    isEdit && dispatch(awarenessEditDetailsAction(id));
  }, [dispatch, id, isEdit]);

  const { editDetails } = useSelector(
    (store) => store.awarenessEditDetailsReducer
  );

  useEffect(() => {
    if (isEdit && editDetails?.result) {
      const timeString = editDetails.result?.eventTime;
      const [hours, minutes] = timeString.split(":");
      const parsedTime = new Date();
      parsedTime.setHours(hours);
      parsedTime.setMinutes(minutes);
      setPreview(editDetails.result.image);
      setFieldValue("image", editDetails.result.image);
      setFieldValue("title", editDetails.result.title);
      setFieldValue("eventTime", parsedTime);
      setFieldValue("eventDate", editDetails.result.eventDate);
      setFieldValue("document", editDetails.result.document);
    }
  }, [isEdit, setFieldValue, editDetails]);

  const handleFileClose = (e) => {
    setPreview("");
  };
  const handlePdfClose = (e) => {
    setFieldValue("document", null);
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">
            {isEdit
              ? `${t("buttons.edit_programmes")}`
              : `${t("buttons.add_programmes")}`}
          </Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.AwarenessProgramme")}`,
                  path: "/awareness-programmes",
                },
                {
                  label: `${
                    isEdit
                      ? `${t("buttons.edit_programmes")}`
                      : `${t("buttons.add_programmes")}`
                  }`,
                  path: `${
                    isEdit
                      ? `/awareness-programmes/edit-programmes/${id}`
                      : `/awareness-programmes/add-programmes`
                  }`,
                },
              ]}
            />
          </div>
          <Card>
            <CardContent>
              <Grid container spacing={7}>
                <Grid item xs={12} md={6}>
                  {preview ? (
                    <div className="prewviewImage awarness">
                      <div className="image_bx">
                        <img src={preview} alt="Preview" />
                        <IconButton onClick={handleFileClose}>
                          <CloseSvg />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <label htmlFor="image">
                        <div className="add_image_bx">
                          <div className="camera_img">
                            <CameraSvg />
                          </div>
                          <input
                            type="file"
                            id="image"
                            accept="image/png, image/jpeg"
                            name="image"
                            onChange={handleImageChange}
                            hidden
                          />
                          <p>{`${t("add_programmes.add_view_photo_video")}`}</p>
                        </div>
                      </label>
                      {touched.image && errors.image && (
                        <div className="error">{errors.image}</div>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Inputs
                        name="title"
                        value={values.title}
                        title={`${t("add_programmes.title")}`}
                        classNames="input_label"
                        istextField={true}
                        main_input_wrapper="main_input_wrapper"
                        placeholder={`${t("add_programmes.title")}`}
                        onChange={handleChange}
                      />
                      {touched.title && errors.title && (
                        <div className="error">{errors.title}</div>
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ResponsiveTimePickers
                        name="eventTime"
                        title={`${t("add_programmes.event_time")}`}
                        placeholder={`${t("add_programmes.event_time")}`}
                        value={values.eventTime}
                        onChange={(value) => setFieldValue("eventTime", value)}
                        classNames="input_label"
                        istextField={true}
                        main_input_wrapper="main_input_wrapper"
                      />
                      {touched.eventTime && errors.eventTime && (
                        <div className="error">{errors.eventTime}</div>
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ResponsiveDatePickers
                        name="eventDate"
                        title={`${t("add_programmes.event_date")}`}
                        placeholder={`${t("add_programmes.event_date")}`}
                        value={values.eventDate}
                        onChange={(value) => setFieldValue("eventDate", value)}
                        classNames="input_label"
                        istextField={true}
                        main_input_wrapper="main_input_wrapper"
                      />
                      {touched.eventDate && errors.eventDate && (
                        <div className="error">{errors.eventDate}</div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <div style={{ marginBottom: "1.8rem" }} />
              <Grid container spacing={7}>
                <Grid item xs={12} md={12}>
                  <div className="main_upload_bx">
                    <label htmlFor="">{`${t(
                      "add_programmes.upload_pdf"
                    )}`}</label>
                    <label htmlFor="document">
                      <div className="upload_bx">
                        <input
                          type="file"
                          name="document"
                          accept=".pdf"
                          // value={values.document}
                          id="document"
                          onChange={(event) => handleChangePdf(event)}
                          hidden
                        />
                        <div className="bx">
                          {values.document ? (
                            <>
                              <div className="pdf_main">
                                <div className="pdf_bx">
                                  <PdfSvg className="pdf" />
                                  <IconButton
                                    aria-label="close_icon"
                                    className="close_icon"
                                    onClick={handlePdfClose}
                                  >
                                    <CloseSvg />
                                  </IconButton>
                                </div>
                                <p>{values.document}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>{`${t("add_programmes.upload_pdf")}`}</p>
                              <span>{`${t("add_programmes.any_file")}`}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors && (
                    <div className="error">
                      {fileError ? fileError : errors.document}
                    </div>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <div className="add_btns">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/awareness-programmes")}
            >
              {`${t("buttons.cancel")}`}
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? `${t("buttons.update")}` : `${t("buttons.save")}`}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProgrammes;
