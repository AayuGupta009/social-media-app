import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";

const UserManagementSearchBar = ({ search, handleChangeSearch }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={7}>
          <div className="table_title">
            <p>{t("page_title.user_list")}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <OutlinedInput
            name="search"
            id="search"
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder={`${t("table.user_name")} , ${t("table.mob_no")} , ${t(
              "table.email"
            )}`}
            sx={{
              height: "45px !important",
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

export default UserManagementSearchBar;
