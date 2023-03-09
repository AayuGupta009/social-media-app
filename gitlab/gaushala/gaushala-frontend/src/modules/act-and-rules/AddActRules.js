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
import Inputs from "../../components/common/Input";
import { ReactComponent as CameraSvg } from "../../assets/images/camera.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  actRulesEditDetailsAction,
  addActRules,
  updateActRules,
} from "../../redux/action/act-rules/actRulesAction";
import CommonBreadcrumb from "../../components/common/breadcumb";
import { ReactComponent as PdfSvg } from "../../assets/images/pdf-file.svg";
import { ReactComponent as CloseSvg } from "../../assets/images/close.svg";
import { getFileDataAction } from "../../redux/action/master-data/getFileDataAction";
import { useState } from "react";

const AddActRules = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const [fileError, setFileError] = useState("");

  const actRulesSchema = yup.object().shape({
    title: yup.string("").required("*Title is required"),
    document: yup.mixed().required("*Pdf is required"),
  });

  const initialValues = {
    title: "",
    document: "",
  };
  const onSubmit = (values) => {
    !isEdit
      ? dispatch(
          addActRules(values, () => {
            navigate("/acts-rules-management");
          })
        )
      : dispatch(
          updateActRules(id, values, () => {
            navigate("/acts-rules-management");
          })
        );
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: actRulesSchema,
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
      const res = await dispatch(getFileDataAction(4, 1, formData));
      res && setFieldValue("document", res?.data?.result?.uri);
    }
  };

  useEffect(() => {
    isEdit && dispatch(actRulesEditDetailsAction(id));
  }, [dispatch, id, isEdit]);

  const { editDetails } = useSelector(
    (store) => store.actRulesEditDetailsReducer
  );
  useEffect(() => {
    if (isEdit && editDetails?.result) {
      setFieldValue("document", editDetails.result.document);
      setFieldValue("title", editDetails.result.title);
    }
  }, [isEdit, setFieldValue, editDetails]);

  const handleFileClose = (e) => {
    setFieldValue("document", null);
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">
            {isEdit ? `${t("buttons.edit_rule")}` : `${t("buttons.add_rule")}`}
          </Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.ActsRulesManagement")}`,
                  path: "/acts-rules-management",
                },
                {
                  label: `${
                    isEdit
                      ? `${t("buttons.edit_rule")}`
                      : `${t("buttons.add_rule")}`
                  }`,
                  path: `${
                    isEdit
                      ? `/acts-rules-management/edit-rules/${id}`
                      : `/acts-rules-management/add-rules`
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
                    name="title"
                    value={values.title}
                    title={`${t("add_programmes.rule_title")}`}
                    classNames="input_label"
                    istextField={true}
                    main_input_wrapper="main_input_wrapper"
                    placeholder={`${t("add_requirement.write_req_title")}`}
                    onChange={handleChange}
                  />
                  {touched.title && errors.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="main_upload_bx">
                    <label htmlFor="">{`${t(
                      "add_programmes.upload_pdf"
                    )}`}</label>
                    <label htmlFor={!values.document ? "upload" : ""}>
                      <div className="upload_bx">
                        <input
                          type="file"
                          id="upload"
                          accept=".pdf"
                          name="document"
                          // value={values.document}
                          onChange={handlePdfChange}
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
                                    onClick={handleFileClose}
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
              <div className="add_btns">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/acts-rules-management")}
                >
                  {`${t("buttons.cancel")}`}
                </Button>
                <Button variant="contained" color="primary" type="submit">
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

export default AddActRules;
