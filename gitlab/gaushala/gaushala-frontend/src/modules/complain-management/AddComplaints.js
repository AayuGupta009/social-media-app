import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Inputs from "../../components/common/Input";
import { ReactComponent as CameraSvg } from "../../assets/images/camera.svg";

const AddComplaints = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="add_bx">
        <Typography variant="h4">{`${t("buttons.add_complaints")}`}</Typography>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Inputs
                  title={`${t("table.c_name")}`}
                  classNames="input_label"
                  istextField={true}
                  main_input_wrapper="main_input_wrapper"
                  placeholder={`${t("add_requirement.write_req_title")}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Inputs
                  title={`${t("table.types_of_complain")}`}
                  classNames="input_label"
                  istextField={true}
                  main_input_wrapper="main_input_wrapper"
                  placeholder={`${t("add_requirement.write_req_title")}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Inputs
                  title={`${t("table.req_title")}`}
                  classNames="input_label"
                  istextField={true}
                  main_input_wrapper="main_input_wrapper"
                  placeholder={`${t("add_requirement.write_req_title")}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Inputs
                  title={`${t("table.req_title")}`}
                  classNames="input_label"
                  istextField={true}
                  main_input_wrapper="main_input_wrapper"
                  placeholder={`${t("add_requirement.write_req_title")}`}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Inputs
                  title={`${t("table.req_title")}`}
                  classNames="input_label"
                  istextField={true}
                  main_input_wrapper="main_input_wrapper"
                  placeholder={`${t("add_requirement.write_req_title")}`}
                />
              </Grid>
              <Grid item xs={6}>
                <div className="main_upload_bx">
                  <label htmlFor="">{`${t(
                    "add_programmes.upload_pdf"
                  )}`}</label>
                  <label htmlFor="upload">
                    <div className="upload_bx">
                      <input type="file" name="upload" id="upload" hidden />
                      <div className="bx">
                        <p>{`${t("add_programmes.upload_pdf")}`}</p>
                        <span>{`${t("add_programmes.any_file")}`}</span>
                      </div>
                    </div>
                  </label>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="main_upload_bx">
                  <label htmlFor="">{`${t(
                    "add_programmes.upload_pdf"
                  )}`}</label>
                  <label htmlFor="upload">
                    <div className="upload_bx">
                      <input type="file" name="upload" id="upload" hidden />
                      <div className="bx">
                        <p>{`${t("add_programmes.upload_pdf")}`}</p>
                        <span>{`${t("add_programmes.any_file")}`}</span>
                      </div>
                    </div>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Inputs
                    title={`${t("table.addedBy")}`}
                    rows="4"
                    classNames="input_label"
                    istextArea={true}
                    placeholder={`${t("add_requirement.write_req_descri")}`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className="add_btns">
              <Button variant="outlined" color="secondary">
                {`${t("buttons.cancel")}`}
              </Button>
              <Button variant="contained" color="primary">
                {`${t("buttons.save")}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddComplaints;
