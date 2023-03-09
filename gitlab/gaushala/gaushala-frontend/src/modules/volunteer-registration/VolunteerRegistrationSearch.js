import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as AddIcon } from "../../assets/images/plus-circle.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/Vector.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommonSelect from "../../components/common/select";

const VolunteerRegistrationSearch = ({
  search,
  handleChangeSearch,
  handleChange,
  selectedValue,
}) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const Selectoptions = [
    {
      label: `${t("dropdown.process_requirement")}`,
      value: 2,
    },
    {
      label: `${t("dropdown.requirement_met")}`,
      value: 1,
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
        className="top_search_filter_bx"
      >
        <Grid item xs={12} md={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <div className="table_title">
                <p>{t("page_title.vol_need_list")}</p>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <CommonSelect
                id="adopt"
                name="adopt"
                selectedValue={selectedValue}
                handleChange={handleChange}
                options={Selectoptions}
                placeholder={t("option1.part5")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            <Grid item xs={10} md={7} lg={8}>
              <OutlinedInput
                name="search"
                id="search"
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder={`${t("table.gaushala")} , ${t("table.req_title")}`}
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
              md={5}
              lg={4}
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
                onClick={() => navigate("/volunteer-management/add-volunteer")}
              >
                {`${t("buttons.add_req")}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VolunteerRegistrationSearch;
