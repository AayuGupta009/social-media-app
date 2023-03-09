import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../../components/common/Input";
import * as yup from "yup";
import { useFormik } from "formik";
// import {
//   addProgramme,
//   awarenessEditDetailsAction,
//   updateProgramme,
// } from "../../../redux/action/awareness-programme/awarenessProgAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommonBreadcrumb from "../../../components/common/breadcumb";
import {
  addFaq,
  faqEditDetailsAction,
  updateFaq,
} from "../../../redux/action/cms/faq/faqAction";

const AddFaq = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  const addVendorSchema = yup.object().shape({
    question: yup.string("").required("*Title is required"),
    answer: yup.string("").required("*Pdf is required").nullable(),
  });

  const initialValues = {
    question: "",
    answer: "",
  };
  const onSubmit = (values) => {
    !isEdit
      ? dispatch(
          addFaq(values, () => {
            navigate("/cms");
          })
        )
      : dispatch(
          updateFaq(id, values, () => {
            navigate("/cms");
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

  useEffect(() => {
    isEdit && dispatch(faqEditDetailsAction(id));
  }, [dispatch, id, isEdit]);

  const { editDetails } = useSelector((store) => store.faqEditDetailsReducer);
  console.log(editDetails, "editDetails");
  useEffect(() => {
    if (isEdit && editDetails?.result) {
      setFieldValue("question", editDetails.result.question);
      setFieldValue("answer", editDetails.result.answer);
    }
  }, [isEdit, setFieldValue, editDetails]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add_bx">
          <Typography variant="h4">
            {isEdit ? `${t("buttons.edit_faq")}` : `${t("buttons.add_faq")}`}
          </Typography>
          <div className="breadcumb" style={{ marginBottom: "2rem" }}>
            <CommonBreadcrumb
              routes={[
                {
                  label: `${t("page_title.CmsManagement")}`,
                  path: "/cms/4",
                },
                {
                  label: `${
                    isEdit
                      ? `${t("buttons.edit_faq")}`
                      : `${t("buttons.add_faq")}`
                  }`,
                  path: `${
                    isEdit ? `/cms/4/edit-faq/${id}` : `/cms/4/add-faq`
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
                    value={values.question}
                    name="question"
                    onChange={handleChange}
                    title={`${t("reg_appn_form.qus")}`}
                    classNames="input_label"
                    istextField={true}
                    main_input_wrapper="main_input_wrapper"
                    placeholder={`${t("add_requirement.write_faq_title")}`}
                  />
                  {touched.question && errors.question && (
                    <div className="error">{errors.question}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Inputs
                    value={values.answer}
                    name="answer"
                    title={`${t("reg_appn_form.ans")}`}
                    rows="4"
                    classNames="input_label"
                    istextArea={true}
                    placeholder={`${t("add_requirement.write_faq_descri")}`}
                    onChange={handleChange}
                  />
                  {touched.answer && errors.answer && (
                    <div className="error">{errors.answer}</div>
                  )}
                </Grid>
              </Grid>
              <div className="add_btns">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/cms/4")}
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

export default AddFaq;
