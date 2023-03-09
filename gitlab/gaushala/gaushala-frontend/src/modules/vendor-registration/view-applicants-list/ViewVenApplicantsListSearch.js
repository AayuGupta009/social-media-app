import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as SearchIcon } from "../../../assets/images/Search.svg";
import { ReactComponent as AddIcon } from "../../../assets/images/plus-circle.svg";
// import { ReactComponent as FilterIcon } from "../../assets/images/Vector.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ViewVenApplicantsListSearch = ({ search, handleChangeSearch }) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
        className="top_search_filter_bx"
      >
        <Grid item xs={12} md={8}>
          <div className="table_title">
            <p>{t("page_title.ven_appl_list")}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <OutlinedInput
            name="search"
            id="search"
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder={`${t("table.name")} , ${t("reg_appn_form.gst")} , ${t(
              "modal_content.company_name"
            )} , ${t("table.mob_no")}`}
            sx={{
              height: "45px",
              borderRadius: "40px !important",
              paddingLeft: "1.2rem",
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewVenApplicantsListSearch;
