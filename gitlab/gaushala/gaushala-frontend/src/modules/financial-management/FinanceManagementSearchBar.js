import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";

const FinanceManagementSearchBar = ({
  searchText,
  search,
  handleChangeSearch,
  placeholder,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "3.1%",
          marginTop: "1.5rem",
        }}
      >
        <Grid item xs={12} md={8}>
          <div className="table_title">
            <p> {searchText}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <OutlinedInput
            name="search"
            id="search"
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder={placeholder}
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

export default FinanceManagementSearchBar;
