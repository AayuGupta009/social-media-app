import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../components/common/Input";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as PdfSvg } from "../../assets/images/pdf-file.svg";
import { ReactComponent as CloseSvg } from "../../assets/images/close.svg";
import { getGaushalaManagementData } from "../../redux/action/gaushala-management/getGaushalaManagementData";
import {
  addVendor,
  getVenEditDetailsAction,
  updateVendor,
} from "../../redux/action/vendor-management/vendorActions";
import CommonBreadcrumb from "../../components/common/breadcumb";
import { handleTextInput } from "../../utils/commonFunctions";
import { getFileDataAction } from "../../redux/action/master-data/getFileDataAction";

const AddVendor = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const [fileError, setFileError] = useState("");

  const addVendorSchema = yup.object().shape({
    title: yup
      .string("")
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be less than 50 characters")
      .required("*Title is required"),
    cowshed: yup.string("").required("*Cowshed is required"),
    description: yup
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(250, "Description must be less than 250 characters"),
    file: yup.mixed().required("*Pdf is required"),
  });

  const initialValues = {
    title: "",
    cowshed: "",
    description: "",
    file: "",
  };
  const onSubmit = (values) => {
    !isEdit
      ? dispatch(
          addVendor(values, () => {
            navigate("/vendor-management");
          })
        )
      : dispatch(
          updateVendor(id, values, () => {
            navigate("/vendor-management");
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

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
    if (file.size > maxFileSize) {
      setFileError("File size must be less than 10 MB");
    } else {
      setFileError("");
      let formData = new FormData(); //formdata object
      formData.append("file", file);
      const res = await dispatch(getFileDataAction(2, 1, formData));
      res && setFieldValue("file", res?.data?.result?.uri);
    }
  };

  useEffect(() => {
    dispatch(getGaushalaManagementData(0));
  }, [dispatch]);

  const { result } = useSelector(
    (store) => store.GaushalaManagementReducer?.gaushalaData
  );
  const options = result?.data;

  useEffect(() => {
    isEdit && dispatch(getVenEditDetailsAction(id));
  }, [dispatch, id, isEdit]);

  const editDetails = useSelector(
    (store) => store.venEditDetailsReducer.editDetails
  );

  useEffect(() => {
    if (isEdit && editDetails) {
      setFieldValue("title", editDetails.title);
      setFieldValue("cowshed", editDetails.userId);
      setFieldValue("description", editDetails.description);
      setFieldValue("file", editDetails.document);
    }
  }, [isEdit, setFieldValue, editDetails]);

  const handleFileClose = (e) => {
    setFieldValue("file", null);
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">
            {isEdit ? `${t("buttons.edit_req")}` : `${t("buttons.add_req")}`}
          </Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.VendorManagement")}`,
                  path: "/vendor-management",
                },
                {
                  label: `${
                    isEdit
                      ? `${t("buttons.edit_req")}`
                      : `${t("buttons.add_req")}`
                  }`,
                  path: `${
                    isEdit
                      ? `/vendor-management/edit-vendor/${id}`
                      : `/vendor-management/add-vendor`
                  }`,
                },
              ]}
            />
          </div>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Inputs
                    value={values.title}
                    name="title"
                    onChange={handleChange}
                    title={`${t("table.req_title")}`}
                    classNames="input_label"
                    istextField={true}
                    main_input_wrapper="main_input_wrapper"
                    placeholder={`${t("add_requirement.write_req_title")}`}
                    onKeyPress={(event) => handleTextInput(event, 40)}
                  />
                  {touched.title && errors.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="label" className="input_label">
                    {t("dialogue_bx_cattle.cowshed_name")}
                  </InputLabel>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      name="cowshed"
                      value={values?.cowshed}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      fullWidth
                      id="cowshed"
                      InputLabelProps={{ shrink: false }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {options &&
                        options.map((item) => (
                          <MenuItem value={item?.userId}>
                            {item.cowshedName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {touched.cowshed && errors.cowshed && (
                    <div className="error">{errors.cowshed}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Inputs
                    value={values.description}
                    name="description"
                    title={`${t("table.description")}`}
                    rows="4"
                    classNames="input_label"
                    istextArea={true}
                    placeholder={`${t("add_requirement.write_req_descri")}`}
                    onChange={handleChange}
                    onKeyPress={(event) => handleTextInput(event, 240)}
                  />
                  {touched.description && errors.description && (
                    <div className="error">{errors.description}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="main_upload_bx">
                    <label htmlFor="">{`${t(
                      "add_programmes.upload_pdf"
                    )}`}</label>
                    <label htmlFor="file">
                      <div className="upload_bx">
                        <input
                          type="file"
                          name="file"
                          accept="application/pdf"
                          id="file"
                          // value={values?.file}
                          onChange={(event) => handlePdfChange(event)}
                          hidden
                        />
                        <div className="bx">
                          {values.file ? (
                            <>
                              <div className="pdf_main">
                                <div className="pdf_bx">
                                  <PdfSvg className="pdf" />
                                  <IconButton
                                    aria-label="close_icon"
                                    className="close_icon"
                                    onClick={handleFileClose}
                                  >
                                    <CloseSvg />
                                  </IconButton>
                                </div>
                                <p>{values.file}</p>
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
                      {fileError ? fileError : errors.file}
                    </div>
                  )}
                </Grid>
              </Grid>
              <div className="add_btns">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/vendor-management")}
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

export default AddVendor;
