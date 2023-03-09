import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../../components/common/Input";
import { ReactComponent as CameraSvg } from "../../../assets/images/camera.svg";
import { ReactComponent as AddBlackIcon } from "../../../assets/images/plus-circle-black.svg";
import { useState } from "react";
import CommonBreadcrumb from "../../../components/common/breadcumb";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  addBlogs,
  blogsEditDetailsAction,
  updateBlogs,
} from "../../../redux/action/homepage-management/blogs/blogsAction";
import { getFileDataAction } from "../../../redux/action/master-data/getFileDataAction";
import { ReactComponent as CloseSvg } from "../../../assets/images/close.svg";

const AddBlogs = (props) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes("edit");
  const [preview, setPreview] = useState("");

  const addBlogsSchema = yup.object().shape({
    title: yup.string("").required("*Title is required"),
    image: yup.string("").required("*Image is required").nullable(),
    description: yup
      .string()
      .required("*Description is required")
      .min(10, "*Description must be at least 10 characters")
      .max(250, "*Description must be less than 250 characters"),
  });

  const initialValues = {
    image: "",
    title: "",
    description: "",
  };
  const onSubmit = (values) => {
    !isEdit
      ? dispatch(
          addBlogs(values, () => {
            navigate("/homepage-management");
          })
        )
      : dispatch(
          updateBlogs(id, values, () => {
            navigate("/homepage-management");
          })
        );
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addBlogsSchema,
  });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    let formData = new FormData(); //formdata object
    formData.append("file", file);
    dispatch(getFileDataAction(7, 0, formData));
    // Create URL object for the selected file and set preview state
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
  };

  const fileResult = useSelector((store) => store.fileDataReducer.fileData);

  useEffect(() => {
    fileResult && setFieldValue("image", fileResult?.result?.uri);
  }, [fileResult, setFieldValue]);

  useEffect(() => {
    isEdit && dispatch(blogsEditDetailsAction(id));
  }, [dispatch, id, isEdit]);

  const { editDetails } = useSelector((store) => store.blogsEditDetailsReducer);
  console.log(editDetails, "editDetails");
  useEffect(() => {
    if (isEdit && editDetails?.result) {
      setPreview(editDetails.result.image);
      setFieldValue("image", editDetails.result.title);
      setFieldValue("title", editDetails.result.title);
      setFieldValue("description", editDetails.result.description);
    }
  }, [isEdit, setFieldValue, editDetails]);

  const handleFileClose = (e) => {
    setPreview("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">
            {isEdit ? `${t("buttons.edit_blog")}` : `${t("buttons.add_blog")}`}
          </Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.homepage_manmnt")}`,
                  path: "/homepage-management",
                },
                {
                  label: `${
                    isEdit
                      ? `${t("buttons.edit_blog")}`
                      : `${t("buttons.add_blog")}`
                  }`,
                  path: `${
                    isEdit
                      ? `/homepage-management/edit-blog/${id}`
                      : `/homepage-management/add-blog`
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
                    <div className="prewviewImage">
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
                            // value={values.image}
                            accept="image/png, image/jpeg"
                            name="image"
                            onChange={handlePdfChange}
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
                      <Inputs
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        title={`${t("add_programmes.blog_descri")}`}
                        classNames="input_label"
                        istextArea={true}
                        placeholder={`${t("add_programmes.blog_descri")}`}
                        rows={4}
                      />
                      {touched.description && errors.description && (
                        <div className="error">{errors.description}</div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className="add_btns">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/homepage-management")}
                >
                  {`${t("buttons.cancel")}`}
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {isEdit ? `${t("buttons.update")}` : `${t("buttons.save")}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
};

export default AddBlogs;
