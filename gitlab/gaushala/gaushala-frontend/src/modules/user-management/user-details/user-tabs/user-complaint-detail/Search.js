import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../../../../assets/images/Search.svg";

const Search = ({ search, handleChangeSearch, placeholder }) => {
  const { t, i18n } = useTranslation();

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
          justifyContent: "end",
        }}
        className="top_search_filter_bx"
      >
        <Grid item xs={6} md={6}></Grid>

        <Grid item xs={10} md={6}>
          <div className="search_filter_bx" style={{ justifyContent: "end" }}>
            <OutlinedInput
              name="search"
              value={search}
              onChange={handleChangeSearch}
              id="search"
              type="text"
              placeholder={placeholder}
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
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
