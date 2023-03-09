import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/Vector.svg";
import DropdownItem from "../../components/common/menu-item";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SerachFilter = ({
  search,
  handleChangeSearch,
  district,
  handleCityChange,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const districtName = district;
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          marginBottom: "3.1%",
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
        }}
        className="top_search_filter_bx"
      >
        <Grid item xs={6} md={6}></Grid>

        <Grid item xs={10} md={6}>
          <div className="search_filter_bx">
            <OutlinedInput
              name="search"
              value={search}
              onChange={handleChangeSearch}
              placeholder={`${t("table.gaushala")} , ${t(
                "reg_appn_form.reg_no"
              )}`}
              id="search"
              type="text"
              sx={{
                height: "45px !important",
                borderRadius: "40px !important",
                paddingLeft: "1.2rem",
              }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className="filter_icon" onClick={handleClick}>
              <FilterIcon />
            </div>
          </div>
        </Grid>
      </Grid>
      <DropdownItem
        isDistrictName={districtName}
        isheading={true}
        title={t("dropdown.name_of_addresses")}
        main_title="main_title"
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        onChange={handleCityChange}
        isbuttons={true}
        filter_btn="filter_btn"
        ok={t("dropdown.apply")}
      />
    </>
  );
};

export default SerachFilter;
