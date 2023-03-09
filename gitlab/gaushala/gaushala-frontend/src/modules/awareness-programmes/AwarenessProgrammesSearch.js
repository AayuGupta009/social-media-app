import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as AddIcon } from "../../assets/images/plus-circle.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AwarenessProgrammesSearch = ({ search, handleChangeSearch }) => {
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
        <Grid item xs={12} md={5}>
          <div className="table_title">
            <p>{t("page_title.awareness_pro_list")}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            <Grid item xs={10} md={8}>
              <OutlinedInput
                id="search"
                type="text"
                name="search"
                value={search}
                onChange={handleChangeSearch}
                placeholder={`${t("table.gaushala")} , ${t("table.title")}`}
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
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: { xs: "right" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                sx={{
                  borderRadius: "100px",
                  height: "45px",
                  width: { xs: "auto", lg: "100%" },
                  fontWeight: "600",
                  lineHeight: "25px",
                  fontSize: "0.8125rem",
                }}
                onClick={() => navigate("/awareness-programmes/add-programmes")}
              >
                {`${t("buttons.add_programmes")}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AwarenessProgrammesSearch;
