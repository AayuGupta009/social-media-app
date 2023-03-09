import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import { ReactComponent as AddIcon } from "../../../assets/images/plus-circle.svg";
import { useTranslation } from "react-i18next";

const BannerSearch = ({ handleImageChange, handleSubmit, inputRef }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          marginBottom: "3.1%",
          marginTop: "2.1%",
          display: "flex",
          alignItems: "center",
        }}
        className="top_search_filter_bx"
      >
        <Grid item xs={12} md={5}>
          <div className="table_title">
            <p>{t("page_title.bnnr_list")}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={8}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: { xs: "right" },
              }}
            >
              <input
                hidden
                ref={inputRef}
                type="file"
                name="banner"
                id="banner"
                onChange={handleImageChange}
                accept="image/png, image/jpeg"
                // multiple
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                sx={{
                  borderRadius: "100px",
                  height: "45px",
                  width: { xs: "auto", lg: "100%" },
                  fontWeight: "600",
                  lineHeight: "45px",
                }}
                onClick={handleSubmit}
              >
                {`${t("buttons.add_bnnr")}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BannerSearch;
