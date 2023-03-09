import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../../assets/images/Search.svg";

const Seach = ({ placeholder }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          marginBottom: "3.1%",
          marginTop: "3.5%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={8}></Grid>
        <Grid item xs={12} md={4}>
          <OutlinedInput
            id="search"
            type="text"
            sx={{
              height: "45px !important",
              borderRadius: "40px !important",
              paddingLeft: "1.2rem",
            }}
            placeholder={placeholder}
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

export default Seach;
