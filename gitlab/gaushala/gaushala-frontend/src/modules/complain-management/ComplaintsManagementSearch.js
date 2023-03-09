import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/Vector.svg";
import DropdownItem from "../../components/common/menu-item";
import { useNavigate } from "react-router-dom";
import CommonSelect from "../../components/common/select";
import { useState } from "react";

const ComplaintsManagementSearch = ({
  search,
  handleChangeSearch,
  handleChange,
  selectedValue,
  complainOptions,
  handleCityChange,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Selectoptions = [
    {
      label: `${t("dropdown.complain_complete")}`,
      value: 2,
    },
    {
      label: `${t("dropdown.complain_inprocess")}`,
      value: 1,
    },
    {
      label: `${t("dropdown.complain_pending")}`,
      value: 0,
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={4}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
        className="top_search_filter_bx"
      >
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <div className="table_title">
                <p>{t("page_title.complaint_list")}</p>
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
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={10} md={11}>
              <OutlinedInput
                name="search"
                id="search"
                type="text"
                value={search}
                placeholder={`${t("table.gaushala")} , ${t(
                  "table.c_name"
                )} , ${t("table.mob_no")}`}
                onChange={handleChangeSearch}
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
            <Grid item xs={2} md={1}>
              <div className="filter_icon" onClick={handleClick}>
                <FilterIcon />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DropdownItem
        isDistrictName={complainOptions}
        isheading={true}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        title={t("table.type_of_complain")}
        main_title="main_title"
        filter_btn="filter_btn"
        isbuttons={true}
        ok={t("dropdown.apply")}
        onChange={handleCityChange}
      />
    </>
  );
};

export default ComplaintsManagementSearch;
